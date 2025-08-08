import React, { useState } from 'react';
import './CircularKeypad.css';

interface CircularKeypadProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  label: string;
  normalRange?: string;
  position?: { x: number; y: number };
}

export const CircularKeypad: React.FC<CircularKeypadProps> = ({
  isOpen,
  onClose,
  onSubmit,
  label,
  normalRange,
  position = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
}) => {
  const [value, setValue] = useState('');

  if (!isOpen) return null;

  const handleNumberClick = (num: string) => {
    setValue(prev => prev + num);
  };

  const handleBackspace = () => {
    setValue(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setValue('');
  };

  const handleSubmit = () => {
    if (value) {
      onSubmit(value);
      setValue('');
      onClose();
    }
  };

  const handleDecimal = () => {
    if (!value.includes('.')) {
      setValue(prev => prev + '.');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="circular-keypad-overlay"
      onClick={handleOverlayClick}
    >
      <div className="simple-keypad" onClick={(e) => e.stopPropagation()}>
        {/* Header with close button */}
        <div className="keypad-header">
          <h3>{label}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Display */}
        <div className="keypad-display">
          <div className="keypad-value">{value || '0'}</div>
          {normalRange && (
            <div className="keypad-range">Normal: {normalRange}</div>
          )}
        </div>

        {/* Number grid */}
        <div className="keypad-grid">
          <button className="keypad-btn" onClick={() => handleNumberClick('7')}>7</button>
          <button className="keypad-btn" onClick={() => handleNumberClick('8')}>8</button>
          <button className="keypad-btn" onClick={() => handleNumberClick('9')}>9</button>
          
          <button className="keypad-btn" onClick={() => handleNumberClick('4')}>4</button>
          <button className="keypad-btn" onClick={() => handleNumberClick('5')}>5</button>
          <button className="keypad-btn" onClick={() => handleNumberClick('6')}>6</button>
          
          <button className="keypad-btn" onClick={() => handleNumberClick('1')}>1</button>
          <button className="keypad-btn" onClick={() => handleNumberClick('2')}>2</button>
          <button className="keypad-btn" onClick={() => handleNumberClick('3')}>3</button>
          
          <button className="keypad-btn" onClick={handleDecimal}>.</button>
          <button className="keypad-btn" onClick={() => handleNumberClick('0')}>0</button>
          <button className="keypad-btn delete" onClick={handleBackspace}>⌫</button>
        </div>

        {/* Action buttons */}
        <div className="keypad-actions">
          <button className="action-btn clear" onClick={handleClear}>Clear</button>
          <button className="action-btn submit" onClick={handleSubmit}>Done</button>
        </div>
      </div>
    </div>
  );
};