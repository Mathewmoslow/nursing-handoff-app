// Normal ranges for vitals and labs

export const normalRanges = {
  vitals: {
    HR: '60-100',
    BP: '90/60-120/80',
    RR: '12-20',
    O2: '95-100%',
    Temp: '97-99°F',
    BG: '70-140'
  },
  labs: {
    Na: '136-145',
    K: '3.5-5.0',
    Cr: '0.6-1.2',
    Hgb: '12-16',
    WBC: '4-11',
    Plt: '150-400'
  }
};

export function getNormalRange(type: 'vital' | 'lab', item: string): string {
  if (type === 'vital') {
    return normalRanges.vitals[item as keyof typeof normalRanges.vitals] || '';
  }
  return normalRanges.labs[item as keyof typeof normalRanges.labs] || '';
}