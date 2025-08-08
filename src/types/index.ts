// src/types/index.ts
import { LucideIcon } from 'lucide-react';

export interface Patient {
  id: string;
  room: string;
  name: string;
  mrn?: string;
  age?: string;
  dob?: string;
  admitDate?: string;
  code: string;
  allergies: string[];
  provider?: string;
  vitals: Record<string, string>;
  labs: Record<string, string>;
  narrative: string;
  timeline: TimelineEvent[];
  lastUpdate?: Date;
  notes?: string;
  vitalsNotes?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  action: string;
  category: string;
  item: string;
}

export interface SelectedItem {
  category: string;
  section: string;
  item: string;
  timestamp: Date;
}

export interface RelatedItem {
  item: string;
  score: number;
  source: string;
  timestamp: Date;
}

export interface CategoryItem {
  icon: LucideIcon;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  color?: string;
}

export interface Section {
  title: string;
  items: Record<string, CategoryItem>;
}

export interface Category {
  title: string;
  icon: LucideIcon;
  color: string;
  sections: Record<string, Section>;
}

export interface PatientData {
  situation: Record<string, string[]>;
  background: Record<string, string[]>;
  assessment: Record<string, string[]>;
  interventions: Record<string, string[]>;
  recommendations: Record<string, string[]>;
}

export interface StoredData {
  patients: Patient[];
  activePatient: number;
  darkMode: boolean;
  selectedItems: Record<string, SelectedItem>;
  relatedItems: Record<string, RelatedItem>;
  dismissedSuggestions: Record<string, boolean>;
  lastSaved?: Date;
}

// New Form-specific types
export interface FormButton {
  mainButton: string;
  icon: LucideIcon;
  category: string;
  section: string;
  options?: string[];
  hasInput?: boolean;
  inputType?: 'text' | 'number' | 'rate';
  modal?: string;
  min?: number;
  max?: number;
}

export interface FormSection {
  title: string;
  color: string;
  buttons: Record<string, FormButton>;
}

export interface VitalSign {
  time: string;
  value: string;
  abnormal?: boolean;
}

export interface LabResult {
  time: string;
  value: string;
  abnormal?: boolean;
  trend?: 'up' | 'down' | 'stable';
}
// Vitals-specific types
export interface VitalConfig {
  unit: string;
  format?: string;
  normal: string;
}

export interface LabSection {
  title: string;
  items: Record<string, VitalConfig>;
}

export interface VitalsCategory {
  title: string;
  icon: LucideIcon;
  items?: Record<string, VitalConfig>;
  sections?: Record<string, LabSection>;
}
