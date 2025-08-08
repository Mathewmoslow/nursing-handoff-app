// src/components/GroupedButton/GroupedButton.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { CategoryItem } from '../../types';
import { buttonGroups, buttonGroupsConfig, formBoxButtonMapping } from '../../constants/buttonGroups';
import './GroupedButton.css';

interface SubItem {
  key: string;
  data: CategoryItem;
  category: string;
  section: string;
  fullKey: string;
}

interface GroupedButtonProps {
  groupKey: string;
  mainItem: string;
  mainItemData: CategoryItem;
  categoryKey: string;
  sectionKey: string;
  isSelected: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  categoryColor: string;
  onSelect: (category: string, section: string, item: string) => void;
  onDismiss?: (key: string, e: React.MouseEvent) => void;
  sbarCategories: any;
  selectedItems: Record<string, any>;
}

// Helper function to find group config in formBoxButtonMapping
function findInFormMapping(groupKey: string) {
  for (const box of Object.values(formBoxButtonMapping)) {
    const buttons = (box as any).buttons;
    if (buttons && buttons[groupKey]) {
      return buttons[groupKey];
    }
  }
  return null;
}

export const GroupedButton: React.FC<GroupedButtonProps> = ({
  groupKey,
  mainItem,
  mainItemData,
  categoryKey,
  sectionKey,
  isSelected,
  isRelated,
  isDimmed,
  categoryColor,
  onSelect,
  onDismiss,
  sbarCategories,
  selectedItems
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const Icon = mainItemData.icon;
  
  // Try multiple sources for group configuration
  const groupConfig = 
    (buttonGroups as any)[categoryKey]?.[sectionKey]?.[groupKey] ||
    findInFormMapping(groupKey) ||
    findInFormMapping(mainItem);
  
  // Create sub-items dynamically from the configuration
  const subItems: SubItem[] = [];
  
  // Debug logging - AFTER variable declarations
  console.log('GroupedButton Debug:', {
    mainItem,
    groupKey,
    groupConfig,
    formMapping: findInFormMapping(mainItem),
    buttonGroupsConfig: buttonGroupsConfig[mainItem],
    subItemsLength: subItems.length
  });
  
  if (groupConfig && groupConfig.subItems) {
    Object.entries(groupConfig.subItems).forEach(([subKey, subData]) => {
      const fullKey = `${categoryKey}-${sectionKey}-${mainItem}:${subKey}`;
      subItems.push({
        key: subKey,
        data: subData as CategoryItem,
        category: categoryKey,
        section: sectionKey,
        fullKey
      });
    });
  }

  console.log('SubItems created:', {
    mainItem,
    subItemsLength: subItems.length,
    subItems: subItems.map(item => item.key)
  });
  
  // Alternative: Use the flat buttonGroupsConfig if no nested config found
  if (subItems.length === 0 && buttonGroupsConfig[groupKey]) {
    const subItemKeys = buttonGroupsConfig[groupKey];
    subItemKeys.forEach((subKey: string) => {
      const fullKey = `${categoryKey}-${sectionKey}-${mainItem}:${subKey}`;
      subItems.push({
        key: subKey,
        data: { 
          icon: mainItemData.icon,
          priority: 'medium' as any 
        },
        category: categoryKey,
        section: sectionKey,
        fullKey
      });
    });
  }
  
  // Also check if mainItem is a group key
  if (subItems.length === 0 && buttonGroupsConfig[mainItem]) {
    const subItemKeys = buttonGroupsConfig[mainItem];
    subItemKeys.forEach((subKey: string) => {
      const fullKey = `${categoryKey}-${sectionKey}-${mainItem}:${subKey}`;
      subItems.push({
        key: subKey,
        data: { 
          icon: mainItemData.icon,
          priority: 'medium' as any 
        },
        category: categoryKey,
        section: sectionKey,
        fullKey
      });
    });
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isExpanded]);

  // Check if any sub-items are selected
  const selectedSubItemCount = subItems.filter(
    item => selectedItems[item.fullKey]
  ).length;

  const hasSelectedSubItems = selectedSubItemCount > 0;

  const getClassName = () => {
    const classes = ['grouped-button'];
    if (isSelected || hasSelectedSubItems) classes.push('selected');
    if (isRelated) classes.push('related');
    if (isDimmed) classes.push('dimmed');
    return classes.join(' ');
  };

  const getStyles = () => {
    if (isSelected || hasSelectedSubItems) {
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

  const handleMainClick = () => {
    console.log('HandleMainClick:', {
      mainItem,
      subItemsLength: subItems.length,
      isExpanded,
      willExpand: subItems.length > 0
    });
    
    if (subItems.length > 0) {
      setIsExpanded(!isExpanded);
    } else {
      onSelect(categoryKey, sectionKey, mainItem);
    }
  };

  const handleSubItemClick = (subItem: SubItem) => {
    // Pass the sub-item with special notation
    onSelect(categoryKey, sectionKey, `${mainItem}:${subItem.key}`);
  };

  return (
    <div className="grouped-button-wrapper" ref={dropdownRef}>
      <button
        className={getClassName()}
        style={getStyles()}
        onClick={handleMainClick}
        title={`${mainItem}${subItems.length > 0 ? ' (click to expand)' : ''}`}
      >
        {Icon && <Icon size={16} />}
        <span>{mainItem}</span>
        {subItems.length > 0 && (
          <span className="expand-icon">
            {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </span>
        )}
        {hasSelectedSubItems && !isExpanded && (
          <span className="selected-count">
            {selectedSubItemCount}
          </span>
        )}
      </button>
      
      {isExpanded && subItems.length > 0 && (
        <div className="subitems-dropdown" style={{ borderColor: categoryColor }}>
          {subItems.map((subItem) => {
            const SubIcon = subItem.data.icon;
            const isSubSelected = !!selectedItems[subItem.fullKey];
            
            return (
              <button
                key={subItem.key}
                className={`subitem-button ${isSubSelected ? 'selected' : ''}`}
                onClick={() => handleSubItemClick(subItem)}
                style={{ 
                  borderColor: isSubSelected ? categoryColor : `${categoryColor}40`,
                  backgroundColor: isSubSelected ? `${categoryColor}20` : 'transparent'
                }}
              >
                {SubIcon && <SubIcon size={14} />}
                <span className="item-text">{subItem.key}</span>
                {subItem.data.priority && subItem.data.priority !== 'medium' && (
                  <span className={`priority-indicator ${subItem.data.priority}`}>
                    {subItem.data.priority === 'critical' ? '!' : 
                     subItem.data.priority === 'high' ? '•' : ''}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};