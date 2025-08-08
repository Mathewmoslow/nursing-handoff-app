// src/components/VitalLabCell/VitalLabCell.tsx
import React, { useState } from 'react';
import { CircularKeypad } from '../CircularKeypad/CircularKeypad';
import './VitalLabCell.css';

interface VitalLabCellProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'vital' | 'lab';
}

export const VitalLabCell: React.FC<VitalLabCellProps> = ({
  value,
  onChange,
  placeholder = '+',
  type = 'vital'
}) => {
  const [showKeypad, setShowKeypad] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setShowKeypad(true);
  };

  const handleValueChange = (newValue: string) => {
    onChange(newValue);
    setShowKeypad(false);
  };

  return (
    <>
      <button
        className={`vital-lab-cell ${value ? 'has-value' : ''} ${type}`}
        onClick={handleClick}
        type="button"
      >
        {value || placeholder}
      </button>
      
      {showKeypad && (
        <CircularKeypad
          isOpen={showKeypad}
          onSubmit={handleValueChange}
          onClose={() => setShowKeypad(false)}
          position={position}
          label={type === 'vital' ? 'Enter Vital' : 'Enter Lab'}
        />
      )}
    </>
  );
};