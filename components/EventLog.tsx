
import React from 'react';
import type { EventLogEntry } from '../types';

interface EventLogProps {
  logs: EventLogEntry[];
}

export const EventLog: React.FC<EventLogProps> = ({ logs }) => {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

  return (
    <div className="h-40 bg-base-950 p-4 rounded-lg border border-base-800">
      <h3 className="text-sm font-semibold text-gray-400 mb-2 border-b border-base-700 pb-1">Event Log</h3>
      <ul className="space-y-1 text-sm font-mono text-gray-400 overflow-y-auto h-[calc(100%-2rem)]">
        {logs.length === 0 && <li className="italic text-gray-500">System standby...</li>}
        {logs.map((log, index) => (
          <li key={index} className="flex justify-between items-center opacity-100 animate-fade-in">
            <span className={`truncate ${log.message.includes('Granted') ? 'text-accent-green' : log.message.includes('Denied') ? 'text-accent-red' : ''}`}>
              {log.message}
            </span>
            <span className="text-gray-500 flex-shrink-0 ml-2">{formatTime(log.timestamp)}</span>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
