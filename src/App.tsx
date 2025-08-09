import React, { useState, useEffect, useCallback } from 'react';
import { FormLayout } from './components/FormLayout/FormLayout';
import { PatientTabs } from './components/PatientTabs/PatientTabs';
import { NeuralMapModal } from './components/NeuralMapModal/NeuralMapModal';
import { PrintView } from './components/PrintView/PrintView';
import { PatientStoryDrawer } from './components/PatientStoryDrawer/PatientStoryDrawer';
import { ButtonStudio } from './components/ButtonStudio/ButtonStudio';
import { QuickNote } from './components/QuickNote/QuickNote';
import { LoginScreen } from './components/LoginScreen/LoginScreen';
import { 
  Patient, SelectedItem, RelatedItem
} from './types';
import { 
  createNewPatient, createTimelineEvent,
  isVitalAbnormal, isLabAbnormal, getAbnormalTriggers
} from './utils/helpers';
import { 
  getFromLocalStorage
} from './utils/storage';
import { useAutoSave } from './hooks/useAutoSave';
import { relationshipMap } from './constants/relationships';
import { 
  ClinicalContext,
  getContextualSuggestions, trackUserBehavior, UserBehavior
} from './utils/smartLogic';
import { EncryptionService } from './utils/encryption';
import './App.css';

