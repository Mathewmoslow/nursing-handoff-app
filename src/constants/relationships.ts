// Enhanced medical relationships based on clinical pathways and evidence-based practice

export const relationshipMap: Record<string, Record<string, number>> = {
  // Assessment items -> Related suggestions with confidence scores
  'x4': { 'Independent': 0.8, 'Up Ad Lib': 0.7, 'DC Planning': 0.6, 'PT Eval': 0.5 },
  'x3': { 'Fall Risk': 0.7, 'Assist x1': 0.6, 'Reorientation': 0.7, 'Behavior': 0.6, 'Bed Alarm': 0.6, 'Call Light': 0.7 },
  'x2': { 'Fall Risk': 0.8, 'Assist x1': 0.8, 'Sitter': 0.6, 'Reorientation': 0.8, 'Behavior': 0.7, 'Bed Alarm': 0.8, 'Safety': 0.7 },
  'x1': { 'Fall Risk': 0.9, 'Assist x2': 0.8, 'Sitter': 0.7, 'Bed Alarm': 0.8, 'Behavior': 0.8, 'Restraints': 0.5, 'Family': 0.6 },
  'Confused': { 'Fall Risk': 0.9, 'Sitter': 0.8, 'Bed Alarm': 0.8, 'Reorientation': 0.7, 'Safety': 0.9, 'Behavior': 0.9, 'UTI': 0.6, 'Drug Screen': 0.5 },
  'Sedated': { 'RASS Score': 0.9, 'Reversal Agents': 0.7, 'Respiratory Monitoring': 0.8, 'Q1H Neuro': 0.8, 'Pain Scale': 0.7, 'Narcan': 0.6, 'ABG': 0.5 },
  'Comatose': { 'GCS': 0.9, 'Pupils': 0.9, 'ICU': 0.8, 'Family Meeting': 0.7, 'Neuro Consult': 0.8, 'EEG': 0.6, 'Goals of Care': 0.7 },
  
  // Pupils
  'PERRL': { 'Neuro WNL': 0.7, 'Continue Current Plan': 0.6 },
  'Sluggish': { 'Neuro Checks': 0.8, 'CT Head': 0.6, 'Call MD': 0.7, 'Glucose Check': 0.6, 'Med Review': 0.5 },
  'Fixed': { 'Call MD': 0.9, 'CT Head': 0.9, 'Neuro Consult': 0.9, 'ICU': 0.8, 'Code Status': 0.7, 'Family': 0.8 },
  'Dilated': { 'Narcan': 0.7, 'Drug Screen': 0.7, 'Call MD': 0.8, 'Atropine': 0.5, 'Cocaine': 0.6 },
  'Pinpoint': { 'Narcan': 0.9, 'Call MD': 0.8, 'Respiratory Rate': 0.9, 'Opioid OD': 0.8, 'ABG': 0.7 },
  
  // Cardiac rhythms
  'SR': { 'Stable': 0.8 },
  'ST': { 'Telemetry': 0.8, 'Cardiac Monitoring': 0.7, 'Beta Blockers': 0.6, 'Fluids': 0.7 },
  'SB': { 'Hold Beta Blockers': 0.7, 'Hold Digoxin': 0.8, 'Call MD if <50': 0.8 },
  'AF': { 'Telemetry': 0.9, 'Anticoagulation': 0.8, 'Rate Control': 0.8, 'Cards Consult': 0.7 },
  'AF RVR': { 'Call MD': 0.9, 'Beta Blockers': 0.9, 'Diltiazem': 0.8, 'Cardioversion': 0.6 },
  'VT': { 'Call MD': 1.0, 'Code Blue': 0.9, 'Amiodarone': 0.9, 'Crash Cart': 0.9 },
  'VF': { 'Code Blue': 1.0, 'CPR': 1.0, 'Defibrillation': 1.0, 'Epinephrine': 1.0 },
  'Paced': { 'Pacer Check': 0.9, 'Capture Threshold': 0.8, 'Cards Consult': 0.7 },
  
  // Edema
  '+1': { 'Daily Weights': 0.7, 'I&O': 0.6 },
  '+2': { 'Daily Weights': 0.8, 'I&O': 0.8, 'Diuretics': 0.7, 'Low Sodium': 0.7 },
  '+3': { 'Daily Weights': 0.9, 'I&O Strict': 0.9, 'Diuretics': 0.8, 'Fluid Restriction': 0.8 },
  '+4': { 'Daily Weights': 0.9, 'I&O Strict': 0.9, 'IV Lasix': 0.9, 'Fluid Restriction': 0.9, 'Albumin': 0.7 },
  
  // Respiratory
  'RA': { 'Wean O2': 0.7, 'Ambulate': 0.8 },
  'NC 2L': { 'O2 Monitoring': 0.9, 'Wean as tolerated': 0.6 },
  'NC 4L': { 'O2 Monitoring': 0.9, 'RT Assessment': 0.6, 'ABG': 0.5 },
  'NC 6L': { 'O2 Monitoring': 0.9, 'ABG': 0.7, 'RT Consult': 0.7, 'Consider HFNC': 0.6 },
  'FM 10L': { 'ABG': 0.8, 'RT Consult': 0.8, 'Consider BiPAP': 0.7, 'ICU Evaluation': 0.6 },
  'FM 15L': { 'ABG': 0.9, 'RT Consult': 0.9, 'BiPAP Trial': 0.8, 'Intubation Setup': 0.7 },
  'HFNC': { 'RT Management': 0.9, 'ABG': 0.9, 'ICU': 0.7, 'Proning': 0.6 },
  'BiPAP': { 'RT Management': 1.0, 'ABG': 0.9, 'ICU': 0.8, 'Sedation': 0.6 },
  'CPAP': { 'RT Management': 0.9, 'Sleep Study': 0.7, 'Compliance Check': 0.8 },
  'Vent': { 'RT Management': 1.0, 'ABG': 1.0, 'Sedation': 0.9, 'RASS': 0.9, 'VAP Bundle': 0.9 },
  
  // Lung sounds
  'Clear': { 'Continue Current Plan': 0.7 },
  'Diminished': { 'Incentive Spirometry': 0.8, 'Ambulate': 0.7, 'CXR': 0.6 },
  'Crackles': { 'Diuretics': 0.7, 'CXR': 0.8, 'O2 Monitoring': 0.8, 'I&O': 0.7 },
  'Wheezes': { 'Bronchodilators': 0.9, 'Steroids': 0.7, 'RT Consult': 0.8 },
  'Rhonchi': { 'Chest PT': 0.8, 'Nebulizer': 0.7, 'Hydration': 0.7, 'Ambulate': 0.8 },
  'Absent': { 'Call MD': 0.9, 'STAT CXR': 0.9, 'Chest Tube': 0.7 },
  
  // GI/GU
  'NPO': { 'IV Fluids': 0.9, 'Oral Care': 0.8, 'NPO Sign': 0.9 },
  'Clear Liquids': { 'Advance as Tolerated': 0.7, 'Monitor Tolerance': 0.8 },
  'Diabetic': { 'Accucheck': 0.9, 'Insulin': 0.8, 'Carb Counting': 0.7 },
  'TF': { 'Residual Checks': 0.9, 'HOB 30°': 0.9, 'Flush Q4H': 0.8 },
  'TPN': { 'Daily Labs': 0.9, 'Blood Sugars': 0.9, 'Central Line': 0.9 },
  
  // Skin/Wounds
  'Intact': { 'Continue Prevention': 0.7 },
  'Pressure Injury': { 'Wound Care': 0.9, 'Turn Q2H': 0.9, 'Nutrition Consult': 0.8, 'Special Mattress': 0.8 },
  'Surgical': { 'Dressing Change': 0.9, 'Monitor Drainage': 0.8, 'Pain Control': 0.7 },
  
  // Safety/Activity
  'Fall Risk': { 'Bed Alarm': 0.9, 'Call Light in Reach': 0.9, 'Non-slip Socks': 0.8, 'Assist with Ambulation': 0.9 },
  'Bedrest': { 'DVT Prophylaxis': 0.9, 'Turn Q2H': 0.9, 'PT Consult': 0.7 },
  'Up in Chair': { 'Assist x1': 0.8, 'PT Consult': 0.7, 'Progress to Ambulation': 0.7 },
  
  // Critical values
  'Hypotensive': { 'IV Fluids': 0.9, 'Call MD': 0.9, 'Pressors': 0.7, 'Trendelenburg': 0.8 },
  'Tachycardic': { 'EKG': 0.9, 'Call MD': 0.8, 'Beta Blockers': 0.7, 'Fluids': 0.7 },
  'Febrile': { 'Blood Cultures': 0.9, 'Antibiotics': 0.8, 'Tylenol': 0.9, 'Cooling Measures': 0.7 },
  
  // Labs that trigger actions
  'WBC >12': { 'Blood Cultures': 0.8, 'Antibiotics': 0.7, 'Infection Workup': 0.8 },
  'Hgb <7': { 'Type & Cross': 0.9, 'Blood Transfusion': 0.8, 'Call MD': 0.9 },
  'K <3.5': { 'K Replacement': 0.9, 'Telemetry': 0.8, 'Recheck in 4hr': 0.8 },
  'K >5.5': { 'EKG': 0.9, 'Kayexalate': 0.8, 'D50/Insulin': 0.7, 'Call MD': 0.9 },
  'Glucose >250': { 'Insulin': 0.9, 'Accucheck Q2H': 0.8, 'Ketones': 0.7 },
  'Glucose <70': { 'D50': 0.9, 'Juice': 0.8, 'Recheck in 15min': 0.9 },
  
  // NEW: IV Access relationships
  'PIV x1': { 'Saline Lock': 0.6, 'Fluids': 0.7 },
  'PIV x2': { 'Blood Draw': 0.7, 'Fluids': 0.8 },
  'Central': { 'Daily Dressing': 0.9, 'Blood Cultures': 0.6 },
  'PICC': { 'Weekly Dressing': 0.9, 'Home Infusion': 0.7 },
  'Port': { 'Huber Needle': 0.9, 'Chemotherapy': 0.7 },
  'Infiltrated': { 'Restart IV': 0.9, 'Warm Compress': 0.8 },
  'Saline Lock': { 'Flush Q8H': 0.9, 'Patent': 0.8 },
  
  // NEW: Device relationships
  'SCDs': { 'DVT Prophylaxis': 0.9, 'Ambulation': 0.6 },
  'Pacemaker': { 'Pacer Check': 0.8, 'Cards Consult': 0.7 },
  'ETT': { 'Vent Settings': 0.9, 'Sedation': 0.9 },
  'JP': { 'Output Monitoring': 0.9, 'Site Care': 0.8 },
  'Chest Tube': { 'Daily CXR': 0.8, 'Air Leak': 0.7 },
  'Trach': { 'Suctioning': 0.9, 'Inner Cannula': 0.8 },
  
  // NEW: Behavior/Psych relationships
  'Agitated': { 'Sitter': 0.8, 'PRN Meds': 0.7, 'Safety': 0.9 },
  'Combative': { 'Security': 0.8, 'Restraints': 0.7, 'Safety': 0.9 },
  'Hallucinations': { 'Psych Consult': 0.8, 'Safety': 0.9, 'Sitter': 0.7 },
  'Anxious': { 'Anxiolytics': 0.7, 'Reassurance': 0.8 },
  'Withdrawn': { 'Depression Screen': 0.7, 'Psych Consult': 0.6 },
  
  // NEW: Mobility relationships
  'Walker': { 'PT': 0.8, 'Fall Risk': 0.7, 'Assist x1': 0.6 },
  'Wheelchair': { 'Transfer Training': 0.8, 'PT/OT': 0.7 },
  'Bedbound': { 'Turn Q2H': 0.9, 'Skin Care': 0.9 },
  'Hoyer': { '2 Person Assist': 0.9, 'Lift Team': 0.8 },
  'PT Ordered': { 'Ambulation': 0.8, 'Strengthening': 0.7 },
  'OT Ordered': { 'ADL Training': 0.8, 'Adaptive Equipment': 0.7 },
  
  // NEW: Pain relationships
  '7-9': { 'Pain Meds': 0.9, 'Call MD': 0.7 },
  '10': { 'Pain Meds': 1.0, 'Call MD': 0.9 },
  'Morphine': { 'Respiratory Monitoring': 0.8, 'Constipation': 0.7 },
  'Dilaudid': { 'Respiratory Monitoring': 0.9, 'Narcan Available': 0.7 },
  'PCA': { 'Pain Assessment Q4H': 0.9, 'Teaching': 0.8 },
  'Fentanyl': { 'Respiratory Monitoring': 0.9, 'Sedation Scale': 0.8 },
  
  // Admission Route relationships
  'ED': { 'Triage Level': 0.8, 'EMS': 0.6, 'Acute': 0.9, 'Workup Pending': 0.7, 'Critical': 0.6 },
  'Direct Admit': { 'Known Patient': 0.8, 'PCP Referral': 0.9, 'Stable': 0.7, 'Scheduled': 0.8 },
  'Transfer Floor': { 'Step Down': 0.7, 'Stable': 0.8, 'Discharge Planning': 0.6, 'PT/OT': 0.7 },
  'Transfer Hospital': { 'Higher Level Care': 0.9, 'Specialty Service': 0.8, 'Critical': 0.7, 'Insurance': 0.6 },
  'OR/PACU': { 'Post-Op': 0.9, 'Pain Control': 0.9, 'Surgical': 0.9, 'NPO': 0.8, 'Anesthesia': 0.8 },
  'Clinic': { 'Outpatient': 0.7, 'Follow-up': 0.8, 'Non-urgent': 0.8, 'Scheduled': 0.9 },
  'Self/Walk-in': { 'Stable': 0.7, 'Alert': 0.8, 'Independent': 0.8, 'Low Acuity': 0.7 },
  'EMS': { 'Acute': 0.9, 'Critical': 0.7, 'Trauma': 0.6, 'Unable to Transport': 0.8, 'ED': 0.9 },
  'Police': { 'Psych': 0.8, 'Legal Hold': 0.9, 'Safety': 0.9, 'Security': 0.8, 'Restraints': 0.6 },
  'With Spouse': { 'Support System': 0.9, 'History Available': 0.8, 'Discharge Planning': 0.7 },
  'With Family': { 'Support System': 0.9, 'History Available': 0.8, 'Family Meeting': 0.6 },
  'With Friend': { 'Support System': 0.7, 'Contact Info': 0.8 },
  'Alone': { 'Social Work': 0.7, 'Safety Assessment': 0.8, 'Discharge Planning': 0.8 },
  'From SNF': { 'Baseline Status': 0.9, 'Return to Facility': 0.8, 'Med Rec': 0.9, 'DNR': 0.6 },
  'From Rehab': { 'PT/OT': 0.9, 'Baseline Function': 0.8, 'Discharge Planning': 0.7 },
  'From Home': { 'Home Safety': 0.7, 'Home Health': 0.6, 'Family Support': 0.7 },
  'From Group Home': { 'Cognitive Status': 0.8, 'Guardian': 0.7, 'Behavioral': 0.6, 'Medication Compliance': 0.8 },
  
  // Bidirectional relationships - Symptoms <-> Interventions
  'Chest Pain': { 'EKG': 0.9, 'Troponin': 0.9, 'Aspirin': 0.8, 'Nitroglycerin': 0.7, 'Morphine': 0.6, 'Cards Consult': 0.8 },
  'SOB': { 'O2': 0.9, 'CXR': 0.8, 'ABG': 0.7, 'Nebulizer': 0.7, 'Diuretics': 0.6, 'BiPAP': 0.6 },
  'Altered MS': { 'Glucose Check': 0.9, 'CT Head': 0.8, 'UA': 0.7, 'Drug Screen': 0.6, 'Narcan': 0.5, 'Neuro Consult': 0.7 },
  'Abdominal Pain': { 'NPO': 0.8, 'CT Abdomen': 0.8, 'CBC': 0.9, 'Lipase': 0.7, 'Surgery Consult': 0.6 },
  
  // Bidirectional - Conditions <-> Treatments
  'Sepsis': { 'Blood Cultures': 1.0, 'Antibiotics': 1.0, 'Fluids': 0.9, 'Lactate': 0.9, 'Pressors': 0.7, 'ICU': 0.8 },
  'CHF': { 'Diuretics': 0.9, 'Daily Weights': 0.9, 'I&O': 0.9, 'Low Sodium': 0.8, 'Fluid Restriction': 0.8, 'Echo': 0.7 },
  'COPD': { 'Bronchodilators': 0.9, 'Steroids': 0.8, 'O2': 0.9, 'BiPAP': 0.7, 'RT': 0.9, 'ABG': 0.8 },
  'Pneumonia': { 'Antibiotics': 0.9, 'CXR': 0.9, 'O2': 0.8, 'Nebulizer': 0.7, 'IS': 0.8, 'Ambulation': 0.7 },
  'UTI': { 'UA': 1.0, 'Urine Culture': 0.9, 'Antibiotics': 0.9, 'Fluids': 0.7, 'Foley': 0.5 },
  'GI Bleed': { 'NPO': 0.9, 'Type & Cross': 0.9, 'H&H Q6': 0.9, 'PPI': 0.9, 'GI Consult': 0.9, 'Transfusion': 0.7 },
  'Stroke': { 'CT Head': 1.0, 'Neuro Checks': 1.0, 'tPA': 0.7, 'Aspirin': 0.8, 'Dysphagia Screen': 0.9, 'PT/OT': 0.9 },
  'AKI': { 'Fluids': 0.8, 'Foley': 0.8, 'Daily BMP': 0.9, 'Renal Diet': 0.8, 'Avoid NSAIDs': 0.9, 'Nephro Consult': 0.7 },
  'DKA': { 'Insulin Drip': 1.0, 'Fluids': 0.9, 'K Replacement': 0.9, 'Q1H Glucose': 1.0, 'Anion Gap': 0.9, 'ICU': 0.8 },
  'PE': { 'Heparin': 0.9, 'CTA Chest': 0.9, 'O2': 0.9, 'Bedrest': 0.8, 'IVC Filter': 0.5, 'Echo': 0.6 },
  
  // IV Location relationships
  'RAC': { 'Right Arm': 0.9, 'PIV': 0.9, 'Saline Lock': 0.7 },
  'LAC': { 'Left Arm': 0.9, 'PIV': 0.9, 'Saline Lock': 0.7 },
  'R Forearm': { 'Right Arm': 0.9, 'PIV': 0.9, 'Good Access': 0.8 },
  'L Forearm': { 'Left Arm': 0.9, 'PIV': 0.9, 'Good Access': 0.8 },
  'R Hand': { 'Right Arm': 0.9, 'PIV': 0.8, 'Difficult Access': 0.6 },
  'L Hand': { 'Left Arm': 0.9, 'PIV': 0.8, 'Difficult Access': 0.6 },
  'RFJ': { 'Central Line': 0.9, 'Femoral': 0.9, 'Emergency Access': 0.8 },
  'LFJ': { 'Central Line': 0.9, 'Femoral': 0.9, 'Emergency Access': 0.8 },
  'RIJ': { 'Central Line': 0.9, 'Internal Jugular': 0.9, 'CVP Monitoring': 0.7 },
  'LIJ': { 'Central Line': 0.9, 'Internal Jugular': 0.9, 'CVP Monitoring': 0.7 },
  'R Subclavian': { 'Central Line': 0.9, 'Subclavian': 0.9, 'Long-term Access': 0.8 },
  'L Subclavian': { 'Central Line': 0.9, 'Subclavian': 0.9, 'Long-term Access': 0.8 },
  'PICC R': { 'PICC Line': 0.9, 'Right Arm': 0.9, 'Home Infusion': 0.8, 'Long-term Antibiotics': 0.7 },
  'PICC L': { 'PICC Line': 0.9, 'Left Arm': 0.9, 'Home Infusion': 0.8, 'Long-term Antibiotics': 0.7 },
  
  // Lab abnormalities -> Interventions/Monitoring
  'Elevated Troponin': { 'EKG': 0.95, 'Cardiology Consult': 0.9, 'Aspirin': 0.85, 'Heparin': 0.8, 'Cardiac Cath': 0.75 },
  'Low Hemoglobin': { 'Type & Cross': 0.9, 'Blood Transfusion': 0.85, 'Iron Studies': 0.7, 'GI Consult': 0.65, 'Bleeding Assessment': 0.8 },
  'High Creatinine': { 'Fluid Management': 0.85, 'Renal Consult': 0.8, 'Dialysis': 0.7, 'Foley Catheter': 0.6, 'Hold Nephrotoxins': 0.9 },
  'Low Platelets': { 'Bleeding Precautions': 0.9, 'Platelet Transfusion': 0.8, 'No IM Injections': 0.85, 'Hematology Consult': 0.7 },
  'High K': { 'Kayexalate': 0.9, 'Insulin/D50': 0.85, 'Calcium Gluconate': 0.8, 'Cardiac Monitor': 0.95, 'Dialysis': 0.7, 'EKG': 0.9 },
  'Low K': { 'KCl Replacement': 0.95, 'Cardiac Monitor': 0.9, 'Mg Level': 0.8, 'Telemetry': 0.85, 'EKG': 0.8 },
  'High Glucose': { 'Insulin': 0.95, 'Frequent Glucose Checks': 0.9, 'Ketone Check': 0.8, 'Endocrine Consult': 0.7, 'Diabetic Diet': 0.8 },
  'Low Glucose': { 'D50': 0.95, 'Glucagon': 0.9, 'Frequent Glucose Checks': 0.9, 'Snack': 0.85, 'Check Insulin Dose': 0.8 },
  'High INR': { 'Vitamin K': 0.9, 'FFP': 0.85, 'Hold Anticoagulation': 0.95, 'Bleeding Precautions': 0.9, 'GI Prophylaxis': 0.7 },
  'High Lactate': { 'Fluid Resuscitation': 0.95, 'Blood Cultures': 0.9, 'Antibiotics': 0.9, 'Sepsis Protocol': 0.85, 'ICU Evaluation': 0.8 },
  'Low Na': { 'Fluid Restriction': 0.9, 'Hypertonic Saline': 0.8, 'Seizure Precautions': 0.85, 'Neuro Checks': 0.8, 'Serial Na Levels': 0.9 },
  'High Na': { 'D5W': 0.9, 'Free Water': 0.85, 'Fluid Replacement': 0.8, 'Neuro Checks': 0.7, 'Serial Na Levels': 0.9 },
  'High WBC': { 'Blood Cultures': 0.9, 'Antibiotics': 0.85, 'CBC with Diff': 0.8, 'Infection Source': 0.9, 'Fever Protocol': 0.8 },
  'Low WBC': { 'Neutropenic Precautions': 0.95, 'Reverse Isolation': 0.9, 'Hold Chemo': 0.8, 'Growth Factor': 0.7, 'Oncology Consult': 0.8 },
  
  // Vital sign abnormalities -> Interventions  
  'Hypotension': { 'Fluid Bolus': 0.95, 'Vasopressors': 0.8, 'Trendelenburg': 0.7, 'Cardiac Monitor': 0.9, 'Hold BP Meds': 0.95 },
  'Hypertension': { 'Antihypertensives': 0.9, 'Cardiac Monitor': 0.85, 'Neuro Checks': 0.8, 'Pain Assessment': 0.7, 'Hold Visitors': 0.6 },
  'Bradycardia': { 'Atropine': 0.85, 'Pacing': 0.7, 'Cardiac Monitor': 0.95, 'EKG': 0.9, 'Hold Beta Blockers': 0.95 },
  'Tachycardia': { 'Beta Blockers': 0.8, 'Cardiac Monitor': 0.95, 'EKG': 0.9, 'Fluid Bolus': 0.7, 'Pain Assessment': 0.8 },
  'Hypoxia': { 'Oxygen': 0.95, 'Respiratory Assessment': 0.9, 'ABG': 0.85, 'Chest X-ray': 0.8, 'RT Consult': 0.85 },
  'Fever': { 'Tylenol': 0.95, 'Cooling Measures': 0.8, 'Blood Cultures': 0.85, 'Antibiotics': 0.8, 'Fluid Replacement': 0.7 },
  'Hypothermia': { 'Warming Blanket': 0.95, 'Warm Fluids': 0.9, 'Thyroid Panel': 0.6, 'Core Temp Monitoring': 0.8 }
};

