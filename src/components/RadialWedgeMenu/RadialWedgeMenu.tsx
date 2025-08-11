import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LucideIcon } from 'lucide-react';
import { relationshipMap } from '../../constants/relationships';
import './RadialWedgeMenu.css';

interface RadialWedgeMenuProps {
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

// Sound effects helper
const playSound = (type: 'open' | 'close' | 'select' | 'hover') => {
  // Use custom WAV files for open, close, and hover
  if (type === 'open' || type === 'close' || type === 'hover') {
    const audio = new Audio();
    switch(type) {
      case 'open':
        audio.src = '/sounds/open.wav';
        break;
      case 'close':
        audio.src = '/sounds/close.wav';
        break;
      case 'hover':
        audio.src = '/sounds/hover.wav';
        break;
    }
    audio.volume = 0.3; // Adjust volume as needed
    audio.play().catch(err => {
      console.warn('Could not play sound:', err);
    });
  } else if (type === 'select') {
    // Keep the synthesized sound for selection
    if ('AudioContext' in window) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 523; // C5
      gainNode.gain.value = 0.12;
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  }
};

// Haptic feedback helper (for mobile devices)
const triggerHaptic = (intensity: 'light' | 'medium' | 'heavy' = 'light') => {
  if ('vibrate' in navigator) {
    switch(intensity) {
      case 'light':
        navigator.vibrate(10);
        break;
      case 'medium':
        navigator.vibrate(20);
        break;
      case 'heavy':
        navigator.vibrate([30, 10, 30]);
        break;
    }
  }
};

export const RadialWedgeMenu: React.FC<RadialWedgeMenuProps> = ({
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
  const [hoveredWedge, setHoveredWedge] = useState<string | null>(null);
  const [selectedPrimaryItems, setSelectedPrimaryItems] = useState<string[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const [adjustedPosition, setAdjustedPosition] = useState({ x: position.x, y: position.y });
  const [isAnimating, setIsAnimating] = useState(false);
  
  const Icon = centerItem.icon;
  const menuSize = 600; // Size of the entire menu
  const centerRadius = 80; // Center button radius
  const innerRingStart = 100; // Where inner ring starts
  const innerRingEnd = 200; // Where inner ring ends
  const outerRingStart = 210; // Where outer ring starts  
  const outerRingEnd = 280; // Where outer ring ends
  const centerX = menuSize / 2;
  const centerY = menuSize / 2;

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

  // Adjust position to keep menu within viewport
  useEffect(() => {
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
  }, [position.x, position.y, menuSize]);

  // Handle open/close animations and sounds
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      playSound('open');
      triggerHaptic('medium');
      setTimeout(() => setIsAnimating(false), 600);
    }
  }, [isOpen]);

  // Handle click outside and escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideMenu = menuRef.current && menuRef.current.contains(target);
      
      if (!isInsideMenu) {
        playSound('close');
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        playSound('close');
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

  // Create wedge path
  const createWedgePath = (
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    outerRadius: number
  ): string => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + innerRadius * Math.cos(startAngleRad);
    const y1 = centerY + innerRadius * Math.sin(startAngleRad);
    const x2 = centerX + outerRadius * Math.cos(startAngleRad);
    const y2 = centerY + outerRadius * Math.sin(startAngleRad);
    const x3 = centerX + outerRadius * Math.cos(endAngleRad);
    const y3 = centerY + outerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(endAngleRad);
    const y4 = centerY + innerRadius * Math.sin(endAngleRad);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return `
      M ${x1} ${y1}
      L ${x2} ${y2}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}
      L ${x4} ${y4}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}
      Z
    `;
  };

  // Calculate text position for wedge
  const getTextPosition = (
    startAngle: number,
    endAngle: number,
    radius: number
  ): { x: number; y: number; rotation: number } => {
    const midAngle = (startAngle + endAngle) / 2;
    const midAngleRad = (midAngle * Math.PI) / 180;
    const textRadius = radius;
    
    const x = centerX + textRadius * Math.cos(midAngleRad);
    const y = centerY + textRadius * Math.sin(midAngleRad);
    
    // Rotate text to be readable
    let rotation = midAngle;
    if (midAngle > 90 && midAngle < 270) {
      rotation = midAngle + 180;
    }
    
    return { x, y, rotation };
  };

  const handleWedgeClick = (item: string, isPrimary: boolean) => {
    playSound('select');
    triggerHaptic('light');
    
    if (isPrimary) {
      if (selectedPrimaryItems.includes(item)) {
        setSelectedPrimaryItems(prev => prev.filter(i => i !== item));
      } else {
        setSelectedPrimaryItems(prev => [...prev, item]);
      }
      onSelect(`${centerItem.label}:${item}`);
    } else {
      if (selectedSuggestions.includes(item)) {
        setSelectedSuggestions(prev => prev.filter(i => i !== item));
      } else {
        setSelectedSuggestions(prev => [...prev, item]);
      }
      onSelect(item);
    }
  };

