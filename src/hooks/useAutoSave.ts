import { useEffect, useRef } from 'react';
import { saveToLocalStorage } from '../utils/storage';
import { StoredData } from '../types';

const DEBOUNCE_DELAY = 2000; // 2 seconds

export const useAutoSave = (data: StoredData) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const saveCountRef = useRef(0);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced save
    timeoutRef.current = setTimeout(() => {
      try {
        saveToLocalStorage(data);
        saveCountRef.current += 1;
        
        // Log save in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`Auto-saved (#${saveCountRef.current}) at ${new Date().toLocaleTimeString()}`);
        }
      } catch (error) {
        console.error('Auto-save failed:', error);
        // In production, you might want to show a user notification
        // or retry the save operation
      }
    }, DEBOUNCE_DELAY);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data]);
};