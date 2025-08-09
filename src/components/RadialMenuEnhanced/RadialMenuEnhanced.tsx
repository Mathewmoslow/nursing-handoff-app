import React, { useEffect, useRef, useState } from 'react';
import { LucideIcon, Sparkles, StickyNote } from 'lucide-react';
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
  onRequestNote?: (category: string, section: string, item: string) => void;
}

// Calculate optimal bucket configuration for a given number of items
const calculateBucketConfig = (itemCount: number) => {
  // Predefined bucket configurations for optimal visual balance
  // Max 20 for first ring, much more for second ring
  const configs = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 12, // Round up to 12 for better distribution
    12: 12,
    13: 14,
    14: 14,
    15: 16,
    16: 16,
    17: 18,
    18: 18,
    19: 20,
    20: 20
  };
  
  // For items over 20, use multiples of 4 for even distribution
  if (itemCount > 20) {
    return Math.ceil(itemCount / 4) * 4;
  }
  
  return configs[itemCount as keyof typeof configs] || itemCount;
};

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
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const [adjustedPosition, setAdjustedPosition] = useState({ x: position.x, y: position.y });
  
  // Initialize selected items from props
  useEffect(() => {
    const selected = primaryOptions.filter(option => {
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

  // Calculate bucket configurations
  const primaryBucketCount = calculateBucketConfig(primaryOptions.length);
  const suggestionBucketCount = calculateBucketConfig(dynamicSuggestions.length);
  
  // Calculate positions with structured buckets
  const innerRadius = 120; // First ring radius
  const outerRadius = 200; // Second ring radius
  const Icon = centerItem.icon;

  // Adjust position to keep menu within viewport
  useEffect(() => {
    const menuSize = 450;
    const padding = 20;
    
    let newX = position.x;
    let newY = position.y;
    
    // Check boundaries
    if (newX + menuSize/2 > window.innerWidth - padding) {
      newX = window.innerWidth - menuSize/2 - padding;
    }
    if (newX - menuSize/2 < padding) {
      newX = menuSize/2 + padding;
    }
    if (newY + menuSize/2 > window.innerHeight - padding) {
      newY = window.innerHeight - menuSize/2 - padding;
    }
    if (newY - menuSize/2 < padding) {
      newY = menuSize/2 + padding;
    }
    
    setAdjustedPosition({ x: newX, y: newY });
  }, [position.x, position.y]);

  // Handle click outside and escape key
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

  // Create bucket positions for primary ring
  const primaryBuckets = Array.from({ length: primaryBucketCount }, (_, i) => {
    const angle = (i * 2 * Math.PI / primaryBucketCount) - (Math.PI / 2);
    return {
      x: Math.cos(angle) * innerRadius + 225,
      y: Math.sin(angle) * innerRadius + 225,
      angle
    };
  });

  // Create bucket positions for suggestion ring
  const suggestionBuckets = Array.from({ length: suggestionBucketCount }, (_, i) => {
    const angle = (i * 2 * Math.PI / suggestionBucketCount) - (Math.PI / 2);
    return {
      x: Math.cos(angle) * outerRadius + 225,
      y: Math.sin(angle) * outerRadius + 225,
      angle
    };
  });

  return (
    <>
      <div className="radial-menu-backdrop" onClick={(e) => {
        e.stopPropagation();
        onClose();
      }} />
      <div 
        className="radial-menu-enhanced-overlay"
        style={{ left: adjustedPosition.x, top: adjustedPosition.y }}
      >
        <div className="radial-menu-enhanced structured" ref={menuRef}>
          {/* SVG for connection lines and bucket guides */}
          <svg className="connection-lines" width="450" height="450">
            {/* Draw bucket segments for primary ring */}
            {primaryBuckets.map((bucket, index) => {
              const nextIndex = (index + 1) % primaryBucketCount;
              const angleStart = bucket.angle - (Math.PI / primaryBucketCount);
              const angleEnd = bucket.angle + (Math.PI / primaryBucketCount);
              
              return (
                <g key={`primary-bucket-${index}`}>
                  {/* Radial line from center */}
                  <line
                    x1="225"
                    y1="225"
                    x2={bucket.x}
                    y2={bucket.y}
                    stroke={color}
                    strokeWidth="1"
                    opacity="0.2"
                  />
                  {/* Arc segment (visual guide) */}
                  <path
                    d={`M ${225 + Math.cos(angleStart) * (innerRadius - 30)} ${225 + Math.sin(angleStart) * (innerRadius - 30)}
                        A ${innerRadius - 30} ${innerRadius - 30} 0 0 1 
                        ${225 + Math.cos(angleEnd) * (innerRadius - 30)} ${225 + Math.sin(angleEnd) * (innerRadius - 30)}`}
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    opacity="0.1"
                  />
                </g>
              );
            })}
            
            {/* Draw bucket segments for suggestion ring */}
            {dynamicSuggestions.length > 0 && suggestionBuckets.map((bucket, index) => {
              const angleStart = bucket.angle - (Math.PI / suggestionBucketCount);
              const angleEnd = bucket.angle + (Math.PI / suggestionBucketCount);
              
              return (
                <g key={`suggestion-bucket-${index}`}>
                  {/* Radial line from center */}
                  <line
                    x1="225"
                    y1="225"
                    x2={bucket.x}
                    y2={bucket.y}
                    stroke="#f59e0b"
                    strokeWidth="1"
                    opacity="0.15"
                    strokeDasharray="3,3"
                  />
                  {/* Arc segment */}
                  <path
                    d={`M ${225 + Math.cos(angleStart) * (outerRadius - 30)} ${225 + Math.sin(angleStart) * (outerRadius - 30)}
                        A ${outerRadius - 30} ${outerRadius - 30} 0 0 1 
                        ${225 + Math.cos(angleEnd) * (outerRadius - 30)} ${225 + Math.sin(angleEnd) * (outerRadius - 30)}`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1"
                    opacity="0.1"
                  />
                </g>
              );
            })}
            
            {/* Draw circles for the rings */}
            <circle
              cx="225"
              cy="225"
              r={innerRadius}
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0.1"
            />
            {dynamicSuggestions.length > 0 && (
              <circle
                cx="225"
                cy="225"
                r={outerRadius}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1"
                opacity="0.1"
              />
            )}
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
            {centerItem.isSelected && onRequestNote && (
              <button 
                className="center-note-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const fullKey = Object.keys(selectedItems).find(k => k.includes(centerItem.label));
                  if (fullKey && onRequestNote) {
                    const parts = fullKey.split('-');
                    if (parts.length >= 3) {
                      onRequestNote(parts[0], parts[1], parts.slice(2).join('-'));
                    }
                  }
                }}
                title="Add note"
              >
                <StickyNote size={14} />
              </button>
            )}
            <button className="close-button" onClick={onClose}>×</button>
          </div>

          {/* Primary options - placed in buckets */}
          {primaryOptions.map((option, index) => {
            const bucket = primaryBuckets[index];
            const optionKey = `${centerItem.label}:${option}`;
            const isSelected = Object.keys(selectedItems).some(k => k.endsWith(optionKey));
            
            return (
              <button
                key={option}
                className={`radial-item primary structured ${isSelected ? 'selected' : ''}`}
                style={{
                  left: `${bucket.x}px`,
                  top: `${bucket.y}px`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: isSelected ? color : 'white',
                  borderColor: color,
                  animationDelay: `${index * 0.03}s`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedPrimaryItems.includes(option)) {
                    setSelectedPrimaryItems(prev => prev.filter(item => item !== option));
                  } else {
                    setSelectedPrimaryItems(prev => [...prev, option]);
                  }
                  onSelect(`${centerItem.label}:${option}`);
                }}
              >
                <span className="item-text">{option}</span>
                {isSelected && onRequestNote && (
                  <button
                    className="radial-note-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const fullKey = Object.keys(selectedItems).find(k => k.endsWith(optionKey));
                      if (fullKey && onRequestNote) {
                        const parts = fullKey.split('-');
                        if (parts.length >= 3) {
                          onRequestNote(parts[0], parts[1], parts.slice(2).join('-'));
                        }
                      }
                    }}
                    title="Add note"
                  >
                    <StickyNote size={12} />
                  </button>
                )}
              </button>
            );
          })}

          {/* Suggestions - placed in outer buckets */}
          {dynamicSuggestions.map((suggestion, index) => {
            const bucket = suggestionBuckets[index];
            const isSuggestionSelected = selectedSuggestions.includes(suggestion) || 
              Object.values(selectedItems).some(item => item.item === suggestion);
            
            return (
              <button
                key={`suggestion-${suggestion}-${index}`}
                className={`radial-item suggestion structured ${isSuggestionSelected ? 'selected' : ''}`}
                style={{
                  left: `${bucket.x}px`,
                  top: `${bucket.y}px`,
                  transform: 'translate(-50%, -50%)',
                  borderColor: isSuggestionSelected ? '#10b981' : '#f59e0b',
                  backgroundColor: isSuggestionSelected ? '#10b981' : '#fffbeb',
                  color: isSuggestionSelected ? 'white' : '#92400e',
                  animationDelay: `${index * 0.03}s`
                }}
                onClick={() => {
                  if (isSuggestionSelected) {
                    setSelectedSuggestions(prev => prev.filter(s => s !== suggestion));
                  } else {
                    setSelectedSuggestions(prev => [...prev, suggestion]);
                  }
                  onSelect(suggestion);
                }}
              >
                <span className="suggestion-content">
                  {isSuggestionSelected ? '✓' : <Sparkles size={11} />}
                  <span className="suggestion-text">{suggestion}</span>
                </span>
                {isSuggestionSelected && onRequestNote && (
                  <button
                    className="suggestion-note-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const fullKey = Object.keys(selectedItems).find(k => {
                        const item = selectedItems[k];
                        return item && item.item === suggestion;
                      });
                      if (fullKey && onRequestNote) {
                        const parts = fullKey.split('-');
                        if (parts.length >= 3) {
                          onRequestNote(parts[0], parts[1], parts.slice(2).join('-'));
                        }
                      } else if (onRequestNote) {
                        onRequestNote('assessment', 'general', suggestion);
                      }
                    }}
                    title="Add note"
                  >
                    <StickyNote size={10} />
                  </button>
                )}
              </button>
            );
          })}
          
          {/* Help tooltip */}
          {selectedPrimaryItems.length === 0 && primaryOptions.length > 0 && (
            <div className="radial-help">
              {primaryOptions.length} option{primaryOptions.length !== 1 ? 's' : ''} • 
              {dynamicSuggestions.length} suggestion{dynamicSuggestions.length !== 1 ? 's' : ''}
            </div>
          )}
          
          {/* Selection counter */}
          {(selectedPrimaryItems.length > 0 || selectedSuggestions.length > 0) && (
            <div className="selection-counter">
              {selectedPrimaryItems.length + selectedSuggestions.length} selected
            </div>
          )}
        </div>
      </div>
    </>
  );
};