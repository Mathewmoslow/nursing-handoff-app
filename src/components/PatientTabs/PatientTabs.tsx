// src/components/PatientTabs/PatientTabs.tsx
import React, { useState } from 'react';
import { Plus, X, Moon, Sun, Network, Printer, Download, Trash2, Palette, AlertCircle, Edit2, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { Patient } from '../../types';
import { AllergiesAutocomplete } from '../AllergiesAutocomplete/AllergiesAutocomplete';
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
  const [expandedTab, setExpandedTab] = useState<number | null>(null);
  const [editingPatient, setEditingPatient] = useState<number | null>(null);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);

  const handleTabClick = (index: number) => {
    if (expandedTab === index) {
      setExpandedTab(null);
      setEditingPatient(null);
    } else {
      onPatientChange(index);
      setExpandedTab(index);
    }
  };

  const handleEditClick = (patient: Patient, index: number) => {
    setEditingPatient(index);
    setEditedPatient({ ...patient });
  };

  const handleSaveEdit = () => {
    if (editedPatient && editingPatient !== null && onPatientUpdate) {
      onPatientUpdate(editedPatient);
      setEditingPatient(null);
      setEditedPatient(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingPatient(null);
    setEditedPatient(null);
  };

  const getCodeStatusIndicator = (code: string) => {
    if (code === 'Full Code') {
      return 'full-code';
    } else if (code === 'DNR' || code === 'DNI') {
      return 'dnr';
    } else {
      return 'mixed-code';
    }
  };

  const hasAllergies = (allergies: string[]) => {
    return allergies.length > 0 && !allergies.includes('NKDA');
  };

  return (
    <div className="patient-tabs-container">
      <div className="tabs-section">
        {patients.map((patient, index) => {
          const isExpanded = expandedTab === index;
          const isEditing = editingPatient === index;
          const currentPatient = isEditing ? editedPatient! : patient;
          
          return (
            <div
              key={patient.id}
              className={`patient-tab-wrapper ${isExpanded ? 'expanded' : ''} ${activePatient === index ? 'active' : ''}`}
            >
              <div 
                className={`patient-tab ${activePatient === index ? 'active' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                <span className="tab-room">{patient.room || '—'}</span>
                
                {/* Status indicators */}
                <div className="tab-indicators">
                  <span 
                    className={`code-indicator ${getCodeStatusIndicator(patient.code)}`}
                    title={patient.code}
                  />
                  <span 
                    className={`allergy-indicator ${hasAllergies(patient.allergies) ? 'has-allergies' : 'no-allergies'}`}
                    title={hasAllergies(patient.allergies) ? patient.allergies.join(', ') : 'NKDA'}
                  />
                </div>
                
                <span className="tab-toggle">
                  {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </span>
              </div>
              
              {/* Expanded drawer */}
              {isExpanded && (
                <div className="patient-drawer">
                  <div className="drawer-content">
                    <div className="drawer-header">
                      <h3>Patient Information</h3>
                      <div className="drawer-actions">
                        {!isEditing ? (
                          <button 
                            className="edit-btn"
                            onClick={() => handleEditClick(patient, index)}
                          >
                            <Edit2 size={14} />
                          </button>
                        ) : (
                          <>
                            <button 
                              className="save-btn"
                              onClick={handleSaveEdit}
                            >
                              <Save size={14} />
                            </button>
                            <button 
                              className="cancel-btn"
                              onClick={handleCancelEdit}
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}
                        {patients.length > 1 && (
                          <button
                            className="delete-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedTab(null);
                              onRemovePatient(index);
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="drawer-info">
                      <div className="info-row">
                        <label>Name:</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentPatient.name}
                            onChange={(e) => setEditedPatient({ ...currentPatient, name: e.target.value })}
                            className="edit-input"
                          />
                        ) : (
                          <span>{patient.name || 'Not set'}</span>
                        )}
                      </div>
                      
                      <div className="info-row">
                        <label>Room:</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentPatient.room}
                            onChange={(e) => setEditedPatient({ ...currentPatient, room: e.target.value })}
                            className="edit-input small"
                          />
                        ) : (
                          <span>{patient.room || '—'}</span>
                        )}
                      </div>
                      
                      <div className="info-row">
                        <label>Age:</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentPatient.age}
                            onChange={(e) => setEditedPatient({ ...currentPatient, age: e.target.value })}
                            className="edit-input small"
                          />
                        ) : (
                          <span>{patient.age || '—'}</span>
                        )}
                      </div>
                      
                      <div className="info-row">
                        <label>Code Status:</label>
                        {isEditing ? (
                          <select
                            value={currentPatient.code}
                            onChange={(e) => setEditedPatient({ ...currentPatient, code: e.target.value })}
                            className="edit-select"
                          >
                            <option value="Full Code">Full Code</option>
                            <option value="DNR">DNR</option>
                            <option value="DNI">DNI</option>
                            <option value="Comfort Care">Comfort Care</option>
                          </select>
                        ) : (
                          <span className={`code-value ${patient.code === 'DNR' || patient.code === 'DNI' ? 'dnr' : ''}`}>
                            {patient.code}
                          </span>
                        )}
                      </div>
                      
                      <div className="info-row">
                        <label>Attending:</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentPatient.provider || ''}
                            onChange={(e) => setEditedPatient({ ...currentPatient, provider: e.target.value })}
                            className="edit-input"
                          />
                        ) : (
                          <span>{patient.provider || 'Not assigned'}</span>
                        )}
                      </div>
                      
                      <div className="info-row allergies-row">
                        <label>
                          <AlertCircle size={14} />
                          Allergies:
                        </label>
                        {isEditing ? (
                          <AllergiesAutocomplete
                            allergies={currentPatient.allergies}
                            onChange={(allergies) => setEditedPatient({ ...currentPatient, allergies })}
                          />
                        ) : (
                          <span className={`allergy-value ${!hasAllergies(patient.allergies) ? 'nkda' : 'has-allergies'}`}>
                            {hasAllergies(patient.allergies) ? patient.allergies.join(', ') : 'NKDA'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
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