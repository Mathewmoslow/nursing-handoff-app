// src/components/QuickInputModal/QuickInputModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';
import './QuickInputModal.css';

interface QuickInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  inputType: 'text' | 'number' | 'rate';
  min?: number;
  max?: number;
  onSubmit: (value: string) => void;
}

export const QuickInputModal: React.FC<QuickInputModalProps> = ({
  isOpen,
  onClose,
  title,
  inputType,
  min,
  max,
  onSubmit
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="quick-input-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            ref={inputRef}
            type={inputType === 'rate' ? 'text' : inputType}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={inputType === 'rate' ? 'e.g., 125 mL/hr' : 'Enter value...'}
            min={min}
            max={max}
            className="modal-input"
          />
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              <Check size={16} />
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};