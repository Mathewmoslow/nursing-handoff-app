// src/constants/buttonGroups.ts
import { 
  Heart, Activity, Brain, Wind, Droplet, AlertCircle, AlertTriangle,
  Pill, Syringe, Scissors, Stethoscope, Bone, Bug,
  TrendingDown, TrendingUp, Zap, Frown, Loader, CloudRain,
  Volume2, MinusCircle, Thermometer, Smile, Cloud, ShieldCheck,
  Gauge, FlaskConical, Home, Users, Package, TestTube,
  Eye, Filter, Waves, Baby, Flame, Snowflake, BedDouble, Wine,
  Shield, X, Monitor, Clipboard, MapPin, Bed, Clock, Phone, Target,
  Plus, User
} from 'lucide-react';
import { CovidIcon } from './customIcons';

// Original buttonGroups structure (kept for backward compatibility)
export const buttonGroups = {
  situation: {
    admission: {
      postOp: {
        mainLabel: 'Post-Op',
        icon: Scissors,
        subItems: {
          'Cardiac Surgery': { icon: Heart, priority: 'high' },
          'General Surgery': { icon: Stethoscope },
          'Ortho Surgery': { icon: Bone },
          'Neuro Surgery': { icon: Brain, priority: 'high' },
          'GI Surgery': { icon: Package },
          'Vascular Surgery': { icon: Activity },
          'Thoracic Surgery': { icon: Wind }
        }
      }
    }
  }
};

