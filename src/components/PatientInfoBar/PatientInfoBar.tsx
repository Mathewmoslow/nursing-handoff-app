// src/components/PatientInfoBar/PatientInfoBar.tsx
import React, { useState } from 'react';
import { Edit2, Save, X, AlertCircle, User } from 'lucide-react';
import { Patient } from '../../types';
import { AllergiesAutocomplete } from '../AllergiesAutocomplete/AllergiesAutocomplete';
import './PatientInfoBar.css';

interface PatientInfoBarProps {
  patient: Patient;
  onPatientUpdate: (patient: Patient) => void;
}

export const PatientInfoBar: React.FC<PatientInfoBarProps> = ({
  patient,
  onPatientUpdate
}) => {
  const [editing, setEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(patient);

  const handleSave = () => {
    onPatientUpdate(editedPatient);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedPatient(patient);
    setEditing(false);
  };


  return (
    <div className="patient-info-bar">
      <div className="info-section patient-details">
        <div className="info-group">
          <User size={16} />
          {editing ? (
            <input
              type="text"
              value={editedPatient.name}
              onChange={(e) => setEditedPatient({ ...editedPatient, name: e.target.value })}
              className="edit-input"
              placeholder="Patient Name"
            />
          ) : (
            <span className="info-value">{patient.name}</span>
          )}
        </div>

        <div className="info-group">
          <span className="info-label">Room:</span>
          {editing ? (
            <input
              type="text"
              value={editedPatient.room}
              onChange={(e) => setEditedPatient({ ...editedPatient, room: e.target.value })}
              className="edit-input small"
              placeholder="Room"
            />
          ) : (
            <span className="info-value">{patient.room}</span>
          )}
        </div>

        <div className="info-group">
          <span className="info-label">MRN:</span>
          {editing ? (
            <input
              type="text"
              value={editedPatient.mrn}
              onChange={(e) => setEditedPatient({ ...editedPatient, mrn: e.target.value })}
              className="edit-input"
              placeholder="MRN"
            />
          ) : (
            <span className="info-value">{patient.mrn || '—'}</span>
          )}
        </div>

        <div className="info-group">
          <span className="info-label">Age:</span>
          {editing ? (
            <input
              type="text"
              value={editedPatient.age}
              onChange={(e) => setEditedPatient({ ...editedPatient, age: e.target.value })}
              className="edit-input small"
              placeholder="Age"
            />
          ) : (
            <span className="info-value">{patient.age || '—'}</span>
          )}
        </div>
      </div>

      <div className="info-section">
        <div className="info-group code-status">
          <span className="info-label">Code Status:</span>
          {editing ? (
            <select
              value={editedPatient.code}
              onChange={(e) => setEditedPatient({ ...editedPatient, code: e.target.value })}
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

        <div className="info-group">
          <span className="info-label">Attending:</span>
          {editing ? (
            <input
              type="text"
              value={editedPatient.provider || ''}
              onChange={(e) => setEditedPatient({ ...editedPatient, provider: e.target.value })}
              className="edit-input"
            />
          ) : (
            <span className="info-value">{patient.provider || 'Not assigned'}</span>
          )}
        </div>
      </div>

      <div className="info-section allergies-section">
        <div className="info-group allergies">
          <AlertCircle size={16} className="allergy-icon" />
          <span className="info-label">Allergies:</span>
          {editing ? (
            <div className="allergies-input-wrapper">
              <AllergiesAutocomplete
                allergies={editedPatient.allergies}
                onChange={(allergies) => setEditedPatient({ ...editedPatient, allergies })}
              />
            </div>
          ) : (
            <span className={`allergy-value ${patient.allergies.length === 0 ? 'nkda' : 'has-allergies'}`}>
              {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'NKDA'}
            </span>
          )}
        </div>
      </div>

      <div className="info-actions">
        {editing ? (
          <>
            <button className="action-btn save" onClick={handleSave}>
              <Save size={16} />
              Save
            </button>
            <button className="action-btn cancel" onClick={handleCancel}>
              <X size={16} />
              Cancel
            </button>
          </>
        ) : (
          <button className="action-btn edit" onClick={() => setEditing(true)}>
            <Edit2 size={16} />
            Edit
          </button>
        )}
      </div>
    </div>
  );
};