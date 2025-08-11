// src/components/VitalLabCell/VitalLabCell.tsx
import React, { useState } from 'react';
import { CircularKeypad } from '../CircularKeypad/CircularKeypad';
import { vitalThresholds, labThresholds } from '../../constants/relationships';
import './VitalLabCell.css';

interface VitalLabCellProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'vital' | 'lab';
  itemKey?: string;
  isActive?: boolean;
  onActiveChange?: (active: boolean) => void;
}

export const VitalLabCell: React.FC<VitalLabCellProps> = ({
  value,
  onChange,
  placeholder = '+',
  type = 'vital',
  itemKey = '',
  isActive = false,
  onActiveChange
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
    onActiveChange?.(true);
  };

  const handleValueChange = (newValue: string) => {
    onChange(newValue);
    setShowKeypad(false);
    onActiveChange?.(false);
  };
  
  const handleClose = () => {
    setShowKeypad(false);
    onActiveChange?.(false);
  };
  
  const getNormalRange = (type: 'vital' | 'lab', key: string): string => {
    // Extract the actual field name from key (e.g., "0600-HR" -> "HR")
    const fieldName = key.split('-').pop() || '';
    
    if (type === 'vital') {
      const threshold = vitalThresholds[fieldName];
      if (threshold) {
        if (threshold.min && threshold.max) {
          return `${threshold.min} - ${threshold.max}`;
        } else if (threshold.low && threshold.high) {
          return `${threshold.low} - ${threshold.high}`;
        }
      }
    } else {
      const threshold = labThresholds[fieldName];
      if (threshold) {
        if (threshold.min && threshold.max) {
          return `${threshold.min} - ${threshold.max}`;
        } else if (threshold.low && threshold.high) {
          return `${threshold.low} - ${threshold.high}`;
        } else if (threshold.max) {
          return `< ${threshold.max}`;
        }
      }
    }
    return '';
  };
  
  const isAbnormal = (): boolean => {
    if (!value) return false;
    const fieldName = itemKey.split('-').pop() || '';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return false;
    
    const thresholds = type === 'vital' ? vitalThresholds : labThresholds;
    const threshold = thresholds[fieldName];
    
    if (threshold) {
      if (typeof threshold.min === 'number' && numValue < threshold.min) return true;
      if (typeof threshold.max === 'number' && numValue > threshold.max) return true;
      if (typeof threshold.low === 'number' && numValue < threshold.low) return true;
      if (typeof threshold.high === 'number' && numValue > threshold.high) return true;
      if (typeof threshold.critical_low === 'number' && numValue <= threshold.critical_low) return true;
      if (typeof threshold.critical_high === 'number' && numValue >= threshold.critical_high) return true;
    }
    
    return false;
  };

  return (
    <>
      <button
        className={`vital-lab-cell ${value ? 'has-value' : ''} ${type} ${isAbnormal() ? 'abnormal' : ''}`}
        onClick={handleClick}
        type="button"
        title={value && isAbnormal() ? `Abnormal value - Normal: ${getNormalRange(type, itemKey)}` : ''}
      >
        {value || placeholder}
      </button>
      
      {showKeypad && (
        <CircularKeypad
          isOpen={showKeypad}
          onSubmit={handleValueChange}
          onClose={handleClose}
          position={position}
          label={type === 'vital' ? `Enter ${itemKey || 'Vital'}` : `Enter ${itemKey || 'Lab'}`}
          normalRange={getNormalRange(type, itemKey)}
        />
      )}
    </>
  );
};