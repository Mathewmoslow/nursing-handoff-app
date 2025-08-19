import React, { useState } from 'react';
import { StickyNote, ChevronRight, X } from 'lucide-react';
import { SecondaryOption } from '../../constants/enhancedRelationships';
import './ButtonWithNote.css';

interface ButtonWithNoteProps {
  label: string;
  icon?: React.ElementType;
  selected: boolean;
  hasNote: boolean;
  hasSecondaryOptions: boolean;
  onClick: () => void;
  onNoteClick: () => void;
  onSecondaryClick?: () => void;
  color?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

export const ButtonWithNote: React.FC<ButtonWithNoteProps> = ({
  label,
  icon: Icon,
  selected,
  hasNote,
  hasSecondaryOptions,
  onClick,
  onNoteClick,
  onSecondaryClick,
  color = '#6366f1',
  priority
}) => {
  const [showNoteIcon, setShowNoteIcon] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleNoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNoteClick();
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSecondaryClick) {
      onSecondaryClick();
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return color;
    }
  };

  return (
    <div 
      className={`button-with-note ${selected ? 'selected' : ''} ${priority ? `priority-${priority}` : ''}`}
      onMouseEnter={() => setShowNoteIcon(true)}
      onMouseLeave={() => setShowNoteIcon(false)}
      style={{
        borderColor: selected ? getPriorityColor() : 'transparent',
        backgroundColor: selected ? `${getPriorityColor()}15` : 'transparent'
      }}
    >
      <button
        className="main-button"
        onClick={handleButtonClick}
        style={{
          color: selected ? getPriorityColor() : '#6b7280'
        }}
      >
        {Icon && <Icon className="button-icon" size={18} />}
        <span className="button-label">{label}</span>
      </button>

      {/* Note indicator/button - always visible when note exists, on hover when not */}
      {(hasNote || showNoteIcon || selected) && (
        <button
          className={`note-button ${hasNote ? 'has-note' : ''}`}
          onClick={handleNoteClick}
          title={hasNote ? 'Edit note' : 'Add note'}
          style={{
            color: hasNote ? '#f59e0b' : '#9ca3af'
          }}
        >
          <StickyNote size={14} fill={hasNote ? '#f59e0b' : 'none'} />
        </button>
      )}

      {/* Secondary options indicator - for buttons that need more details */}
      {hasSecondaryOptions && selected && (
        <button
          className="secondary-button"
          onClick={handleSecondaryClick}
          title="Additional options"
          style={{
            color: '#6366f1'
          }}
        >
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
};

// Secondary Options Modal Component
interface SecondaryOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonLabel: string;
  options: SecondaryOption[];
  values: Record<string, any>;
  onSave: (values: Record<string, any>) => void;
}

export const SecondaryOptionsModal: React.FC<SecondaryOptionsModalProps> = ({
  isOpen,
  onClose,
  buttonLabel,
  options,
  values,
  onSave
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>(values);

  if (!isOpen) return null;

  const handleChange = (label: string, value: any, type: string) => {
    if (type === 'multiselect') {
      const current = formValues[label] || [];
      if (current.includes(value)) {
        setFormValues({
          ...formValues,
          [label]: current.filter((v: string) => v !== value)
        });
      } else {
        setFormValues({
          ...formValues,
          [label]: [...current, value]
        });
      }
    } else {
      setFormValues({
        ...formValues,
        [label]: value
      });
    }
  };

  const handleSave = () => {
    onSave(formValues);
    onClose();
  };

  const renderField = (option: SecondaryOption) => {
    const value = formValues[option.label] || (option.type === 'multiselect' ? [] : '');

    switch (option.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleChange(option.label, e.target.value, option.type)}
            className="form-select"
            required={option.required}
          >
            <option value="">Select...</option>
            {option.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="multiselect-group">
            {option.options?.map(opt => (
              <label key={opt} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={value.includes(opt)}
                  onChange={() => handleChange(option.label, opt, option.type)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );

      case 'number':
        return (
          <div className="number-input-group">
            <input
              type="number"
              value={value}
              onChange={(e) => handleChange(option.label, e.target.value, option.type)}
              min={option.min}
              max={option.max}
              className="form-input"
              required={option.required}
            />
            {option.unit && <span className="unit-label">{option.unit}</span>}
          </div>
        );

      case 'scale':
        return (
          <div className="scale-input">
            <input
              type="range"
              value={value || option.min || 0}
              onChange={(e) => handleChange(option.label, e.target.value, option.type)}
              min={option.min}
              max={option.max}
              className="scale-slider"
            />
            <span className="scale-value">{value || option.min || 0}</span>
          </div>
        );

      case 'text':
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(option.label, e.target.value, option.type)}
            className="form-input"
            required={option.required}
          />
        );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content secondary-options-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{buttonLabel} - Additional Details</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {options.map(option => (
            <div key={option.label} className="form-group">
              <label className="form-label">
                {option.label}
                {option.required && <span className="required">*</span>}
              </label>
              {renderField(option)}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSave}>
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
};