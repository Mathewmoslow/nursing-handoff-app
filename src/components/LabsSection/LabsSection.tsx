// src/components/LabsSection/LabsSection.tsx
import React from 'react';
import { TestTube } from 'lucide-react';
import { Patient } from '../../types';
import { VitalLabCell } from '../VitalLabCell/VitalLabCell';
import './LabsSection.css';

interface LabsSectionProps {
  patient: Patient;
  onPatientUpdate: (patient: Patient) => void;
}

export const LabsSection: React.FC<LabsSectionProps> = ({
  patient,
  onPatientUpdate
}) => {
  const [activeKeypad, setActiveKeypad] = React.useState<string | null>(null);
  const handleLabChange = (key: string, value: string) => {
    onPatientUpdate({
      ...patient,
      labs: {
        ...patient.labs,
        [key]: value
      }
    });
  };

  const labFields = [
    { key: 'Na', label: 'Na', unit: 'mEq/L' },
    { key: 'K', label: 'K', unit: 'mEq/L' },
    { key: 'Cr', label: 'Cr', unit: 'mg/dL' },
    { key: 'Hgb', label: 'Hgb', unit: 'g/dL' },
    { key: 'WBC', label: 'WBC', unit: 'K/μL' },
    { key: 'Plt', label: 'Plt', unit: 'K/μL' }
  ];

  const timeSlots = ['AM', 'PM'];

  return (
    <div className={`labs-section ${activeKeypad ? 'keypad-active' : ''}`}>
      <div className="section-header">
        <TestTube size={16} />
        <h3>Labs</h3>
      </div>
      <div className="labs-grid-horizontal">
        <table className="labs-table">
          <thead>
            <tr>
              <th className="time-header">Time</th>
              {labFields.map(field => (
                <th key={field.key} className="lab-header">
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(time => (
              <tr key={time}>
                <td className="time-cell">{time}</td>
                {labFields.map(field => {
                  const cellKey = `${time}-${field.key}`;
                  return (
                    <td key={cellKey} className="lab-cell">
                      <VitalLabCell
                        value={patient.labs[cellKey] || ''}
                        onChange={(value) => handleLabChange(cellKey, value)}
                        type="lab"
                        itemKey={cellKey}
                        isActive={activeKeypad === cellKey}
                        onActiveChange={(active) => setActiveKeypad(active ? cellKey : null)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};