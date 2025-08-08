// Validation utilities for vitals and labs

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  value: string;
}

// Vital signs validation ranges
const vitalRanges: Record<string, { min: number; max: number; name: string }> = {
  'BP Sys': { min: 60, max: 250, name: 'Systolic BP' },
  'BP Dia': { min: 30, max: 150, name: 'Diastolic BP' },
  'HR': { min: 20, max: 250, name: 'Heart Rate' },
  'RR': { min: 4, max: 60, name: 'Respiratory Rate' },
  'Temp': { min: 90, max: 110, name: 'Temperature' },
  'O2': { min: 50, max: 100, name: 'O2 Saturation' },
  'Pain': { min: 0, max: 10, name: 'Pain Score' }
};

// Lab validation ranges
const labRanges: Record<string, { min: number; max: number; name: string; decimals?: number }> = {
  'WBC': { min: 0.1, max: 100, name: 'WBC', decimals: 1 },
  'Hgb': { min: 3, max: 25, name: 'Hemoglobin', decimals: 1 },
  'Plt': { min: 1, max: 1000, name: 'Platelets' },
  'Na': { min: 100, max: 180, name: 'Sodium' },
  'K': { min: 1.5, max: 8, name: 'Potassium', decimals: 1 },
  'Cl': { min: 70, max: 140, name: 'Chloride' },
  'CO2': { min: 10, max: 50, name: 'CO2' },
  'BUN': { min: 1, max: 200, name: 'BUN' },
  'Cr': { min: 0.1, max: 20, name: 'Creatinine', decimals: 1 },
  'Glu': { min: 20, max: 800, name: 'Glucose' },
  'Mg': { min: 0.5, max: 5, name: 'Magnesium', decimals: 1 },
  'Phos': { min: 0.5, max: 10, name: 'Phosphorus', decimals: 1 },
  'Ca': { min: 4, max: 15, name: 'Calcium', decimals: 1 },
  'Lactate': { min: 0.1, max: 20, name: 'Lactate', decimals: 1 },
  'Troponin': { min: 0, max: 100, name: 'Troponin', decimals: 2 },
  'BNP': { min: 0, max: 5000, name: 'BNP' },
  'PT': { min: 8, max: 100, name: 'PT', decimals: 1 },
  'INR': { min: 0.5, max: 10, name: 'INR', decimals: 1 },
  'PTT': { min: 15, max: 200, name: 'PTT', decimals: 1 }
};

export function validateVital(type: string, value: string): ValidationResult {
  // Empty values are valid (not required)
  if (!value || value.trim() === '') {
    return { isValid: true, value: '' };
  }

  const range = vitalRanges[type];
  if (!range) {
    return { isValid: true, value }; // Unknown vital type, allow any value
  }

  const numValue = parseFloat(value);
  
  if (isNaN(numValue)) {
    return { 
      isValid: false, 
      error: `${range.name} must be a number`,
      value 
    };
  }

  if (numValue < range.min || numValue > range.max) {
    return { 
      isValid: false, 
      error: `${range.name} must be between ${range.min} and ${range.max}`,
      value 
    };
  }

  return { isValid: true, value: value };
}

export function validateLab(type: string, value: string): ValidationResult {
  // Empty values are valid (not required)
  if (!value || value.trim() === '') {
    return { isValid: true, value: '' };
  }

  const range = labRanges[type];
  if (!range) {
    return { isValid: true, value }; // Unknown lab type, allow any value
  }

  const numValue = parseFloat(value);
  
  if (isNaN(numValue)) {
    return { 
      isValid: false, 
      error: `${range.name} must be a number`,
      value 
    };
  }

  if (numValue < range.min || numValue > range.max) {
    return { 
      isValid: false, 
      error: `${range.name} must be between ${range.min} and ${range.max}`,
      value 
    };
  }

  // Check decimal places
  if (range.decimals !== undefined) {
    const decimalPlaces = (value.split('.')[1] || '').length;
    if (decimalPlaces > range.decimals) {
      return {
        isValid: false,
        error: `${range.name} can have at most ${range.decimals} decimal place${range.decimals === 1 ? '' : 's'}`,
        value
      };
    }
  }

  return { isValid: true, value: value };
}

// Sanitize text input to prevent XSS
export function sanitizeText(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/&/g, '&amp;');
}

// Validate and sanitize patient name
export function validatePatientName(name: string): ValidationResult {
  if (!name || name.trim().length === 0) {
    return { 
      isValid: false, 
      error: 'Patient name is required',
      value: name 
    };
  }

  if (name.length > 100) {
    return { 
      isValid: false, 
      error: 'Patient name must be less than 100 characters',
      value: name 
    };
  }

  const sanitized = sanitizeText(name.trim());
  return { isValid: true, value: sanitized };
}

// Validate room number
export function validateRoomNumber(room: string): ValidationResult {
  if (!room || room.trim().length === 0) {
    return { 
      isValid: false, 
      error: 'Room number is required',
      value: room 
    };
  }

  if (room.length > 10) {
    return { 
      isValid: false, 
      error: 'Room number must be less than 10 characters',
      value: room 
    };
  }

  const sanitized = sanitizeText(room.trim());
  return { isValid: true, value: sanitized };
}