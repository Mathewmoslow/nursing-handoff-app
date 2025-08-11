// src/constants/relationships.ts
// Define relationships between different buttons/options

export interface RelationshipScore {
  [key: string]: number;
}

export const relationshipMap: Record<string, RelationshipScore> = {
  // ELECTROLYTE IMBALANCES - Complex Clinical Relationships
  'K >5.5': { 
    'EKG': 1.0, 
    'Peaked T waves': 0.95,
    'Kayexalate': 0.9, 
    'D50/Insulin': 0.85, 
    'Calcium Gluconate': 0.9,
    'Albuterol': 0.7,
    'Dialysis': 0.8,
    'Low Ca': 0.7, // Hyperkalemia can affect calcium
    'Cardiac Monitor': 0.95,
    'Call MD': 0.9,
    'Renal Diet': 0.8,
    'Hold K supplements': 1.0,
    'Lasix': 0.7,
    'Telemetry': 0.9
  },
  
  'K <3.5': {
    'EKG': 0.9,
    'Flat T waves': 0.85,
    'U waves': 0.8,
    'K Replacement': 0.95,
    'PO K': 0.8,
    'IV K': 0.9,
    'Cardiac Monitor': 0.9,
    'Mg Level': 0.85, // Low K often with low Mg
    'Check Digoxin': 0.8, // Hypokalemia increases dig toxicity
    'Call MD': 0.85,
    'Telemetry': 0.85,
    'Arrhythmia': 0.7
  },
  
  'Na >145': {
    'D5W': 0.9,
    'Free Water': 0.85,
    'Neuro Checks': 0.9,
    'Seizure Precautions': 0.8,
    'I&O Strict': 0.95,
    'Daily Weights': 0.8,
    'Mental Status': 0.85,
    'Fall Risk': 0.7,
    'Confusion': 0.75,
    'Serial Na Levels': 0.9
  },
  
  'Na <135': {
    'Fluid Restriction': 0.9,
    'Hypertonic Saline': 0.8,
    'Seizure Precautions': 0.85,
    'Neuro Checks': 0.9,
    'Mental Status': 0.9,
    'Fall Risk': 0.8,
    'Confusion': 0.85,
    'Daily Weights': 0.8,
    'I&O Strict': 0.95,
    'Serial Na Levels': 0.9,
    'Hold Diuretics': 0.7
  },
  
  'Ca >10.5': {
    'Low Phos': 0.85, // Inverse relationship
    'EKG': 0.9,
    'Shortened QT': 0.8,
    'NS Fluids': 0.9,
    'Lasix': 0.85,
    'Calcitonin': 0.8,
    'Bisphosphonates': 0.7,
    'Confusion': 0.8,
    'Constipation': 0.7,
    'Kidney Stones': 0.6,
    'Call MD': 0.9
  },
  
  'Ca <8.5': {
    'High Phos': 0.85, // Inverse relationship
    'Calcium Gluconate': 0.9,
    'EKG': 0.9,
    'Prolonged QT': 0.85,
    'Tetany': 0.8,
    'Chvostek Sign': 0.75,
    'Trousseau Sign': 0.75,
    'Seizure Precautions': 0.7,
    'Vitamin D': 0.7,
    'Check Mg': 0.8, // Often concurrent
    'Paresthesias': 0.75
  },
  
  'Mg <1.5': {
    'K <3.5': 0.8, // Often concurrent
    'Ca <8.5': 0.7,
    'Mg Replacement': 0.95,
    'Cardiac Monitor': 0.9,
    'Seizure Precautions': 0.7,
    'DTRs': 0.8,
    'Tetany': 0.7,
    'Check K': 0.85,
    'EKG': 0.85
  },
  
  'Phos >4.5': {
    'Ca <8.5': 0.85, // Inverse relationship
    'Phosphate Binders': 0.9,
    'Renal Diet': 0.85,
    'Dialysis': 0.7,
    'Itching': 0.6
  },
  
  // HEMATOLOGY - Anticipatory Relationships
  'Hgb <7': {
    'Type & Cross': 1.0,
    'Blood Transfusion': 0.95,
    'PRBC': 0.95,
    '2 Large Bore IVs': 0.9,
    'O2': 0.85,
    'Bleeding Assessment': 0.9,
    'Orthostatic VS': 0.85,
    'Fall Risk': 0.9,
    'Activity Restriction': 0.85,
    'SOB': 0.8,
    'Fatigue': 0.9,
    'Tachycardia': 0.85,
    'Pallor': 0.8,
    'GI Bleed': 0.7,
    'Consent': 0.9,
    'Blood Warmer': 0.7
  },
  
  'Hgb 7-9': {
    'Type & Screen': 0.8,
    'Monitor Trend': 0.9,
    'Activity as Tolerated': 0.7,
    'Fall Risk': 0.7,
    'Orthostatic VS': 0.7,
    'Iron Studies': 0.6,
    'Fatigue': 0.8
  },
  
  'Platelets <50': {
    'Bleeding Precautions': 1.0,
    'No IM Injections': 0.95,
    'Soft Toothbrush': 0.9,
    'Electric Razor': 0.9,
    'Fall Risk': 0.95,
    'Platelet Transfusion': 0.8,
    'Check for Petechiae': 0.85,
    'No Rectal': 0.95,
    'Hold Anticoagulation': 0.9,
    'Neuro Checks': 0.8
  },
  
  'WBC >15': {
    'Blood Cultures': 0.9,
    'Antibiotics': 0.85,
    'Fever': 0.8,
    'Infection Source': 0.9,
    'Lactate': 0.7,
    'Sepsis Protocol': 0.7,
    'I&O': 0.7,
    'Fluids': 0.75,
    'Trend WBC': 0.9
  },
  
  'WBC <4': {
    'Neutropenic Precautions': 0.95,
    'Private Room': 0.9,
    'No Fresh Flowers': 0.9,
    'Mask': 0.85,
    'Hand Hygiene': 1.0,
    'Temp Q4H': 0.9,
    'Call MD for Fever': 0.95,
    'No Rectal Temps': 0.9
  },
  
  'INR >3': {
    'Hold Warfarin': 0.95,
    'Vitamin K': 0.9,
    'FFP': 0.85,
    'Bleeding Precautions': 1.0,
    'Fall Risk': 0.95,
    'Neuro Checks': 0.85,
    'GI Prophylaxis': 0.7,
    'No IM Injections': 0.95
  },
  
  // VITAL SIGNS - Cascading Relationships
  'Temp >38.5': {
    'Blood Cultures': 0.95,
    'Antibiotics': 0.85,
    'Tylenol': 0.9,
    'Cooling Measures': 0.8,
    'Fluids': 0.85,
    'UA': 0.8,
    'CXR': 0.7,
    'Lactate': 0.75,
    'WBC': 0.85,
    'Source Investigation': 0.9,
    'I&O': 0.8
  },
  
  'HR >120': {
    'EKG': 0.95,
    'Telemetry': 0.9,
    'Fluids': 0.8,
    'Check Hgb': 0.7,
    'Pain Assessment': 0.8,
    'Anxiety': 0.7,
    'Beta Blocker': 0.7,
    'Thyroid': 0.6,
    'Fever': 0.7,
    'Dehydration': 0.75
  },
  
  'HR <50': {
    'EKG': 0.95,
    'Hold Beta Blocker': 0.9,
    'Hold Digoxin': 0.85,
    'Atropine': 0.7,
    'Pacing': 0.6,
    'Call MD': 0.9,
    'Telemetry': 0.95
  },
  
  'BP >180/110': {
    'Neuro Checks': 0.9,
    'Headache': 0.8,
    'Vision Changes': 0.75,
    'IV Antihypertensives': 0.85,
    'Hydralazine': 0.8,
    'Labetalol': 0.8,
    'Call MD': 0.95,
    'Stroke Risk': 0.7,
    'EKG': 0.8,
    'Cardiac Enzymes': 0.7
  },
  
  'BP <90/60': {
    'Fluids': 0.9,
    'Trendelenburg': 0.7,
    'Hold BP Meds': 0.95,
    'Check Hgb': 0.8,
    'Orthostatic VS': 0.85,
    'Fall Risk': 0.95,
    'Bedrest': 0.8,
    'Call MD': 0.85,
    'Pressors': 0.6,
    'Central Line': 0.6
  },
  
  'O2 <90%': {
    'O2 Therapy': 1.0,
    'ABG': 0.85,
    'CXR': 0.9,
    'Incentive Spirometer': 0.8,
    'HOB Up': 0.9,
    'Nebulizer': 0.7,
    'Diuretics': 0.6,
    'BiPAP': 0.7,
    'Call RT': 0.8,
    'Call MD': 0.85
  },
  
  // GLUCOSE MANAGEMENT
  'Glucose >250': {
    'Insulin': 0.95,
    'Sliding Scale': 0.9,
    'Accucheck Q2H': 0.9,
    'Ketones': 0.8,
    'Fluids': 0.85,
    'K Level': 0.85, // Insulin drives K into cells
    'Cardiac Monitor': 0.7,
    'I&O': 0.8,
    'Daily BMP': 0.8
  },
  
  'Glucose <70': {
    'D50': 0.9,
    'Orange Juice': 0.85,
    'Glucagon': 0.7,
    'Recheck 15min': 0.95,
    'Hold Insulin': 0.95,
    'Complex Carbs': 0.8,
    'Neuro Checks': 0.8,
    'Fall Risk': 0.85,
    'Call MD': 0.8
  },
  
  // MEDICATIONS - Monitoring Requirements
  'Heparin': {
    'PTT': 0.95,
    'Bleeding Precautions': 0.9,
    'Platelet Count': 0.85, // HIT monitoring
    'No IM': 0.9,
    'Protamine': 0.6,
    'Fall Risk': 0.85,
    'Neuro Checks': 0.7
  },
  
  'Warfarin': {
    'INR': 0.95,
    'Vitamin K': 0.6,
    'Diet Education': 0.8,
    'Bleeding Precautions': 0.9,
    'Fall Risk': 0.85,
    'Drug Interactions': 0.8
  },
  
  'Digoxin': {
    'Dig Level': 0.9,
    'K Level': 0.95, // Low K increases toxicity
    'HR': 0.95,
    'Hold if <60': 0.9,
    'Vision Changes': 0.7,
    'N/V': 0.7,
    'EKG': 0.8
  },
  
  'Lasix': {
    'K Level': 0.95,
    'I&O': 0.95,
    'Daily Weights': 0.9,
    'Orthostatic VS': 0.8,
    'BUN/Cr': 0.85,
    'Mg Level': 0.7,
    'Fall Risk': 0.75
  },
  
  'Vancomycin': {
    'Trough Level': 0.95,
    'BUN/Cr': 0.9,
    'Red Man Syndrome': 0.7,
    'Slow Infusion': 0.8,
    'Hearing': 0.6,
    'Peak Level': 0.7
  },
  
  'Insulin Drip': {
    'Q1H Glucose': 1.0,
    'K Level': 0.9,
    'Anion Gap': 0.85,
    'I&O': 0.85,
    'Cardiac Monitor': 0.8,
    'Two IV Sites': 0.8,
    'No SQ Insulin': 0.7
  },
  
  // RESPIRATORY CONDITIONS
  'COPD': {
    'O2 88-92%': 0.9, // Controlled O2
    'Nebulizers': 0.85,
    'Steroids': 0.8,
    'Incentive Spirometer': 0.85,
    'Activity Tolerance': 0.8,
    'Smoking Cessation': 0.7,
    'BiPAP': 0.6,
    'ABG': 0.7
  },
  
  'Pneumonia': {
    'Antibiotics': 0.95,
    'O2': 0.9,
    'Incentive Spirometer': 0.9,
    'CXR': 0.85,
    'Blood Cultures': 0.8,
    'Sputum Culture': 0.7,
    'Fluids': 0.8,
    'Fever': 0.8
  },
  
  'CHF': {
    'Daily Weights': 0.95,
    '2gm Na Diet': 0.9,
    'Fluid Restriction': 0.85,
    'Lasix': 0.9,
    'I&O Strict': 0.95,
    'BNP': 0.8,
    'Echo': 0.7,
    'ACE Inhibitor': 0.8,
    'Beta Blocker': 0.8,
    'Orthopnea': 0.7,
    'JVD': 0.7,
    'Edema': 0.8
  },
  
  'MI': {
    'Troponin': 0.95,
    'EKG': 1.0,
    'Aspirin': 0.95,
    'Nitroglycerin': 0.85,
    'Morphine': 0.8,
    'O2': 0.85,
    'Cardiac Cath': 0.8,
    'Heparin': 0.85,
    'Beta Blocker': 0.85,
    'Telemetry': 0.95,
    'Bedrest': 0.8,
    'Call Cardiology': 0.9
  },
  
  // NEUROLOGICAL
  'CVA': {
    'CT Head': 1.0,
    'Neuro Checks': 1.0,
    'NIH Stroke Scale': 0.9,
    'Dysphagia Screen': 0.95,
    'Aspiration Precautions': 0.9,
    'PT/OT': 0.85,
    'Speech Therapy': 0.85,
    'Fall Risk': 0.95,
    'DVT Prophylaxis': 0.85,
    'Aspirin': 0.8,
    'BP Management': 0.85
  },
  
  'Seizure': {
    'Seizure Precautions': 1.0,
    'Padded Side Rails': 0.9,
    'O2': 0.85,
    'Suction': 0.9,
    'IV Access': 0.9,
    'Ativan': 0.8,
    'Dilantin Level': 0.8,
    'EEG': 0.7,
    'Fall Risk': 0.9
  },
  
  'Altered Mental Status': {
    'Glucose Check': 0.95,
    'O2 Sat': 0.9,
    'Drug Screen': 0.8,
    'UA': 0.85,
    'CT Head': 0.8,
    'B12/Folate': 0.6,
    'Thyroid': 0.6,
    'Ammonia': 0.7,
    'Fall Risk': 0.95,
    'Sitter': 0.8,
    'Reorientation': 0.8
  },
  
  // GI CONDITIONS
  'GI Bleed': {
    'NPO': 0.95,
    'Type & Cross': 0.95,
    'Large Bore IV x2': 0.9,
    'H&H Q6': 0.95,
    'Orthostatic VS': 0.85,
    'PPI': 0.9,
    'Octreotide': 0.7,
    'GI Consult': 0.9,
    'EGD': 0.8,
    'Colonoscopy': 0.7,
    'NG Lavage': 0.6
  },
  
  'Pancreatitis': {
    'NPO': 0.95,
    'Pain Management': 0.9,
    'Lipase': 0.9,
    'Fluids': 0.9,
    'Antiemetics': 0.85,
    'NG Decompression': 0.7,
    'No Morphine': 0.8, // Can cause sphincter spasm
    'ETOH History': 0.7
  },
  
  // RENAL
  'AKI': {
    'Fluid Balance': 0.95,
    'Daily BMP': 0.95,
    'Foley': 0.85,
    'I&O Strict': 0.95,
    'Daily Weights': 0.9,
    'Hold Nephrotoxic': 0.95,
    'Hold ACE/ARB': 0.9,
    'Renal Diet': 0.85,
    'Fluid Challenge': 0.7,
    'Renal US': 0.7,
    'Nephrology': 0.75
  },
  
  'Dialysis': {
    'Dry Weight': 0.95,
    'No BP in Fistula Arm': 1.0,
    'Fistula Thrill/Bruit': 0.95,
    'Hold BP Meds': 0.85,
    'Renal Diet': 0.95,
    'Fluid Restriction': 0.9,
    'Phos Binders': 0.85,
    'EPO': 0.7,
    'Access Site': 0.9
  },
  
  // SEPSIS
  'Sepsis': {
    'Blood Cultures x2': 1.0,
    'Lactate': 0.95,
    'Antibiotics <1hr': 0.95,
    '30ml/kg Fluids': 0.9,
    'MAP >65': 0.85,
    'Pressors': 0.7,
    'Central Line': 0.75,
    'I&O': 0.9,
    'Q1H VS': 0.85,
    'ICU': 0.7
  },
  
  // PAIN MANAGEMENT
  'Pain 7-10': {
    'Pain Meds': 0.95,
    'Non-Pharm': 0.8,
    'Positioning': 0.75,
    'Ice/Heat': 0.7,
    'Reassess 30min': 0.9,
    'VS': 0.8,
    'Fall Risk': 0.7
  },
  
  // SURGICAL
  'Post-Op Day 0': {
    'VS Q15min x4': 0.95,
    'Then Q30min x2': 0.9,
    'Then Q1H x4': 0.9,
    'Surgical Site': 0.95,
    'Drain Output': 0.85,
    'Pain Management': 0.9,
    'N/V': 0.8,
    'I&O': 0.85,
    'SCDs': 0.9,
    'Incentive Spirometer': 0.9
  },
  
  // SAFETY ASSESSMENTS
  'Fall Risk': {
    'Bed Alarm': 0.9,
    'Call Light in Reach': 0.95,
    'Non-Slip Socks': 0.85,
    'Assist with Ambulation': 0.9,
    'Bathroom Schedule': 0.8,
    'Clear Pathways': 0.85,
    'Sitter': 0.6,
    'PT Consult': 0.7
  },
  
  'Aspiration Risk': {
    'HOB >30': 0.95,
    'Thickened Liquids': 0.85,
    'Supervised Meals': 0.8,
    'Speech Therapy': 0.85,
    'Oral Care': 0.8,
    'Suction Setup': 0.85
  },
  
  // MENTAL STATUS - A&O
  'A&O x4': { 
    'Independent': 0.8, 
    'Orient PRN': 0.3, 
    'Baseline': 0.9,
    'Continue Plan': 0.7
  },
  'A&O x3': { 
    'Reorientation': 0.7, 
    'Calendar': 0.6, 
    'Fall Risk': 0.7,
    'Confusion Protocol': 0.6
  },
  'A&O x2': { 
    'Sitter': 0.7, 
    'Fall Risk': 0.85, 
    'Bed Alarm': 0.8, 
    'Frequent Checks': 0.8,
    'Family': 0.7 
  },
  'A&O x1': { 
    'Fall Risk': 0.9, 
    'Assist x2': 0.8, 
    'Sitter': 0.8, 
    'Bed Alarm': 0.85, 
    'Behavior': 0.8, 
    'Restraints': 0.5, 
    'Family': 0.7,
    'Psych Consult': 0.6
  },
  
  'Confused': { 
    'Fall Risk': 0.95, 
    'Sitter': 0.85, 
    'Bed Alarm': 0.9, 
    'Reorientation': 0.8, 
    'Safety': 0.95, 
    'Behavior': 0.85, 
    'UTI': 0.7, 
    'Drug Screen': 0.6,
    'Delirium Protocol': 0.8,
    'Haldol': 0.6
  },
  
  'Sedated': { 
    'RASS Score': 0.95, 
    'Reversal Agents': 0.7, 
    'Respiratory Monitoring': 0.9, 
    'Q1H Neuro': 0.85, 
    'Pain Scale': 0.7, 
    'Narcan': 0.6, 
    'ABG': 0.6,
    'Hold Sedation': 0.8
  },
  
  'Comatose': { 
    'GCS': 0.95, 
    'Pupils': 0.95, 
    'ICU': 0.85, 
    'Family Meeting': 0.8, 
    'Neuro Consult': 0.85, 
    'EEG': 0.7, 
    'Goals of Care': 0.8,
    'Ethics': 0.6,
    'Palliative': 0.7
  },
  
  // PUPILS
  'PERRL': { 
    'Neuro WNL': 0.7, 
    'Continue Current Plan': 0.6 
  },
  'Sluggish': { 
    'Neuro Checks': 0.85, 
    'CT Head': 0.7, 
    'Call MD': 0.8, 
    'Glucose Check': 0.7, 
    'Med Review': 0.6,
    'Narcotic Effect': 0.7
  },
  'Fixed': { 
    'Call MD': 0.95, 
    'CT Head': 0.95, 
    'Neuro Consult': 0.95, 
    'ICU': 0.85, 
    'Code Status': 0.8, 
    'Family': 0.85,
    'Brain Death Protocol': 0.7
  },
  'Dilated': { 
    'Narcan': 0.8, 
    'Drug Screen': 0.8, 
    'Call MD': 0.85, 
    'Atropine Effect': 0.6, 
    'Cocaine': 0.7,
    'Anticholinergic': 0.7
  },
  'Pinpoint': { 
    'Narcan': 0.95, 
    'Call MD': 0.85, 
    'Respiratory Rate': 0.95, 
    'Opioid OD': 0.9, 
    'ABG': 0.8,
    'Ventilation': 0.7
  },
  
  // MOTOR STRENGTH
  'Normal Strength': { 
    'Ambulate': 0.8, 
    'PT': 0.5, 
    'Independent': 0.7 
  },
  'Weak L': { 
    'Fall Risk': 0.9, 
    'PT': 0.85, 
    'Assist Device': 0.8, 
    'CVA Rule Out': 0.7,
    'CT Head': 0.6
  },
  'Weak R': { 
    'Fall Risk': 0.9, 
    'PT': 0.85, 
    'Assist Device': 0.8, 
    'CVA Rule Out': 0.7,
    'CT Head': 0.6
  },
  'No Movement': { 
    'Spinal Injury': 0.8, 
    'Neuro Consult': 0.9, 
    'MRI': 0.8, 
    'Steroids': 0.6,
    'Log Roll': 0.9
  },
  
  // CHIEF COMPLAINTS
  'Chest Pain': { 
    'EKG': 1.0, 
    'Troponin': 0.95, 
    'Aspirin': 0.85, 
    'Nitroglycerin': 0.8, 
    'Morphine': 0.7, 
    'Cards Consult': 0.8,
    'CXR': 0.8,
    'O2': 0.8,
    'Telemetry': 0.95
  },
  
  'SOB': { 
    'O2': 0.95, 
    'CXR': 0.9, 
    'ABG': 0.8, 
    'Nebulizer': 0.75, 
    'Diuretics': 0.7, 
    'BiPAP': 0.65,
    'BNP': 0.7,
    'D-Dimer': 0.6,
    'HOB Up': 0.9
  },
  
  'Altered MS': { 
    'Glucose Check': 0.95, 
    'CT Head': 0.85, 
    'UA': 0.8, 
    'Drug Screen': 0.7, 
    'Narcan': 0.6, 
    'Neuro Consult': 0.75,
    'B12/Folate': 0.5,
    'Ammonia': 0.6
  },
  
  'Abdominal Pain': { 
    'NPO': 0.85, 
    'CT Abdomen': 0.85, 
    'CBC': 0.9, 
    'Lipase': 0.75, 
    'Surgery Consult': 0.65,
    'LFTs': 0.7,
    'UA': 0.7,
    'Pregnancy Test': 0.8
  },
  
  // DIAGNOSES WITH CARE PATHWAYS
  'Sepsis Protocol': {
    'Lactate <1hr': 1.0,
    'Blood Cultures x2': 1.0,
    'Antibiotics <1hr': 1.0,
    'Fluids 30ml/kg': 0.95,
    'Reassess': 0.9,
    'Pressors': 0.7,
    'ICU': 0.7
  },
  
  'DKA': { 
    'Insulin Drip': 1.0, 
    'Fluids': 0.95, 
    'K Replacement': 0.95, 
    'Q1H Glucose': 1.0, 
    'Anion Gap': 0.9, 
    'ICU': 0.85,
    'Cardiac Monitor': 0.9,
    'Q2H BMP': 0.85
  },
  
  'PE': { 
    'Heparin': 0.95, 
    'CTA Chest': 0.95, 
    'O2': 0.95, 
    'Bedrest': 0.85, 
    'IVC Filter': 0.6, 
    'Echo': 0.65,
    'Troponin': 0.7,
    'BNP': 0.6
  },
  
  // IV ACCESS & FLUID RELATIONSHIPS
  'PIV x1': { 
    'Saline Lock': 0.6, 
    'Fluids': 0.7,
    'RAC': 0.7,
    'LAC': 0.7,
    'R Forearm': 0.7,
    'L Forearm': 0.7,
    'NS': 0.8,
    'LR': 0.7,
    'D5W': 0.6,
    'Blood Draw': 0.5,
    '20g': 0.7,
    '22g': 0.6,
    'IV Pump': 0.7
  },
  
  'PIV x2': { 
    'Blood Draw': 0.7, 
    'Fluids': 0.8,
    'RAC': 0.6,
    'LAC': 0.6,
    'R Forearm': 0.7,
    'L Forearm': 0.7,
    'NS': 0.9,
    'LR': 0.8,
    'D5W': 0.7,
    'Blood Products': 0.7,
    '18g': 0.8,
    '20g': 0.7,
    'Rapid Infusion': 0.8
  },
  
  'Central Line': { 
    'Daily Dressing': 0.95, 
    'Blood Cultures': 0.7,
    'RIJ': 0.8,
    'LIJ': 0.8,
    'R Subclavian': 0.7,
    'L Subclavian': 0.7,
    'Multiple Drips': 0.9,
    'Pressors': 0.85,
    'TPN': 0.8,
    'CVP Monitoring': 0.75,
    'CLABSI Prevention': 0.9
  },
  
  'PICC': { 
    'Weekly Dressing': 0.95, 
    'Home Infusion': 0.8,
    'R Arm': 0.8,
    'L Arm': 0.8,
    'Antibiotics': 0.9,
    'Chemotherapy': 0.75,
    'Long-term Access': 0.95,
    'Flush Daily': 0.85,
    'Measure Arm': 0.7
  },
  
  'Port': { 
    'Huber Needle': 0.95, 
    'Chemotherapy': 0.8,
    'Access q7 days': 0.85,
    'Sterile Technique': 0.95
  },
  
  'Infiltrated': { 
    'Restart IV': 0.95, 
    'Warm Compress': 0.85,
    'Elevate': 0.8,
    'Document Size': 0.9
  },
  
  'Saline Lock': { 
    'Flush Q8H': 0.95, 
    'Patent': 0.85,
    'Convert to Continuous': 0.5
  },
  
  // IV LOCATION RELATIONSHIPS
  'RAC': { 
    'PIV x1': 0.9, 
    'Saline Lock': 0.7, 
    'NS': 0.7, 
    'LR': 0.6, 
    '20g': 0.8, 
    '22g': 0.7,
    'Good for CT': 0.8
  },
  
  'LAC': { 
    'PIV x1': 0.9, 
    'Saline Lock': 0.7, 
    'NS': 0.7, 
    'LR': 0.6, 
    '20g': 0.8, 
    '22g': 0.7,
    'Good for CT': 0.8
  },
  
  'R Forearm': { 
    'PIV x1': 0.9, 
    'Good Access': 0.8, 
    'NS': 0.8, 
    'LR': 0.7, 
    '18g': 0.8, 
    '20g': 0.9,
    'Stable Site': 0.85
  },
  
  'L Forearm': { 
    'PIV x1': 0.9, 
    'Good Access': 0.8, 
    'NS': 0.8, 
    'LR': 0.7, 
    '18g': 0.8, 
    '20g': 0.9,
    'Stable Site': 0.85
  },
  
  'R Hand': { 
    'PIV x1': 0.8, 
    'Difficult Access': 0.6, 
    'Saline Lock': 0.8, 
    '22g': 0.9, 
    '24g': 0.8,
    'Positional': 0.7
  },
  
  'L Hand': { 
    'PIV x1': 0.8, 
    'Difficult Access': 0.6, 
    'Saline Lock': 0.8, 
    '22g': 0.9, 
    '24g': 0.8,
    'Positional': 0.7
  },
  
  'RFJ': { 
    'Central Line': 0.9, 
    'Femoral': 0.9, 
    'Emergency Access': 0.8, 
    'Pressors': 0.7,
    'High Infection Risk': 0.8,
    'Temporary': 0.9
  },
  
  'LFJ': { 
    'Central Line': 0.9, 
    'Femoral': 0.9, 
    'Emergency Access': 0.8, 
    'Pressors': 0.7,
    'High Infection Risk': 0.8,
    'Temporary': 0.9
  },
  
  'RIJ': { 
    'Central Line': 0.9, 
    'Triple Lumen': 0.8, 
    'Dialysis Catheter': 0.7, 
    'Multiple Drips': 0.8, 
    'CVP Monitoring': 0.7,
    'Preferred Site': 0.85
  },
  
  'LIJ': { 
    'Central Line': 0.9, 
    'Triple Lumen': 0.8, 
    'Dialysis Catheter': 0.7, 
    'Multiple Drips': 0.8, 
    'CVP Monitoring': 0.7,
    'Avoid if R Failed': 0.9
  },
  
  'R Subclavian': { 
    'Central Line': 0.9, 
    'Long-term Access': 0.8,
    'Low Infection': 0.8,
    'Pneumothorax Risk': 0.6
  },
  
  'L Subclavian': { 
    'Central Line': 0.9, 
    'Long-term Access': 0.8,
    'Low Infection': 0.8,
    'Pneumothorax Risk': 0.6
  },
  
  'PICC R': { 
    'PICC Line': 0.9, 
    'Home Infusion': 0.8, 
    'Long-term Antibiotics': 0.8,
    'Power PICC': 0.6
  },
  
  'PICC L': { 
    'PICC Line': 0.9, 
    'Home Infusion': 0.8, 
    'Long-term Antibiotics': 0.8,
    'Power PICC': 0.6
  },
  
  // FLUIDS - Enhanced with clinical connections
  'NS': { 
    'Fluids': 0.9, 
    'Maintenance': 0.8, 
    'Bolus': 0.8, 
    'PIV x1': 0.7, 
    'PIV x2': 0.8, 
    'IV Pump': 0.6, 
    '125ml/hr': 0.7, 
    '75ml/hr': 0.6,
    'Resuscitation': 0.8,
    'Compatible': 0.9
  },
  
  'LR': { 
    'Fluids': 0.9, 
    'Surgery': 0.8, 
    'Resuscitation': 0.85, 
    'PIV x2': 0.8, 
    'Large Bore': 0.75, 
    'Bolus': 0.85,
    'Trauma': 0.8,
    'Burns': 0.8
  },
  
  'D5W': { 
    'Fluids': 0.9, 
    'Hypoglycemia': 0.7, 
    'Maintenance': 0.7, 
    'PIV x1': 0.7, 
    'Central Line': 0.6, 
    '100ml/hr': 0.6,
    'Free Water': 0.8,
    'Hypernatremia': 0.7
  },
  
  'D5NS': { 
    'Fluids': 0.9, 
    'Maintenance': 0.85, 
    'PIV x1': 0.7, 
    'PIV x2': 0.6, 
    '125ml/hr': 0.7,
    'Post-Op': 0.7
  },
  
  'D5 1/2NS': { 
    'Fluids': 0.9, 
    'Pediatric': 0.8, 
    'Maintenance': 0.85, 
    'PIV x1': 0.7,
    'Calculated Rate': 0.8
  },
  
  'Fluids': { 
    'PIV x1': 0.7, 
    'PIV x2': 0.8, 
    'Central Line': 0.6, 
    'NS': 0.8, 
    'LR': 0.7, 
    'IV Pump': 0.7,
    'I&O': 0.9,
    'Daily Weights': 0.7
  },
  
  // ACTIVITY & MOBILITY
  'Bedrest': {
    'DVT Prophylaxis': 0.95,
    'SCDs': 0.9,
    'Turn Q2H': 0.9,
    'Skin Assessment': 0.85,
    'Pneumonia Risk': 0.7,
    'Incentive Spirometer': 0.85
  },
  
  'Up in Chair': {
    'Assist x1': 0.7,
    'PT': 0.6,
    'Progress Mobility': 0.7,
    'Orthostatic VS': 0.6
  },
  
  'Ambulate': {
    'Fall Risk Assessment': 0.8,
    'Gait Belt': 0.7,
    'PT': 0.6,
    'Clear Path': 0.8,
    'Non-Slip Socks': 0.7
  },
  
  // DIET ORDERS
  'NPO': {
    'IV Fluids': 0.9,
    'Mouth Care': 0.8,
    'Blood Sugar': 0.7,
    'Hold PO Meds': 0.85,
    'Surgery': 0.7,
    'Procedure': 0.8
  },
  
  'Clear Liquids': {
    'Advance Diet': 0.7,
    'Tolerance': 0.8,
    'Post-Op': 0.7,
    'Bowel Sounds': 0.6
  },
  
  'Cardiac Diet': {
    '2gm Na': 0.95,
    'Low Fat': 0.8,
    'Dietitian': 0.6,
    'Education': 0.7
  },
  
  'Diabetic Diet': {
    'Carb Counting': 0.8,
    'Accucheck AC/HS': 0.9,
    'Insulin': 0.85,
    'Education': 0.8
  },
  
  'Renal Diet': {
    'Low K': 0.9,
    'Low Phos': 0.9,
    'Low Na': 0.85,
    'Fluid Restriction': 0.8,
    'Dialysis': 0.7
  },
  
  // DISCHARGE PLANNING
  'Home': {
    'Education': 0.9,
    'Medications': 0.9,
    'Follow-up': 0.95,
    'Home Health': 0.5,
    'Equipment': 0.6
  },
  
  'SNF': {
    'PT/OT Eval': 0.9,
    'Insurance Auth': 0.85,
    'Placement': 0.9,
    'Med Rec': 0.9,
    'Transport': 0.8
  },
  
  'Rehab': {
    '3hr Therapy': 0.9,
    'Insurance Auth': 0.9,
    'PT/OT/Speech': 0.85,
    'Placement': 0.85
  },
  
  // CODE STATUS
  'Full Code': {
    'CPR': 1.0,
    'Intubation': 1.0,
    'Pressors': 0.9,
    'Dialysis': 0.8,
    'All Measures': 1.0
  },
  
  'DNR': {
    'No CPR': 1.0,
    'Comfort Care': 0.7,
    'Family Meeting': 0.8,
    'Palliative': 0.7,
    'Continue Tx': 0.8
  },
  
  'DNI': {
    'No Intubation': 1.0,
    'BiPAP OK': 0.8,
    'Comfort': 0.7,
    'Palliative': 0.6
  },
  
  'Comfort Care': {
    'Morphine': 0.9,
    'Ativan': 0.8,
    'Scopalamine': 0.7,
    'Family': 0.95,
    'Chaplain': 0.7,
    'No Labs': 0.9,
    'No VS': 0.8
  },
  
  // COMPREHENSIVE MEDICAL CONDITIONS - DIABETES & ENDOCRINE
  'DM': {
    'Accucheck AC/HS': 0.95,
    'Sliding Scale': 0.9,
    'Diabetic Diet': 0.9,
    'Foot Care': 0.8,
    'A1C': 0.7,
    'Ophthalmology': 0.6,
    'Nephrology': 0.6,
    'Wound Care': 0.7,
    'Infection Risk': 0.8,
    'DKA Risk': 0.7,
    'HHS Risk': 0.6,
    'Neuropathy': 0.7,
    'Fall Risk': 0.7,
    'Slow Healing': 0.8
  },
  
  'Type 1 DM': {
    'Insulin Dependent': 1.0,
    'DKA Risk': 0.9,
    'Ketone Check': 0.8,
    'Pump Management': 0.7,
    'Hypoglycemia': 0.8,
    'Sick Day Rules': 0.8,
    'Never Hold Insulin': 0.9
  },
  
  'Type 2 DM': {
    'Metformin': 0.8,
    'Insulin': 0.7,
    'Weight Management': 0.7,
    'HHS Risk': 0.6,
    'CV Risk': 0.8,
    'Hold Metformin': 0.7, // For procedures
    'Lifestyle Counseling': 0.7
  },
  
  'Hypothyroid': {
    'TSH': 0.9,
    'Levothyroxine': 0.9,
    'Bradycardia': 0.7,
    'Depression': 0.6,
    'Weight Gain': 0.7,
    'Constipation': 0.6,
    'Cold Intolerance': 0.6,
    'Dry Skin': 0.6
  },
  
  'Hyperthyroid': {
    'TSH': 0.9,
    'T3/T4': 0.8,
    'Tachycardia': 0.8,
    'Weight Loss': 0.7,
    'Heat Intolerance': 0.7,
    'Anxiety': 0.7,
    'Beta Blockers': 0.8,
    'Methimazole': 0.7,
    'Eye Protection': 0.6
  },
  
  'Adrenal Insufficiency': {
    'Steroids': 0.95,
    'Never Stop Abruptly': 1.0,
    'Stress Dose': 0.9,
    'Hypotension': 0.8,
    'Hyponatremia': 0.8,
    'Hyperkalemia': 0.8,
    'Crisis Risk': 0.9,
    'Medical Alert': 0.9
  },
  
  // CARDIAC CONDITIONS - COMPREHENSIVE
  'HTN': {
    'BP Monitoring': 0.9,
    'ACE Inhibitor': 0.8,
    'Diuretics': 0.8,
    'Low Na Diet': 0.8,
    'DASH Diet': 0.7,
    'Exercise': 0.7,
    'Weight Management': 0.7,
    'Stroke Risk': 0.7,
    'MI Risk': 0.7,
    'CKD Risk': 0.6,
    'Retinopathy': 0.5
  },
  
  'CAD': {
    'Aspirin': 0.9,
    'Statin': 0.9,
    'Beta Blocker': 0.8,
    'Cardiac Diet': 0.8,
    'Exercise Tolerance': 0.7,
    'Chest Pain': 0.8,
    'EKG Changes': 0.8,
    'Stress Test': 0.6,
    'Cath': 0.7,
    'Nitrates': 0.7,
    'Activity Restriction': 0.6
  },
  
  'AFib': {
    'Telemetry': 0.9,
    'Anticoagulation': 0.9,
    'Rate Control': 0.8,
    'EKG': 0.8,
    'INR': 0.8,
    'Stroke Risk': 0.9,
    'Cardiology': 0.7,
    'CHADS Score': 0.7,
    'Echo': 0.6,
    'Cardioversion': 0.6
  },
  
  'Heart Block': {
    'Telemetry': 1.0,
    'Pacemaker': 0.8,
    'Atropine': 0.7,
    'Transcutaneous Pacing': 0.7,
    'Hold Beta Blockers': 0.9,
    'Hold Digoxin': 0.8,
    'Call MD': 0.9,
    'EP Study': 0.6
  },
  
  'Cardiomyopathy': {
    'Echo': 0.9,
    'CHF Management': 0.9,
    'ACE Inhibitor': 0.9,
    'Beta Blocker': 0.8,
    'Diuretics': 0.8,
    'ICD': 0.7,
    'Transplant Eval': 0.5,
    'Activity Restriction': 0.8
  },
  
  // PULMONARY CONDITIONS
  'Asthma': {
    'Albuterol': 0.9,
    'Inhaled Steroids': 0.8,
    'Peak Flow': 0.8,
    'Avoid Triggers': 0.8,
    'Action Plan': 0.8,
    'Spacer': 0.7,
    'Allergy Testing': 0.6,
    'Status Asthmaticus': 0.6
  },
  
  'COPD Exacerbation': {
    'Steroids': 0.9,
    'Antibiotics': 0.8,
    'Nebulizers': 0.9,
    'O2 Titration': 0.9,
    'ABG': 0.8,
    'BiPAP': 0.7,
    'Pulm Rehab': 0.6,
    'Smoking Cessation': 0.8
  },
  
  
  'CHF Exacerbation': {
    'Diuretics': 0.95,
    'Daily Weights': 0.95,
    'Fluid Restriction': 0.9,
    'I&O Strict': 0.95,
    'BNP': 0.9,
    'Echo': 0.8,
    'CXR': 0.9,
    'Na Restriction': 0.9,
    'ACE/ARB': 0.8,
    'Beta Blocker': 0.8
  },
  
  'Pulmonary Edema': {
    'Diuretics': 0.95,
    'BiPAP': 0.9,
    'HOB Up': 0.95,
    'O2': 0.95,
    'Morphine': 0.7,
    'Nitrates': 0.8,
    'Foley': 0.9,
    'Call MD': 0.9,
    'ICU': 0.8
  },
  
  'Pleural Effusion': {
    'CXR': 0.9,
    'CT Chest': 0.8,
    'Thoracentesis': 0.8,
    'Diuretics': 0.7,
    'Pleural Fluid Analysis': 0.8,
    'SOB': 0.8,
    'Pleurodesis': 0.5
  },
  
  // RENAL CONDITIONS
  'CKD': {
    'BUN/Cr': 0.95,
    'eGFR': 0.9,
    'Renal Diet': 0.9,
    'Phos Binders': 0.8,
    'EPO': 0.7,
    'Ca/Vit D': 0.7,
    'Avoid Nephrotoxic': 0.95,
    'Nephrology': 0.8,
    'Dialysis Access': 0.6,
    'Transplant Eval': 0.5,
    'Bone Disease': 0.7,
    'Anemia': 0.8
  },
  
  'ESRD': {
    'Dialysis': 0.95,
    'Access Management': 0.95,
    'Fluid Restriction': 0.9,
    'Renal Diet': 0.95,
    'Phos Binders': 0.9,
    'EPO': 0.8,
    'Dry Weight': 0.9,
    'Transplant List': 0.7,
    'Bone Disease': 0.8
  },
  
  'Nephrotic Syndrome': {
    'Proteinuria': 0.95,
    'Edema': 0.9,
    'Albumin': 0.9,
    'Diuretics': 0.8,
    'ACE Inhibitor': 0.8,
    'Infection Risk': 0.8,
    'DVT Risk': 0.7,
    'Cholesterol': 0.7
  },
  
  // NEUROLOGICAL CONDITIONS
  'Dementia': {
    'Fall Risk': 0.95,
    'Sitter': 0.8,
    'Reorientation': 0.8,
    'Familiar Objects': 0.7,
    'Routine': 0.8,
    'Behavior Plan': 0.8,
    'Family Involvement': 0.9,
    'Safety': 0.95,
    'Wandering Risk': 0.8,
    'Sundowning': 0.7
  },
  
  'Alzheimer Disease': {
    'Memory Care': 0.9,
    'Donepezil': 0.8,
    'Behavioral Issues': 0.8,
    'Family Support': 0.9,
    'Safety Measures': 0.95,
    'Aspiration Risk': 0.7,
    'Weight Loss': 0.7,
    'Sleep Issues': 0.7
  },
  
  'Parkinson Disease': {
    'Carbidopa/Levodopa': 0.9,
    'Fall Risk': 0.95,
    'PT/OT': 0.9,
    'Speech Therapy': 0.8,
    'Dysphagia': 0.8,
    'Freezing Episodes': 0.8,
    'Tremor': 0.9,
    'Constipation': 0.8,
    'Depression': 0.7
  },
  
  'Multiple Sclerosis': {
    'Steroids': 0.8,
    'Immunosuppressants': 0.7,
    'PT/OT': 0.9,
    'Fatigue Management': 0.8,
    'Heat Sensitivity': 0.7,
    'Bladder Issues': 0.8,
    'Depression': 0.7,
    'Exacerbation': 0.7
  },
  
  'Epilepsy': {
    'Antiepileptics': 0.95,
    'Seizure Precautions': 1.0,
    'Med Levels': 0.9,
    'Med Compliance': 0.9,
    'Triggers': 0.8,
    'Status Epilepticus': 0.7,
    'Driver Restrictions': 0.7,
    'EEG': 0.7
  },
  
  // GASTROINTESTINAL CONDITIONS
  'GERD': {
    'PPI': 0.9,
    'H2 Blockers': 0.8,
    'HOB Up': 0.8,
    'Avoid Triggers': 0.8,
    'Small Meals': 0.7,
    'Weight Loss': 0.7,
    'Barrett Esophagus': 0.5,
    'EGD': 0.6
  },
  
  'IBD': {
    'Immunosuppressants': 0.8,
    'Steroids': 0.8,
    'Nutrition': 0.8,
    'Infection Risk': 0.8,
    'GI Consult': 0.8,
    'Colonoscopy': 0.7,
    'Biologics': 0.7,
    'Surgery': 0.6
  },
  
  'Liver Disease': {
    'LFTs': 0.95,
    'Albumin': 0.9,
    'PT/INR': 0.9,
    'Ascites': 0.8,
    'Encephalopathy': 0.8,
    'Lactulose': 0.7,
    'Paracentesis': 0.7,
    'TIPS': 0.5,
    'Transplant': 0.6
  },
  
  'Cirrhosis': {
    'MELD Score': 0.9,
    'Varices Screen': 0.8,
    'SBP Prophylaxis': 0.7,
    'Diuretics': 0.8,
    'Low Na Diet': 0.8,
    'Avoid NSAIDs': 0.9,
    'Transplant List': 0.7,
    'Child-Pugh': 0.8
  },
  
  
  // HEMATOLOGIC CONDITIONS
  'Anemia': {
    'CBC': 0.9,
    'Iron Studies': 0.8,
    'B12/Folate': 0.8,
    'Reticulocyte': 0.7,
    'Fatigue': 0.9,
    'Transfusion': 0.6,
    'EPO': 0.6,
    'Source': 0.8
  },
  
  'Sickle Cell': {
    'Pain Crisis': 0.9,
    'Hydroxyurea': 0.8,
    'Hydration': 0.9,
    'O2': 0.8,
    'Infection Risk': 0.8,
    'Stroke Risk': 0.7,
    'Priapism': 0.6,
    'Exchange Transfusion': 0.6
  },
  
  'Leukemia': {
    'Neutropenic Precautions': 0.95,
    'Chemotherapy': 0.9,
    'Infection Risk': 0.95,
    'Bleeding Risk': 0.9,
    'Transfusion': 0.8,
    'Oncology': 0.9,
    'Tumor Lysis': 0.7,
    'BMT': 0.7
  },
  
  'Lymphoma': {
    'Chemotherapy': 0.9,
    'Radiation': 0.7,
    'B Symptoms': 0.8,
    'Superior Vena Cava': 0.6,
    'Tumor Lysis': 0.7,
    'Infection Risk': 0.8,
    'Staging': 0.8
  },
  
  // ONCOLOGY
  'Breast Cancer': {
    'Chemotherapy': 0.8,
    'Radiation': 0.7,
    'Hormone Therapy': 0.7,
    'Lymphedema': 0.7,
    'No BP L Arm': 0.8, // If mastectomy
    'Body Image': 0.7,
    'Genetic Testing': 0.6
  },
  
  'Lung Cancer': {
    'Staging': 0.8,
    'Chemotherapy': 0.8,
    'Radiation': 0.7,
    'Surgery': 0.7,
    'Pain Management': 0.8,
    'SOB': 0.8,
    'Weight Loss': 0.7,
    'Smoking Cessation': 0.8
  },
  
  'Colon Cancer': {
    'Surgery': 0.8,
    'Chemotherapy': 0.8,
    'Ostomy Care': 0.7,
    'CEA': 0.7,
    'Colonoscopy': 0.8,
    'Family Screening': 0.6,
    'Nutrition': 0.7
  },
  
  'Prostate Cancer': {
    'PSA': 0.8,
    'Hormone Therapy': 0.7,
    'Radiation': 0.7,
    'Surgery': 0.7,
    'Incontinence': 0.7,
    'Erectile Dysfunction': 0.6,
    'Bone Mets': 0.6
  },
  
  // INFECTIOUS DISEASES
  'Cellulitis': {
    'Antibiotics': 0.95,
    'Elevation': 0.8,
    'Wound Care': 0.8,
    'Blood Cultures': 0.7,
    'MRSA': 0.6,
    'Diabetes': 0.7,
    'DVT Rule Out': 0.6
  },
  
  'Osteomyelitis': {
    'Antibiotics Long-term': 0.95,
    'Bone Biopsy': 0.8,
    'MRI': 0.8,
    'Surgery': 0.7,
    'PICC': 0.8,
    'Wound Care': 0.8,
    'Pain Control': 0.8
  },
  
  'C.diff': {
    'Contact Isolation': 1.0,
    'Vancomycin PO': 0.9,
    'Fidaxomicin': 0.7,
    'Stop Other Abx': 0.8,
    'Probiotics': 0.6,
    'FMT': 0.5,
    'Recurrent': 0.6
  },
  
  'MRSA': {
    'Contact Precautions': 1.0,
    'Vancomycin': 0.9,
    'Linezolid': 0.8,
    'Decolonization': 0.7,
    'Wound Care': 0.8,
    'Screening': 0.7
  },
  
  'HIV': {
    'HAART': 0.9,
    'CD4 Count': 0.9,
    'Viral Load': 0.9,
    'Opportunistic Infections': 0.8,
    'PCP Prophylaxis': 0.7,
    'Adherence': 0.9,
    'ID Consult': 0.8
  },
  
  'Hepatitis C': {
    'HCV RNA': 0.9,
    'Direct-Acting Antivirals': 0.9,
    'Liver Biopsy': 0.6,
    'Fibrosis Score': 0.7,
    'SVR': 0.8,
    'Cure': 0.8
  },
  
  // PSYCHIATRIC CONDITIONS
  'Depression': {
    'Antidepressants': 0.9,
    'Suicide Risk': 0.95,
    'Counseling': 0.8,
    'Safety': 0.95,
    'Sleep Issues': 0.8,
    'Appetite Changes': 0.7,
    'Psychotherapy': 0.8,
    'ECT': 0.5
  },
  
  'Anxiety': {
    'Anxiolytics': 0.8,
    'Benzodiazepines': 0.7,
    'CBT': 0.8,
    'SSRI': 0.8,
    'Relaxation': 0.7,
    'Panic Attacks': 0.7,
    'Avoidance': 0.6
  },
  
  'Bipolar': {
    'Mood Stabilizers': 0.9,
    'Lithium': 0.8,
    'Lithium Levels': 0.9,
    'Mania': 0.8,
    'Depression': 0.8,
    'Compliance': 0.9,
    'Psychiatry': 0.9
  },
  
  'Schizophrenia': {
    'Antipsychotics': 0.9,
    'Compliance': 0.95,
    'Tardive Dyskinesia': 0.7,
    'Metabolic Syndrome': 0.7,
    'Case Management': 0.8,
    'Reality Testing': 0.8
  },
  
  'PTSD': {
    'Trauma History': 0.9,
    'Triggers': 0.8,
    'Nightmares': 0.8,
    'Avoidance': 0.8,
    'SSRI': 0.8,
    'Therapy': 0.9,
    'EMDR': 0.7
  },
  
  // RHEUMATOLOGIC CONDITIONS
  'Rheumatoid Arthritis': {
    'DMARDs': 0.9,
    'Methotrexate': 0.8,
    'Biologics': 0.7,
    'Steroids': 0.7,
    'Joint Deformity': 0.8,
    'Morning Stiffness': 0.8,
    'RF/CCP': 0.7,
    'Infection Risk': 0.8
  },
  
  'Osteoarthritis': {
    'NSAIDs': 0.8,
    'PT': 0.8,
    'Joint Replacement': 0.7,
    'Weight Loss': 0.7,
    'Topical': 0.6,
    'Steroid Injection': 0.6,
    'Pain Management': 0.8
  },
  
  'Lupus': {
    'Immunosuppressants': 0.9,
    'Steroids': 0.8,
    'Hydroxychloroquine': 0.8,
    'Sun Protection': 0.8,
    'Nephritis': 0.8,
    'ANA': 0.8,
    'Flare': 0.8
  },
  
  'Gout': {
    'Allopurinol': 0.8,
    'Colchicine': 0.8,
    'Uric Acid': 0.9,
    'Diet Modification': 0.8,
    'Avoid ETOH': 0.8,
    'Joint Aspiration': 0.7,
    'Crystals': 0.8
  },
  
  // ORTHOPEDIC CONDITIONS
  'Osteoporosis': {
    'Bisphosphonates': 0.9,
    'Ca/Vit D': 0.9,
    'DEXA Scan': 0.8,
    'Fall Prevention': 0.95,
    'Weight Bearing Exercise': 0.8,
    'Fracture Risk': 0.9,
    'T-score': 0.8
  },
  
  'Hip Fracture': {
    'Surgery': 0.9,
    'DVT Prophylaxis': 0.95,
    'Pain Control': 0.9,
    'PT/OT': 0.9,
    'Osteoporosis Workup': 0.8,
    'Fall Prevention': 0.9,
    'Delirium Risk': 0.8
  },
  
  'Spinal Stenosis': {
    'PT': 0.8,
    'Epidural Injection': 0.7,
    'Surgery': 0.6,
    'Pain Management': 0.8,
    'Walking Tolerance': 0.8,
    'MRI': 0.7
  },
  
  // DERMATOLOGIC CONDITIONS
  'Pressure Ulcer': {
    'Wound Care': 0.95,
    'Pressure Relief': 0.95,
    'Nutrition': 0.9,
    'Turn Q2H': 0.95,
    'Special Mattress': 0.9,
    'Stage': 0.9,
    'Debridement': 0.7,
    'Albumin': 0.8
  },
  
  'Diabetic Foot Ulcer': {
    'Wound Care': 0.95,
    'Offloading': 0.95,
    'Glucose Control': 0.9,
    'Infection': 0.8,
    'Vascular': 0.8,
    'Amputation Risk': 0.7,
    'Podiatry': 0.8
  },
  
  'Venous Ulcer': {
    'Compression': 0.95,
    'Elevation': 0.9,
    'Wound Care': 0.9,
    'Venous Studies': 0.7,
    'Unna Boot': 0.7,
    'Edema Control': 0.8
  },
  
  // EMERGENCY CONDITIONS
  'Trauma': {
    'ABCs': 1.0,
    'C-Spine': 0.9,
    'Trauma Survey': 0.95,
    'CT Pan-Scan': 0.8,
    'Type & Cross': 0.9,
    'Surgery Consult': 0.8,
    'Tetanus': 0.8
  },
  
  'Burns': {
    'Rule of 9s': 0.9,
    'Fluid Resuscitation': 0.95,
    'Pain Control': 0.95,
    'Burn Center': 0.8,
    'Escharotomy': 0.6,
    'Infection': 0.8,
    'Nutrition': 0.8
  },
  
  'Overdose': {
    'Toxicology': 0.9,
    'Antidote': 0.8,
    'Activated Charcoal': 0.7,
    'Psychiatric': 0.8,
    'Suicide Risk': 0.9,
    'Poison Control': 0.8,
    'Support Care': 0.9
  },
  
  'Anaphylaxis': {
    'Epinephrine': 1.0,
    'Steroids': 0.9,
    'H1/H2 Blockers': 0.8,
    'Albuterol': 0.8,
    'Observation': 0.9,
    'EpiPen Script': 0.9,
    'Allergy Testing': 0.7
  },
  
  // COMORBIDITY COMBINATIONS
  'DM + HTN': {
    'ACE Inhibitor': 0.95,
    'Nephroprotection': 0.9,
    'CV Risk': 0.9,
    'Ophthalmology': 0.8,
    'Tight Control': 0.9
  },
  
  'CHF + CKD': {
    'Careful Diuretics': 0.9,
    'Cardio-Renal': 0.9,
    'Contrast Caution': 0.8,
    'Anemia': 0.8,
    'Bone Disease': 0.7
  },
  
  'COPD + CHF': {
    'Beta Blocker Caution': 0.8,
    'Diuretic Balance': 0.8,
    'O2 Goals': 0.9,
    'Activity Limitation': 0.8
  }
};

