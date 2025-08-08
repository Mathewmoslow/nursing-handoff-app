// src/utils/smartLogic.ts
import { SelectedItem, RelatedItem, Patient } from '../types';

// Clinical context type
export interface ClinicalContext {
  vitalsAbnormal: boolean;
  labsAbnormal: boolean;
  recentSelections: string[];
  timeOfDay: 'day' | 'night';
  patientAcuity: 'stable' | 'unstable' | 'critical';
}

// User behavior tracking
export interface UserBehavior {
  timestamp: Date;
  action: 'select' | 'deselect' | 'dismiss';
  item: string;
  context: ClinicalContext;
}

// AI Analysis type (simplified for now)
export interface AIAnalysis {
  hiddenConnections: string[];
  predictedNextSteps: string[];
  customProtocols: string[];
  riskFactors: string[];
  clinicalInsights: string[];
  confidence: number;
}

// Track user behavior
export const trackUserBehavior = (
  behavior: UserBehavior,
  history: UserBehavior[]
): UserBehavior[] => {
  return [...history, behavior].slice(-50); // Keep last 50 actions
};

// Simplified scoring function
export const calculateSuggestionScore = (
  primaryItem: string,
  relatedItem: string
): number => {
  // Simple scoring for now - you can enhance this later
  return 0.5;
};

// Get contextual suggestions
export const getContextualSuggestions = (
  context: ClinicalContext,
  selectedItems: Record<string, SelectedItem>
): RelatedItem[] => {
  const suggestions: RelatedItem[] = [];
  
  if (context.patientAcuity === 'critical') {
    suggestions.push({
      item: 'Critical Care Protocol',
      source: 'Critical Status',
      score: 0.9,
      timestamp: new Date()
    });
  }
  
  if (context.vitalsAbnormal) {
    suggestions.push({
      item: 'Notify MD',
      source: 'Abnormal Vitals',
      score: 0.8,
      timestamp: new Date()
    });
  }
  
  return suggestions;
};

// Conflict detection logic
export const getConflictingItems = (
  category: string,
  section: string,
  item: string,
  selectedItems: Record<string, SelectedItem>
): string[] => {
  const conflicts: string[] = [];
  const key = `${category}-${section}-${item}`;
  
  // Define conflict rules
  const conflictRules: Record<string, string[]> = {
    'interventions-medications-Heparin': ['interventions-procedures-Surgery'],
    'interventions-procedures-Surgery': ['interventions-medications-Heparin'],
    'assessment-code-DNR': ['recommendations-immediate-RRT'],
    'recommendations-immediate-RRT': ['assessment-code-DNR'],
  };
  
  if (conflictRules[key]) {
    conflictRules[key].forEach(conflictKey => {
      if (selectedItems[conflictKey]) {
        conflicts.push(conflictKey);
      }
    });
  }
  
  return conflicts;
};

// Protocol bundles
export interface ProtocolBundle {
  name: string;
  conditions: string[];
  items: string[];
  priority: 'critical' | 'high' | 'medium';
  description?: string;
}

export const protocolBundles: Record<string, ProtocolBundle> = {
  sepsisBundle: {
    name: 'Sepsis Bundle',
    conditions: ['Sepsis', 'Fever', 'Hypotensive', 'Tachycardic'],
    items: ['Stat Labs', 'Blood Cultures', 'Lactate', 'Antibiotics', 'IV Fluids', 'Pressors'],
    priority: 'critical',
    description: 'Complete sepsis management protocol'
  },
  strokeProtocol: {
    name: 'Stroke Protocol',
    conditions: ['CVA', 'Altered Mental Status', 'Neuro Changes'],
    items: ['Stat CT', 'Neuro Checks', 'Call MD', 'Stroke Alert', 'tPA Screen'],
    priority: 'critical'
  },
  chestPainProtocol: {
    name: 'Chest Pain Protocol',
    conditions: ['Chest Pain', 'MI', 'Angina'],
    items: ['Stat EKG', 'Troponin', 'Aspirin', 'Nitroglycerin', 'Morphine', 'Cards'],
    priority: 'critical'
  }
};

// Helper functions for AI analysis (simplified versions)
const identifyPatterns = (selectedItems: Record<string, SelectedItem>): string[] => {
  const patterns: string[] = [];
  const items = Object.values(selectedItems).map(s => s.item);
  
  // Identify common clinical patterns
  if (items.includes('Fever') && items.includes('Tachycardic')) {
    patterns.push('infection_pattern');
  }
  if (items.includes('Chest Pain') && items.includes('SOB')) {
    patterns.push('cardiac_respiratory_pattern');
  }
  if (items.includes('Altered Mental Status') && items.includes('Hypoglycemic')) {
    patterns.push('metabolic_pattern');
  }
  
  return patterns;
};

const findHiddenConnections = (patterns: string[]): string[] => {
  const connections: string[] = [];
  
  if (patterns.includes('infection_pattern')) {
    connections.push('Consider sepsis workup - check lactate and blood cultures');
  }
  if (patterns.includes('cardiac_respiratory_pattern')) {
    connections.push('Differential includes PE, ACS, CHF exacerbation');
  }
  
  return connections;
};

const predictNextSelections = (patterns: string[], selectedItems: Record<string, SelectedItem>): string[] => {
  const predictions: string[] = [];
  const currentItems = Object.values(selectedItems).map(s => s.item);
  
  if (patterns.includes('infection_pattern') && !currentItems.includes('Blood Cultures')) {
    predictions.push('Blood Cultures', 'Lactate', 'Antibiotics');
  }
  
  return predictions;
};

const generateCustomProtocols = (patterns: string[], patientData: Patient): string[] => {
  const protocols: string[] = [];
  
  if (patterns.includes('infection_pattern')) {
    protocols.push('Initiate Sepsis Bundle Protocol');
  }
  
  return protocols;
};

const identifyRiskFactors = (patterns: string[], patientData: Patient): string[] => {
  const risks: string[] = [];
  
  if (patientData.age && parseInt(patientData.age) > 65) {
    risks.push('Elderly patient - increased fall risk');
  }
  
  return risks;
};

// Main AI integration function (simplified)
export const analyzeSelectionPattern = async (
  selectedItems: Record<string, SelectedItem>,
  patientData: Patient
): Promise<AIAnalysis> => {
  // Simplified rule-based analysis
  const patterns = identifyPatterns(selectedItems);
  
  return {
    hiddenConnections: findHiddenConnections(patterns),
    predictedNextSteps: predictNextSelections(patterns, selectedItems),
    customProtocols: generateCustomProtocols(patterns, patientData),
    riskFactors: identifyRiskFactors(patterns, patientData),
    clinicalInsights: [],
    confidence: 0.5
  };
};