// NEW: Form-aligned button mapping that matches the paper form
export const formBoxButtonMapping = {
  // TOP SECTION - Patient Info Bar
  ptInfo: {
    title: "Patient Info",
    buttons: {
      'Code Status': { 
        mainButton: 'Code Status',
        icon: AlertCircle,
        subItems: {
          'Full Code': { icon: ShieldCheck, priority: 'low' },
          'DNR': { icon: AlertTriangle, priority: 'high' },
          'DNI': { icon: AlertCircle, priority: 'high' },
          'Comfort Care': { icon: Heart, priority: 'medium' }
        }
      },
      'Diet': {
        mainButton: 'Diet',
        icon: Package,
        subItems: {
          'Regular': { icon: Package },
          'Cardiac': { icon: Heart },
          'Diabetic': { icon: Droplet },
          'NPO': { icon: X, priority: 'high' },
          'Clear Liquids': { icon: Droplet },
          'Pureed': { icon: Package },
          'Nectar Thick': { icon: Droplet },
          'TF': { icon: Syringe },
          'TPN': { icon: Syringe, priority: 'high' }
        }
      },
      'Allergies': {
        mainButton: 'Allergies',
        icon: AlertTriangle,
        subItems: {
          'NKDA': { icon: ShieldCheck },
          'PCN': { icon: AlertTriangle, priority: 'high' },
          'Sulfa': { icon: AlertTriangle, priority: 'high' },
          'Contrast': { icon: AlertTriangle, priority: 'high' },
          'Latex': { icon: AlertTriangle, priority: 'high' },
          'Food': { icon: AlertTriangle },
          'Other': { icon: AlertCircle }
        }
      }
    }
  },

  // COURSE OF ADMISSION
  courseOfAdmission: {
    title: "Course/Admission",
    buttons: {
      'Admit From': {
        mainButton: 'Admit From',
        icon: Plus,
        subItems: {
          'ER': { icon: Plus, priority: 'high' },
          'Direct': { icon: Home },
          'Transfer ICU': { icon: Bed, priority: 'high' },
          'Transfer Floor': { icon: Bed },
          'Outside Hospital': { icon: Plus, priority: 'high' }
        }
      },
      'Hospital Day': {
        mainButton: 'Hospital Day',
        icon: Clock,
        subItems: {
          'HD 1': { icon: Clock },
          'HD 2': { icon: Clock },
          'HD 3': { icon: Clock },
          'HD 4-7': { icon: Clock },
          'HD 7+': { icon: Clock, priority: 'high' },
          'POD 1': { icon: Scissors },
          'POD 2': { icon: Scissors },
          'POD 3+': { icon: Scissors }
        }
      }
    }
  },

  // NEURO ASSESSMENT
  neuroAssessment: {
    title: "Neuro Assessment",
    buttons: {
      'A&O': {
        mainButton: 'A&O',
        icon: Brain,
        subItems: {
          'x4': { icon: ShieldCheck },
          'x3': { icon: Brain },
          'x2': { icon: Brain, priority: 'medium' },
          'x1': { icon: AlertCircle, priority: 'high' },
          'Confused': { icon: AlertCircle, priority: 'high' },
          'Sedated': { icon: Cloud },
          'Comatose': { icon: AlertTriangle, priority: 'critical' }
        }
      },
      'Pupils': {
        mainButton: 'Pupils',
        icon: Eye,
        subItems: {
          'PERRL': { icon: ShieldCheck },
          'Sluggish': { icon: AlertCircle, priority: 'medium' },
          'Fixed': { icon: AlertTriangle, priority: 'critical' },
          'Dilated': { icon: AlertCircle, priority: 'high' },
          'Pinpoint': { icon: AlertCircle, priority: 'high' }
        }
      }
    }
  },

  // CARDIAC ASSESSMENT
  cardiacAssessment: {
    title: "Cardiac",
    buttons: {
      'Rhythm': {
        mainButton: 'Rhythm',
        icon: Heart,
        subItems: {
          'SR': { icon: ShieldCheck },
          'ST': { icon: Heart },
          'SB': { icon: Heart },
          'AF': { icon: Activity, priority: 'medium' },
          'AF RVR': { icon: Activity, priority: 'high' },
          'Paced': { icon: Zap },
          'VT': { icon: AlertTriangle, priority: 'critical' },
          'VF': { icon: AlertTriangle, priority: 'critical' }
        }
      },
      'Edema': {
        mainButton: 'Edema',
        icon: Droplet,
        subItems: {
          'None': { icon: ShieldCheck },
          '+1': { icon: Droplet },
          '+2': { icon: Droplet, priority: 'medium' },
          '+3': { icon: Droplet, priority: 'high' },
          '+4': { icon: AlertTriangle, priority: 'critical' }
        }
      },
      'CP': {
        mainButton: 'CP',
        icon: Heart,
        subItems: {
          'None': { icon: ShieldCheck },
          'Stable': { icon: Heart },
          'Increasing': { icon: TrendingUp, priority: 'high' },
          'Resolved': { icon: TrendingDown }
        }
      }
    }
  },

  // RESPIRATORY ASSESSMENT
  respAssessment: {
    title: "Respiratory",
    buttons: {
      'O2': {
        mainButton: 'O2',
        icon: Wind,
        subItems: {
          'RA': { icon: Wind },
          'NC 2L': { icon: Wind },
          'NC 4L': { icon: Wind },
          'NC 6L': { icon: Wind, priority: 'medium' },
          'FM 10L': { icon: Wind, priority: 'medium' },
          'FM 15L': { icon: Wind, priority: 'high' },
          'HFNC': { icon: Wind, priority: 'high' },
          'BiPAP': { icon: Wind, priority: 'high' },
          'CPAP': { icon: Wind, priority: 'high' },
          'Vent': { icon: AlertCircle, priority: 'critical' }
        }
      },
      'Lungs': {
        mainButton: 'Lungs',
        icon: Wind,
        subItems: {
          'Clear': { icon: ShieldCheck },
          'Diminished': { icon: TrendingDown },
          'Crackles': { icon: CloudRain, priority: 'medium' },
          'Wheezes': { icon: Volume2, priority: 'medium' },
          'Rhonchi': { icon: Wind, priority: 'medium' },
          'Absent': { icon: X, priority: 'critical' }
        }
      }
    }
  },

  // GI/GU ASSESSMENT
  giGuAssessment: {
    title: "GI/GU",
    buttons: {
      'Abdomen': {
        mainButton: 'Abdomen',
        icon: Package,
        subItems: {
          'Soft': { icon: ShieldCheck },
          'Firm': { icon: Package },
          'Distended': { icon: Package, priority: 'medium' },
          'Tender': { icon: AlertCircle, priority: 'medium' },
          'Guarding': { icon: AlertTriangle, priority: 'high' }
        }
      },
      'BM': {
        mainButton: 'BM',
        icon: Activity,
        subItems: {
          'Today': { icon: ShieldCheck },
          'Yesterday': { icon: Clock },
          '2 days': { icon: Clock, priority: 'medium' },
          '3+ days': { icon: AlertCircle, priority: 'high' },
          'Diarrhea': { icon: TrendingDown, priority: 'medium' },
          'Melena': { icon: AlertTriangle, priority: 'critical' }
        }
      },
      'Urine': {
        mainButton: 'Urine',
        icon: Droplet,
        subItems: {
          'Clear': { icon: ShieldCheck },
          'Amber': { icon: Droplet },
          'Dark': { icon: Droplet, priority: 'medium' },
          'Bloody': { icon: AlertTriangle, priority: 'high' },
          'Foley': { icon: Syringe },
          'Anuric': { icon: X, priority: 'critical' }
        }
      }
    }
  },

  // SKIN/WOUNDS
  skinAssessment: {
    title: "Skin/Wounds",
    buttons: {
      'Skin': {
        mainButton: 'Skin',
        icon: Shield,
        subItems: {
          'Intact': { icon: ShieldCheck },
          'Warm/Dry': { icon: ShieldCheck },
          'Cool': { icon: Snowflake, priority: 'medium' },
          'Diaphoretic': { icon: Droplet, priority: 'medium' },
          'Jaundiced': { icon: AlertCircle, priority: 'high' },
          'Pale': { icon: AlertCircle, priority: 'medium' },
          'Flushed': { icon: Flame, priority: 'medium' }
        }
      },
      'Wounds': {
        mainButton: 'Wounds',
        icon: AlertCircle,
        subItems: {
          'None': { icon: ShieldCheck },
          'Surgical': { icon: Scissors },
          'Pressure Injury': { icon: AlertTriangle, priority: 'high' },
          'Laceration': { icon: AlertCircle },
          'Abrasion': { icon: Activity },
          'Ulcer': { icon: AlertTriangle, priority: 'high' }
        }
      }
    }
  },

  // DEVICES/LINES
  devicesLines: {
    title: "Devices/Lines",
    buttons: {
      'IV Access': {
        mainButton: 'IV Access',
        icon: Syringe,
        subItems: {
          'PIV x1': { icon: Syringe },
          'PIV x2': { icon: Syringe },
          'Central Line': { icon: Syringe, priority: 'high' },
          'PICC': { icon: Syringe },
          'Port': { icon: Syringe },
          'IO': { icon: AlertTriangle, priority: 'critical' }
        }
      },
      'Drains': {
        mainButton: 'Drains',
        icon: Activity,
        subItems: {
          'None': { icon: ShieldCheck },
          'JP': { icon: Activity },
          'Blake': { icon: Activity },
          'Chest Tube': { icon: Activity, priority: 'high' },
          'NG': { icon: Activity },
          'PEG': { icon: Activity }
        }
      }
    }
  },

  // MEDICATIONS
  medications: {
    title: "Medications",
    buttons: {
      'Antibiotics': {
        mainButton: 'Antibiotics',
        icon: Pill,
        subItems: {
          'Vanc': { icon: Pill, priority: 'high' },
          'Zosyn': { icon: Pill, priority: 'high' },
          'Ceftriaxone': { icon: Pill },
          'Levaquin': { icon: Pill },
          'Flagyl': { icon: Pill },
          'Meropenem': { icon: Pill, priority: 'high' }
        }
      },
      'Pain Meds': {
        mainButton: 'Pain Meds',
        icon: Pill,
        subItems: {
          'Tylenol': { icon: Pill },
          'Toradol': { icon: Pill },
          'Morphine': { icon: Syringe, priority: 'medium' },
          'Dilaudid': { icon: Syringe, priority: 'high' },
          'Fentanyl': { icon: Syringe, priority: 'high' },
          'PCA': { icon: Syringe, priority: 'high' }
        }
      },
      'Cardiac Meds': {
        mainButton: 'Cardiac Meds',
        icon: Heart,
        subItems: {
          'Metoprolol': { icon: Pill },
          'Amiodarone': { icon: Pill, priority: 'high' },
          'Digoxin': { icon: Pill },
          'Diltiazem': { icon: Pill },
          'Heparin': { icon: Syringe, priority: 'high' },
          'Nitroglycerin': { icon: Pill, priority: 'high' }
        }
      },
      'Pressors': {
        mainButton: 'Pressors',
        icon: Syringe,
        subItems: {
          'Levophed': { icon: Syringe, priority: 'critical' },
          'Dopamine': { icon: Syringe, priority: 'critical' },
          'Vasopressin': { icon: Syringe, priority: 'critical' },
          'Epinephrine': { icon: Syringe, priority: 'critical' },
          'Dobutamine': { icon: Syringe, priority: 'high' }
        }
      }
    }
  },

  // MONITORING
  monitoring: {
    title: "Monitoring",
    buttons: {
      'VS': {
        mainButton: 'VS',
        icon: Gauge,
        subItems: {
          'Routine': { icon: Gauge },
          'Q4H': { icon: Gauge },
          'Q2H': { icon: Gauge, priority: 'medium' },
          'Q1H': { icon: Gauge, priority: 'high' },
          'Q15min': { icon: AlertCircle, priority: 'critical' },
          'Continuous': { icon: Monitor, priority: 'high' }
        }
      },
      'Cardiac Monitor': {
        mainButton: 'Cardiac Monitor',
        icon: Monitor,
        subItems: {
          'None': { icon: ShieldCheck },
          'Telemetry': { icon: Monitor },
          'Continuous': { icon: Monitor, priority: 'high' },
          'Bedside': { icon: Monitor, priority: 'high' }
        }
      },
      'Neuro Checks': {
        mainButton: 'Neuro Checks',
        icon: Brain,
        subItems: {
          'None': { icon: ShieldCheck },
          'Q4': { icon: Brain },
          'Q2': { icon: Brain, priority: 'medium' },
          'Q1': { icon: Brain, priority: 'high' },
          'Q15min': { icon: AlertCircle, priority: 'critical' }
        }
      }
    }
  },

  // LABS/TESTS
  labsTests: {
    title: "Labs/Tests",
    buttons: {
      'Labs': {
        mainButton: 'Labs',
        icon: TestTube,
        subItems: {
          'Pending': { icon: Clock },
          'CBC': { icon: TestTube },
          'BMP': { icon: TestTube },
          'CMP': { icon: TestTube },
          'Troponin': { icon: TestTube, priority: 'high' },
          'BNP': { icon: TestTube, priority: 'high' },
          'Lactate': { icon: TestTube, priority: 'high' },
          'Blood Cultures': { icon: TestTube, priority: 'high' }
        }
      },
      'Imaging': {
        mainButton: 'Imaging',
        icon: Monitor,
        subItems: {
          'Pending': { icon: Clock },
          'CXR': { icon: Monitor },
          'CT Head': { icon: Monitor },
          'CT Chest': { icon: Monitor },
          'CT A/P': { icon: Monitor },
          'MRI': { icon: Monitor },
          'Echo': { icon: Heart }
        }
      }
    }
  },

  // GOALS/PLANNING
  goalsPlanning: {
    title: "Goals/Planning",
    buttons: {
      'Goals': {
        mainButton: 'Goals',
        icon: Target,
        subItems: {
          'Wean O2': { icon: Wind },
          'Advance Diet': { icon: Package },
          'OOB': { icon: User },
          'PT/OT': { icon: Activity },
          'Pain Control': { icon: Pill },
          'Diuresis': { icon: Droplet }
        }
      },
      'D/C Plan': {
        mainButton: 'D/C Plan',
        icon: Home,
        subItems: {
          'Home': { icon: Home },
          'Home w/ HH': { icon: Home },
          'SNF': { icon: Bed },
          'Rehab': { icon: Activity },
          'LTAC': { icon: Bed },
          'Hospice': { icon: Heart }
        }
      },
      'Consults': {
        mainButton: 'Consults',
        icon: Phone,
        subItems: {
          'None': { icon: ShieldCheck },
          'Cards': { icon: Heart },
          'Pulm': { icon: Wind },
          'GI': { icon: Package },
          'Neuro': { icon: Brain },
          'ID': { icon: Bug },
          'Surgery': { icon: Scissors }
        }
      }
    }
  },

  // PRECAUTIONS
  precautions: {
    title: "Precautions",
    buttons: {
      'Isolation': {
        mainButton: 'Isolation',
        icon: Shield,
        subItems: {
          'None': { icon: ShieldCheck },
          'Contact': { icon: Shield, priority: 'high' },
          'Droplet': { icon: Shield, priority: 'high' },
          'Airborne': { icon: Shield, priority: 'high' },
          'COVID': { icon: CovidIcon, priority: 'high' },
          'MRSA': { icon: Bug, priority: 'high' },
          'C.diff': { icon: Bug, priority: 'high' }
        }
      },
      'Safety': {
        mainButton: 'Safety',
        icon: AlertTriangle,
        subItems: {
          'None': { icon: ShieldCheck },
          'Fall Risk': { icon: AlertTriangle, priority: 'high' },
          'Bed Alarm': { icon: AlertCircle },
          'Sitter': { icon: Eye, priority: 'high' },
          'Restraints': { icon: AlertTriangle, priority: 'high' },
          'Aspiration': { icon: AlertCircle, priority: 'high' }
        }
      },
      'Activity': {
        mainButton: 'Activity',
        icon: User,
        subItems: {
          'Bedrest': { icon: Bed },
          'Up in Chair': { icon: User },
          'Up Ad Lib': { icon: User },
          'Assist x1': { icon: Users },
          'Assist x2': { icon: Users, priority: 'medium' },
          'Total Assist': { icon: Users, priority: 'high' }
        }
      }
    }
  }
};

