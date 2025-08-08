import React, { useState, useRef, useEffect } from 'react';
import './AllergiesAutocomplete.css';

interface AllergiesAutocompleteProps {
  allergies: string[];
  onChange: (allergies: string[]) => void;
  placeholder?: string;
}

const COMMON_ALLERGIES = [
  'Penicillin', 'PCN', 'Amoxicillin', 'Ampicillin', 'Cephalosporins',
  'Sulfa', 'Sulfamethoxazole', 'Bactrim',
  'Aspirin', 'NSAIDs', 'Ibuprofen', 'Naproxen',
  'Codeine', 'Morphine', 'Opioids', 'Tramadol',
  'Latex', 'Adhesive', 'Tape',
  'Contrast', 'Iodine', 'Gadolinium',
  'Eggs', 'Peanuts', 'Tree nuts', 'Shellfish', 'Fish', 'Milk', 'Soy', 'Wheat',
  'Lidocaine', 'Benzocaine', 'Local anesthetics',
  'Heparin', 'Warfarin',
  'ACE inhibitors', 'Lisinopril', 'Enalapril',
  'Statins', 'Atorvastatin', 'Simvastatin',
  'Erythromycin', 'Azithromycin', 'Clarithromycin',
  'Quinolones', 'Ciprofloxacin', 'Levofloxacin',
  'Tetracycline', 'Doxycycline'
];

export const AllergiesAutocomplete: React.FC<AllergiesAutocompleteProps> = ({
  allergies,
  onChange,
  placeholder = 'Type to add allergies...'
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    if (value.trim()) {
      const filtered = COMMON_ALLERGIES.filter(
        allergy => 
          allergy.toLowerCase().includes(value.toLowerCase()) &&
          !allergies.includes(allergy)
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const addAllergy = (allergy: string) => {
    if (allergy.trim() && !allergies.includes(allergy)) {
      onChange([...allergies, allergy]);
      setInputValue('');
      setSuggestions([]);
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
  };

  const removeAllergy = (allergy: string) => {
    onChange(allergies.filter(a => a !== allergy));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestions && suggestions.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            addAllergy(suggestions[selectedIndex]);
          } else if (inputValue.trim()) {
            addAllergy(inputValue.trim());
          }
          break;
        case 'Escape':
          setShowSuggestions(false);
          setSelectedIndex(-1);
          break;
      }
    } else if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addAllergy(inputValue.trim());
    }
  };

  const handleNKDA = () => {
    onChange([]);
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="allergies-autocomplete" ref={wrapperRef}>
      <div className="allergies-container">
        {allergies.length === 0 ? (
          <button className="nkda-button" onClick={handleNKDA}>
            NKDA
          </button>
        ) : (
          <>
            {allergies.map(allergy => (
              <span key={allergy} className="allergy-tag">
                {allergy}
                <button
                  className="remove-allergy"
                  onClick={() => removeAllergy(allergy)}
                  type="button"
                >
                  ×
                </button>
              </span>
            ))}
          </>
        )}
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={allergies.length === 0 ? placeholder : 'Add more...'}
          className="allergy-input"
        />
      </div>

      {showSuggestions && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => addAllergy(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {suggestion}
            </div>
          ))}
          {inputValue.trim() && !suggestions.includes(inputValue.trim()) && (
            <div
              className={`suggestion-item add-custom ${selectedIndex === suggestions.length ? 'selected' : ''}`}
              onClick={() => addAllergy(inputValue.trim())}
            >
              Add "{inputValue.trim()}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};