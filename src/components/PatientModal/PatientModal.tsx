import React, { useState, useEffect } from 'react';
import { X, User, Calendar, Shield, AlertCircle } from 'lucide-react';
import { Patient } from '../../types';
import './PatientModal.css';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: Patient;
  onSave: (patient: Patient) => void;
}

export const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  onClose,
  patient,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Patient>>({
    room: '',
    name: '',
    mrn: '',
    age: '',
    provider: '',
    admitDate: new Date().toISOString().split('T')[0],
    code: 'Full Code',
    allergies: []
  });

  const [allergyInput, setAllergyInput] = useState('');

  useEffect(() => {
    if (patient) {
      setFormData({
        ...patient,
        admitDate: patient.admitDate || new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        room: '',
        name: '',
        mrn: '',
        age: '',
        provider: '',
        admitDate: new Date().toISOString().split('T')[0],
        code: 'Full Code',
        allergies: []
      });
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.room || !formData.name) {
      alert('Room and Name are required fields');
      return;
    }

    const patientData: Patient = {
      id: patient?.id || Date.now().toString(),
      room: formData.room, // Now guaranteed to be string
      name: formData.name, // Now guaranteed to be string
      mrn: formData.mrn || '',
      age: formData.age || '',
      provider: formData.provider || '',
      admitDate: formData.admitDate || new Date().toISOString().split('T')[0],
      code: formData.code || 'Full Code',
      allergies: formData.allergies || [],
      vitals: patient?.vitals || {},
      labs: patient?.labs || {},
      vitalsNotes: patient?.vitalsNotes || '',
      narrative: patient?.narrative || '',
      timeline: patient?.timeline || [],
      lastUpdate: new Date()
    };

    onSave(patientData);
  };


  const addAllergy = () => {
    if (allergyInput.trim()) {
      setFormData({
        ...formData,
        allergies: [...(formData.allergies || []), allergyInput.trim()]
      });
      setAllergyInput('');
    }
  };

  const removeAllergy = (index: number) => {
    setFormData({
      ...formData,
      allergies: formData.allergies?.filter((_, i) => i !== index) || []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <User size={20} />
            {patient ? 'Edit Patient' : 'New Patient'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Room *</label>
              <input
                type="text"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                placeholder="101A"
                required
              />
            </div>

            <div className="form-group">
              <label>Name/Initials *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="J.D."
                required
              />
            </div>

            <div className="form-group">
              <label>MRN</label>
              <input
                type="text"
                value={formData.mrn}
                onChange={(e) => setFormData({ ...formData, mrn: e.target.value })}
                placeholder="123456"
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="34"
              />
            </div>

            <div className="form-group">
              <label>Provider</label>
              <input
                type="text"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                placeholder="Dr. Smith"
              />
            </div>

            <div className="form-group">
              <label>
                <Calendar size={14} />
                Admit Date
              </label>
              <input
                type="date"
                value={formData.admitDate}
                onChange={(e) => setFormData({ ...formData, admitDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>
                <Shield size={14} />
                Code Status
              </label>
              <select
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              >
                <option value="Full Code">Full Code</option>
                <option value="DNR">DNR</option>
                <option value="DNI">DNI</option>
                <option value="DNR/DNI">DNR/DNI</option>
                <option value="Comfort Care">Comfort Care</option>
              </select>
            </div>
          </div>

          <div className="form-group allergies-section">
            <label>
              <AlertCircle size={14} />
              Allergies
            </label>
            <div className="allergy-input">
              <input
                type="text"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                placeholder="Add allergy..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
              />
              <button type="button" onClick={addAllergy}>Add</button>
            </div>
            <div className="allergy-list">
              {formData.allergies?.map((allergy, index) => (
                <span key={index} className="allergy-tag">
                  {allergy}
                  <button type="button" onClick={() => removeAllergy(index)}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              {(!formData.allergies || formData.allergies.length === 0) && (
                <span className="no-allergies">NKDA</span>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {patient ? 'Save Changes' : 'Add Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
