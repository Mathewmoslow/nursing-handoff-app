import React, { useState, useEffect } from 'react';
import { X, Activity, FileText, AlertTriangle } from 'lucide-react';
import { vitalsCategories } from '../../constants/vitals';
import { isVitalAbnormal } from '../../utils/helpers';
import { VitalConfig } from '../../types';
import './VitalsModal.css';

interface VitalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vitals: Record<string, string>;
  notes: string;
  onSave: (vitals: Record<string, string>, notes: string) => void;
}

export const VitalsModal: React.FC<VitalsModalProps> = ({
  isOpen,
  onClose,
  vitals,
  notes,
  onSave
}) => {
  const [vitalsData, setVitalsData] = useState<Record<string, string>>({});
  const [vitalsNotes, setVitalsNotes] = useState('');

  useEffect(() => {
    setVitalsData(vitals);
    setVitalsNotes(notes);
  }, [vitals, notes]);

  const handleVitalChange = (item: string, value: string) => {
    setVitalsData({ ...vitalsData, [item]: value });
  };

  const handleSubmit = () => {
    onSave(vitalsData, vitalsNotes);
    onClose();
  };

  const handleClearAll = () => {
    setVitalsData({});
    setVitalsNotes('');
  };

  if (!isOpen) return null;

  const vitalItems = vitalsCategories.vitals.items || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="vitals-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <Activity size={20} />
            Enter Vital Signs
          </h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          {/* Vitals Grid */}
          <div className="vitals-section">
            <div className="vitals-grid">
              {Object.entries(vitalItems).map(([item, config]) => {
                const value = vitalsData[item] || '';
                  const vitalConfig = config as VitalConfig; // Type assertion
                const isAbnormal = value ? isVitalAbnormal(item, value) : false;
                
                return (
                <div key={item} className="vital-input-group">
                  <label>
                    {item}
                    <span className="normal-range">{vitalConfig.normal}</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder={vitalConfig.format || vitalConfig.normal}
                      value={value}
                      onChange={(e) => handleVitalChange(item, e.target.value)}
                      className={`${value ? 'has-value' : ''} ${isAbnormal ? 'abnormal' : ''}`}
                    />
                    <span className="unit">{vitalConfig.unit}</span>
                    {isAbnormal && (
                      <div className="abnormal-indicator">
                        <AlertTriangle size={14} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          {/* Notes Section */}
          <div className="notes-section">
            <h3>
              <FileText size={16} />
              Additional Notes
            </h3>
            <textarea
              className="notes-input"
              placeholder="Enter any additional vital signs or relevant notes..."
              value={vitalsNotes}
              onChange={(e) => setVitalsNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleClearAll}>
            Clear All
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            Save Vitals
          </button>
        </div>
      </div>
    </div>
  );
};