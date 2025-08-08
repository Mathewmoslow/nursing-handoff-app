// src/utils/dynamicItemHelpers.ts

import { buttonGroups } from '../constants/buttonGroups';

/**
 * Parse a dynamic item key to extract its components
 * @param itemKey - Format: "mainItem:subItem" or just "mainItem"
 * @returns Object with mainItem and subItem (if exists)
 */
export function parseDynamicItemKey(itemKey: string): {
  mainItem: string;
  subItem?: string;
  isGrouped: boolean;
} {
  if (itemKey.includes(':')) {
    const [mainItem, subItem] = itemKey.split(':');
    return { mainItem, subItem, isGrouped: true };
  }
  return { mainItem: itemKey, isGrouped: false };
}

/**
 * Get the display name for an item (handles both regular and dynamic items)
 * @param itemKey - The item key (may include ':' for sub-items)
 * @returns Display name for narrative
 */
export function getItemDisplayName(itemKey: string): string {
  const { mainItem, subItem, isGrouped } = parseDynamicItemKey(itemKey);
  
  if (isGrouped && subItem) {
    // For medications, we might want to show both
    // e.g., "Vancomycin (Antibiotic)" or just "Vancomycin"
    return subItem;
  }
  
  return mainItem;
}

/**
 * Get item details from either static categories or dynamic groups
 * @param categoryKey - The category key
 * @param sectionKey - The section key
 * @param itemKey - The item key (may include ':' for sub-items)
 * @returns Item data including icon and priority
 */
export function getDynamicItemData(
  categoryKey: string,
  sectionKey: string,
  itemKey: string
): { icon?: any; priority?: string; displayName: string } | null {
  const { mainItem, subItem, isGrouped } = parseDynamicItemKey(itemKey);
  
  if (isGrouped && subItem) {
    // Look for the item in the buttonGroups configuration
    const groupConfig = (buttonGroups as any)[categoryKey]?.[sectionKey]?.[mainItem];
    if (groupConfig?.subItems?.[subItem]) {
      return {
        ...groupConfig.subItems[subItem],
        displayName: subItem
      };
    }
  }
  
  return null;
}

/**
 * Format selected items for narrative generation
 * Handles both regular items and dynamic sub-items
 */
export function formatSelectedItemsForNarrative(
  selectedItems: Record<string, any>,
  sbarCategories: any
): Record<string, string[]> {
  const formatted: Record<string, string[]> = {
    situation: [],
    background: [],
    assessment: [],
    interventions: [],
    recommendations: []
  };

  Object.entries(selectedItems).forEach(([key, item]) => {
    const [category, section, itemKey] = key.split('-');
    const { mainItem, subItem, isGrouped } = parseDynamicItemKey(itemKey);
    
    let displayName = mainItem;
    
    if (isGrouped && subItem) {
      // For grouped items, use the sub-item name
      displayName = subItem;
      
      // Special formatting for certain categories
      if (section === 'medications') {
        // For meds, we might want to include the category
        // e.g., "Vancomycin (antibiotic)"
        displayName = `${subItem}`;
      }
    }
    
    if (formatted[category]) {
      formatted[category].push(displayName);
    }
  });

  return formatted;
}

/**
 * Check if a dynamic item should trigger related suggestions
 * @param itemKey - The item key (may include ':' for sub-items)
 * @returns The base item key for relationship lookup
 */
export function getRelationshipKey(itemKey: string): string {
  const { mainItem, subItem, isGrouped } = parseDynamicItemKey(itemKey);
  
  // For sub-items, we might want to check relationships for both
  // the sub-item (e.g., "Vancomycin") and the parent (e.g., "Abx")
  if (isGrouped && subItem) {
    // For now, use the sub-item for relationships
    // This allows "Vancomycin" to trigger specific relationships
    return subItem;
  }
  
  return mainItem;
}