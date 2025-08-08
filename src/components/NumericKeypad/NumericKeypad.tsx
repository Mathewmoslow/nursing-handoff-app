import React from 'react';
import './NumericKeypad.css';

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClose?: () => void;
  label?: string;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  value,
  onChange,
  onSubmit,
  onClose,
  label
}) => {
  const handleNumber = (num: string) => {
    onChange(value + num);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange('');
  };

  const handleDecimal = () => {
    if (!value.includes('.')) {
      onChange(value + '.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    } else if (e.key === 'Backspace') {
      handleBackspace();
    } else if (e.key === 'Escape' && onClose) {
      onClose();
    } else if (e.key >= '0' && e.key <= '9') {
      handleNumber(e.key);
    } else if (e.key === '.') {
      handleDecimal();
    }
  };

  return (
    <div className="numeric-keypad" onKeyDown={handleKeyPress} tabIndex={0}>
      <div className="keypad-display">
        <span className="keypad-label">{label || 'Enter value'}</span>
        <span className="keypad-value">{value || '0'}</span>
      </div>
      
      <div className="keypad-grid">
        <button type="button" onClick={() => handleNumber('7')} className="keypad-btn">7</button>
        <button type="button" onClick={() => handleNumber('8')} className="keypad-btn">8</button>
        <button type="button" onClick={() => handleNumber('9')} className="keypad-btn">9</button>
        <button type="button" onClick={handleBackspace} className="keypad-btn backspace">⌫</button>
        
        <button type="button" onClick={() => handleNumber('4')} className="keypad-btn">4</button>
        <button type="button" onClick={() => handleNumber('5')} className="keypad-btn">5</button>
        <button type="button" onClick={() => handleNumber('6')} className="keypad-btn">6</button>
        <button type="button" onClick={handleClear} className="keypad-btn clear">C</button>
        
        <button type="button" onClick={() => handleNumber('1')} className="keypad-btn">1</button>
        <button type="button" onClick={() => handleNumber('2')} className="keypad-btn">2</button>
        <button type="button" onClick={() => handleNumber('3')} className="keypad-btn">3</button>
        <button type="button" onClick={handleDecimal} className="keypad-btn decimal">.</button>
        
        <button type="button" onClick={() => handleNumber('0')} className="keypad-btn zero">0</button>
        <button type="button" onClick={onSubmit} className="keypad-btn enter">Enter</button>
      </div>
      
      {onClose && (
        <button type="button" onClick={onClose} className="keypad-close">
          Cancel
        </button>
      )}
    </div>
  );
};