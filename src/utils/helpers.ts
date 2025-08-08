import { Patient, TimelineEvent } from '../types';
import { vitalThresholds, labThresholds } from '../constants/relationships';

export const createNewPatient = (
  room: string = '',
  name: string = '',
  mrn?: string,
  age?: string,
  provider?: string,
  allergies?: string[]
): Patient => {
  return {
    id: Date.now().toString(),
    room,
    name,
    mrn: mrn || '',
    age: age || '',
    provider: provider || '',
    admitDate: new Date().toLocaleDateString(),
    code: 'Full Code',
    allergies: allergies || [],
    vitals: {},
    labs: {},
    vitalsNotes: '',
    narrative: '',
    timeline: [],
    lastUpdate: new Date()
  };
};

export const formatTimestamp = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// Alias for formatTimestamp to match what components expect
export const formatTime = formatTimestamp;

export const createTimelineEvent = (
  category: string,
  section: string,
  item: string
): TimelineEvent => {
  return {
    id: Date.now().toString(),
    timestamp: new Date(),
    category,
    action: `${section}: ${item}`,
    item
  };
};

export const isVitalAbnormal = (item: string, value: string): boolean => {
  if (!value) return false;
  
  if (item === 'BP') {
    if (value.includes('/')) {
      const [systolic, diastolic] = value.split('/').map(v => parseFloat(v));
      return systolic < 90 || systolic > 140 || diastolic < 60 || diastolic > 90;
    }
    return false;
  }
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return false;
  
  const threshold = vitalThresholds[item];
  if (threshold) {
    if (threshold.critical_low !== undefined && numValue <= threshold.critical_low) return true;
    if (threshold.low !== undefined && numValue < threshold.low) return true;
    if (threshold.high !== undefined && numValue > threshold.high) return true;
    if (threshold.critical_high !== undefined && numValue >= threshold.critical_high) return true;
    
    // For min/max style thresholds
    if (threshold.min !== undefined && typeof threshold.min === 'number' && numValue < threshold.min) return true;
    if (threshold.max !== undefined && typeof threshold.max === 'number' && numValue > threshold.max) return true;
  }
  
  return false;
};

export const isLabAbnormal = (item: string, value: string, normalRange?: string): boolean => {
  if (!value) return false;
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return false;
  
  // First check against defined thresholds
  const threshold = labThresholds[item];
  if (threshold) {
    if (threshold.critical_low !== undefined && numValue <= threshold.critical_low) return true;
    if (threshold.low !== undefined && numValue < threshold.low) return true;
    if (threshold.high !== undefined && numValue > threshold.high) return true;
    if (threshold.critical_high !== undefined && numValue >= threshold.critical_high) return true;
    
    // For min/max style thresholds
    if (threshold.min !== undefined && typeof threshold.min === 'number' && numValue < threshold.min) return true;
    if (threshold.max !== undefined && typeof threshold.max === 'number' && numValue > threshold.max) return true;
  }
  
  // If no predefined threshold, try to parse the normal range
  if (normalRange && normalRange.includes('-')) {
    const [lowStr, highStr] = normalRange.split('-').map(s => s.trim());
    const low = parseFloat(lowStr);
    const high = parseFloat(highStr);
    
    if (!isNaN(low) && !isNaN(high)) {
      return numValue < low || numValue > high;
    }
  }
  
  return false;
};

export const getAbnormalTriggers = (type: string, item: string, value: string): string[] => {
  if (!value) return [];
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return [];
  
  if (type === 'vital') {
    const threshold = vitalThresholds[item];
    if (threshold) {
      if (threshold.critical_high !== undefined && numValue >= threshold.critical_high) {
        return threshold.triggers_high || [];
      }
      if (threshold.critical_low !== undefined && numValue <= threshold.critical_low) {
        return threshold.triggers_low || [];
      }
      // Also check non-critical thresholds
      if (threshold.high !== undefined && numValue > threshold.high) {
        return threshold.triggers_high || [];
      }
      if (threshold.low !== undefined && numValue < threshold.low) {
        return threshold.triggers_low || [];
      }
    }
  } else if (type === 'lab') {
    const threshold = labThresholds[item];
    if (threshold) {
      if (threshold.critical_high !== undefined && numValue >= threshold.critical_high) {
        return threshold.triggers_high || [];
      }
      if (threshold.critical_low !== undefined && numValue <= threshold.critical_low) {
        return threshold.triggers_low || [];
      }
      // Also check non-critical thresholds
      if (threshold.high !== undefined && numValue > threshold.high) {
        return threshold.triggers_high || [];
      }
      if (threshold.low !== undefined && numValue < threshold.low) {
        return threshold.triggers_low || [];
      }
    }
  }
  
  return [];
};

