import React from 'react';
import { X, Sparkles, Edit3, StickyNote } from 'lucide-react';
import { CategoryItem } from '../../types';
import './SBARButton.css';

interface SBARButtonProps {
  itemKey: string;
  itemData: CategoryItem;
  isSelected: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  categoryColor: string;
  onClick: () => void;
  onDismiss?: (e: React.MouseEvent) => void;
  onRightClick?: (e: React.MouseEvent) => void;
  priority?: string;
  tooltip?: string;
  hasNote?: boolean;
}

export const SBARButton: React.FC<SBARButtonProps> = ({
  itemKey,
  itemData,
  isSelected,
  isRelated,
  isDimmed,
  categoryColor,
  onClick,
  onDismiss,
  onRightClick,
  priority,
  tooltip,
  hasNote
}) => {
  const Icon = itemData.icon;
  
  const getClassName = () => {
    const classes = ['sbar-button'];
    if (isSelected) classes.push('selected');
    if (isRelated) classes.push('related');
    if (isDimmed) classes.push('dimmed');
    if (priority === 'critical') classes.push('critical');
    if (priority === 'high') classes.push('high');
    if (hasNote) classes.push('has-note');
    return classes.join(' ');
  };
  
  const getStyles = () => {
    if (isSelected) {
      return {
        backgroundColor: categoryColor,
        borderColor: categoryColor,
        color: 'white'
      };
    }
    if (isRelated) {
      return {
        borderColor: categoryColor,
        backgroundColor: `${categoryColor}10`
      };
    }
    return {};
  };
  
  return (
    <div className="sbar-button-wrapper">
      <button
        className={getClassName()}
        style={getStyles()}
        onClick={onClick}
        onContextMenu={(e) => {
          if (onRightClick) {
            e.preventDefault();
            onRightClick(e);
          }
        }}
        title={tooltip || (hasNote ? 'Has note attached' : '')}
      >
        {Icon && <Icon size={16} />}
        <span>{itemKey}</span>
        {isRelated && (
          <Sparkles size={12} className="sparkle-icon" />
        )}
      </button>
      {isSelected && (
        <button
          className="sbar-note-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (onRightClick) {
              onRightClick(e);
            }
          }}
          title={hasNote ? "Edit note" : "Add note"}
        >
          <StickyNote size={14} />
        </button>
      )}
      {isRelated && onDismiss && (
        <button
          className="dismiss-button"
          onClick={onDismiss}
          aria-label="Dismiss suggestion"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
};