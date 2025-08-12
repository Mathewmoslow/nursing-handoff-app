// src/components/PatientTabs/PatientTabs.tsx
import React from 'react';
import { Plus, X, Moon, Sun, Network, Printer, Download, Trash2, Palette, AlertCircle } from 'lucide-react';
import { Patient } from '../../types';
import './PatientTabs.css';

interface PatientTabsProps {
  patients: Patient[];
  activePatient: number;
  darkMode: boolean;
  onPatientChange: (index: number) => void;
  onAddPatient: () => void;
  onRemovePatient: (index: number) => void;
  onToggleDarkMode: () => void;
  onShowNeuralMap: () => void;
  onPrint: () => void;
  onExport: () => void;
  onClearStorage?: () => void;
  onShowButtonStudio?: () => void;
  onPatientUpdate?: (patient: Patient) => void;
}

export const PatientTabs: React.FC<PatientTabsProps> = ({
  patients,
  activePatient,
  darkMode,
  onPatientChange,
  onAddPatient,
  onRemovePatient,
  onToggleDarkMode,
  onShowNeuralMap,
  onPrint,
  onExport,
  onClearStorage,
  onShowButtonStudio,
  onPatientUpdate
}) => {
  const currentPatient = patients[activePatient];
  
  return (
    <div className="patient-tabs-container">
      <div className="tabs-section">
        {patients.map((patient, index) => (
          <div
            key={patient.id}
            className={`patient-tab ${activePatient === index ? 'active' : ''}`}
            onClick={() => onPatientChange(index)}
          >
            <div className="tab-content">
              <span className="tab-room">{patient.room}</span>
              <span className="tab-name">{patient.name}</span>
              {/* Show expanded info for active tab */}
              {activePatient === index && (
                <div className="tab-patient-info">
                  <span className="tab-age">{patient.age || '—'}</span>
                  <span className={`tab-code ${patient.code === 'DNR' || patient.code === 'DNI' ? 'dnr' : ''}`}>
                    {patient.code}
                  </span>
                  <span className="tab-allergies">
                    <AlertCircle size={12} />
                    {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'NKDA'}
                  </span>
                </div>
              )}
            </div>
            {patients.length > 1 && (
              <button
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemovePatient(index);
                }}
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
        <button className="add-patient-tab" onClick={onAddPatient}>
          <Plus size={16} />
        </button>
      </div>

      <div className="tabs-actions">
        <button 
          className="action-btn"
          onClick={onShowNeuralMap}
          title="Neural Map"
        >
          <Network size={16} />
        </button>
        <button 
          className="action-btn"
          onClick={onPrint}
          title="Print"
        >
          <Printer size={16} />
        </button>
        <button 
          className="action-btn"
          onClick={onExport}
          title="Export"
        >
          <Download size={16} />
        </button>
        <button 
          className="action-btn"
          onClick={onToggleDarkMode}
          title="Toggle theme"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        {onShowButtonStudio && (
          <button 
            className="action-btn"
            onClick={onShowButtonStudio}
            title="Button Studio"
          >
            <Palette size={16} />
          </button>
        )}
        {onClearStorage && (
          <button 
            className="action-btn danger"
            onClick={() => {
              if (window.confirm('⚠️ End of Day Cleaning\n\nThis will clear ALL stored data including:\n• All patient information\n• All selections\n• All notes\n\nAre you absolutely sure?')) {
                onClearStorage();
              }
            }}
            title="Clear All Data (End of Day)"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};