/**
 * Extract the display name from an item that might be grouped
 * @param item - Format: "mainItem:subItem" or just "mainItem"
 * @returns The display name for the narrative
 */
export const getItemDisplayName = (item: string): string => {
  if (item.includes(':')) {
    const [mainItem, subItem] = item.split(':');
    // Return just the sub-item name for cleaner narrative
    return subItem;
  }
  return item;
};

// Generate narrative from patient data and selections
export const generateNarrative = (patient: Patient, selectedItems: Record<string, any>): string => {
  let narrative = "SBAR NURSING HANDOFF REPORT\n";
  narrative += "Generated: " + new Date().toLocaleString() + "\n\n";
  
  // Patient Info
  narrative += `Patient: ${patient.name} | Room: ${patient.room} | MRN: ${patient.mrn}\n`;
  narrative += `Age: ${patient.age} | Code Status: ${patient.code}\n`;
  narrative += `Allergies: ${patient.allergies.length > 0 ? patient.allergies.join(', ') : 'NKDA'}\n`;
  narrative += `Provider: ${patient.provider}\n\n`;
  
  // Vitals if present
  if (Object.keys(patient.vitals).length > 0) {
    narrative += "CURRENT VITALS:\n";
    Object.entries(patient.vitals).forEach(([key, value]) => {
      if (value) {
        const item = key.split('-').pop() || key;
        const abnormal = isVitalAbnormal(item, value);
        narrative += `${item}: ${value}${abnormal ? ' *ABNORMAL*' : ''}\n`;
      }
    });
    narrative += "\n";
  }
  
  // Labs if present
  if (Object.keys(patient.labs).length > 0) {
    narrative += "CURRENT LABS:\n";
    Object.entries(patient.labs).forEach(([key, value]) => {
      if (value) {
        const item = key.split('-').pop() || key;
        const abnormal = isLabAbnormal(item, value, '');
        narrative += `${item}: ${value}${abnormal ? ' *ABNORMAL*' : ''}\n`;
      }
    });
    narrative += "\n";
  }
  
  // Selected items grouped by category
  const groupedItems: Record<string, string[]> = {};
  Object.entries(selectedItems).forEach(([key, item]) => {
    const category = item.category || key.split('-')[0];
    if (!groupedItems[category]) {
      groupedItems[category] = [];
    }
    groupedItems[category].push(getItemDisplayName(item.item || key.split('-').pop() || key));
  });
  
  // Add selections by category
  const categoryTitles: Record<string, string> = {
    situation: 'SITUATION',
    background: 'BACKGROUND',
    assessment: 'ASSESSMENT',
    interventions: 'INTERVENTIONS',
    recommendations: 'RECOMMENDATIONS'
  };
  
  Object.entries(categoryTitles).forEach(([key, title]) => {
    if (groupedItems[key] && groupedItems[key].length > 0) {
      narrative += `${title}:\n`;
      narrative += `${groupedItems[key].join(', ')}\n\n`;
    }
  });
  
  // Add vitals notes if present
  if (patient.vitalsNotes) {
    narrative += "ADDITIONAL NOTES:\n";
    narrative += patient.vitalsNotes + "\n\n";
  }
  
  // Add general notes if present
  if (patient.notes) {
    narrative += "GENERAL NOTES:\n";
    narrative += patient.notes + "\n";
  }
  
  return narrative;
};