import React, { useEffect, useRef, useState } from 'react';
import { LucideIcon, Sparkles, Edit3 } from 'lucide-react';
import { relationshipMap } from '../../constants/relationships';
import './RadialMenuEnhanced.css';

interface RadialMenuEnhancedProps {
  centerItem: {
    label: string;
    icon: LucideIcon;
    isSelected: boolean;
  };
  primaryOptions: string[];
  relatedSuggestions: string[];
  selectedItems: Record<string, any>;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: string, withNote?: boolean) => void;
  position: { x: number; y: number };
  color: string;
  onRequestNote?: (item: string) => void;
}

export const RadialMenuEnhanced: React.FC<RadialMenuEnhancedProps> = ({
  centerItem,
  primaryOptions,
  relatedSuggestions,
  selectedItems,
  isOpen,
  onClose,
  onSelect,
  position,
  color,
  onRequestNote
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedPrimaryItems, setSelectedPrimaryItems] = useState<string[]>([]);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  
  // Initialize selected items from props
  useEffect(() => {
    const selected = primaryOptions.filter(option => {
      // Check for items that match this pattern
      const optionKey = `${centerItem.label}:${option}`;
      return Object.keys(selectedItems).some(k => k.endsWith(optionKey));
    });
    setSelectedPrimaryItems(selected);
  }, [primaryOptions, selectedItems, centerItem.label]);
  
  // Calculate dynamic suggestions based on selected items
  useEffect(() => {
    const allSuggestions = new Set<string>();
    
    // Add suggestions from selected primary items
    if (selectedPrimaryItems.length > 0) {
      selectedPrimaryItems.forEach(item => {
        const itemRelations = relationshipMap[item];
        if (itemRelations) {
          Object.entries(itemRelations)
            .filter(([, score]) => typeof score === 'number' && score > 0.5)
            .forEach(([suggestion]) => allSuggestions.add(suggestion));
        }
      });
    }
    
    // Also check for suggestions from the center item itself if it's selected
    if (centerItem.isSelected) {
      const centerRelations = relationshipMap[centerItem.label];
      if (centerRelations) {
        Object.entries(centerRelations)
          .filter(([, score]) => typeof score === 'number' && score > 0.5)
          .forEach(([suggestion]) => allSuggestions.add(suggestion));
      }
    }
    
    // If we have suggestions from selections, use those; otherwise use related suggestions
    if (allSuggestions.size > 0) {
      setDynamicSuggestions(Array.from(allSuggestions));
    } else {
      setDynamicSuggestions(relatedSuggestions);
    }
  }, [selectedPrimaryItems, relatedSuggestions, centerItem.isSelected, centerItem.label]);

  
  // Calculate positions for items - increased radius for better spacing
  const innerRadius = 130; // Increased for better spacing
  const suggestionRadius = 220; // Much farther out to prevent overlap
  const Icon = centerItem.icon;

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideMenu = menuRef.current && menuRef.current.contains(target);
      
      if (!isInsideMenu) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Use a ref to track the timeout
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Arrange primary options in inner circle (360 degrees divided evenly)
  const primaryAngleStep = primaryOptions.length > 0 ? (2 * Math.PI) / primaryOptions.length : 0;

  return (
    <>
      <div className="radial-menu-backdrop" onClick={(e) => {
        e.stopPropagation();
        onClose();
      }} />
      <div 
        className="radial-menu-enhanced-overlay"
        style={{ left: position.x, top: position.y }}
      >
        <div className="radial-menu-enhanced" ref={menuRef}>
        {/* Connection lines */}
        <svg className="connection-lines" width="500" height="500">
          {/* Lines from center to primary options */}
          {primaryOptions.map((_, index) => {
            const angle = (index * primaryAngleStep) - (Math.PI / 2);
            const x = Math.cos(angle) * (innerRadius - 20) + 250;
            const y = Math.sin(angle) * (innerRadius - 20) + 250;
            
            return (
              <line
                key={`primary-${index}`}
                x1="250"
                y1="250"
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth="2"
                opacity="0.3"
              />
            );
          })}
          
          {/* Lines from center to suggestions */}
          {(() => {
            if (dynamicSuggestions.length === 0) return null;
            
            const suggestionAngleStep = (2 * Math.PI) / dynamicSuggestions.length;
            
            return dynamicSuggestions.map((suggestion, index) => {
              const angle = (index * suggestionAngleStep) - (Math.PI / 2);
              const x = Math.cos(angle) * (suggestionRadius - 25) + 250;
              const y = Math.sin(angle) * (suggestionRadius - 25) + 250;
              
              return (
                <line
                  key={`line-${suggestion}-${index}`}
                  x1="250"
                  y1="250"
                  x2={x}
                  y2={y}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  opacity="0.6"
                  strokeDasharray="5,5"
                />
              );
            });
          })()}
        </svg>

        {/* Center node */}
        <div 
          className={`radial-center-enhanced ${centerItem.isSelected ? 'selected' : ''}`}
          style={{ borderColor: color }}
        >
          <button 
            className="center-button-enhanced"
            onClick={() => onSelect(centerItem.label)}
            style={{ backgroundColor: centerItem.isSelected ? color : 'white' }}
          >
            <Icon size={24} />
            <span className="center-label">{centerItem.label}</span>
          </button>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* Primary options - inner circle */}
        {primaryOptions.map((option, index) => {
          // Start from top and go clockwise
          const angle = (index * primaryAngleStep) - (Math.PI / 2);
          const x = Math.cos(angle) * innerRadius;
          const y = Math.sin(angle) * innerRadius;
          // Check if this option is selected - look for keys ending with this pattern
          const optionKey = `${centerItem.label}:${option}`;
          const isSelected = Object.keys(selectedItems).some(k => k.endsWith(optionKey));
          
          return (
            <button
              key={option}
              className={`radial-item primary ${isSelected ? 'selected' : ''}`}
              style={{
                left: `${250 + x}px`,
                top: `${250 + y}px`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: isSelected ? color : 'white',
                borderColor: color
              }}
              onClick={(e) => {
                e.stopPropagation();
                // Toggle local selection state
                if (selectedPrimaryItems.includes(option)) {
                  setSelectedPrimaryItems(prev => prev.filter(item => item !== option));
                } else {
                  setSelectedPrimaryItems(prev => [...prev, option]);
                }
                // Always call onSelect to toggle the global state
                onSelect(option);
              }}
            >
              {option}
            </button>
          );
        })}

        {/* Related suggestions - positioned like clock numbers */}
        {(() => {
          // Use dynamicSuggestions which includes all relevant suggestions
          if (dynamicSuggestions.length === 0) return null;
          
          // Position each suggestion evenly around the circle
          const suggestionAngleStep = (2 * Math.PI) / dynamicSuggestions.length;
          
          return dynamicSuggestions.map((suggestion, index) => {
            // Start from top (12 o'clock) and go clockwise
            const angle = (index * suggestionAngleStep) - (Math.PI / 2);
            const x = Math.cos(angle) * suggestionRadius;
            const y = Math.sin(angle) * suggestionRadius;
            
            return (
              <button
                key={`suggestion-${suggestion}-${index}`}
                className="radial-item suggestion"
                style={{
                  left: `${250 + x}px`,
                  top: `${250 + y}px`,
                  transform: 'translate(-50%, -50%)',
                  borderColor: '#f59e0b',
                  animationDelay: `${index * 0.05}s`
                }}
                onClick={() => onSelect(suggestion)}
              >
                <Sparkles size={12} />
                {suggestion}
              </button>
            );
          });
        })()}
        
        {/* Help tooltip */}
        {selectedPrimaryItems.length === 0 && (
          <div className="radial-help">
            Click options to select/unselect • ESC or click outside to close
          </div>
        )}
        
        {/* Selection counter */}
        {selectedPrimaryItems.length > 0 && (
          <div className="selection-counter">
            {selectedPrimaryItems.length} selected
          </div>
        )}
      </div>
    </div>
    </>
  );
};