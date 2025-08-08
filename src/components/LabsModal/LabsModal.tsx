import React, { useState, useEffect } from 'react';
import { X, TestTube, AlertTriangle } from 'lucide-react';
import { vitalsCategories } from '../../constants/vitals';
import { isLabAbnormal } from '../../utils/helpers';
import { LabSection } from '../../types';
import './LabsModal.css';

interface LabsModalProps {
  isOpen: boolean;
  onClose: () => void;
  labs: Record<string, string>;
  onSave: (labs: Record<string, string>) => void;
}

export const LabsModal: React.FC<LabsModalProps> = ({
  isOpen,
  onClose,
  labs,
  onSave
}) => {
  const [labsData, setLabsData] = useState<Record<string, string>>({});
  const [activeField, setActiveField] = useState<string | null>(null);
  const [currentValue, setCurrentValue] = useState<string>('');

  useEffect(() => {
    setLabsData(labs);
  }, [labs]);

  const handleNumberClick = (num: string) => {
    if (!activeField) return;
    
    if (num === '.') {
      if (!currentValue.includes('.')) {
        setCurrentValue(currentValue + num);
      }
    } else {
      setCurrentValue(currentValue + num);
    }
  };

  const handleBackspace = () => {
    if (!activeField) return;
    setCurrentValue(currentValue.slice(0, -1));
  };

  const handleClear = () => {
    setCurrentValue('');
  };

  const handleFieldClick = (section: string, item: string) => {
    const key = `${section}-${item}`;
    setActiveField(key);
    setCurrentValue(labsData[key] || '');
  };

  const handleEnter = () => {
    if (activeField && currentValue) {
      setLabsData({ ...labsData, [activeField]: currentValue });
      setCurrentValue('');
      setActiveField(null);
    }
  };

  const handleSubmit = () => {
    if (activeField && currentValue) {
      handleEnter();
    }
    onSave(labsData);
    onClose();
  };

  const handleClearAll = () => {
    setLabsData({});
    setCurrentValue('');
    setActiveField(null);
  };

  if (!isOpen) return null;

  const labSections = vitalsCategories.labs?.sections || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="labs-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <TestTube size={20} />
            Enter Laboratory Results
          </h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="labs-grid-container">
            {Object.entries(labSections).map(([sectionKey, section]) => {
              const labSection = section as LabSection;
              return (
                <div key={sectionKey} className="lab-section-column">
                  <h4>{labSection.title}</h4>
                  <div className="lab-items">
                    {Object.entries(labSection.items).map(([itemKey, item]) => {
                      const key = `${sectionKey}-${itemKey}`;
                      const value = activeField === key ? currentValue : (labsData[key] || '');
                      const isAbnormal = value ? isLabAbnormal(itemKey, value, item.normal) : false;
                      const isActive = activeField === key;
                      
                      return (
                        <div 
                          key={itemKey} 
                          className={`lab-item ${isActive ? 'active' : ''} ${isAbnormal ? 'abnormal' : ''}`}
                          onClick={() => handleFieldClick(sectionKey, itemKey)}
                        >
                          <span className="lab-label">{itemKey}</span>
                          <div className="lab-value-container">
                            <span className="lab-value">{value || '--'}</span>
                            <span className="lab-unit">{item.unit}</span>
                            {isAbnormal && <AlertTriangle size={14} className="abnormal-icon" />}
                          </div>
                          <span className="lab-normal">{item.normal}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="number-keypad">
            <div className="keypad-display">
              <span className="keypad-label">{activeField ? activeField.split('-').pop() : 'Select a lab'}</span>
              <span className="keypad-value">{currentValue || '0'}</span>
            </div>
            <div className="keypad-buttons">
              <button onClick={() => handleNumberClick('7')}>7</button>
              <button onClick={() => handleNumberClick('8')}>8</button>
              <button onClick={() => handleNumberClick('9')}>9</button>
              <button onClick={handleBackspace} className="keypad-backspace">←</button>
              
              <button onClick={() => handleNumberClick('4')}>4</button>
              <button onClick={() => handleNumberClick('5')}>5</button>
              <button onClick={() => handleNumberClick('6')}>6</button>
              <button onClick={handleClear} className="keypad-clear">C</button>
              
              <button onClick={() => handleNumberClick('1')}>1</button>
              <button onClick={() => handleNumberClick('2')}>2</button>
              <button onClick={() => handleNumberClick('3')}>3</button>
              <button onClick={() => handleNumberClick('.')}>.</button>
              
              <button onClick={() => handleNumberClick('0')} className="keypad-zero">0</button>
              <button onClick={handleEnter} className="keypad-enter">Enter</button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleClearAll}>
            Clear All
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            Save Labs
          </button>
        </div>
      </div>
    </div>
  );
};