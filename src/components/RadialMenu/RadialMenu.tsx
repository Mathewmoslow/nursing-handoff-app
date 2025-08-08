import React, { useEffect, useRef } from 'react';
import './RadialMenu.css';

interface RadialMenuProps {
  items: string[];
  isOpen: boolean;
  onSelect: (item: string) => void;
  onClose: () => void;
  position?: { x: number; y: number };
  centerLabel?: string;
  color?: string;
}

export const RadialMenu: React.FC<RadialMenuProps> = ({
  items,
  isOpen,
  onSelect,
  onClose,
  position = { x: 0, y: 0 },
  centerLabel = 'Select',
  color = '#3b82f6'
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const angleStep = (2 * Math.PI) / items.length;
  const radius = 120;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside the menu AND the button that triggered it
      const target = event.target as Node;
      const isInsideMenu = menuRef.current && menuRef.current.contains(target);
      const isButton = target instanceof Element && (
        target.classList.contains('compact-button') ||
        target.closest('.compact-button')
      );
      
      if (!isInsideMenu && !isButton) {
        onClose();
      }
    };

    if (isOpen) {
      // Use timeout to prevent immediate close
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="radial-menu-overlay"
      style={{ 
        left: position.x,
        top: position.y,
      }}
    >
      <div className={`radial-menu ${isOpen ? 'open' : ''}`} ref={menuRef}>
        {/* Center button */}
        <div className="radial-center" style={{ borderColor: color }}>
          <button 
            className="center-button" 
            onClick={onClose}
            style={{ backgroundColor: color }}
          >
            <span className="center-label">{centerLabel}</span>
            <span className="close-icon">×</span>
          </button>
        </div>

        {/* Radial items */}
        {items.map((item, index) => {
          const angle = angleStep * index - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          // Calculate rotation for text to be readable
          let rotation = (angle * 180 / Math.PI) + 90;
          if (rotation > 90 && rotation < 270) {
            rotation += 180;
          }

          return (
            <button
              key={item}
              className="radial-item"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                '--item-color': color,
              } as React.CSSProperties}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
            >
              <span 
                className="radial-item-text"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {item}
              </span>
            </button>
          );
        })}

        {/* Connection lines */}
        <svg className="radial-connections" width="300" height="300">
          {items.map((_, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const x = Math.cos(angle) * radius + 150;
            const y = Math.sin(angle) * radius + 150;

            return (
              <line
                key={index}
                x1="150"
                y1="150"
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth="1"
                opacity="0.2"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};