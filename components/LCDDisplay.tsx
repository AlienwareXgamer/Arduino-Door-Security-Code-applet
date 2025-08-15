
import React from 'react';

interface LCDDisplayProps {
  message: string;
  isProcessing: boolean;
  success: boolean;
  error: boolean;
}

const LoadingSpinner: React.FC = () => (
    <div className="w-5 h-5 border-2 border-lcd-text border-t-transparent rounded-full animate-spin"></div>
);

export const LCDDisplay: React.FC<LCDDisplayProps> = ({ message, isProcessing, success, error }) => {
    
    const isLockedOut = message === 'SYSTEM LOCKED';

    const borderColor = success
        ? 'border-accent-green shadow-glow-green'
        : error || isLockedOut
        ? 'border-accent-red shadow-glow-red'
        : 'border-accent-blue/50 shadow-glow-blue';
    
    const processingAnimation = isProcessing ? 'animate-pulse-glow' : '';

  return (
    <div className={`
      bg-lcd-bg text-lcd-text font-mono text-2xl
      h-20 px-6 flex items-center justify-between
      rounded-lg border-2 transition-all duration-300
      ${borderColor}
      ${processingAnimation}
    `}>
        <span className={`truncate ${isLockedOut ? 'text-accent-red' : ''}`}>{message}</span>
        {isProcessing && <LoadingSpinner />}
    </div>
  );
};