import React from 'react';
import { 
  Plus, X, MessageSquare, Save, Moon, Sun, Activity, 
  TestTube, Download, Network, Grid
} from 'lucide-react';
import { Patient } from '../../types';
import './Header.css';

interface HeaderProps {
  darkMode: boolean;
  patients: Patient[];
  activePatient: number;
  selectedItemsCount: number;
  relatedItemsCount: number;
  showNarrative: boolean;
  hasAbnormalValues: boolean;
  viewMode: string;
  onToggleDarkMode: () => void;
  onPatientChange: (index: number) => void;
  onAddPatient: () => void;
  onToggleNarrative: () => void;
  onOpenVitalsModal: () => void;
  onOpenLabsModal: () => void;
  onClearSelections: () => void;
  onExportReport: () => void;
  onViewModeChange: (mode: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  patients,
  activePatient,
  darkMode,
  showNarrative,
  selectedItemsCount,
  relatedItemsCount,
  hasAbnormalValues,
  viewMode,
  onPatientChange,
  onAddPatient,
  onToggleDarkMode,
  onToggleNarrative,
  onOpenVitalsModal,
  onOpenLabsModal,
  onClearSelections,
  onExportReport,
  onViewModeChange
}) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="title-section">
          <h1>SBAR Handoff</h1>
          <span className="subtitle">
            {selectedItemsCount} items | {relatedItemsCount} suggestions
          </span>
        </div>
        
        <div className="patient-tabs">
          {patients.map((patient, index) => (
            <button
              key={patient.id}
              className={`patient-tab ${activePatient === index ? 'active' : ''}`}
              onClick={() => onPatientChange(index)}
            >
              <span className="room">{patient.room}</span>
              <span className="name">{patient.name}</span>
              {patient.lastUpdate && (
                <span className="update-time">
                  {new Date(patient.lastUpdate).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              )}
            </button>
          ))}
          <button className="patient-tab add" onClick={onAddPatient}>
            <Plus size={14} />
          </button>
        </div>
        
        <div className="header-actions">
          <button 
            className={`action-btn vitals ${hasAbnormalValues ? 'has-abnormal' : ''}`}
            onClick={onOpenVitalsModal}
            title="Enter Vital Signs"
          >
            <Activity size={14} />
            <span>Vitals</span>
          </button>
          
          <button 
            className={`action-btn labs ${hasAbnormalValues ? 'has-abnormal' : ''}`}
            onClick={onOpenLabsModal}
            title="Enter Lab Results"
          >
            <TestTube size={14} />
            <span>Labs</span>
          </button>
          
          <button 
            className="action-btn clear"
            onClick={onClearSelections}
            title="Clear all selections"
          >
            <X size={14} />
            <span>Clear</span>
          </button>
          
          <button 
            className={`action-btn ${showNarrative ? 'active' : ''}`}
            onClick={onToggleNarrative}
            title="Toggle narrative"
          >
            <MessageSquare size={14} />
            <span>Narrative</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={onExportReport}
            title="Export report"
          >
            <Save size={14} />
            <span>Export</span>
          </button>
          
          <div className="action-separator" />
          
          <button 
            className={`action-btn icon-only ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Grid view"
          >
            <Grid size={14} />
          </button>
          
          <button 
            className={`action-btn icon-only ${viewMode === 'neural' ? 'active' : ''}`}
            onClick={() => onViewModeChange('neural')}
            title="Neural map view"
          >
            <Network size={14} />
          </button>
          
          <button 
            className="action-btn icon-only"
            onClick={onToggleDarkMode}
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>
    </header>
  );
};