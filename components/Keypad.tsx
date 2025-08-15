
import React from 'react';

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onClear: () => void;
  onEnter: () => void;
  disabled: boolean;
}

const KeypadButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}> = ({ onClick, children, className = '', disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      h-16 w-16 rounded-full flex items-center justify-center
      text-2xl font-bold font-mono transition-all duration-150
      bg-base-800 hover:bg-base-700 text-gray-200
      active:transform active:scale-95 active:bg-base-950 active:shadow-inner
      disabled:bg-base-800/50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100
      shadow-md hover:shadow-lg
      ${className}
    `}
  >
    {children}
  </button>
);

export const Keypad: React.FC<KeypadProps> = ({ onKeyPress, onClear, onEnter, disabled }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center">
      {keys.map(key => (
        <KeypadButton key={key} onClick={() => onKeyPress(key)} disabled={disabled}>
          {key}
        </KeypadButton>
      ))}
      <KeypadButton onClick={onClear} disabled={disabled} className="bg-accent-red/30 hover:bg-accent-red/50 text-accent-red active:bg-accent-red/40">
        CLR
      </KeypadButton>
      <KeypadButton onClick={() => onKeyPress('0')} disabled={disabled}>
        0
      </KeypadButton>
      <KeypadButton onClick={onEnter} disabled={disabled} className="bg-accent-green/30 hover:bg-accent-green/50 text-accent-green active:bg-accent-green/40">
        ENT
      </KeypadButton>
    </div>
  );
};