// Vital Signs Thresholds for abnormal values
export const vitalThresholds: Record<string, { 
  low?: number; 
  high?: number; 
  min?: number; 
  max?: number; 
  critical_low?: number; 
  critical_high?: number; 
  unit?: string;
  triggers_high?: string[];
  triggers_low?: string[];
}> = {
  'Temp': { low: 36.0, high: 38.0, critical_low: 35.0, critical_high: 39.0, unit: '°C' },
  'HR': { low: 60, high: 100, critical_low: 50, critical_high: 120, unit: 'bpm' },
  'BP Systolic': { low: 90, high: 140, critical_low: 80, critical_high: 180, unit: 'mmHg' },
  'BP Diastolic': { low: 60, high: 90, critical_low: 50, critical_high: 110, unit: 'mmHg' },
  'RR': { low: 12, high: 20, critical_low: 10, critical_high: 30, unit: '/min' },
  'O2': { low: 92, high: 100, critical_low: 88, critical_high: 100, unit: '%' },
  'Pain': { low: 0, high: 3, critical_low: 0, critical_high: 7, unit: '/10' }
};

// Lab Values Thresholds for abnormal values
export const labThresholds: Record<string, { 
  low?: number; 
  high?: number; 
  min?: number; 
  max?: number; 
  critical_low?: number; 
  critical_high?: number; 
  unit?: string;
  triggers_high?: string[];
  triggers_low?: string[];
}> = {
  'Na': { low: 135, high: 145, critical_low: 125, critical_high: 155, unit: 'mEq/L' },
  'K': { low: 3.5, high: 5.0, critical_low: 3.0, critical_high: 6.0, unit: 'mEq/L' },
  'Cl': { low: 98, high: 106, critical_low: 90, critical_high: 115, unit: 'mEq/L' },
  'CO2': { low: 22, high: 28, critical_low: 15, critical_high: 35, unit: 'mEq/L' },
  'BUN': { low: 7, high: 20, critical_low: 5, critical_high: 60, unit: 'mg/dL' },
  'Cr': { low: 0.6, high: 1.2, critical_low: 0.4, critical_high: 4.0, unit: 'mg/dL' },
  'Glucose': { low: 70, high: 110, critical_low: 60, critical_high: 250, unit: 'mg/dL' },
  'Ca': { low: 8.5, high: 10.5, critical_low: 7.0, critical_high: 12.0, unit: 'mg/dL' },
  'Mg': { low: 1.5, high: 2.5, critical_low: 1.0, critical_high: 3.0, unit: 'mg/dL' },
  'Phos': { low: 2.5, high: 4.5, critical_low: 1.0, critical_high: 6.0, unit: 'mg/dL' },
  'Albumin': { low: 3.5, high: 5.0, critical_low: 2.0, critical_high: 6.0, unit: 'g/dL' },
  'Total Protein': { low: 6.0, high: 8.3, critical_low: 4.0, critical_high: 10.0, unit: 'g/dL' },
  'AST': { low: 10, high: 40, critical_low: 5, critical_high: 200, unit: 'U/L' },
  'ALT': { low: 10, high: 40, critical_low: 5, critical_high: 200, unit: 'U/L' },
  'Alk Phos': { low: 40, high: 120, critical_low: 20, critical_high: 500, unit: 'U/L' },
  'Bilirubin': { low: 0.2, high: 1.2, critical_low: 0, critical_high: 10.0, unit: 'mg/dL' },
  'WBC': { low: 4.5, high: 11.0, critical_low: 2.0, critical_high: 30.0, unit: 'K/μL' },
  'Hgb': { low: 12.0, high: 16.0, critical_low: 7.0, critical_high: 20.0, unit: 'g/dL' },
  'Hct': { low: 36, high: 46, critical_low: 21, critical_high: 60, unit: '%' },
  'Platelets': { low: 150, high: 400, critical_low: 50, critical_high: 1000, unit: 'K/μL' },
  'PT': { low: 11, high: 13, critical_low: 9, critical_high: 30, unit: 'sec' },
  'PTT': { low: 25, high: 35, critical_low: 20, critical_high: 100, unit: 'sec' },
  'INR': { low: 0.8, high: 1.2, critical_low: 0.5, critical_high: 5.0, unit: '' },
  'Troponin': { low: 0, high: 0.04, critical_low: 0, critical_high: 2.0, unit: 'ng/mL' },
  'BNP': { low: 0, high: 100, critical_low: 0, critical_high: 3000, unit: 'pg/mL' },
  'Lactate': { low: 0.5, high: 2.0, critical_low: 0, critical_high: 4.0, unit: 'mmol/L' },
  'pH': { low: 7.35, high: 7.45, critical_low: 7.20, critical_high: 7.60, unit: '' },
  'pCO2': { low: 35, high: 45, critical_low: 20, critical_high: 70, unit: 'mmHg' },
  'pO2': { low: 80, high: 100, critical_low: 60, critical_high: 120, unit: 'mmHg' },
  'HCO3': { low: 22, high: 26, critical_low: 15, critical_high: 35, unit: 'mEq/L' }
};