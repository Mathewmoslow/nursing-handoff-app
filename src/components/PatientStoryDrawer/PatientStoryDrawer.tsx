import React, { useState } from 'react';
import { X, FileText, ChevronRight, Clock } from 'lucide-react';
import { Patient, SelectedItem } from '../../types';
import { generateNarrative, formatTime } from '../../utils/helpers';
import './PatientStoryDrawer.css';

interface PatientStoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
  selectedItems: Record<string, SelectedItem>;
}

export const PatientStoryDrawer: React.FC<PatientStoryDrawerProps> = ({
  isOpen,
  onClose,
  patient,
  selectedItems
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const narrative = generateNarrative(patient, selectedItems);
  const recentUpdates = patient.timeline.slice(-10).reverse();

  return (
    <>
      {/* Toggle button */}
      <button
        className="story-drawer-toggle"
        onClick={() => onClose()}
        title="Toggle Patient Story"
      >
        <FileText size={20} />
        <ChevronRight size={16} className={isOpen ? 'rotated' : ''} />
      </button>

      {/* Drawer */}
      <div className={`patient-story-drawer ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="drawer-header">
          <h2>
            <FileText size={20} />
            Patient Story
          </h2>
          <div className="drawer-actions">
            <button onClick={() => setIsCollapsed(!isCollapsed)} title={isCollapsed ? 'Expand' : 'Collapse'}>
              {isCollapsed ? '⬆️' : '⬇️'}
            </button>
            <button onClick={onClose} title="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <>
            <div className="patient-summary">
              <div className="summary-row">
                <span className="label">PATIENT:</span>
                <span className="value">{patient.room} - {patient.name}</span>
              </div>
              <div className="summary-row">
                <span className="label">MRN:</span>
                <span className="value">{patient.mrn || 'N/A'}</span>
                <span className="label">Age:</span>
                <span className="value">{patient.age || 'N/A'}</span>
              </div>
              <div className="summary-row">
                <span className="label">Provider:</span>
                <span className="value">{patient.provider || 'N/A'}</span>
                <span className="label">Admit:</span>
                <span className="value">{patient.admitDate}</span>
              </div>
              <div className="summary-row">
                <span className="label">Code Status:</span>
                <span className="value">{patient.code}</span>
                <span className="label">Allergies:</span>
                <span className="value">{patient.allergies.length > 0 ? patient.allergies.join(', ') : 'NKDA'}</span>
              </div>
              <div className="summary-row">
                <span className="label">Report Generated:</span>
                <span className="value">{new Date().toLocaleString()}</span>
              </div>
            </div>

            <div className="narrative-section">
              <h3>Clinical Narrative</h3>
              <div className="narrative-content">
                {narrative || 'Select items to build clinical narrative...'}
              </div>
            </div>

            <div className="timeline-section">
              <h3>
                <Clock size={16} />
                Recent Updates
              </h3>
              <div className="timeline-content">
                {recentUpdates.length > 0 ? (
                  recentUpdates.map((event, index) => (
                    <div key={event.id} className="timeline-item">
                      <span className="time">{formatTime(event.timestamp)}</span>
                      <span className="action">{event.action}</span>
                    </div>
                  ))
                ) : (
                  <div className="empty-timeline">No updates yet</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};