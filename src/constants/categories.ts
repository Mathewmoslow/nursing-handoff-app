// src/constants/categories.ts
import { 
  AlertCircle, Clock, Stethoscope, Activity, Target,
  Plus, Bed, Home, Heart, Wind, Brain, AlertTriangle,
  Thermometer, User, TrendingUp, TrendingDown, Droplet,
  Beaker, X, Shield, Syringe, Pill, Users, MapPin,
  Monitor, Gauge, TestTube, Eye, Microscope, MessageSquare,
  Clipboard, Phone, Zap, Calendar, Wifi, ChevronRight,
  Package, MinusCircle, Cloud, ShieldCheck
} from 'lucide-react';
import { Category } from '../types';

export const sbarCategories: Record<string, Category> = {
  situation: {
    title: 'SITUATION',
    icon: AlertCircle,
    color: '#ef4444',
    sections: {
      admission: {
        title: 'Admission',
        items: {
          'Admit From': { icon: Plus, priority: 'high' }, // Grouped item
          'Hospital Day': { icon: Clock }, // Grouped item
          'Code Status': { icon: AlertCircle } // Grouped item
        }
      },
      chiefComplaint: {
        title: 'Chief Complaint',
        items: {
          'Chest Pain': { icon: Heart, priority: 'critical' },
          'SOB': { icon: Wind, priority: 'critical' },
          'Abd Pain': { icon: Activity, priority: 'high' },
          'Confusion': { icon: Brain, priority: 'high' },
          'Fall': { icon: AlertTriangle, priority: 'high' },
          'Fever': { icon: Thermometer, priority: 'high' },
          'Weakness': { icon: User, priority: 'medium' },
          'N/V': { icon: Activity, priority: 'medium' },
          'Syncope': { icon: Brain, priority: 'high' },
          'Bleeding': { icon: Droplet, priority: 'critical' },
          'Seizure': { icon: Brain, priority: 'critical' },
          'AMS': { icon: Brain, priority: 'high' }
        }
      },
      diagnosis: {
        title: 'Diagnosis',
        items: {
          'Pneumonia': { icon: Wind, priority: 'high' },
          'CHF': { icon: Heart, priority: 'high' },
          'COPD': { icon: Wind, priority: 'high' },
          'Sepsis': { icon: AlertTriangle, priority: 'critical' },
          'GI Bleed': { icon: Droplet, priority: 'critical' },
          'AKI': { icon: Droplet, priority: 'high' },
          'DKA': { icon: Beaker, priority: 'critical' },
          'CVA': { icon: Brain, priority: 'critical' },
          'MI': { icon: Heart, priority: 'critical' },
          'PE': { icon: Wind, priority: 'critical' },
          'UTI': { icon: Droplet, priority: 'medium' },
          'Cellulitis': { icon: Activity, priority: 'medium' }
        }
      },
      acuity: {
        title: 'Status',
        items: {
          'Stable': { icon: Activity, priority: 'low', color: 'green' },
          'Guarded': { icon: AlertCircle, priority: 'medium' },
          'Critical': { icon: AlertTriangle, priority: 'critical', color: 'red' },
          'Improving': { icon: TrendingUp, priority: 'low', color: 'green' },
          'Deteriorating': { icon: TrendingDown, priority: 'critical', color: 'red' },
          'Comfort Care': { icon: Heart, priority: 'medium' }
        }
      }
    }
  },
  background: {
    title: 'BACKGROUND',
    icon: Clock,
    color: '#3b82f6',
    sections: {
      medicalHistory: {
        title: 'PMH',
        items: {
          'DM': { icon: Droplet },
          'HTN': { icon: Activity },
          'CAD': { icon: Heart },
          'CHF': { icon: Heart },
          'COPD': { icon: Wind },
          'CKD': { icon: Droplet },
          'AFib': { icon: Activity },
          'CVA': { icon: Brain },
          'Cancer': { icon: AlertCircle },
          'Depression': { icon: Brain },
          'Anxiety': { icon: Brain },
          'Dementia': { icon: Brain },
          'ESRD': { icon: Droplet },
          'Cirrhosis': { icon: Activity },
          'HIV': { icon: Shield },
          'OSA': { icon: Wind }
        }
      },
      medications: {
        title: 'Home Meds',
        items: {
          'BB': { icon: Pill },
          'ACE/ARB': { icon: Pill },
          'Diuretics': { icon: Pill },
          'AC': { icon: Pill },
          'Insulin': { icon: Syringe },
          'OHA': { icon: Pill },
          'Psych': { icon: Pill },
          'Opioids': { icon: Pill },
          'Inhalers': { icon: Wind },
          'Steroids': { icon: Pill },
          'Abx': { icon: Pill },
          'Chemo': { icon: Pill }
        }
      },
      social: {
        title: 'Social',
        items: {
          'Smoker': { icon: Wind },
          'Ex-Smoker': { icon: Wind },
          'ETOH': { icon: AlertTriangle },
          'Lives Alone': { icon: Home },
          'Family': { icon: Users },
          'NH': { icon: Bed },
          'Homeless': { icon: MapPin },
          'Independent': { icon: User, color: 'green' },
          'Substance': { icon: AlertTriangle },
          'DNR': { icon: Shield, color: 'red' }
        }
      },
      allergies: {
        title: 'Allergies',
        items: {
          'Allergies': { icon: AlertTriangle } // Grouped item
        }
      }
    }
  },
  assessment: {
    title: 'ASSESSMENT',
    icon: Stethoscope,
    color: '#f59e0b',
    sections: {
      vitals: {
        title: 'Vitals',
        items: {
          'VS': { icon: Gauge }, // Grouped item
          'VSS': { icon: Activity, color: 'green' },
          'Tachycardic': { icon: Heart },
          'Bradycardic': { icon: Heart },
          'Hypotensive': { icon: TrendingDown },
          'HTN': { icon: TrendingUp },
          'Febrile': { icon: Thermometer },
          'Hypothermic': { icon: Thermometer },
          'Tachypneic': { icon: Wind },
          'O2 Req': { icon: Wind },
          'Afebrile': { icon: Thermometer, color: 'green' }
        }
      },
      neuro: {
        title: 'Neuro',
        items: {
          'A&O': { icon: Brain }, // Grouped item
          'Pupils': { icon: Eye }, // Grouped item
          'Movement': { icon: Activity }, // Grouped item
          'Agitated': { icon: AlertTriangle },
          'Combative': { icon: AlertTriangle },
          'Comatose': { icon: Brain }
        }
      },
      respiratory: {
        title: 'Resp',
        items: {
          'O2': { icon: Wind }, // Grouped item
          'Lungs': { icon: Wind }, // Grouped item
          'Cough': { icon: Wind }, // Grouped item
          'Trach': { icon: Wind }
        }
      },
      cardiac: {
        title: 'Cardiac',
        items: {
          'Rhythm': { icon: Heart }, // Grouped item
          'Edema': { icon: Droplet }, // Grouped item
          'CP': { icon: Heart }, // Grouped item
          'JVD': { icon: Heart },
          'Murmur': { icon: Heart }
        }
      },
      gi: {
        title: 'GI/GU',
        items: {
          'Diet': { icon: Package }, // Grouped item
          'Abdomen': { icon: Package }, // Grouped item
          'BM': { icon: Activity }, // Grouped item
          'Urine': { icon: Droplet }, // Grouped item
          'N/V': { icon: Activity },
          'Foley': { icon: Droplet },
          'Voiding': { icon: Droplet, color: 'green' }
        }
      },
      skin: {
        title: 'Skin',
        items: {
          'Skin': { icon: Shield }, // Grouped item
          'Wounds': { icon: AlertCircle }, // Grouped item
          'Pressure Areas': { icon: AlertTriangle } // Grouped item
        }
      },
      lines: {
        title: 'Access',
        items: {
          'IV Access': { icon: Syringe }, // Grouped item
          'Central': { icon: Syringe },
          'Port': { icon: Syringe },
          'Chest Tube': { icon: Activity },
          'JP': { icon: Activity },
          'NG/OG': { icon: Activity },
          'PEG': { icon: Activity },
          'Dialysis': { icon: Droplet },
          'Art Line': { icon: Monitor }
        }
      },
      pain: {
        title: 'Pain',
        items: {
          '0': { icon: Activity, color: 'green' },
          '1-3': { icon: Activity },
          '4-6': { icon: Activity },
          '7-9': { icon: AlertTriangle },
          '10': { icon: AlertTriangle },
          'Chronic': { icon: Clock },
          'Denies': { icon: Activity, color: 'green' }
        }
      },
      mobility: {
        title: 'Mobility',
        items: {
          'Activity': { icon: User }, // Grouped item
          'Fall Risk': { icon: AlertTriangle },
          'Restraints': { icon: AlertTriangle },
          'Contract': { icon: Activity },
          'PT/OT': { icon: User }
        }
      }
    }
  },
  interventions: {
    title: 'INTERVENTIONS',
    icon: Activity,
    color: '#10b981',
    sections: {
      monitoring: {
        title: 'Monitoring',
        items: {
          'VS': { icon: Gauge }, // Grouped item - replaced individual VS items
          'Cardiac Monitor': { icon: Monitor }, // Grouped item
          'Neuro Checks': { icon: Brain }, // Grouped item
          'Accucheck': { icon: Droplet },
          'I&O': { icon: Droplet },
          'Daily Wt': { icon: Activity },
          'SpO2': { icon: Wind },
          'Temp Q4': { icon: Thermometer },
          'Pain Q4': { icon: Activity },
          'Fall Prec': { icon: AlertTriangle },
          'Seizure Prec': { icon: AlertTriangle },
          'Aspiration': { icon: AlertTriangle }
        }
      },
      medications: {
        title: 'Meds',
        items: {
          'Antibiotics': { icon: Pill }, // Grouped item
          'AC': { icon: Pill },
          'Insulin': { icon: Syringe },
          'Pressors': { icon: Syringe }, // Grouped item
          'Sedation': { icon: Syringe }, // Grouped item
          'Pain Meds': { icon: Pill }, // Grouped item
          'Cardiac Meds': { icon: Heart }, // Grouped item
          'Lasix': { icon: Pill },
          'Steroids': { icon: Pill },
          'Nebs': { icon: Wind },
          'Tylenol': { icon: Pill },
          'Zofran': { icon: Pill },
          'HTN Meds': { icon: Pill },
          'PPI': { icon: Pill },
          'Heparin': { icon: Syringe }
        }
      },
      procedures: {
        title: 'Tests',
        items: {
          'Labs': { icon: TestTube }, // Grouped item
          'Imaging': { icon: Monitor }, // Grouped item
          'Labs AM': { icon: TestTube },
          'Q4 Labs': { icon: TestTube },
          'ABG': { icon: TestTube },
          'BCx': { icon: Microscope },
          'UCx': { icon: Microscope },
          'EKG': { icon: Activity },
          'Echo': { icon: Heart },
          'EEG': { icon: Brain },
          'US': { icon: Monitor }
        }
      },
      nursing: {
        title: 'Nursing',
        items: {
          'Turn Q2': { icon: Clock },
          'Oral Care': { icon: Activity },
          'IS': { icon: Wind },
          'OOB': { icon: User },
          'Dsg Change': { icon: Activity },
          'Wound Care': { icon: Activity },
          'Sitter': { icon: Eye },
          'Bed Alarm': { icon: AlertCircle },
          'HOB 30': { icon: Bed },
          'Fluid Rest': { icon: Droplet },
          'Isolation': { icon: Shield }, // Grouped item
          'Strict I&O': { icon: Droplet }
        }
      },
      devices: {
        title: 'Devices',
        items: {
          'Drains': { icon: Activity } // Grouped item
        }
      }
    }
  },
  recommendations: {
    title: 'RECOMMENDATIONS',
    icon: Target,
    color: '#7c3aed',
    sections: {
      immediate: {
        title: 'STAT',
        items: {
          'Call MD': { icon: Phone, priority: 'critical' },
          'RRT': { icon: AlertTriangle, priority: 'critical' },
          'Stat Labs': { icon: Zap, priority: 'high' },
          'Stat EKG': { icon: Zap, priority: 'high' },
          'Increase O2': { icon: Wind, priority: 'high' },
          'Hold Meds': { icon: X, priority: 'high' },
          'Blood': { icon: Droplet, priority: 'high' },
          'IV Fluids': { icon: Droplet, priority: 'high' },
          'Stat CXR': { icon: Monitor, priority: 'high' }
        }
      },
      consults: {
        title: 'Consults',
        items: {
          'Consults': { icon: Phone } // Grouped item
        }
      },
      goals: {
        title: 'Goals',
        items: {
          'Goals': { icon: Target }, // Grouped item
          'D/C Plan': { icon: Home }, // Grouped item
          'Barriers': { icon: AlertCircle }, // Grouped item
          'Family Mtg': { icon: Users },
          'GOC': { icon: Target },
          'Code Status': { icon: AlertCircle },
          'Placement': { icon: Home },
          'Education': { icon: MessageSquare }
        }
      },
      safety: {
        title: 'Safety',
        items: {
          'Safety': { icon: AlertTriangle } // Grouped item
        }
      }
    }
  }
};