  const handleWedgeHover = (item: string | null) => {
    if (item && item !== hoveredWedge) {
      playSound('hover');
    }
    setHoveredWedge(item);
  };

  // Calculate wedge angles for primary options
  const primaryAngleStep = primaryOptions.length > 0 ? 360 / primaryOptions.length : 0;
  const suggestionAngleStep = dynamicSuggestions.length > 0 ? 360 / dynamicSuggestions.length : 0;

  return (
    <>
      <div className="radial-wedge-backdrop" onClick={(e) => {
        e.stopPropagation();
        playSound('close');
        onClose();
      }} />
      
      <div 
        className={`radial-wedge-menu ${isAnimating ? 'animating' : ''}`}
        style={{ 
          left: adjustedPosition.x,
          top: adjustedPosition.y,
          width: menuSize,
          height: menuSize
        }}
        ref={menuRef}
      >
        <svg 
          className="wedge-svg" 
          width={menuSize} 
          height={menuSize}
          style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))' }}
        >
          {/* Primary option wedges (inner ring) */}
          {primaryOptions.map((option, index) => {
            const startAngle = index * primaryAngleStep - 90;
            const endAngle = (index + 1) * primaryAngleStep - 90;
            const isSelected = selectedPrimaryItems.includes(option);
            const isHovered = hoveredWedge === `primary-${option}`;
            const textPos = getTextPosition(startAngle, endAngle, (innerRingStart + innerRingEnd) / 2);
            
            return (
              <g key={`primary-${option}`}>
                <path
                  d={createWedgePath(startAngle, endAngle, innerRingStart, innerRingEnd)}
                  fill={isSelected ? color : isHovered ? `${color}dd` : `${color}99`}
                  stroke="white"
                  strokeWidth="2"
                  className={`wedge primary-wedge ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
                  onClick={() => handleWedgeClick(option, true)}
                  onMouseEnter={() => handleWedgeHover(`primary-${option}`)}
                  onMouseLeave={() => handleWedgeHover(null)}
                  style={{
                    cursor: 'pointer',
                    transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill="white"
                  fontSize="14"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textPos.rotation} ${textPos.x} ${textPos.y})`}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {option}
                </text>
              </g>
            );
          })}

          {/* Suggestion wedges (outer ring) */}
          {dynamicSuggestions.map((suggestion, index) => {
            const startAngle = index * suggestionAngleStep - 90;
            const endAngle = (index + 1) * suggestionAngleStep - 90;
            const isSelected = selectedSuggestions.includes(suggestion);
            const isHovered = hoveredWedge === `suggestion-${suggestion}`;
            const textPos = getTextPosition(startAngle, endAngle, (outerRingStart + outerRingEnd) / 2);
            
            return (
              <g key={`suggestion-${suggestion}`}>
                <path
                  d={createWedgePath(startAngle, endAngle, outerRingStart, outerRingEnd)}
                  fill={isSelected ? '#f59e0b' : isHovered ? '#f59e0bdd' : '#f59e0b99'}
                  stroke="white"
                  strokeWidth="2"
                  className={`wedge suggestion-wedge ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
                  onClick={() => handleWedgeClick(suggestion, false)}
                  onMouseEnter={() => handleWedgeHover(`suggestion-${suggestion}`)}
                  onMouseLeave={() => handleWedgeHover(null)}
                  style={{
                    cursor: 'pointer',
                    transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill="white"
                  fontSize="12"
                  fontWeight="500"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textPos.rotation} ${textPos.x} ${textPos.y})`}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {suggestion}
                </text>
              </g>
            );
          })}

          {/* Center button */}
          <g>
            <circle
              cx={centerX}
              cy={centerY}
              r={centerRadius}
              fill="white"
              stroke={color}
              strokeWidth="3"
              filter="url(#centerShadow)"
              className="center-button"
              onClick={() => {
                playSound('select');
                triggerHaptic('medium');
                onSelect(centerItem.label);
              }}
              style={{ cursor: 'pointer' }}
            />
            <foreignObject
              x={centerX - centerRadius}
              y={centerY - centerRadius}
              width={centerRadius * 2}
              height={centerRadius * 2}
              style={{ pointerEvents: 'none' }}
            >
              <div className="center-content">
                <Icon size={32} color={centerItem.isSelected ? color : '#666'} />
                <span className="center-label">{centerItem.label}</span>
              </div>
            </foreignObject>
          </g>

          {/* SVG filters for effects */}
          <defs>
            <filter id="centerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="4" result="offsetblur"/>
              <feFlood floodColor="#000000" floodOpacity="0.2"/>
              <feComposite in2="offsetblur" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Close button */}
        <button 
          className="wedge-close-button"
          onClick={() => {
            playSound('close');
            onClose();
          }}
        >
          ×
        </button>
      </div>
    </>
  );
};