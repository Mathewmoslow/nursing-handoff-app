import React, { useState } from 'react';
import { Package, Check, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import './ProtocolBundle.css';

// Define the ProtocolBundle type locally since it's not exported from smartLogic
interface ProtocolBundleType {
  name: string;
  conditions: string[];
  items: string[];
  priority: 'critical' | 'high' | 'medium';
  description?: string;
}

// Define protocol bundles locally
const protocolBundles: Record<string, ProtocolBundleType> = {
  sepsisBundle: {
    name: 'Sepsis Bundle',
    conditions: ['Sepsis', 'Fever', 'Hypotensive', 'Tachycardic'],
    items: ['Stat Labs', 'Blood Cultures', 'Lactate', 'Antibiotics', 'IV Fluids', 'Pressors'],
    priority: 'critical',
    description: 'Complete sepsis management protocol'
  },
  strokeProtocol: {
    name: 'Stroke Protocol',
    conditions: ['CVA', 'Altered Mental Status', 'Neuro Changes'],
    items: ['Stat CT', 'Neuro Checks', 'Call MD', 'Stroke Alert', 'tPA Screen'],
    priority: 'critical'
  },
  chestPainProtocol: {
    name: 'Chest Pain Protocol',
    conditions: ['Chest Pain', 'MI', 'Angina'],
    items: ['Stat EKG', 'Troponin', 'Aspirin', 'Nitroglycerin', 'Morphine', 'Cards'],
    priority: 'critical'
  },
  respiratoryDistress: {
    name: 'Respiratory Distress Protocol',
    conditions: ['SOB', 'Hypoxic', 'Respiratory Distress'],
    items: ['O2 Therapy', 'ABG', 'CXR', 'Nebs', 'RT Consult'],
    priority: 'high'
  }
};

interface ProtocolBundleProps {
  selectedItems: Record<string, any>;
  onSelectItems: (items: Array<{ category: string; section: string; item: string }>) => void;
  sbarCategories: any;
}

export const ProtocolBundle: React.FC<ProtocolBundleProps> = ({
  selectedItems,
  onSelectItems,
  sbarCategories
}) => {
  const [expandedBundles, setExpandedBundles] = useState<Record<string, boolean>>({});

  // Check which bundles are available based on current selections
  const getAvailableBundles = (): Array<[string, ProtocolBundleType]> => {
    const selectedItemNames = Object.values(selectedItems).map((s: any) => s.item);
    
    return Object.entries(protocolBundles).filter(([key, bundle]) => {
      // Check if any condition is met
      return bundle.conditions.some((condition: string) => 
        selectedItemNames.includes(condition)
      );
    });
  };

  const availableBundles = getAvailableBundles();

  if (availableBundles.length === 0) return null;

  const toggleBundle = (bundleKey: string) => {
    setExpandedBundles(prev => ({
      ...prev,
      [bundleKey]: !prev[bundleKey]
    }));
  };

  const activateBundle = (bundle: ProtocolBundleType) => {
    const itemsToSelect: Array<{ category: string; section: string; item: string }> = [];
    
    // Find each bundle item in the categories
    bundle.items.forEach((itemName: string) => {
      Object.entries(sbarCategories).forEach(([catKey, category]: [string, any]) => {
        Object.entries(category.sections).forEach(([secKey, section]: [string, any]) => {
          if (section.items[itemName]) {
            itemsToSelect.push({
              category: catKey,
              section: secKey,
              item: itemName
            });
          }
        });
      });
    });
    
    // Select all items at once
    onSelectItems(itemsToSelect);
  };

  const isItemSelected = (itemName: string): boolean => {
    return Object.values(selectedItems).some((s: any) => s.item === itemName);
  };

  const getBundleProgress = (bundle: ProtocolBundleType): number => {
    const selectedCount = bundle.items.filter((item: string) => isItemSelected(item)).length;
    return (selectedCount / bundle.items.length) * 100;
  };

  return (
    <div className="protocol-bundles">
      <div className="bundles-header">
        <Package size={16} />
        <h3>Available Protocols</h3>
        <span className="bundle-count">{availableBundles.length}</span>
      </div>
      
      <div className="bundles-list">
        {availableBundles.map(([key, bundle]) => {
          const progress = getBundleProgress(bundle);
          const isExpanded = expandedBundles[key];
          const isComplete = progress === 100;
          
          return (
            <div 
              key={key} 
              className={`protocol-bundle ${bundle.priority} ${isComplete ? 'complete' : ''}`}
            >
              <div className="bundle-header">
                <div className="bundle-info">
                  <div className="bundle-title">
                    {bundle.priority === 'critical' && <Zap size={14} />}
                    <span>{bundle.name}</span>
                  </div>
                  <div className="bundle-progress">
                    <div 
                      className="progress-bar"
                      style={{ width: `${progress}%` }}
                    />
                    <span className="progress-text">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>
                
                <div className="bundle-actions">
                  {!isComplete && (
                    <button
                      className="activate-bundle-btn"
                      onClick={() => activateBundle(bundle)}
                      title="Activate all protocol items"
                    >
                      Activate All
                    </button>
                  )}
                  <button
                    className="expand-bundle-btn"
                    onClick={() => toggleBundle(key)}
                  >
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>
              
              {isExpanded && (
                <div className="bundle-items">
                  {bundle.items.map((item: string, index: number) => {
                    const selected = isItemSelected(item);
                    return (
                      <div 
                        key={index} 
                        className={`bundle-item ${selected ? 'selected' : ''}`}
                      >
                        {selected && <Check size={12} />}
                        <span>{item}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};