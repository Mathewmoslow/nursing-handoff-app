// src/components/FormLayout/FormLayout.tsx
import React from 'react';
import { PatientInfoBar } from '../PatientInfoBar/PatientInfoBar';
import { UnifiedGrid } from '../UnifiedGrid/UnifiedGrid';
import { SuggestionsBar } from '../SuggestionsBar/SuggestionsBar';
import { Patient, SelectedItem, RelatedItem } from '../../types';
import './FormLayout.css';

interface FormLayoutProps {
  patient: Patient;
  selectedItems: Record<string, SelectedItem>;
  relatedItems: Record<string, RelatedItem>;
  dismissedSuggestions: Record<string, boolean>;
  darkMode: boolean;
  onItemSelect: (category: string, section: string, item: string) => void;
  onDismissSuggestion: (key: string, e: React.MouseEvent) => void;
  onPatientUpdate: (patient: Patient) => void;
  onClearSelections: () => void;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  patient,
  selectedItems,
  relatedItems,
  dismissedSuggestions,
  darkMode,
  onItemSelect,
  onDismissSuggestion,
  onPatientUpdate,
  onClearSelections
}) => {
  return (
    <div className="form-layout">
      <PatientInfoBar
        patient={patient}
        onPatientUpdate={onPatientUpdate}
      />

      <SuggestionsBar
        relatedItems={relatedItems}
        dismissedSuggestions={dismissedSuggestions}
        onItemSelect={onItemSelect}
        onDismissSuggestion={onDismissSuggestion}
        darkMode={darkMode}
      />

      <UnifiedGrid
        patient={patient}
        selectedItems={selectedItems}
        relatedItems={relatedItems}
        dismissedSuggestions={dismissedSuggestions}
        onItemSelect={onItemSelect}
        onDismissSuggestion={onDismissSuggestion}
        onPatientUpdate={onPatientUpdate}
      />
    </div>
  );
};