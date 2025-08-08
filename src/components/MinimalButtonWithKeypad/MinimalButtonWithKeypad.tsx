import React, { useState } from 'react';
import { FormButton, Patient } from '../../types';
import { CircularKeypad } from '../CircularKeypad/CircularKeypad';
import { vitalThresholds, labThresholds } from '../../constants/relationships';
import './MinimalButtonWithKeypad.css';

interface MinimalButtonWithKeypadProps {
  button: FormButton;
  value?: string;
  color: string;
  patient: Patient;
  onValueUpdate: (value: string) => void;
}

export const MinimalButtonWithKeypad: React.FC<MinimalButtonWithKeypadProps> = ({
  button,
  value,
  color,
  patient,
  onValueUpdate
}) => {
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadPosition, setKeypadPosition] = useState({ x: 0, y: 0 });
  const Icon = button.icon;

  const getNormalRange = () => {
    if (button.category === 'vitals') {
      const threshold = vitalThresholds[button.mainButton];
      if (threshold) {
        if ('min' in threshold && 'max' in threshold) {
          return `${threshold.min}-${threshold.max}`;
        } else if ('low' in threshold && 'high' in threshold) {
          return `${threshold.low}-${threshold.high}`;
        }
      }
    } else if (button.category === 'labs') {
      const threshold = labThresholds[button.mainButton];
      if (threshold) {
        if ('min' in threshold && 'max' in threshold) {
          return `${threshold.min}-${threshold.max}`;
        } else if ('low' in threshold && 'high' in threshold) {
          return `${threshold.low}-${threshold.high}`;
        }
      }
    }
    return '';
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setKeypadPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setShowKeypad(true);
  };

  const handleSubmit = (newValue: string) => {
    onValueUpdate(newValue);
    setShowKeypad(false);
  };

  const isAbnormal = () => {
    if (!value) return false;
    
    if (button.category === 'vitals') {
      const threshold = vitalThresholds[button.mainButton];
      if (threshold) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          if ('low' in threshold && 'high' in threshold && threshold.low !== undefined && threshold.high !== undefined) {
            return numValue < threshold.low || numValue > threshold.high;
          }
        }
      }
    } else if (button.category === 'labs') {
      const threshold = labThresholds[button.mainButton];
      if (threshold) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          if ('low' in threshold && 'high' in threshold && threshold.low !== undefined && threshold.high !== undefined) {
            return numValue < threshold.low || numValue > threshold.high;
          }
        }
      }
    }
    return false;
  };

  const hasValue = !!value;
  const abnormal = isAbnormal();

  return (
    <>
      <button
        className={`minimal-button-keypad ${hasValue ? 'has-value' : ''} ${abnormal ? 'abnormal' : ''}`}
        onClick={handleClick}
        style={{
          borderColor: abnormal ? '#ef4444' : hasValue ? color : 'transparent',
          backgroundColor: abnormal ? '#fee2e2' : hasValue ? `${color}20` : 'transparent'
        }}
        title={button.mainButton}
      >
        <Icon size={20} />
        <span className="button-label">{button.mainButton}</span>
        {hasValue && (
          <span className={`value-display ${abnormal ? 'abnormal' : ''}`}>
            {value}
          </span>
        )}
      </button>

      <CircularKeypad
        isOpen={showKeypad}
        onClose={() => setShowKeypad(false)}
        onSubmit={handleSubmit}
        label={button.mainButton}
        normalRange={getNormalRange()}
        position={keypadPosition}
      />
    </>
  );
};