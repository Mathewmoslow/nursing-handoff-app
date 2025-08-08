// src/constants/formSections.ts
import { 
  Brain, Wind, Heart, Package, Shield, Activity, 
  TestTube, Target, Phone, AlertTriangle, Monitor,
  User, Eye, Droplet, Thermometer, Gauge, Bed,
  Clock, Pill, Syringe, Home, Bug, Users, MapPin
} from 'lucide-react';
import { FormSection } from '../types';

export const formSections: Record<string, FormSection> = {
  neuro: {
    title: 'NEURO',
    color: '#8b5cf6',
    buttons: {
      'A&O': {
        mainButton: 'A&O',
        icon: Brain,
        category: 'assessment',
        section: 'neuro',
        options: ['x4', 'x3', 'x2', 'x1', 'Confused', 'Sedated', 'Comatose']
      },
      'Pupils': {
        mainButton: 'Pupils',
        icon: Eye,
        category: 'assessment',
        section: 'neuro',
        options: ['PERRL', 'Sluggish', 'Fixed', 'Dilated', 'Pinpoint']
      },
      'Movement': {
        mainButton: 'Movement',
        icon: Activity,
        category: 'assessment',
        section: 'neuro',
        options: ['Normal', 'Weak L', 'Weak R', 'No Movement', 'Tremor']
      },
      'Behavior': {
        mainButton: 'Behavior',
        icon: Brain,
        category: 'assessment',
        section: 'neuro',
        options: ['Calm', 'Anxious', 'Agitated', 'Combative', 'Confused', 'Hallucinations', 'Withdrawn', 'Cooperative']
      },
      'Mood': {
        mainButton: 'Mood',
        icon: User,
        category: 'assessment',
        section: 'neuro',
        options: ['Normal', 'Depressed', 'Manic', 'Flat', 'Labile', 'Euphoric']
      }
    }
  },

  cardiac: {
    title: 'CARDIAC',
    color: '#ef4444',
    buttons: {
      'Tele': {
        mainButton: 'Tele',
        icon: Heart,
        category: 'assessment',
        section: 'cardiac',
        options: ['SR', 'ST', 'SB', 'AF', 'AF RVR', 'VT', 'VF', 'Paced']
      },
      'Edema': {
        mainButton: 'Edema',
        icon: Droplet,
        category: 'assessment',
        section: 'cardiac',
        options: ['None', '+1', '+2', '+3', '+4']
      },
      'CP': {
        mainButton: 'CP',
        icon: Heart,
        category: 'assessment',
        section: 'cardiac',
        options: ['None', 'Stable', 'Increasing', 'Resolved']
      }
    }
  },

  resp: {
    title: 'RESP',
    color: '#06b6d4',
    buttons: {
      'O2': {
        mainButton: 'O2',
        icon: Wind,
        category: 'assessment',
        section: 'respiratory',
        options: ['RA', 'NC 2L', 'NC 4L', 'NC 6L', 'FM 10L', 'FM 15L', 'HFNC', 'BiPAP', 'CPAP', 'Vent'],
        hasInput: true
      },
      'Lungs': {
        mainButton: 'Lungs',
        icon: Wind,
        category: 'assessment',
        section: 'respiratory',
        options: ['Clear', 'Diminished', 'Crackles', 'Wheezes', 'Rhonchi', 'Absent']
      },
      'Cough': {
        mainButton: 'Cough',
        icon: Wind,
        category: 'assessment',
        section: 'respiratory',
        options: ['None', 'Dry', 'Productive', 'Hemoptysis']
      }
    }
  },

  gi: {
    title: 'GI',
    color: '#f59e0b',
    buttons: {
      'Diet': {
        mainButton: 'Diet',
        icon: Package,
        category: 'background',
        section: 'diet',
        options: ['Regular', 'Cardiac', 'Diabetic', 'NPO', 'Clear Liquids', 'Pureed', 'TF', 'TPN']
      },
      'Abdomen': {
        mainButton: 'Abdomen',
        icon: Package,
        category: 'assessment',
        section: 'gi',
        options: ['Soft', 'Firm', 'Distended', 'Tender', 'Guarding']
      },
      'BM': {
        mainButton: 'BM',
        icon: Activity,
        category: 'assessment',
        section: 'gi',
        options: ['Today', 'Yesterday', '2 days', '3+ days', 'Diarrhea', 'Melena']
      },
      'N/V': {
        mainButton: 'N/V',
        icon: Package,
        category: 'assessment',
        section: 'gi',
        options: ['None', 'Nausea', 'Vomiting', 'Both']
      }
    }
  },

  gu: {
    title: 'GU',
    color: '#10b981',
    buttons: {
      'Urine': {
        mainButton: 'Urine',
        icon: Droplet,
        category: 'assessment',
        section: 'gu',
        options: ['Clear', 'Amber', 'Dark', 'Bloody', 'Anuric']
      },
      'Foley': {
        mainButton: 'Foley',
        icon: Droplet,
        category: 'assessment',
        section: 'gu',
        options: ['Yes', 'No']
      },
      'Continent': {
        mainButton: 'Continent',
        icon: Droplet,
        category: 'assessment',
        section: 'gu',
        options: ['Yes', 'No', 'Incontinent']
      }
    }
  },

  skin: {
    title: 'SKIN/WOUNDS',
    color: '#ec4899',
    buttons: {
      'Skin': {
        mainButton: 'Skin',
        icon: Shield,
        category: 'assessment',
        section: 'skin',
        options: ['Intact', 'Warm/Dry', 'Cool', 'Diaphoretic', 'Jaundiced', 'Pale', 'Flushed']
      },
      'Wounds': {
        mainButton: 'Wounds',
        icon: AlertTriangle,
        category: 'assessment',
        section: 'skin',
        options: ['None', 'Surgical', 'Pressure Injury', 'Laceration', 'Abrasion', 'Ulcer']
      },
      'Braden': {
        mainButton: 'Braden',
        icon: Gauge,
        category: 'assessment',
        section: 'skin',
        hasInput: true,
        inputType: 'number',
        min: 6,
        max: 23
      }
    }
  },

  devices: {
    title: 'DRAINS/DEVICES',
    color: '#6366f1',
    buttons: {
      'IV': {
        mainButton: 'IV Access',
        icon: Syringe,
        category: 'assessment',
        section: 'lines',
        options: ['PIV x1', 'PIV x2', 'Central', 'PICC', 'Port', 'Midline', 'IO', 'Saline Lock', 'Infiltrated']
      },
      'Drains': {
        mainButton: 'Drains',
        icon: Activity,
        category: 'assessment',
        section: 'lines',
        options: ['None', 'JP', 'Blake', 'Chest Tube', 'NG', 'PEG', 'G-tube', 'J-tube', 'Penrose']
      },
      'Devices': {
        mainButton: 'Devices',
        icon: Monitor,
        category: 'assessment',
        section: 'lines',
        options: ['SCDs', 'Tele', 'Pacemaker', 'AICD', 'ETT', 'Trach', 'BiPAP', 'CPAP', 'Wound Vac', 'Foley']
      }
    }
  },

  tests: {
    title: 'TESTS/IMAGING',
    color: '#0ea5e9',
    buttons: {
      'Labs': {
        mainButton: 'Labs',
        icon: TestTube,
        category: 'interventions',
        section: 'procedures',
        modal: 'labs'
      },
      'Imaging': {
        mainButton: 'Imaging',
        icon: Monitor,
        category: 'interventions',
        section: 'procedures',
        options: ['Pending', 'CXR', 'CT Head', 'CT Chest', 'CT A/P', 'MRI', 'Echo']
      },
      'Pending': {
        mainButton: 'Pending',
        icon: Clock,
        category: 'interventions',
        section: 'procedures',
        hasInput: true,
        inputType: 'text'
      }
    }
  },

  planning: {
    title: 'PLANNING',
    color: '#7c3aed',
    buttons: {
      'Goals': {
        mainButton: 'Goals',
        icon: Target,
        category: 'recommendations',
        section: 'goals',
        options: ['Wean O2', 'Advance Diet', 'OOB', 'PT/OT', 'Pain Control', 'Diuresis']
      },
      'D/C': {
        mainButton: 'D/C Plan',
        icon: Home,
        category: 'recommendations',
        section: 'goals',
        options: ['Home', 'Home w/ HH', 'SNF', 'Rehab', 'LTAC', 'Hospice']
      },
      'Consults': {
        mainButton: 'Consults',
        icon: Phone,
        category: 'recommendations',
        section: 'consults',
        options: ['None', 'Cards', 'Pulm', 'GI', 'Neuro', 'ID', 'Surgery']
      }
    }
  },

  precautions: {
    title: 'PRECAUTIONS',
    color: '#dc2626',
    buttons: {
      'Isolation': {
        mainButton: 'Isolation',
        icon: Shield,
        category: 'interventions',
        section: 'nursing',
        options: ['None', 'Contact', 'Droplet', 'Airborne', 'COVID', 'MRSA', 'C.diff', 'VRE', 'TB']
      },
      'Safety': {
        mainButton: 'Safety',
        icon: AlertTriangle,
        category: 'interventions',
        section: 'nursing',
        options: ['None', 'Fall Risk', 'Bed Alarm', 'Sitter', 'Restraints', 'Aspiration', 'Seizure', 'Elopement', 'Suicide']
      },
      'Activity': {
        mainButton: 'Activity',
        icon: User,
        category: 'assessment',
        section: 'mobility',
        options: ['Bedrest', 'Up in Chair', 'Up Ad Lib', 'Assist x1', 'Assist x2', 'Total Assist', 'Hoyer', 'Stand Assist']
      }
    }
  },
  
  mobility: {
    title: 'MOBILITY/PT/OT',
    color: '#14b8a6',
    buttons: {
      'Ambulation': {
        mainButton: 'Ambulation',
        icon: User,
        category: 'assessment',
        section: 'mobility',
        options: ['Independent', 'Walker', 'Cane', 'Crutches', 'Wheelchair', 'Bedbound', 'Standby Assist', 'Contact Guard']
      },
      'PT/OT': {
        mainButton: 'PT/OT',
        icon: Activity,
        category: 'interventions',
        section: 'mobility',
        options: ['PT Ordered', 'OT Ordered', 'Both', 'Eval Today', 'Working with PT', 'Working with OT', 'Refused']
      },
      'Transfer': {
        mainButton: 'Transfer',
        icon: Bed,
        category: 'assessment',
        section: 'mobility',
        options: ['Independent', '1 Person', '2 Person', 'Hoyer', 'Slide Board', 'Stand Pivot', 'Total Lift']
      }
    }
  },
  
  pain: {
    title: 'PAIN',
    color: '#f97316',
    buttons: {
      'Pain Level': {
        mainButton: 'Pain Scale',
        icon: Gauge,
        category: 'assessment',
        section: 'pain',
        options: ['0', '1-3', '4-6', '7-9', '10'],
        hasInput: true,
        inputType: 'number',
        min: 0,
        max: 10
      },
      'Location': {
        mainButton: 'Location',
        icon: Target,
        category: 'assessment',
        section: 'pain',
        options: ['None', 'Head', 'Chest', 'Abdomen', 'Back', 'Extremities', 'Surgical Site', 'Multiple'],
        hasInput: true,
        inputType: 'text'
      },
      'Intervention': {
        mainButton: 'Pain Meds',
        icon: Pill,
        category: 'interventions',
        section: 'pain',
        options: ['None Given', 'Tylenol', 'NSAIDs', 'Tramadol', 'Norco', 'Morphine', 'Dilaudid', 'Fentanyl', 'PCA'],
        hasInput: true,
        inputType: 'text'
      }
    }
  },

  iv: {
    title: 'IV',
    color: '#0891b2',
    buttons: {
      'Fluids': {
        mainButton: 'Fluids',
        icon: Droplet,
        category: 'interventions',
        section: 'medications',
        options: ['NS', 'LR', '1/2 NS', 'D5W', 'D5NS'],
        hasInput: true,
        inputType: 'rate'
      },
      'Meds': {
        mainButton: 'IV Meds',
        icon: Syringe,
        category: 'interventions',
        section: 'medications',
        options: ['Antibiotics', 'Pain Meds', 'Cardiac', 'Pressors', 'Insulin', 'Steroids']
      },
      'Access': {
        mainButton: 'Access',
        icon: Syringe,
        category: 'assessment',
        section: 'lines',
        options: ['Good', 'Poor', 'Needs Replacement']
      },
      'Location': {
        mainButton: 'Location',
        icon: MapPin,
        category: 'assessment',
        section: 'lines',
        options: ['RAC', 'LAC', 'R Forearm', 'L Forearm', 'R Hand', 'L Hand', 'RFJ', 'LFJ', 'RIJ', 'LIJ', 'R Subclavian', 'L Subclavian', 'PICC R', 'PICC L']
      }
    }
  },

  history: {
    title: 'HISTORY',
    color: '#059669',
    buttons: {
      'PMH': {
        mainButton: 'PMH',
        icon: Clock,
        category: 'background',
        section: 'history',
        options: ['HTN', 'DM', 'CAD', 'CHF', 'COPD', 'CKD', 'CA', 'Stroke', 'Seizures'],
        hasInput: true,
        inputType: 'text'
      },
      'Allergies': {
        mainButton: 'Allergies',
        icon: AlertTriangle,
        category: 'background',
        section: 'history',
        options: ['NKDA', 'PCN', 'Sulfa', 'Morphine', 'Contrast', 'Latex'],
        hasInput: true,
        inputType: 'text'
      },
      'Home Meds': {
        mainButton: 'Home Meds',
        icon: Pill,
        category: 'background',
        section: 'history',
        hasInput: true,
        inputType: 'text'
      }
    }
  },

  admission: {
    title: 'ADMISSION',
    color: '#9333ea',
    buttons: {
      'Admit Dx': {
        mainButton: 'Admit Dx',
        icon: Package,
        category: 'situation',
        section: 'admission',
        options: ['Sepsis', 'Pneumonia', 'CHF Exac', 'COPD Exac', 'AKI', 'UTI', 'GI Bleed', 'Chest Pain', 'Stroke', 'Altered MS'],
        hasInput: true,
        inputType: 'text'
      },
      'Course': {
        mainButton: 'Course',
        icon: Clock,
        category: 'situation',
        section: 'admission',
        options: ['Stable', 'Improving', 'Worsening', 'Critical'],
        hasInput: true,
        inputType: 'text'
      },
      'Events': {
        mainButton: 'Events',
        icon: AlertTriangle,
        category: 'situation',
        section: 'admission',
        options: ['None', 'RRT', 'Code Blue', 'Fall', 'Med Error'],
        hasInput: true,
        inputType: 'text'
      }
    }
  }
};