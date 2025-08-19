// Enhanced relationships with secondary suggestions for detailed clinical documentation
// This file extends the basic relationships to include contextual follow-up questions

export interface SecondaryOption {
  label: string;
  type: 'select' | 'multiselect' | 'text' | 'number' | 'scale';
  options?: string[];
  required?: boolean;
  unit?: string;
  min?: number;
  max?: number;
}

export interface EnhancedRelationship {
  primaryRelations: Record<string, number>;
  secondaryOptions?: SecondaryOption[];
  notePrompt?: string;
}

export const enhancedRelationshipMap: Record<string, EnhancedRelationship> = {
  // WOUNDS - Detailed assessment required
  'Pressure Injury': {
    primaryRelations: {
      'Wound Care': 0.95,
      'Turn Q2H': 0.95,
      'Special Mattress': 0.9,
      'Nutrition': 0.85,
      'Braden Score': 0.9,
      'Stage': 0.95,
      'Location': 0.95,
      'Size': 0.9,
      'Undermining': 0.7,
      'Tunneling': 0.7,
      'Exudate': 0.8,
      'Tissue Type': 0.85,
      'Periwound': 0.8,
      'Pain': 0.7,
      'Photo Documentation': 0.8
    },
    secondaryOptions: [
      {
        label: 'Stage',
        type: 'select',
        options: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Unstageable', 'Deep Tissue Injury', 'Medical Device Related', 'Mucosal'],
        required: true
      },
      {
        label: 'Location',
        type: 'select',
        options: ['Sacrum/Coccyx', 'Right Heel', 'Left Heel', 'Right Hip', 'Left Hip', 'Right Elbow', 'Left Elbow', 'Right Ankle', 'Left Ankle', 'Occipital', 'Scapula', 'Other'],
        required: true
      },
      {
        label: 'Size (Length cm)',
        type: 'number',
        min: 0.1,
        max: 50,
        unit: 'cm',
        required: true
      },
      {
        label: 'Size (Width cm)',
        type: 'number',
        min: 0.1,
        max: 50,
        unit: 'cm',
        required: true
      },
      {
        label: 'Depth (cm)',
        type: 'number',
        min: 0,
        max: 20,
        unit: 'cm'
      },
      {
        label: 'Tissue Type',
        type: 'multiselect',
        options: ['Red/Granulation', 'Yellow/Slough', 'Black/Eschar', 'Pink/Epithelial', 'Bone Exposed', 'Muscle Exposed', 'Tendon Exposed']
      },
      {
        label: 'Exudate',
        type: 'select',
        options: ['None', 'Scant', 'Small', 'Moderate', 'Large', 'Copious']
      },
      {
        label: 'Odor',
        type: 'select',
        options: ['None', 'Mild', 'Moderate', 'Foul']
      }
    ],
    notePrompt: 'Describe wound appearance, treatment plan, and any changes from previous assessment'
  },

  'Surgical': {
    primaryRelations: {
      'Incision Care': 0.95,
      'Staple/Suture Removal': 0.7,
      'Infection Signs': 0.9,
      'Drainage': 0.8,
      'Pain Management': 0.85
    },
    secondaryOptions: [
      {
        label: 'Incision Location',
        type: 'text',
        required: true
      },
      {
        label: 'Length (cm)',
        type: 'number',
        min: 1,
        max: 100,
        unit: 'cm'
      },
      {
        label: 'Closure Type',
        type: 'select',
        options: ['Staples', 'Sutures', 'Steri-strips', 'Dermabond', 'Open/Packed', 'Secondary Intention']
      },
      {
        label: 'Appearance',
        type: 'multiselect',
        options: ['Well-approximated', 'Intact', 'Dehiscence', 'Erythema', 'Edema', 'Drainage', 'Induration']
      },
      {
        label: 'Drainage Type',
        type: 'select',
        options: ['None', 'Serous', 'Serosanguineous', 'Sanguineous', 'Purulent']
      }
    ],
    notePrompt: 'Document POD#, any complications, and healing progress'
  },

  'Laceration': {
    primaryRelations: {
      'Wound Care': 0.9,
      'Tetanus': 0.8,
      'Antibiotics': 0.7,
      'Sutures': 0.8
    },
    secondaryOptions: [
      {
        label: 'Location',
        type: 'text',
        required: true
      },
      {
        label: 'Length (cm)',
        type: 'number',
        min: 0.5,
        max: 50,
        unit: 'cm'
      },
      {
        label: 'Depth',
        type: 'select',
        options: ['Superficial', 'Partial Thickness', 'Full Thickness', 'To Bone', 'To Tendon']
      },
      {
        label: 'Contamination',
        type: 'select',
        options: ['Clean', 'Clean-Contaminated', 'Contaminated', 'Dirty/Infected']
      }
    ],
    notePrompt: 'Document mechanism of injury, time of injury, and treatment provided'
  },

  'Ulcer': {
    primaryRelations: {
      'Wound Care': 0.95,
      'Vascular Assessment': 0.8,
      'Infection Control': 0.8,
      'Pain Management': 0.7
    },
    secondaryOptions: [
      {
        label: 'Type',
        type: 'select',
        options: ['Venous', 'Arterial', 'Diabetic/Neuropathic', 'Mixed', 'Other'],
        required: true
      },
      {
        label: 'Location',
        type: 'text',
        required: true
      },
      {
        label: 'Size (cm²)',
        type: 'number',
        min: 0.1,
        max: 200,
        unit: 'cm²'
      },
      {
        label: 'Duration',
        type: 'select',
        options: ['<1 week', '1-4 weeks', '1-3 months', '3-6 months', '>6 months', '>1 year']
      },
      {
        label: 'ABI (if applicable)',
        type: 'number',
        min: 0,
        max: 2,
        unit: ''
      }
    ],
    notePrompt: 'Include vascular status, offloading measures, and healing trajectory'
  },

  // RESPIRATORY - Needs oxygen delivery details
  'O2': {
    primaryRelations: {
      'SpO2 Monitoring': 0.95,
      'Respiratory Assessment': 0.9,
      'ABG': 0.7,
      'Weaning Plan': 0.6
    },
    secondaryOptions: [
      {
        label: 'Delivery Method',
        type: 'select',
        options: ['Room Air', 'Nasal Cannula', 'Simple Mask', 'Non-Rebreather', 'Venturi Mask', 'High Flow Nasal Cannula', 'CPAP', 'BiPAP', 'Ventilator'],
        required: true
      },
      {
        label: 'Flow Rate/FiO2',
        type: 'text',
        required: true
      },
      {
        label: 'SpO2 on Current O2',
        type: 'number',
        min: 70,
        max: 100,
        unit: '%'
      },
      {
        label: 'Target SpO2',
        type: 'text'
      }
    ],
    notePrompt: 'Document respiratory status, work of breathing, and response to oxygen therapy'
  },

  // CARDIAC - Rhythm details needed
  'AFib': {
    primaryRelations: {
      'Telemetry': 0.95,
      'Anticoagulation': 0.9,
      'Rate Control': 0.85,
      'Stroke Risk': 0.9
    },
    secondaryOptions: [
      {
        label: 'Rate',
        type: 'select',
        options: ['Controlled (<100)', 'RVR (>100)', 'RVR (>110)', 'RVR (>120)'],
        required: true
      },
      {
        label: 'New or Chronic',
        type: 'select',
        options: ['New Onset', 'Paroxysmal', 'Persistent', 'Permanent'],
        required: true
      },
      {
        label: 'Anticoagulation',
        type: 'select',
        options: ['None', 'Aspirin', 'Warfarin', 'Apixaban', 'Rivaroxaban', 'Dabigatran', 'Heparin', 'Enoxaparin']
      },
      {
        label: 'CHADS2-VASc Score',
        type: 'number',
        min: 0,
        max: 9
      }
    ],
    notePrompt: 'Document symptoms, hemodynamic stability, and treatment response'
  },

  // PAIN - Comprehensive assessment
  'Pain': {
    primaryRelations: {
      'Pain Medication': 0.9,
      'Non-Pharmacological': 0.7,
      'Reassessment': 0.85
    },
    secondaryOptions: [
      {
        label: 'Pain Score',
        type: 'scale',
        min: 0,
        max: 10,
        required: true
      },
      {
        label: 'Location',
        type: 'text',
        required: true
      },
      {
        label: 'Quality',
        type: 'multiselect',
        options: ['Sharp', 'Dull', 'Aching', 'Burning', 'Stabbing', 'Throbbing', 'Cramping', 'Radiating', 'Constant', 'Intermittent']
      },
      {
        label: 'Aggravating Factors',
        type: 'multiselect',
        options: ['Movement', 'Deep Breathing', 'Coughing', 'Position', 'Touch', 'Nothing']
      },
      {
        label: 'Relieving Factors',
        type: 'multiselect',
        options: ['Rest', 'Medication', 'Position Change', 'Heat', 'Cold', 'Distraction', 'Nothing']
      }
    ],
    notePrompt: 'Document onset, duration, and impact on function'
  },

  // MEDICATIONS - Administration details
  'Antibiotics': {
    primaryRelations: {
      'Culture Results': 0.8,
      'WBC Trend': 0.85,
      'Temp Monitoring': 0.8,
      'Renal Function': 0.7
    },
    secondaryOptions: [
      {
        label: 'Antibiotic Name',
        type: 'text',
        required: true
      },
      {
        label: 'Indication',
        type: 'text',
        required: true
      },
      {
        label: 'Day of Therapy',
        type: 'number',
        min: 1,
        max: 365
      },
      {
        label: 'Route',
        type: 'select',
        options: ['IV', 'PO', 'IM', 'Topical']
      },
      {
        label: 'Culture Source',
        type: 'multiselect',
        options: ['Blood', 'Urine', 'Sputum', 'Wound', 'None', 'Pending']
      }
    ],
    notePrompt: 'Document response to therapy and any adverse reactions'
  },

  'Insulin': {
    primaryRelations: {
      'Blood Glucose': 0.95,
      'Accucheck Schedule': 0.9,
      'Hypoglycemia Risk': 0.8,
      'Diet': 0.7
    },
    secondaryOptions: [
      {
        label: 'Type',
        type: 'multiselect',
        options: ['Rapid Acting', 'Short Acting', 'Intermediate', 'Long Acting', 'Sliding Scale', 'Insulin Drip']
      },
      {
        label: 'Current BG',
        type: 'number',
        min: 20,
        max: 800,
        unit: 'mg/dL'
      },
      {
        label: 'Units Given',
        type: 'number',
        min: 0,
        max: 100,
        unit: 'units'
      },
      {
        label: 'Timing',
        type: 'select',
        options: ['AC', 'PC', 'HS', 'Sliding Scale', 'Continuous']
      }
    ],
    notePrompt: 'Document glucose trends and insulin requirements'
  },

  // LINES/ACCESS - Detailed documentation
  'Central Line': {
    primaryRelations: {
      'CLABSI Prevention': 0.95,
      'Daily Assessment': 0.9,
      'Dressing Change': 0.85,
      'Blood Cultures': 0.7
    },
    secondaryOptions: [
      {
        label: 'Type',
        type: 'select',
        options: ['Triple Lumen', 'PICC', 'Port', 'Dialysis Catheter', 'Swan-Ganz', 'Cordis'],
        required: true
      },
      {
        label: 'Location',
        type: 'select',
        options: ['RIJ', 'LIJ', 'R Subclavian', 'L Subclavian', 'R Femoral', 'L Femoral', 'R PICC', 'L PICC'],
        required: true
      },
      {
        label: 'Days In Place',
        type: 'number',
        min: 0,
        max: 365
      },
      {
        label: 'Site Assessment',
        type: 'multiselect',
        options: ['Clean/Dry/Intact', 'Redness', 'Swelling', 'Drainage', 'Tenderness']
      },
      {
        label: 'Lumens Patent',
        type: 'select',
        options: ['All', 'Partial', 'Occluded']
      }
    ],
    notePrompt: 'Document indication, functionality, and any complications'
  },

  // DRAINS - Output tracking
  'JP': {
    primaryRelations: {
      'Output Measurement': 0.95,
      'Site Care': 0.9,
      'Infection Monitoring': 0.8
    },
    secondaryOptions: [
      {
        label: 'Location',
        type: 'text',
        required: true
      },
      {
        label: 'Output Volume (mL)',
        type: 'number',
        min: 0,
        max: 1000,
        unit: 'mL/shift',
        required: true
      },
      {
        label: 'Output Character',
        type: 'select',
        options: ['Serous', 'Serosanguineous', 'Sanguineous', 'Purulent', 'Bilious', 'Chylous']
      },
      {
        label: 'Suction',
        type: 'select',
        options: ['Good', 'Poor', 'None']
      }
    ],
    notePrompt: 'Document output trends and removal criteria'
  },

  'Chest Tube': {
    primaryRelations: {
      'Output Monitoring': 0.95,
      'Air Leak': 0.9,
      'Suction': 0.85,
      'CXR': 0.8,
      'Pain Control': 0.8
    },
    secondaryOptions: [
      {
        label: 'Location',
        type: 'select',
        options: ['Right', 'Left', 'Bilateral'],
        required: true
      },
      {
        label: 'Size (Fr)',
        type: 'number',
        min: 8,
        max: 40
      },
      {
        label: 'Suction (cmH2O)',
        type: 'number',
        min: -40,
        max: 0,
        unit: 'cmH2O'
      },
      {
        label: 'Air Leak',
        type: 'select',
        options: ['None', 'Small', 'Moderate', 'Large', 'Continuous']
      },
      {
        label: 'Output (mL)',
        type: 'number',
        min: 0,
        max: 2000,
        unit: 'mL/shift'
      },
      {
        label: 'Output Character',
        type: 'select',
        options: ['Serous', 'Serosanguineous', 'Sanguineous', 'Purulent']
      }
    ],
    notePrompt: 'Document subcutaneous emphysema, tidaling, and removal criteria'
  },

  // ISOLATION - Specific precautions
  'Contact': {
    primaryRelations: {
      'PPE': 1.0,
      'Hand Hygiene': 1.0,
      'Private Room': 0.9,
      'Dedicated Equipment': 0.9
    },
    secondaryOptions: [
      {
        label: 'Organism',
        type: 'multiselect',
        options: ['MRSA', 'VRE', 'C.diff', 'ESBL', 'CRE', 'Scabies', 'Unknown']
      },
      {
        label: 'Source',
        type: 'multiselect',
        options: ['Wound', 'Urine', 'Sputum', 'Blood', 'Stool', 'Skin']
      }
    ],
    notePrompt: 'Document decolonization measures if applicable'
  },

  'Droplet': {
    primaryRelations: {
      'Mask': 1.0,
      'Private Room': 0.9,
      'Visitor Restrictions': 0.8
    },
    secondaryOptions: [
      {
        label: 'Organism/Condition',
        type: 'select',
        options: ['Influenza', 'COVID-19', 'RSV', 'Pertussis', 'Meningitis', 'Mumps', 'Unknown']
      },
      {
        label: 'Symptom Duration',
        type: 'text'
      }
    ],
    notePrompt: 'Document symptom onset and exposure risk'
  },

  // DIET - Specific restrictions
  'NPO': {
    primaryRelations: {
      'IV Fluids': 0.9,
      'Glucose Monitoring': 0.7,
      'Mouth Care': 0.8
    },
    secondaryOptions: [
      {
        label: 'Reason',
        type: 'select',
        options: ['Surgery', 'Procedure', 'Nausea/Vomiting', 'Bowel Rest', 'Aspiration Risk', 'Other'],
        required: true
      },
      {
        label: 'Duration',
        type: 'text'
      },
      {
        label: 'Medications',
        type: 'select',
        options: ['Hold All PO', 'Critical Meds Only', 'IV Conversion', 'Continue All']
      }
    ],
    notePrompt: 'Document plan for diet advancement'
  },

  // NEURO CHECKS
  'Neuro Checks': {
    primaryRelations: {
      'GCS': 0.9,
      'Pupil Assessment': 0.9,
      'Motor/Sensory': 0.85,
      'Vital Signs': 0.8
    },
    secondaryOptions: [
      {
        label: 'Frequency',
        type: 'select',
        options: ['Q15min', 'Q30min', 'Q1H', 'Q2H', 'Q4H', 'Q shift'],
        required: true
      },
      {
        label: 'GCS',
        type: 'number',
        min: 3,
        max: 15
      },
      {
        label: 'Indication',
        type: 'select',
        options: ['Post-tPA', 'Head Injury', 'Post-Op', 'Stroke', 'Altered Mental Status', 'Seizure']
      }
    ],
    notePrompt: 'Document any changes from baseline'
  },

  // FALL RISK
  'Fall Risk': {
    primaryRelations: {
      'Bed Alarm': 0.9,
      'Assist Level': 0.85,
      'Environmental Safety': 0.8,
      'Medication Review': 0.7
    },
    secondaryOptions: [
      {
        label: 'Risk Score',
        type: 'select',
        options: ['Low', 'Moderate', 'High', 'Very High'],
        required: true
      },
      {
        label: 'Risk Factors',
        type: 'multiselect',
        options: ['History of Falls', 'Confusion', 'Medications', 'Weakness', 'Impaired Gait', 'Toileting Needs', 'Visual Impairment', 'Age >65']
      },
      {
        label: 'Interventions',
        type: 'multiselect',
        options: ['Bed Alarm', 'Chair Alarm', 'Sitter', 'Hourly Rounding', 'Toileting Schedule', 'Non-Slip Socks', 'Call Light in Reach']
      }
    ],
    notePrompt: 'Document specific fall prevention plan'
  },

  // ACTIVITY ORDERS
  'Bedrest': {
    primaryRelations: {
      'DVT Prophylaxis': 0.95,
      'Skin Care': 0.9,
      'ROM Exercises': 0.8,
      'Incentive Spirometer': 0.85
    },
    secondaryOptions: [
      {
        label: 'Positioning',
        type: 'multiselect',
        options: ['HOB Flat', 'HOB 30°', 'HOB 45°', 'Trendelenburg', 'Reverse Trendelenburg', 'Log Roll Only']
      },
      {
        label: 'Restrictions',
        type: 'multiselect',
        options: ['Strict', 'Bathroom Privileges', 'Bedside Commode', 'No Hip Flexion >90°', 'Spine Precautions']
      }
    ],
    notePrompt: 'Document reason for bedrest and mobility plan'
  },

  // DISCHARGE PLANNING
  'SNF': {
    primaryRelations: {
      'Insurance Auth': 0.9,
      'Placement': 0.9,
      'Med Rec': 0.85,
      'Equipment': 0.7
    },
    secondaryOptions: [
      {
        label: 'Facility Name',
        type: 'text'
      },
      {
        label: 'Acceptance Status',
        type: 'select',
        options: ['Pending', 'Accepted', 'Declined', 'Waitlist']
      },
      {
        label: 'Barriers',
        type: 'multiselect',
        options: ['Insurance', 'No Beds', 'Medical Complexity', 'Behavioral', 'Equipment Needs', 'Family Preference']
      },
      {
        label: 'Anticipated Date',
        type: 'text'
      }
    ],
    notePrompt: 'Document specific care needs and equipment requirements'
  }
};

// Function to get enhanced relationships with secondary options
export function getEnhancedRelationship(buttonKey: string): EnhancedRelationship | null {
  return enhancedRelationshipMap[buttonKey] || null;
}

// Function to check if a button needs secondary options
export function needsSecondaryOptions(buttonKey: string): boolean {
  return !!enhancedRelationshipMap[buttonKey]?.secondaryOptions?.length;
}

// Function to get the note prompt for a button
export function getNotePrompt(buttonKey: string): string {
  return enhancedRelationshipMap[buttonKey]?.notePrompt || 
    'Add any additional relevant information';
}