// Simplified config for backward compatibility
export const buttonGroupsConfig: Record<string, string[]> = {
  // Assessment items
  'A&O': ['x4', 'x3', 'x2', 'x1', 'Confused', 'Sedated'],
  'Edema': ['None', '+1', '+2', '+3', '+4'],
  'O2': ['RA', 'NC 2L', 'NC 4L', 'NC 6L', 'FM 10L', 'FM 15L', 'HFNC', 'BiPAP', 'CPAP', 'Vent'],
  'Diet': ['Regular', 'Cardiac', 'Diabetic', 'NPO', 'Clear Liquids', 'Pureed', 'TF', 'TPN'],
  'Code Status': ['Full Code', 'DNR', 'DNI', 'Comfort Care'],
  
  // Medications
  'Antibiotics': ['Vanc', 'Zosyn', 'Ceftriaxone', 'Levaquin', 'Flagyl', 'Meropenem'],
  'Pain Meds': ['Tylenol', 'Toradol', 'Morphine', 'Dilaudid', 'Fentanyl', 'PCA'],
  'Cardiac Meds': ['Metoprolol', 'Amiodarone', 'Digoxin', 'Diltiazem', 'Heparin', 'Nitroglycerin'],
  'Pressors': ['Levophed', 'Dopamine', 'Vasopressin', 'Epinephrine', 'Dobutamine'],
  
  // Monitoring
  'VS': ['Routine', 'Q4H', 'Q2H', 'Q1H', 'Q15min', 'Continuous'],
  'Cardiac Monitor': ['None', 'Telemetry', 'Continuous', 'Bedside'],
  'Neuro Checks': ['None', 'Q4', 'Q2', 'Q1', 'Q15min'],
  
  // Others
  'IV Access': ['PIV x1', 'PIV x2', 'Central Line', 'PICC', 'Port', 'IO'],
  'Lungs': ['Clear', 'Diminished', 'Crackles', 'Wheezes', 'Rhonchi', 'Absent'],
  'BM': ['Today', 'Yesterday', '2 days', '3+ days', 'Diarrhea', 'Melena']
};

