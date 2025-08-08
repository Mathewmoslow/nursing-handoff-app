import { Activity, TestTube } from 'lucide-react';
import { VitalsCategory } from '../types';

export const vitalsCategories: Record<string, VitalsCategory> = {
  vitals: {
    title: 'Vital Signs',
    icon: Activity,
    items: {
      'BP': { unit: 'mmHg', format: '###/##', normal: '120/80' },
      'HR': { unit: 'bpm', normal: '60-100' },
      'RR': { unit: '/min', normal: '12-20' },
      'Temp': { unit: '°F', normal: '98.6' },
      'O2 Sat': { unit: '%', normal: '95-100' },
      'Pain': { unit: '/10', normal: '0' },
      'Accucheck': { unit: 'mg/dL', normal: '70-110' }
    }
  },
  labs: {
    title: 'Laboratory Values',
    icon: TestTube,
    sections: {
      cbc: {
        title: 'CBC',
        items: {
          'WBC': { unit: 'K/μL', normal: '4.5-11' },
          'Hgb': { unit: 'g/dL', normal: '12-16' },
          'Hct': { unit: '%', normal: '36-46' },
          'Plt': { unit: 'K/μL', normal: '150-400' }
        }
      },
      chemistry: {
        title: 'Chemistry',
        items: {
          'Na': { unit: 'mEq/L', normal: '136-145' },
          'K': { unit: 'mEq/L', normal: '3.5-5.0' },
          'Cl': { unit: 'mEq/L', normal: '98-106' },
          'CO2': { unit: 'mEq/L', normal: '22-28' },
          'BUN': { unit: 'mg/dL', normal: '7-20' },
          'Cr': { unit: 'mg/dL', normal: '0.6-1.2' },
          'Glucose': { unit: 'mg/dL', normal: '70-110' },
          'Ca': { unit: 'mg/dL', normal: '8.5-10.5' },
          'Mg': { unit: 'mg/dL', normal: '1.7-2.2' },
          'Phos': { unit: 'mg/dL', normal: '2.5-4.5' }
        }
      },
      cardiac: {
        title: 'Cardiac',
        items: {
          'Troponin': { unit: 'ng/mL', normal: '<0.04' },
          'BNP': { unit: 'pg/mL', normal: '<100' },
          'CK': { unit: 'U/L', normal: '30-200' },
          'CK-MB': { unit: 'ng/mL', normal: '0-6.3' }
        }
      },
      coags: {
        title: 'Coagulation',
        items: {
          'PT': { unit: 'sec', normal: '11-13' },
          'INR': { unit: '', normal: '0.8-1.2' },
          'PTT': { unit: 'sec', normal: '25-35' },
          'Fibrinogen': { unit: 'mg/dL', normal: '200-400' }
        }
      },
      abg: {
        title: 'ABG',
        items: {
          'pH': { unit: '', normal: '7.35-7.45' },
          'pCO2': { unit: 'mmHg', normal: '35-45' },
          'pO2': { unit: 'mmHg', normal: '80-100' },
          'HCO3': { unit: 'mEq/L', normal: '22-26' },
          'SaO2': { unit: '%', normal: '95-100' }
        }
      },
      liver: {
        title: 'Liver',
        items: {
          'AST': { unit: 'U/L', normal: '10-40' },
          'ALT': { unit: 'U/L', normal: '7-56' },
          'Alk Phos': { unit: 'U/L', normal: '44-147' },
          'T Bili': { unit: 'mg/dL', normal: '0.1-1.2' },
          'Albumin': { unit: 'g/dL', normal: '3.5-5.0' }
        }
      },
      other: {
        title: 'Other',
        items: {
          'Lactate': { unit: 'mmol/L', normal: '<2' },
          'Ammonia': { unit: 'μg/dL', normal: '15-45' },
          'TSH': { unit: 'mIU/L', normal: '0.4-4.0' },
          'A1C': { unit: '%', normal: '<5.7' },
          'Pro-BNP': { unit: 'pg/mL', normal: '<125' }
        }
      }
    }
  }
};