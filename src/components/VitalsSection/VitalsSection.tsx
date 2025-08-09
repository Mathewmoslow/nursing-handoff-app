// src/components/VitalsSection/VitalsSection.tsx
import React from 'react';
import { Activity } from 'lucide-react';
import { Patient } from '../../types';
import { VitalLabCell } from '../VitalLabCell/VitalLabCell';
import './VitalsSection.css';

interface VitalsSectionProps {
  patient: Patient;
  onPatientUpdate: (patient: Patient) => void;
}

export const VitalsSection: React.FC<VitalsSectionProps> = ({
  patient,
  onPatientUpdate
}) => {
  const [activeKeypad, setActiveKeypad] = React.useState<string | null>(null);
  const handleVitalChange = (key: string, value: string) => {
    onPatientUpdate({
      ...patient,
      vitals: {
        ...patient.vitals,
        [key]: value
      }
    });
  };

  const vitalFields = [
    { key: 'HR', label: 'HR', unit: 'bpm' },
    { key: 'BP', label: 'BP', unit: 'mmHg' },
    { key: 'RR', label: 'RR', unit: '/min' },
    { key: 'O2', label: 'O2', unit: '%' },
    { key: 'Temp', label: 'Temp', unit: '°F' }
  ];

  const timeSlots = ['0600', '0800', '1000', '1200', '1400', '1600', '1800', '2000'];

  return (
    <div className={`vitals-section ${activeKeypad ? 'keypad-active' : ''}`}>
      <div className="section-header">
        <Activity size={16} />
        <h3>Vitals</h3>
      </div>
      <div className="vitals-grid-horizontal">
        <table className="vitals-table">
          <thead>
            <tr>
              <th className="time-header">Time</th>
              {vitalFields.map(field => (
                <th key={field.key} className="vital-header">
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(time => (
              <tr key={time}>
                <td className="time-cell">{time}</td>
                {vitalFields.map(field => {
                  const cellKey = `${time}-${field.key}`;
                  return (
                    <td key={cellKey} className="vital-cell">
                      <VitalLabCell
                        value={patient.vitals[cellKey] || ''}
                        onChange={(value) => handleVitalChange(cellKey, value)}
                        type="vital"
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