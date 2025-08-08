import { StoredData } from '../types';

export const getFromLocalStorage = (): StoredData | null => {
  try {
    const saved = localStorage.getItem('nursingAssessmentData');
    if (saved) {
      const data = JSON.parse(saved);
      // Rehydrate dates in patients
      if (data.patients) {
        data.patients = data.patients.map((patient: any) => ({
          ...patient,
          lastUpdate: patient.lastUpdate ? new Date(patient.lastUpdate) : new Date(),
          timeline: patient.timeline ? patient.timeline.map((event: any) => ({
            ...event,
            timestamp: new Date(event.timestamp)
          })) : []
        }));
      }
      // Rehydrate dates in selectedItems
      if (data.selectedItems) {
        Object.keys(data.selectedItems).forEach(key => {
          if (data.selectedItems[key].timestamp) {
            data.selectedItems[key].timestamp = new Date(data.selectedItems[key].timestamp);
          }
        });
      }
      // Rehydrate dates in relatedItems
      if (data.relatedItems) {
        Object.keys(data.relatedItems).forEach(key => {
          if (data.relatedItems[key].timestamp) {
            data.relatedItems[key].timestamp = new Date(data.relatedItems[key].timestamp);
          }
        });
      }
      return data;
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  return null;
};

export const saveToLocalStorage = (data: StoredData): void => {
  try {
    localStorage.setItem('nursingAssessmentData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};