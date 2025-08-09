import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FormButton, SelectedItem } from '../../types';
import { RadialMenuEnhanced } from '../RadialMenuEnhanced/RadialMenuEnhanced';
import './MinimalButton.css';

interface MinimalButtonProps {
  button: FormButton;
  isSelected: boolean;
  selectedItems: Record<string, SelectedItem>;
  relatedItems: string[];
  color: string;
  onItemSelect: (category: string, section: string, item: string) => void;
  onRequestNote?: (category: string, section: string, item: string) => void;
}

export const MinimalButton: React.FC<MinimalButtonProps> = ({
  button,
  isSelected,
  selectedItems,
  relatedItems,
  color,
  onItemSelect,
  onRequestNote
}) => {
  const [showRadial, setShowRadial] = useState(false);
  const [radialPosition, setRadialPosition] = useState({ x: 0, y: 0 });
  const Icon = button.icon;
  
  
  // Check if any sub-items are selected
  const selectedSubItems = button.options?.filter(option => {
    const key = `${button.category}-${button.section}-${button.mainButton}:${option}`;
    return !!selectedItems[key];
  }) || [];

  const hasSelections = isSelected || selectedSubItems.length > 0;
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const menuSize = 400; // Size of radial menu
    
    // Calculate center position
    let x = rect.left + rect.width / 2;
    let y = rect.top + rect.height / 2;
    
    // Ensure menu stays within viewport
    if (x - menuSize/2 < 0) x = menuSize/2;
    if (x + menuSize/2 > viewportWidth) x = viewportWidth - menuSize/2;
    if (y - menuSize/2 < 0) y = menuSize/2;
    if (y + menuSize/2 > viewportHeight) y = viewportHeight - menuSize/2;
    
    setRadialPosition({ x, y });
    setShowRadial(true);
  };

  const handleItemSelect = (item: string) => {
    if (button.options?.includes(item)) {
      onItemSelect(button.category, button.section, `${button.mainButton}:${item}`);
    } else {
      onItemSelect(button.category, button.section, item);
    }
  };

  return (
    <>
      <button
        className={`minimal-button ${hasSelections ? 'selected' : ''}`}
        onClick={handleClick}
        style={{
          borderColor: hasSelections ? color : 'transparent',
          backgroundColor: hasSelections ? `${color}20` : 'transparent'
        }}
        title={button.mainButton}
      >
        <Icon size={20} />
        <span className="button-label">{button.mainButton}</span>
        {selectedSubItems.length > 0 && (
          <span className="selection-indicator">{selectedSubItems.length}</span>
        )}
      </button>

      {showRadial && ReactDOM.createPortal(
        <RadialMenuEnhanced
          centerItem={{
            label: button.mainButton,
            icon: Icon,
            isSelected: isSelected
          }}
          primaryOptions={button.options || []}
          relatedSuggestions={relatedItems}
          selectedItems={selectedItems}
          isOpen={showRadial}
          onClose={() => setShowRadial(false)}
          onSelect={handleItemSelect}
          position={radialPosition}
          color={color}
          onRequestNote={onRequestNote}
        />,
        document.body
      )}
    </>
  );
};