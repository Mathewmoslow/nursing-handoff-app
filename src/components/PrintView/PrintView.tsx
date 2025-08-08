// src/components/PrintView/PrintView.tsx
import React, { useEffect } from 'react';
import { Patient, SelectedItem } from '../../types';
import './PrintView.css';

interface PrintViewProps {
  patient: Patient;
  selectedItems: Record<string, SelectedItem>;
  onClose: () => void;
}

export const PrintView: React.FC<PrintViewProps> = ({
  patient,
  selectedItems,
  onClose
}) => {
  useEffect(() => {
    window.print();
    const handleAfterPrint = () => {
      onClose();
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [onClose]);

  // Group selections by category and section
  const groupedSelections: Record<string, Record<string, string[]>> = {};
  
  Object.entries(selectedItems).forEach(([key, item]) => {
    const [category, section, itemName] = key.split('-');
    if (!groupedSelections[category]) {
      groupedSelections[category] = {};
    }
    if (!groupedSelections[category][section]) {
      groupedSelections[category][section] = [];
    }
    groupedSelections[category][section].push(itemName);
  });

  return (
    <div className="print-view">
      <div className="print-header">
        <h1>SBAR Nursing Handoff Report</h1>
        <div className="print-date">
          {new Date().toLocaleString()}
        </div>
      </div>

      <div className="print-patient-info">
        <div className="info-row">
          <span className="label">Patient:</span>
          <span className="value">{patient.name}</span>
          <span className="label">Room:</span>
          <span className="value">{patient.room}</span>
          <span className="label">MRN:</span>
          <span className="value">{patient.mrn || 'N/A'}</span>
        </div>
        <div className="info-row">
          <span className="label">Age:</span>
          <span className="value">{patient.age || 'N/A'}</span>
          <span className="label">DOB:</span>
          <span className="value">{patient.dob || 'N/A'}</span>
          <span className="label">Code Status:</span>
          <span className="value code-status">{patient.code}</span>
        </div>
        <div className="info-row">
          <span className="label">Attending:</span>
          <span className="value">{patient.provider || 'N/A'}</span>
          <span className="label">Allergies:</span>
          <span className="value allergies">
            {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'NKDA'}
          </span>
        </div>
      </div>

      <div className="print-sections">
        {Object.entries(groupedSelections).map(([category, sections]) => (
          <div key={category} className="print-category">
            <h3>{category.toUpperCase()}</h3>
            {Object.entries(sections).map(([section, items]) => (
              <div key={section} className="print-section">
                <h4>{section}</h4>
                <p>{items.join(', ')}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {patient.vitals && Object.keys(patient.vitals).length > 0 && (
        <div className="print-vitals">
          <h3>VITAL SIGNS</h3>
          <div className="vitals-grid">
            {Object.entries(patient.vitals).map(([key, value]) => (
              <div key={key} className="vital-item">
                <span className="vital-label">{key}:</span>
                <span className="vital-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {patient.labs && Object.keys(patient.labs).length > 0 && (
        <div className="print-labs">
          <h3>LAB RESULTS</h3>
          <div className="labs-grid">
            {Object.entries(patient.labs).map(([key, value]) => (
              <div key={key} className="lab-item">
                <span className="lab-label">{key}:</span>
                <span className="lab-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {patient.notes && (
        <div className="print-notes">
          <h3>NOTES</h3>
          <p>{patient.notes}</p>
        </div>
      )}

      <div className="print-footer">
        <div className="signature-line">
          <span>Nurse Signature: _______________________</span>
          <span>Date/Time: _______________________</span>
        </div>
      </div>
    </div>
  );
};
