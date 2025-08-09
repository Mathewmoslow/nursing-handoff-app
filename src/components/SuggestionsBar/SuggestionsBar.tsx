// src/components/SuggestionsBar/SuggestionsBar.tsx
import React from 'react';
import { Lightbulb, X } from 'lucide-react';
import { RelatedItem } from '../../types';
import { formSections } from '../../constants/formSections';
import './SuggestionsBar.css';

interface SuggestionsBarProps {
  relatedItems: Record<string, RelatedItem>;
  dismissedSuggestions: Record<string, boolean>;
  selectedItems?: Record<string, any>;
  darkMode: boolean;
  onItemSelect: (category: string, section: string, item: string) => void;
  onDismissSuggestion: (key: string, e: React.MouseEvent) => void;
}

export const SuggestionsBar: React.FC<SuggestionsBarProps> = ({
  relatedItems,
  dismissedSuggestions,
  selectedItems = {},
  darkMode,
  onItemSelect,
  onDismissSuggestion
}) => {
  const activeSuggestions = Object.entries(relatedItems)
    .filter(([key]) => !dismissedSuggestions[key])
    .sort(([, a], [, b]) => b.score - a.score);

  if (activeSuggestions.length === 0) return null;

  return (
    <div className="suggestions-bar">
      <div className="suggestions-header">
        <Lightbulb size={16} />
        <span>Suggested items based on your selections:</span>
      </div>
      <div className="suggestions-list">
        {activeSuggestions.map(([key, suggestion]) => {
          // Check if this suggestion is already selected
          const isAlreadySelected = Object.values(selectedItems).some(
            item => item.item === suggestion.item
          );
          
          return (
            <div
              key={key}
              className={`suggestion-chip ${isAlreadySelected ? 'selected' : ''}`}
              onClick={() => {
                if (!isAlreadySelected) {
                  // Find the item in formSections to get its category and section
                  let found = false;
                  for (const [sectionKey, section] of Object.entries(formSections)) {
                    for (const [buttonKey, button] of Object.entries(section.buttons)) {
                      if (button.options?.includes(suggestion.item)) {
                        onItemSelect(button.category, button.section, `${buttonKey}:${suggestion.item}`);
                        found = true;
                        break;
                      } else if (buttonKey === suggestion.item || button.mainButton === suggestion.item) {
                        onItemSelect(button.category, button.section, suggestion.item);
                        found = true;
                        break;
                      }
                    }
                    if (found) break;
                  }
                  // If not found in formSections, still try to select it
                  if (!found) {
                    // Try to find it as a generic item
                    onItemSelect('assessment', 'general', suggestion.item);
                  }
                }
              }}
              style={{
                backgroundColor: isAlreadySelected ? '#10b981' : '',
                borderColor: isAlreadySelected ? '#10b981' : '',
                color: isAlreadySelected ? 'white' : ''
              }}
            >
              <span className="suggestion-text">{suggestion.item}</span>
              <span className="suggestion-score">{Math.round(suggestion.score * 100)}%</span>
              <button
                className="dismiss-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDismissSuggestion(key, e);
                }}
              >
                <X size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};