// Maps individual items to their parent groups
export const itemsToGroup: Record<string, string> = {
  // Assessment mappings
  'A&Ox4': 'A&O',
  'A&Ox3': 'A&O',
  'A&Ox2': 'A&O',
  'A&Ox1': 'A&O',
  'Confused': 'A&O',
  'Sedated': 'A&O',
  
  // Add Edema as a grouped item
  'Edema': 'Edema',
  '+1': 'Edema',
  '+2': 'Edema',
  '+3': 'Edema',
  '+4': 'Edema',
  
  'RA': 'O2',
  'NC': 'O2',
  'FM': 'O2',
  'HFNC': 'O2',
  'BiPAP': 'O2',
  'CPAP': 'O2',
  'Vent': 'O2',
  
  'Clear': 'Lungs',
  'Diminished': 'Lungs',
  'Crackles': 'Lungs',
  'Wheeze': 'Lungs',
  'Wheezes': 'Lungs',
  'Rhonchi': 'Lungs',
  
  // Diet mappings
  'Regular': 'Diet',
  'Cardiac': 'Diet',
  'Diabetic': 'Diet',
  'NPO': 'Diet',
  'TF': 'Diet',
  'TPN': 'Diet',
  
  // Medication mappings
  'Abx': 'Antibiotics',
  'Pain': 'Pain Meds',
  'Pressors': 'Pressors',
  'Sedation': 'Sedation',
  
  // Monitoring mappings
  'Q4 VS': 'VS',
  'Q2 VS': 'VS',
  'Q1 VS': 'VS',
  'Tele': 'Cardiac Monitor',
  'Neuro Q4': 'Neuro Checks',
  'Neuro Q2': 'Neuro Checks',
  'Neuro Q1': 'Neuro Checks',
  
  // Access mappings
  'PIV': 'IV Access',
  'Central': 'IV Access',
  'PICC': 'IV Access',
  
  // Code status
  'Full Code': 'Code Status',
  'DNR': 'Code Status',
  'DNI': 'Code Status',
  
  // Vitals mappings (for existing buttons)
  'VSS': 'VS',
  'Tachycardic': 'Rhythm',
  'Bradycardic': 'Rhythm',
  'NSR': 'Rhythm',
  'ST': 'Rhythm',
  'AFib': 'Rhythm',
  'AFib RVR': 'Rhythm',
  
  // Add more mappings as needed
};

// Type definitions
export interface ButtonSubItem {
  icon: any;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

export interface ButtonGroup {
  mainLabel: string;
  icon: any;
  subItems: Record<string, ButtonSubItem>;
}

export interface ButtonGroupSection {
  [key: string]: ButtonGroup;
}

export interface ButtonGroupCategory {
  [key: string]: ButtonGroupSection;
}