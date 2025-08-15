
import React from 'react';
import type { LockState } from '../types';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { LockOpenIcon } from './icons/LockOpenIcon';

interface DoorProps {
  lockState: LockState;
}

export const Door: React.FC<DoorProps> = ({ lockState }) => {
  const isLocked = lockState === 'locked';

  return (
    <div className="relative w-64 h-96 rounded-lg bg-base-800 shadow-lg border-2 border-base-700 flex items-center justify-end p-4 transition-transform duration-500 ease-in-out transform perspective-1000">
        {/* Door Panel */}
        <div className={`absolute inset-0 bg-gradient-to-b from-base-800 to-base-900 rounded-md transition-transform duration-700 ease-in-out ${isLocked ? 'rotate-y-0' : '-rotate-y-15'} transform-origin-left`}></div>

        {/* Lock Mechanism */}
        <div className="relative z-10 w-24 h-48 bg-base-900 rounded-r-lg flex flex-col items-center justify-around p-2 border-l-4 border-base-950">
            <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${isLocked ? 'bg-accent-red/20 text-accent-red' : 'bg-accent-green/20 text-accent-green'}`}>
                {isLocked ? <LockClosedIcon className="w-8 h-8"/> : <LockOpenIcon className="w-8 h-8"/>}
            </div>

            {/* Deadbolt */}
            <div className="relative w-full h-8 bg-gray-600 rounded-sm overflow-hidden">
                <div className={`absolute top-0 h-full w-12 bg-gray-400 transition-all duration-500 ease-in-out ${isLocked ? 'left-0' : '-left-12'}`}></div>
                <div className={`absolute top-0 right-0 h-full bg-gradient-to-r from-gray-500 to-gray-400 transition-all duration-500 ease-in-out ${isLocked ? 'w-full' : 'w-0'}`}></div>
            </div>

            <div className="text-xs font-mono uppercase tracking-widest">{isLocked ? "SECURED" : "UNLOCKED"}</div>
        </div>

        {/* Handle */}
        <div className="absolute z-20 left-16 top-1/2 -translate-y-1/2 w-4 h-24 bg-gray-700 rounded-full shadow-md"></div>
    </div>
  );
};