// Secondary relationships (items that trigger when main item is selected)
export const secondaryRelationships: Record<string, string[]> = {
  'CHF': ['Diuretics', 'Daily Weights', 'Fluid Restriction'],
  'Diabetes': ['Insulin', 'Accucheck', 'Diabetic Diet'],
  'COPD': ['O2 Monitoring', 'Respiratory Assessment', 'Bronchodilators'],
  'Sepsis': ['Blood Cultures', 'Antibiotics', 'Fluid Resuscitation'],
  'Fall Risk': ['Bed Alarm', 'Assist with Ambulation', 'Fall Precautions']
};

// Dynamic generation rules
export const dynamicGenerationRules: Record<string, {
  conditions: string[];
  generates: Record<string, { icon?: any; priority?: string }>;
}> = {
  diabeticKetoacidosis: {
    conditions: ['Diabetes', 'Hyperglycemia', 'Metabolic Acidosis'],
    generates: {
      'DKA Protocol': { priority: 'critical' },
      'Q1H Glucose': { priority: 'high' },
      'K+ Monitoring': { priority: 'high' }
    }
  },
  heartFailureExacerbation: {
    conditions: ['CHF', 'SOB', 'Edema'],
    generates: {
      'Lasix IV': { priority: 'high' },
      'Daily Weights': { priority: 'medium' },
      'Fluid Restriction': { priority: 'medium' }
    }
  }
};

