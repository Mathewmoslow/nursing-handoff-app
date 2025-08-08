import React from 'react';
import { Category } from '../../types';
import { SBARButton } from '../SBARButton/SBARButton';
import { GroupedButton } from '../GroupedButton/GroupedButton';
import { itemsToGroup } from '../../constants/buttonGroups';
import { sbarCategories } from '../../constants/categories';
import './CategorySection.css';

interface CategorySectionProps {
  categoryKey: string;
  category: Category;
  selectedItems: Record<string, any>;
  relatedItems: Record<string, any>;
  dismissedSuggestions: Record<string, boolean>;
  onItemSelect: (category: string, section: string, item: string) => void;
  onDismissSuggestion: (key: string, e: React.MouseEvent) => void;
  isDimmed: (category: string, section: string, item: string) => boolean;
  differentialPatterns?: Record<string, any>;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categoryKey,
  category,
  selectedItems,
  relatedItems,
  dismissedSuggestions,
  onItemSelect,
  onDismissSuggestion,
  isDimmed,
  differentialPatterns
}) => {
  const Icon = category.icon;
  
  return (
    <div className="category-section">
      <div 
        className="category-header"
        style={{ 
          backgroundColor: `${category.color}10`, 
          borderColor: category.color 
        }}
      >
        <Icon size={18} style={{ color: category.color }} />
        <h2>{category.title}</h2>
      </div>
      
      <div className="category-content">
        {Object.entries(category.sections).map(([sectionKey, section]) => (
          <div key={sectionKey} className="section">
            <h3>{section.title}</h3>
            <div className="items-grid">
              {Object.entries(section.items).map(([itemKey, itemData]) => {
                const key = `${categoryKey}-${sectionKey}-${itemKey}`;
                const isSelected = !!selectedItems[key];
                const isRelated = !!relatedItems[key] && !dismissedSuggestions[key];
                const dimmed = isDimmed(categoryKey, sectionKey, itemKey);
                
                // Check if this item should be grouped
                const groupKey = itemsToGroup[itemKey];
                
                if (groupKey) {
                  return (
                    <GroupedButton
                      key={itemKey}
                      groupKey={groupKey}
                      mainItem={itemKey}
                      mainItemData={itemData}
                      categoryKey={categoryKey}
                      sectionKey={sectionKey}
                      isSelected={isSelected}
                      isRelated={isRelated}
                      isDimmed={dimmed}
                      categoryColor={category.color}
                      onSelect={onItemSelect}
                      onDismiss={isRelated ? onDismissSuggestion : undefined}
                      sbarCategories={sbarCategories}
                      selectedItems={selectedItems}
                    />
                  );
                }
                
                // Regular button for non-grouped items
                return (
                  <SBARButton
                    key={itemKey}
                    itemKey={itemKey}
                    itemData={itemData}
                    isSelected={isSelected}
                    isRelated={isRelated}
                    isDimmed={dimmed}
                    categoryColor={category.color}
                    onClick={() => onItemSelect(categoryKey, sectionKey, itemKey)}
                    onDismiss={isRelated ? (e) => onDismissSuggestion(key, e) : undefined}
                    priority={itemData.priority}
                    tooltip={differentialPatterns?.[itemKey] ? 
                      `Differential: ${Object.keys(differentialPatterns[itemKey])
                        .filter(k => k !== 'priority')
                        .join(', ')}` : 
                      ''
                    }
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};