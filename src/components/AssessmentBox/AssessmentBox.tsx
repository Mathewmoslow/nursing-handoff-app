// src/components/AssessmentBox/AssessmentBox.tsx
import React from 'react';
import { MinimalButton } from '../MinimalButton/MinimalButton';
import { MinimalButtonWithKeypad } from '../MinimalButtonWithKeypad/MinimalButtonWithKeypad';
import { Card } from '../Card/Card';
import { FormSection } from '../../types';
import { Patient, SelectedItem, RelatedItem } from '../../types';
import './AssessmentBox.css';

interface AssessmentBoxProps {
  sectionKey: string;
  section: FormSection;
  selectedItems: Record<string, SelectedItem>;
  relatedItems: Record<string, RelatedItem>;
  dismissedSuggestions: Record<string, boolean>;
  patient: Patient;
  onItemSelect: (category: string, section: string, item: string) => void;
  onDismissSuggestion: (key: string, e: React.MouseEvent) => void;
  onPatientUpdate: (patient: Patient) => void;
  onRequestNote?: (category: string, section: string, item: string) => void;
}

export const AssessmentBox: React.FC<AssessmentBoxProps> = ({
  sectionKey,
  section,
  selectedItems,
  relatedItems,
  dismissedSuggestions,
  patient,
  onItemSelect,
  onDismissSuggestion,
  onPatientUpdate,
  onRequestNote
}) => {
  return (
    <Card elevation="medium">
      <div className="assessment-box" style={{ borderColor: section.color }}>
        <div className="box-header" style={{ backgroundColor: `${section.color}10`, borderBottomColor: section.color }}>
          <h3 style={{ color: section.color }}>{section.title}</h3>
        </div>
        <div className="box-content">
        {Object.entries(section.buttons).map(([buttonKey, button]) => {
          const key = `${button.category}-${button.section}-${button.mainButton}`;
          const isSelected = !!selectedItems[key];
          
          // Get related items for this button's selected options
          const selectedOptions = button.options?.filter(option => {
            const optionKey = `${button.category}-${button.section}-${button.mainButton}:${option}`;
            return !!selectedItems[optionKey];
          }) || [];
          
          // If the main button itself is selected, include it
          if (isSelected && !button.options) {
            selectedOptions.push(button.mainButton);
          }
          
          // Get all related items for any selected option of this button
          const buttonRelatedItems = [...new Set(
            Object.entries(relatedItems)
              .filter(([relKey, rel]) => selectedOptions.includes(rel.source))
              .map(([, rel]) => rel.item)
          )];
          
          // Use keypad button for vitals and labs with single value input
          if ((sectionKey === 'vitals' || sectionKey === 'labs') && !button.options) {
            const valueKey = sectionKey === 'vitals' ? button.mainButton : `labs-${button.mainButton}`;
            const currentValue = sectionKey === 'vitals' 
              ? patient.vitals[valueKey] 
              : patient.labs[valueKey];
            
            return (
              <MinimalButtonWithKeypad
                key={buttonKey}
                button={button}
                value={currentValue}
                color={section.color}
                patient={patient}
                onValueUpdate={(value) => {
                  if (sectionKey === 'vitals') {
                    onPatientUpdate({
                      ...patient,
                      vitals: { ...patient.vitals, [valueKey]: value }
                    });
                  } else {
                    onPatientUpdate({
                      ...patient,
                      labs: { ...patient.labs, [valueKey]: value }
                    });
                  }
                }}
              />
            );
          }
          
          return (
            <MinimalButton
              key={buttonKey}
              button={button}
              isSelected={isSelected}
              selectedItems={selectedItems}
              relatedItems={buttonRelatedItems}
              color={section.color}
              onItemSelect={onItemSelect}
              onRequestNote={onRequestNote}
            />
          );
        })}
      </div>
    </div>
    </Card>
  );
};