// Threshold type definition
interface Threshold {
  min?: number | string;
  max?: number | string;
  low?: number;
  high?: number;
  critical_low?: number;
  critical_high?: number;
  triggers_low?: string[];
  triggers_high?: string[];
}

// Vital sign thresholds for abnormal value detection
export const vitalThresholds: Record<string, Threshold> = {
  'BP': { min: '90/60', max: '140/90' },
  'HR': { low: 60, high: 100, critical_low: 50, critical_high: 120 },
  'RR': { low: 12, high: 20, critical_low: 8, critical_high: 30 },
  'Temp': { low: 97.0, high: 99.5, critical_low: 95.0, critical_high: 103.0 },
  'O2 Sat': { low: 95, high: 100, critical_low: 90, critical_high: 101 },
  'Pain': { low: 0, high: 3, critical_high: 7 },
  'Accucheck': { low: 70, high: 110, critical_low: 60, critical_high: 250 }
};

// Lab value thresholds for abnormal detection with intervention triggers
export const labThresholds: Record<string, Threshold> = {
  'WBC': { 
    min: 4.5, 
    max: 11,
    triggers_low: ['Blood Cultures', 'Antibiotics', 'Neutropenic Precautions'],
    triggers_high: ['Blood Cultures', 'Antibiotics', 'CBC with Diff']
  },
  'Hgb': { 
    min: 12, 
    max: 16,
    critical_low: 7,
    triggers_low: ['Type & Cross', 'Blood Transfusion', 'Iron Studies', 'Hemolysis Panel'],
    triggers_high: ['Phlebotomy', 'Hydration']
  },
  'Hct': { 
    min: 36, 
    max: 46,
    critical_low: 21,
    triggers_low: ['Type & Cross', 'Blood Transfusion', 'GI Bleed Protocol'],
    triggers_high: ['Phlebotomy', 'Hydration']
  },
  'Plt': { 
    min: 150, 
    max: 400,
    critical_low: 50,
    triggers_low: ['Platelet Transfusion', 'Bleeding Precautions', 'No IM Injections'],
    triggers_high: ['Aspirin', 'Hydration']
  },
  'Na': { 
    min: 136, 
    max: 145,
    critical_low: 125,
    critical_high: 155,
    triggers_low: ['Fluid Restriction', 'Hypertonic Saline', 'Seizure Precautions'],
    triggers_high: ['D5W', 'Free Water', 'Fluid Replacement']
  },
  'K': { 
    min: 3.5, 
    max: 5.0,
    critical_low: 2.5,
    critical_high: 6.0,
    triggers_low: ['KCl Replacement', 'Cardiac Monitor', 'Mg Level'],
    triggers_high: ['Kayexalate', 'Insulin/D50', 'Calcium Gluconate', 'Cardiac Monitor', 'Dialysis']
  },
  'Cl': { min: 98, max: 106 },
  'CO2': { min: 22, max: 28 },
  'BUN': { min: 7, max: 20 },
  'Cr': { 
    min: 0.6, 
    max: 1.2,
    critical_high: 3.0,
    triggers_high: ['Fluid Management', 'Renal Consult', 'Dialysis', 'Hold Nephrotoxins']
  },
  'Glucose': { 
    min: 70, 
    max: 110,
    critical_low: 60,
    critical_high: 400,
    triggers_low: ['D50', 'Glucagon', 'Frequent Glucose Checks'],
    triggers_high: ['Insulin', 'Frequent Glucose Checks', 'Ketone Check']
  },
  'Ca': { min: 8.5, max: 10.5 },
  'Mg': { min: 1.7, max: 2.2 },
  'Phos': { min: 2.5, max: 4.5 },
  'Troponin': { 
    max: 0.04,
    triggers_high: ['EKG', 'Cardiology Consult', 'Aspirin', 'Nitroglycerin', 'Heparin']
  },
  'BNP': { 
    max: 100,
    triggers_high: ['Lasix', 'Fluid Restriction', 'Daily Weights', 'I&O Monitoring']
  },
  'CK': { min: 30, max: 200 },
  'CK-MB': { max: 6.3 },
  'PT': { min: 11, max: 13 },
  'INR': { 
    min: 0.8, 
    max: 1.2,
    critical_high: 3.5,
    triggers_high: ['Vitamin K', 'FFP', 'Hold Anticoagulation', 'Bleeding Precautions']
  },
  'PTT': { min: 25, max: 35 },
  'Fibrinogen': { min: 200, max: 400 },
  'pH': { min: 7.35, max: 7.45 },
  'pCO2': { min: 35, max: 45 },
  'pO2': { min: 80, max: 100 },
  'HCO3': { min: 22, max: 26 },
  'SaO2': { min: 95, max: 100 },
  'AST': { min: 10, max: 40 },
  'ALT': { min: 7, max: 56 },
  'Alk Phos': { min: 44, max: 147 },
  'T Bili': { min: 0.1, max: 1.2 },
  'Albumin': { min: 3.5, max: 5.0 },
  'Lactate': { 
    max: 2,
    critical_high: 4,
    triggers_high: ['Fluid Resuscitation', 'Blood Cultures', 'Antibiotics', 'Sepsis Protocol']
  },
  'Ammonia': { min: 15, max: 45 },
  'TSH': { min: 0.4, max: 4.0 },
  'A1C': { max: 5.7 },
  'Pro-BNP': { max: 125 }
};