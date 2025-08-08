// src/components/AssessmentGrid/AssessmentGrid.tsx
import React from 'react';
import { AssessmentBox } from '../AssessmentBox/AssessmentBox';
import { formSections } from '../../constants/formSections';
import { Patient, SelectedItem, RelatedItem, FormSection } from '../../types';
import './AssessmentGrid.css';

interface AssessmentGridProps {
  selectedItems: Record<string, SelectedItem>;
  relatedItems: Record<string, RelatedItem>;
  dismissedSuggestions: Record<string, boolean>;
  patient: Patient;
  onItemSelect: (category: string, section: string, item: string) => void;
  onDismissSuggestion: (key: string, e: React.MouseEvent) => void;
  onPatientUpdate: (patient: Patient) => void;
}

export const AssessmentGrid: React.FC<AssessmentGridProps> = ({
  selectedItems,
  relatedItems,
  dismissedSuggestions,
  patient,
  onItemSelect,
  onDismissSuggestion,
  onPatientUpdate
}) => {
  // Order sections with admission first
  const orderedSections = [
    'admission',
    'neuro',
    'cardiac',
    'resp',
    'gi',
    'gu',
    'skin',
    'mobility',
    'pain',
    'psychosocial',
    'lines',
    'medications',
    'vitals',
    'labs',
    'procedures',
    'consults',
    'discharge'
  ];

  const sectionEntries = orderedSections
    .filter(key => formSections[key])
    .map(key => [key, formSections[key]]);

  return (
    <div className="assessment-grid">
      {sectionEntries.map(([sectionKey, section]) => (
        <AssessmentBox
          key={sectionKey as string}
          sectionKey={sectionKey as string}
          section={section as FormSection}
          selectedItems={selectedItems}
          relatedItems={relatedItems}
          dismissedSuggestions={dismissedSuggestions}
          patient={patient}
          onItemSelect={onItemSelect}
          onDismissSuggestion={onDismissSuggestion}
          onPatientUpdate={onPatientUpdate}
        />
      ))}
    </div>
  );
};