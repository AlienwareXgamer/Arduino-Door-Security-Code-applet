
import React, { useState, useCallback, useEffect } from 'react';
import { Door } from './components/Door';
import { Keypad } from './components/Keypad';
import { LCDDisplay } from './components/LCDDisplay';
import { EventLog } from './components/EventLog';
import { CORRECT_PASSCODE } from './constants';
import { generateSuccessMessage, generateFailureMessage } from './services/geminiService';
import type { LockState, EventLogEntry } from './types';

const App: React.FC = () => {
    const [lockState, setLockState] = useState<LockState>('locked');
    const [inputCode, setInputCode] = useState('');
    const [systemMessage, setSystemMessage] = useState('Enter Passcode');
    const [isProcessing, setIsProcessing] = useState(false);
    const [eventLog, setEventLog] = useState<EventLogEntry[]>([]);
    const [failedAttempts, setFailedAttempts] = useState(0);

    const addLogEntry = (message: string) => {
        const newEntry: EventLogEntry = {
            timestamp: new Date(),
            message,
        };
        setEventLog(prevLog => [newEntry, ...prevLog.slice(0, 4)]);
    };
    
    const resetToStandby = useCallback(() => {
        setInputCode('');
        setSystemMessage('Enter Passcode');
    }, []);

    const handleKeyPress = useCallback((key: string) => {
        if (isProcessing || inputCode.length >= 6 || systemMessage === 'SYSTEM LOCKED') return;
        setInputCode(prev => prev + key);
    }, [isProcessing, inputCode, systemMessage]);

    const handleClear = useCallback(() => {
        if (isProcessing || systemMessage === 'SYSTEM LOCKED') return;
        resetToStandby();
        setFailedAttempts(0);
    }, [isProcessing, resetToStandby, systemMessage]);

    const handleEnter = useCallback(async () => {
        if (isProcessing || !inputCode) return;
        setIsProcessing(true);
        setSystemMessage('Verifying...');

        if (inputCode === CORRECT_PASSCODE) {
            setFailedAttempts(0);
            setLockState('unlocked');
            const successMsg = await generateSuccessMessage();
            setSystemMessage(successMsg);
            addLogEntry('Access Granted');
            setTimeout(() => {
                setLockState('locked');
                resetToStandby();
                setIsProcessing(false);
                addLogEntry('Door Automatically Locked');
            }, 4000);
        } else {
            const newFailedAttempts = failedAttempts + 1;
            setFailedAttempts(newFailedAttempts);
            addLogEntry(`Access Denied (Code: ${inputCode})`);
            
            if (newFailedAttempts >= 3) {
                setSystemMessage('SYSTEM LOCKED');
                addLogEntry('System locked due to multiple failures.');
                setTimeout(() => {
                    setFailedAttempts(0);
                    resetToStandby();
                    setIsProcessing(false);
                }, 5000);
            } else {
                const failureMsg = await generateFailureMessage();
                setSystemMessage(failureMsg);
                setTimeout(() => {
                    resetToStandby();
                    setIsProcessing(false);
                }, 3000);
            }
        }
    }, [inputCode, isProcessing, resetToStandby, failedAttempts]);
    
    useEffect(() => {
        if (inputCode.length > 0 && inputCode.length <= 6) {
            setSystemMessage('*'.repeat(inputCode.length));
        } else if (inputCode.length === 0) {
            setSystemMessage('Enter Passcode');
        }
    }, [inputCode]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-base-950 to-base-900">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-100 tracking-wider">Arduino Smart Lock</h1>
                <p className="text-gray-400 mt-2">Gemini-Powered Security Interface</p>
            </header>

            <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="flex justify-center items-center">
                    <Door lockState={lockState} />
                </div>
                
                <div className="flex flex-col gap-6 bg-base-900/50 p-6 rounded-2xl border border-base-800 shadow-2xl shadow-base-950/50">
                    <LCDDisplay 
                        message={systemMessage} 
                        isProcessing={isProcessing} 
                        success={lockState === 'unlocked'} 
                        error={systemMessage.toLowerCase().includes('denied') || systemMessage.toLowerCase().includes('incorrect')}
                    />
                    <Keypad 
                        onKeyPress={handleKeyPress} 
                        onClear={handleClear} 
                        onEnter={handleEnter} 
                        disabled={isProcessing || systemMessage === 'SYSTEM LOCKED'} 
                    />
                    <EventLog logs={eventLog} />
                </div>
            </main>
            
            <footer className="text-center mt-12 text-gray-500 text-sm">
                <p>API responses are for simulation purposes only.</p>
            </footer>
        </div>
    );
};

export default App;