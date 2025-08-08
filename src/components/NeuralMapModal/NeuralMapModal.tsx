// src/components/NeuralMapModal/NeuralMapModal.tsx
import React from 'react';
import { X } from 'lucide-react';
import { NeuralMap } from '../NeuralMap/NeuralMap';
import { SelectedItem, RelatedItem } from '../../types';
import { sbarCategories } from '../../constants/categories';
import './NeuralMapModal.css';

interface NeuralMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: Record<string, SelectedItem>;
  relatedItems: Record<string, RelatedItem>;
  dismissedSuggestions: Record<string, boolean>;
  darkMode: boolean;
  onItemSelect: (category: string, section: string, item: string) => void;
  onDismissSuggestion: (key: string, e: React.MouseEvent) => void;
}

export const NeuralMapModal: React.FC<NeuralMapModalProps> = ({
  isOpen,
  onClose,
  selectedItems,
  relatedItems,
  dismissedSuggestions,
  darkMode,
  onItemSelect,
  onDismissSuggestion
}) => {
  if (!isOpen) return null;

  return (
    <div className="neural-map-modal-overlay" onClick={onClose}>
      <div className="neural-map-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Neural Relationship Map</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-content">
          <NeuralMap
            selectedItems={selectedItems}
            relatedItems={relatedItems}
            dismissedSuggestions={dismissedSuggestions}
            sbarCategories={sbarCategories}
            onItemSelect={onItemSelect}
            onDismissSuggestion={onDismissSuggestion}
          />
        </div>
      </div>
    </div>
  );
};