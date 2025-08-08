import { useState, useEffect, useCallback } from 'react';
import { SelectedItem, Patient } from '../types';
import { analyzeSelectionPattern, AIAnalysis } from '../utils/smartLogic';

interface UseAIAnalysisResult {
  analysis: AIAnalysis | null;
  isLoading: boolean;
  error: string | null;
  triggerAnalysis: () => void;
}

export const useAIAnalysis = (
  selectedItems: Record<string, SelectedItem>,
  patient: Patient | null,
  enabled: boolean = true
): UseAIAnalysisResult => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerAnalysis = useCallback(async () => {
    if (!patient || Object.keys(selectedItems).length === 0 || !enabled) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeSelectionPattern(selectedItems, patient);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  }, [selectedItems, patient, enabled]);

  // Auto-trigger analysis when selections change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (Object.keys(selectedItems).length >= 3) {
        triggerAnalysis();
      }
    }, 1000); // Debounce for 1 second

    return () => clearTimeout(debounceTimer);
  }, [selectedItems, triggerAnalysis]);

  return {
    analysis,
    isLoading,
    error,
    triggerAnalysis
  };
};
