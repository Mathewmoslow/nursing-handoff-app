// src/components/UnifiedGrid/UnifiedGrid.tsx
import React from 'react';
import { AssessmentBox } from '../AssessmentBox/AssessmentBox';
import { VitalsSection } from '../VitalsSection/VitalsSection';
import { LabsSection } from '../LabsSection/LabsSection';
import { NotesSection } from '../NotesSection/NotesSection';
import { QuickAccessPanel } from '../QuickAccessPanel/QuickAccessPanel';
import { formSections } from '../../constants/formSections';
import { Patient, SelectedItem, RelatedItem, FormSection } from '../../types';
import './UnifiedGrid.css';

interface UnifiedGridProps {
  patient: Patient;
  selectedItems: Record<string, SelectedItem>;
  relatedItems: Record<string, RelatedItem>;
  dismissedSuggestions: Record<string, boolean>;
  onItemSelect: (category: string, section: string, item: string) => void;
  onDismissSuggestion: (key: string, e: React.MouseEvent) => void;
  onPatientUpdate: (patient: Patient) => void;
  onRequestNote?: (category: string, section: string, item: string) => void;
  recentItems?: string[];
  frequentItems?: Record<string, number>;
}

export const UnifiedGrid: React.FC<UnifiedGridProps> = ({
  patient,
  selectedItems,
  relatedItems,
  dismissedSuggestions,
  onItemSelect,
  onDismissSuggestion,
  onPatientUpdate,
  onRequestNote,
  recentItems = [],
  frequentItems = {}
}) => {
  // Order sections - vitals and labs will span multiple cells
  const orderedSections = [
    'admission',
    'history',
    'neuro', 
    'cardiac',
    'resp',
    'gi',
    'gu',
    'skin',
    'devices',
    'mobility',
    'pain',
    'precautions',
    'tests',
    'planning',
    'iv'
  ];

  const sectionEntries = orderedSections
    .filter(key => formSections[key])
    .map(key => [key, formSections[key]] as [string, FormSection]);

  return (
    <div className="unified-grid">
      {/* Quick Access Panel - fixed size, spans 2 columns */}
      <div className="grid-item grid-item-quick-access" data-section="quick-access">
        <QuickAccessPanel
          onItemSelect={onItemSelect}
          selectedItems={selectedItems}
          recentItems={recentItems}
          frequentItems={frequentItems}
        />
      </div>
      
      {/* Assessment boxes */}
      {sectionEntries.map(([key, section]) => (
        <div 
          key={key} 
          className={`grid-item grid-item-${key}`}
          data-section={key}
        >
          <AssessmentBox
            section={section}
            sectionKey={key}
            selectedItems={selectedItems}
            relatedItems={relatedItems}
            dismissedSuggestions={dismissedSuggestions}
            patient={patient}
            onItemSelect={onItemSelect}
            onDismissSuggestion={onDismissSuggestion}
            onPatientUpdate={onPatientUpdate}
            onRequestNote={onRequestNote}
          />
        </div>
      ))}
      
      {/* Vitals - spans 2 columns */}
      <div className="grid-item grid-item-vitals" data-section="vitals">
        <VitalsSection
          patient={patient}
          onPatientUpdate={onPatientUpdate}
        />
      </div>
      
      {/* Labs - spans 2 columns */}
      <div className="grid-item grid-item-labs" data-section="labs">
        <LabsSection
          patient={patient}
          onPatientUpdate={onPatientUpdate}
        />
      </div>
      
      {/* Notes - spans 2 columns */}
      <div className="grid-item grid-item-notes" data-section="notes">
        <NotesSection
          notes={patient.notes || ''}
          onNotesChange={(notes) => onPatientUpdate({ ...patient, notes })}
          expanded={false}
          onToggleExpand={() => {}}
        />
      </div>
    </div>
  );
};