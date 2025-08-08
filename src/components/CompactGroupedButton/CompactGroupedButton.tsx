// src/components/CompactGroupedButton/CompactGroupedButton.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FormButton, SelectedItem, Patient } from '../../types';
import { VitalsModal } from '../VitalsModal/VitalsModal';
import { LabsModal } from '../LabsModal/LabsModal';
import { QuickInputModal } from '../QuickInputModal/QuickInputModal';
import { RadialMenu } from '../RadialMenu/RadialMenu';
import './CompactGroupedButton.css';

interface CompactGroupedButtonProps {
  button: FormButton;
  isSelected: boolean;
  isRelated: boolean;
  selectedItems: Record<string, SelectedItem>;
  color: string;
  patient: Patient;
  onItemSelect: (category: string, section: string, item: string) => void;
  onDismiss?: (e: React.MouseEvent) => void;
  onPatientUpdate: (patient: Patient) => void;
}

export const CompactGroupedButton: React.FC<CompactGroupedButtonProps> = ({
  button,
  isSelected,
  isRelated,
  selectedItems,
  color,
  patient,
  onItemSelect,
  onDismiss,
  onPatientUpdate
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'vitals' | 'labs' | 'input' | null>(null);
  const [radialMenuPosition, setRadialMenuPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const Icon = button.icon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isExpanded]);

  // Check if any sub-items are selected
  const selectedSubItems = button.options?.filter(option => {
    const key = `${button.category}-${button.section}-${button.mainButton}:${option}`;
    return !!selectedItems[key];
  }) || [];

  const hasSelections = isSelected || selectedSubItems.length > 0;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Separate quick entry from full modal
    if (button.mainButton === 'Labs' && !button.modal) {
      // Quick lab entry - show numeric keypad for quick value entry
      setModalType('input');
      setShowModal(true);
    } else if (button.modal === 'vitals') {
      // Full vitals modal
      setModalType('vitals');
      setShowModal(true);
    } else if (button.modal === 'labs') {
      // Full labs modal with all lab values
      setModalType('labs');
      setShowModal(true);
    } else if (button.hasInput && !button.options) {
      // Quick input modal
      setModalType('input');
      setShowModal(true);
    } else if (button.options) {
      // Show radial menu for options
      const rect = e.currentTarget.getBoundingClientRect();
      setRadialMenuPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
      setIsExpanded(!isExpanded);
    } else {
      // Simple selection
      onItemSelect(button.category, button.section, button.mainButton);
    }
  };

  const handleOptionSelect = (option: string) => {
    onItemSelect(button.category, button.section, `${button.mainButton}:${option}`);
    if (!button.hasInput) {
      setIsExpanded(false);
    }
  };

  const handleInputSubmit = (value: string) => {
    onItemSelect(button.category, button.section, `${button.mainButton}:${value}`);
    setShowModal(false);
    setModalType(null);
  };

  const getButtonClass = () => {
    const classes = ['compact-button'];
    if (hasSelections) classes.push('selected');
    if (isRelated) classes.push('related');
    return classes.join(' ');
  };

  const getButtonStyle = () => {
    if (hasSelections) {
      return {
        backgroundColor: color,
        borderColor: color,
        color: 'white'
      };
    }
    if (isRelated) {
      return {
        borderColor: color,
        backgroundColor: `${color}10`
      };
    }
    return {};
  };

  return (
    <>
      <div className="compact-button-wrapper" ref={dropdownRef}>
        <button
          className={getButtonClass()}
          style={getButtonStyle()}
          onClick={handleClick}
          title={button.mainButton}
        >
          <Icon size={14} />
          <span>{button.mainButton}</span>
          {button.options && (
            <span className="expand-icon">
              {isExpanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
            </span>
          )}
          {selectedSubItems.length > 0 && !isExpanded && (
            <span className="selection-count">{selectedSubItems.length}</span>
          )}
        </button>

        {isExpanded && button.options && (
          <RadialMenu
            items={button.options}
            isOpen={isExpanded}
            onSelect={handleOptionSelect}
            onClose={() => setIsExpanded(false)}
            position={radialMenuPosition}
            centerLabel={button.mainButton}
            color={color}
          />
        )}
      </div>

      {modalType === 'vitals' && showModal && (
        <VitalsModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setModalType(null);
          }}
          vitals={patient.vitals}
          notes={patient.vitalsNotes || ''}
          onSave={(vitals, notes) => {
            onPatientUpdate({ ...patient, vitals, vitalsNotes: notes });
            setShowModal(false);
            setModalType(null);
          }}
        />
      )}

      {modalType === 'labs' && showModal && (
        <LabsModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setModalType(null);
          }}
          labs={patient.labs}
          onSave={(labs) => {
            onPatientUpdate({ ...patient, labs });
            setShowModal(false);
            setModalType(null);
          }}
        />
      )}

      {modalType === 'input' && showModal && (
        <QuickInputModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setModalType(null);
          }}
          title={button.mainButton}
          inputType={button.inputType || 'text'}
          min={button.min}
          max={button.max}
          onSubmit={handleInputSubmit}
        />
      )}
    </>
  );
};