// Define the type for CustomButton here to avoid circular dependencies
interface CustomButton {
  id: string;
  mainButton: string;
  icon: string;
  category: string;
  section: string;
  options: string[];
  color?: string;
  createdAt: Date;
  lastModified: Date;
}

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');
  
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [activePatient, setActivePatient] = useState(0);
  const [patients, setPatients] = useState<Patient[]>([createNewPatient('', '')]);
  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedItem>>({});
  const [relatedItems, setRelatedItems] = useState<Record<string, RelatedItem>>({});
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Record<string, boolean>>({});
  const [userBehaviorHistory, setUserBehaviorHistory] = useState<UserBehavior[]>([]);
  const [showNeuralMap, setShowNeuralMap] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);
  const [showPatientStory, setShowPatientStory] = useState(false);
  const [showButtonStudio, setShowButtonStudio] = useState(false);
  const [noteModal, setNoteModal] = useState<{
    isOpen: boolean;
    buttonKey: string;
    buttonName: string;
    existingNote?: string;
    timestamp?: Date;
  }>({ isOpen: false, buttonKey: '', buttonName: '' });
  
  const currentPatient = patients[activePatient] || patients[0];

  // Load data from localStorage on mount
  // Handle login
  const handleLogin = useCallback((credentials: { username: string; password: string }) => {
    setIsAuthenticated(true);
    setCurrentUser(credentials.username);
    EncryptionService.logAccess('LOGIN', { username: credentials.username });
    
    // Initialize session timeout (15 minutes)
    EncryptionService.initSessionTimeout(() => {
      handleLogout();
      alert('Session expired due to inactivity. Please log in again.');
    });
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser('');
    EncryptionService.logAccess('LOGOUT', { username: currentUser });
    
    // Optional: Clear sensitive data on logout
    if (window.confirm('Clear all patient data for security?')) {
      EncryptionService.clearAllData();
      setPatients([createNewPatient('', '')]);
      setSelectedItems({});
      setRelatedItems({});
    }
  }, [currentUser]);

  useEffect(() => {
    if (isAuthenticated) {
      const savedData = getFromLocalStorage();
      if (savedData) {
        setPatients(savedData.patients || [createNewPatient('', '')]);
        setActivePatient(savedData.activePatient || 0);
        setDarkMode(savedData.darkMode || false);
        setSelectedItems(savedData.selectedItems || {});
        setRelatedItems(savedData.relatedItems || {});
        setDismissedSuggestions(savedData.dismissedSuggestions || {});
      }
      EncryptionService.logAccess('DATA_LOAD', { patientCount: savedData?.patients?.length || 0 });
    }
  }, [isAuthenticated]);

  // Auto-save data
  useAutoSave({
    patients,
    activePatient,
    darkMode,
    selectedItems,
    relatedItems,
    dismissedSuggestions,
    lastSaved: new Date()
  });

  // Patient management
  const addPatient = () => {
    const newPatient = createNewPatient('', '');
    setPatients([...patients, newPatient]);
    setActivePatient(patients.length);
  };

  const updatePatient = (index: number, updates: Partial<Patient>) => {
    const updatedPatients = [...patients];
    updatedPatients[index] = { ...updatedPatients[index], ...updates };
    setPatients(updatedPatients);
  };

  const removePatient = (index: number) => {
    if (patients.length > 1) {
      const updatedPatients = patients.filter((_, i) => i !== index);
      setPatients(updatedPatients);
      if (activePatient >= updatedPatients.length) {
        setActivePatient(updatedPatients.length - 1);
      }
    }
  };

  // Helper function to track behavior
  const trackBehavior = (action: 'select' | 'deselect' | 'dismiss', item: string) => {
    const context: ClinicalContext = {
      vitalsAbnormal: hasAbnormalValues(),
      labsAbnormal: false,
      recentSelections: Object.values(selectedItems).slice(-5).map(s => s.item),
      timeOfDay: new Date().getHours() < 12 ? 'day' : 'night',
      patientAcuity: 'stable'
    };
    
    const behavior: UserBehavior = {
      timestamp: new Date(),
      action,
      item,
      context
    };
    
    setUserBehaviorHistory(trackUserBehavior(behavior, userBehaviorHistory));
  };

  // Item selection with note support
  const toggleItemSelection = (category: string, section: string, item: string, note?: string) => {
    const key = `${category}-${section}-${item}`;
    
    if (selectedItems[key] && !note) {
      // Remove
      const { [key]: removed, ...rest } = selectedItems;
      setSelectedItems(rest);
      trackBehavior('deselect', item);
      
      // Update patient timeline
      const updatedPatients = [...patients];
      const patientToUpdate = updatedPatients[activePatient];
      patientToUpdate.timeline = patientToUpdate.timeline.filter(
        event => !(event.category === category && event.action.includes(item))
      );
      patientToUpdate.lastUpdate = new Date();
      
      // Special handling for allergies removal
      if (section === 'history' && item.includes('Allergies')) {
        const allergyParts = item.split(':');
        if (allergyParts.length > 1) {
          const allergy = allergyParts[1];
          patientToUpdate.allergies = patientToUpdate.allergies.filter(a => a !== allergy);
        }
      }
      
      setPatients(updatedPatients);
      
    } else {
      // Add or update
      const newSelectedItems = {
        ...selectedItems,
        [key]: {
          category,
          section,
          item,
          timestamp: selectedItems[key]?.timestamp || new Date(),
          note: note || selectedItems[key]?.note
        }
      };
      setSelectedItems(newSelectedItems);
      if (!selectedItems[key]) {
        trackBehavior('select', item);
      }
      
      // Check for abnormal values that trigger immediate actions
      if (category === 'vitals' || category === 'labs') {
        const triggers = getAbnormalTriggers('vital', item, '');
        if (triggers.length > 0) {
          // Use Promise.resolve to defer to next tick instead of setTimeout
          Promise.resolve().then(() => {
            triggers.forEach(trigger => {
              const [trigCat, trigSec, trigItem] = trigger.split('-');
              if (trigCat && trigSec && trigItem) {
                // Check if component is still mounted (activePatient hasn't changed)
                if (patients[activePatient]) {
                  toggleItemSelection(trigCat, trigSec, trigItem);
                }
              }
            });
          });
        }
      }
      
      // Update patient timeline
      const updatedPatients = [...patients];
      const patientToUpdate = updatedPatients[activePatient];
      patientToUpdate.timeline.push(createTimelineEvent(category, section, item));
      patientToUpdate.lastUpdate = new Date();
      
      // Special handling for allergies - update patient allergies
      if (section === 'history' && item.includes('Allergies')) {
        // Extract allergy from the item (e.g., "Allergies:PCN" -> "PCN")
        const allergyParts = item.split(':');
        if (allergyParts.length > 1) {
          const allergy = allergyParts[1];
          if (!patientToUpdate.allergies.includes(allergy)) {
            patientToUpdate.allergies = [...patientToUpdate.allergies, allergy];
          }
        }
      }
      
      setPatients(updatedPatients);
      
      // Process related items
      processRelatedItems(newSelectedItems);
    }
  };

  // Process related items
  const processRelatedItems = useCallback((currentSelectedItems: Record<string, SelectedItem>) => {
    const newRelatedItems: Record<string, RelatedItem> = {};
    
    // Get all selected item names
    const selectedItemNames = Object.values(currentSelectedItems).map(item => item.item);
    
    // For each selected item, find related items
    Object.entries(currentSelectedItems).forEach(([key, selectedItem]) => {
      // Check relationshipMap for this item
      const itemRelations = relationshipMap[selectedItem.item];
      
      if (itemRelations) {
        Object.entries(itemRelations).forEach(([relatedItemName, score]) => {
          // Only suggest if score is high enough and item not already selected
          if (typeof score === 'number' && score > 0.5 && !selectedItemNames.includes(relatedItemName)) {
            // Find where this item exists in the categories
            const suggestionKey = `suggested-${relatedItemName.replace(/\s+/g, '-')}`;
            
            if (!newRelatedItems[suggestionKey] || newRelatedItems[suggestionKey].score < score) {
              newRelatedItems[suggestionKey] = {
                item: relatedItemName,
                score: score,
                source: selectedItem.item,
                timestamp: new Date()
              };
            }
          }
        });
      }
    });
    
    // Add context-based suggestions
    if (selectedItemNames.includes('Chest Pain')) {
      const cardiacItems = ['EKG', 'Troponin', 'Aspirin', 'Nitroglycerin'];
      cardiacItems.forEach(item => {
        if (!selectedItemNames.includes(item)) {
          const suggestionKey = `contextual-${item.replace(/\s+/g, '-')}`;
          newRelatedItems[suggestionKey] = {
            item: item,
            score: 0.8,
            source: 'Chest Pain',
            timestamp: new Date()
          };
        }
      });
    }
    
    // Add contextual suggestions based on abnormal vitals
    const context: ClinicalContext = {
      vitalsAbnormal: hasAbnormalValues(),
      labsAbnormal: false,
      recentSelections: Object.values(currentSelectedItems).slice(-5).map(s => s.item),
      timeOfDay: new Date().getHours() < 12 ? 'day' : 'night',
      patientAcuity: currentSelectedItems['situation-acuity-Critical'] ? 'critical' : 'stable'
    };
    
    const contextualSuggestions = getContextualSuggestions(context, currentSelectedItems);
    contextualSuggestions.forEach((suggestion, index) => {
      const key = `contextual-auto-${index}`;
      newRelatedItems[key] = suggestion;
    });
    
    setRelatedItems(newRelatedItems);
  }, []);

  // Check for abnormal values
  const hasAbnormalValues = (): boolean => {
    return Object.entries(currentPatient.vitals).some(([key, value]) => {
      const item = key.split('-').pop() || '';
      return isVitalAbnormal(item, value);
    }) || Object.entries(currentPatient.labs).some(([key, value]) => {
      const item = key.split('-').pop() || '';
      return isLabAbnormal(item, value, '');
    });
  };

  // Dismiss suggestion
  const dismissSuggestion = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissedSuggestions({ ...dismissedSuggestions, [key]: true });
    const item = relatedItems[key]?.item || '';
    trackBehavior('dismiss', item);
  };

  // Clear all selections
  const clearAllSelections = () => {
    if (window.confirm('Clear all selections for this patient?')) {
      setSelectedItems({});
      setRelatedItems({});
      setDismissedSuggestions({});
    }
  };

  // Export functionality
  const handleExportReport = () => {
    const dataStr = JSON.stringify({
      patient: currentPatient,
      selections: selectedItems,
      exportDate: new Date().toISOString()
    }, null, 2);
    
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `sbar_report_${currentPatient.room}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Clear all storage (end of day cleaning)
  const handleClearStorage = () => {
    // Preserve custom buttons before clearing
    const customButtons = localStorage.getItem('customButtons');
    
    // Clear localStorage
    localStorage.clear();
    
    // Restore custom buttons
    if (customButtons) {
      localStorage.setItem('customButtons', customButtons);
    }
    
    // Reset to initial state
    setPatients([createNewPatient('', '')]);
    setActivePatient(0);
    setSelectedItems({});
    setRelatedItems({});
    setDismissedSuggestions({});
    setDarkMode(false);
    setUserBehaviorHistory([]);
    
    // Reload the page to ensure complete reset
    window.location.reload();
  };
  
  // Handle custom button save
  const handleSaveCustomButton = (button: CustomButton) => {
    // The button is already saved to localStorage by ButtonStudio
    // Just close the modal and reload to show the new button
    setShowButtonStudio(false);
    // Force a re-render to show the new button
    window.location.reload();
  };

  // Handle opening note modal for a button
  const openNoteModal = (category: string, section: string, item: string) => {
    const key = `${category}-${section}-${item}`;
    const existing = selectedItems[key];
    
    setNoteModal({
      isOpen: true,
      buttonKey: key,
      buttonName: item,
      existingNote: existing?.note,
      timestamp: existing?.timestamp
    });
  };

  // Handle saving note
  const handleSaveNote = (note: string) => {
    if (noteModal.buttonKey) {
      const [category, section, item] = noteModal.buttonKey.split('-');
      toggleItemSelection(category, section, item, note);
    }
    setNoteModal({ isOpen: false, buttonKey: '', buttonName: '' });
  };

  // Enhanced item selection that prompts for note
  const toggleItemSelectionWithNote = (category: string, section: string, item: string, requestNote: boolean = false) => {
    if (requestNote && !selectedItems[`${category}-${section}-${item}`]) {
      // Open note modal for new selection
      openNoteModal(category, section, item);
    } else {
      toggleItemSelection(category, section, item);
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <PatientTabs
        patients={patients}
        activePatient={activePatient}
        onPatientChange={setActivePatient}
        onAddPatient={addPatient}
        onRemovePatient={removePatient}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onShowNeuralMap={() => setShowNeuralMap(true)}
        onPrint={() => setShowPrintView(true)}
        onExport={handleExportReport}
        onClearStorage={handleClearStorage}
        onShowButtonStudio={() => setShowButtonStudio(true)}
      />

      <FormLayout
        patient={currentPatient}
        selectedItems={selectedItems}
        relatedItems={relatedItems}
        dismissedSuggestions={dismissedSuggestions}
        onItemSelect={toggleItemSelectionWithNote}
        onDismissSuggestion={dismissSuggestion}
        onPatientUpdate={(patient: Patient) => updatePatient(activePatient, patient)}
        onClearSelections={clearAllSelections}
        darkMode={darkMode}
        onRequestNote={openNoteModal}
      />

      {showNeuralMap && (
        <NeuralMapModal
          isOpen={showNeuralMap}
          onClose={() => setShowNeuralMap(false)}
          selectedItems={selectedItems}
          relatedItems={relatedItems}
          dismissedSuggestions={dismissedSuggestions}
          onItemSelect={toggleItemSelection}
          onDismissSuggestion={dismissSuggestion}
          darkMode={darkMode}
        />
      )}

      {showPrintView && (
        <PrintView
          patient={currentPatient}
          selectedItems={selectedItems}
          onClose={() => setShowPrintView(false)}
        />
      )}

      <PatientStoryDrawer
        isOpen={showPatientStory}
        onClose={() => setShowPatientStory(!showPatientStory)}
        patient={currentPatient}
        selectedItems={selectedItems}
      />

      {showButtonStudio && (
        <ButtonStudio
          isOpen={showButtonStudio}
          onClose={() => setShowButtonStudio(false)}
          onSaveButton={handleSaveCustomButton}
          sectionColors={{
            neuro: '#8b5cf6',
            respiratory: '#06b6d4',
            cardiac: '#ef4444',
            gi: '#f59e0b',
            gu: '#10b981',
            skin: '#f97316',
            safety: '#6366f1',
            lines: '#ec4899',
            history: '#a855f7',
            admission: '#9333ea',
            custom: '#6b7280'
          }}
        />
      )}

      <QuickNote
        isOpen={noteModal.isOpen}
        onClose={() => setNoteModal({ isOpen: false, buttonKey: '', buttonName: '' })}
        onSave={handleSaveNote}
        buttonName={noteModal.buttonName}
        existingNote={noteModal.existingNote}
        timestamp={noteModal.timestamp}
      />
    </div>
  );
}

export default App;