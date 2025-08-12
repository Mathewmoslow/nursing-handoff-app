import React, { useState, useEffect } from 'react';
import { 
  Brain, Heart, Wind, Shield, Syringe, 
  AlertTriangle, Activity, Droplets, Package,
  Zap
} from 'lucide-react';
import './QuickAccessPanel.css';

interface QuickAccessPanelProps {
  onItemSelect: (category: string, section: string, item: string) => void;
  selectedItems: Record<string, any>;
  recentItems: string[];
  frequentItems: Record<string, number>;
}

// Top items based on 100 patient scenario analysis
const DEFAULT_QUICK_ACCESS = [
  { label: 'A&O x3', category: 'assessment', section: 'neuro', icon: Brain, usage: 75 },
  { label: 'A&O x4', category: 'assessment', section: 'neuro', icon: Brain, usage: 45 },
  { label: 'Confused', category: 'assessment', section: 'neuro', icon: Brain, usage: 25 },
  { label: 'SR', category: 'assessment', section: 'cardiac', icon: Heart, usage: 60 },
  { label: 'AF', category: 'assessment', section: 'cardiac', icon: Heart, usage: 15 },
  { label: 'RA', category: 'assessment', section: 'respiratory', icon: Wind, usage: 45 },
  { label: 'NC 2L', category: 'assessment', section: 'respiratory', icon: Wind, usage: 20 },
  { label: 'Full Code', category: 'situation', section: 'code', icon: Shield, usage: 70 },
  { label: 'DNR/DNI', category: 'situation', section: 'code', icon: Shield, usage: 20 },
  { label: 'PIV', category: 'assessment', section: 'access', icon: Syringe, usage: 55 },
  { label: 'Foley', category: 'assessment', section: 'gu', icon: Droplets, usage: 48 },
  { label: 'Fall Risk', category: 'situation', section: 'safety', icon: AlertTriangle, usage: 35 },
  { label: 'Continent', category: 'assessment', section: 'gi', icon: Activity, usage: 65 },
  { label: 'Heparin SubQ', category: 'assessment', section: 'vte', icon: Syringe, usage: 42 },
  { label: 'SCDs', category: 'assessment', section: 'vte', icon: Activity, usage: 25 }
];

// Smart bundles for common patient scenarios
const SMART_BUNDLES = [
  {
    name: 'Normal/Stable',
    icon: Package,
    color: '#10b981',
    items: [
      { label: 'A&O x4', category: 'assessment', section: 'neuro' },
      { label: 'SR', category: 'assessment', section: 'cardiac' },
      { label: 'RA', category: 'assessment', section: 'respiratory' },
      { label: 'Regular Diet', category: 'situation', section: 'diet' },
      { label: 'Continent', category: 'assessment', section: 'gi' },
      { label: 'Up ad lib', category: 'assessment', section: 'activity' }
    ]
  },
  {
    name: 'Post-Op Day 1',
    icon: Package,
    color: '#8b5cf6',
    items: [
      { label: 'NPO', category: 'situation', section: 'diet' },
      { label: 'Pain controlled', category: 'assessment', section: 'pain' },
      { label: 'SCDs', category: 'assessment', section: 'vte' },
      { label: 'Foley', category: 'assessment', section: 'gu' },
      { label: 'IS q1h', category: 'recommendation', section: 'respiratory' }
    ]
  },
  {
    name: 'CHF Exacerbation',
    icon: Package,
    color: '#3b82f6',
    items: [
      { label: '2g Na diet', category: 'situation', section: 'diet' },
      { label: 'Fluid restriction', category: 'situation', section: 'diet' },
      { label: 'Lasix', category: 'assessment', section: 'meds' },
      { label: 'Daily weights', category: 'recommendation', section: 'monitoring' },
      { label: 'I&Os', category: 'assessment', section: 'monitoring' },
      { label: 'Edema', category: 'assessment', section: 'skin' }
    ]
  },
  {
    name: 'Sepsis Protocol',
    icon: Zap,
    color: '#ef4444',
    items: [
      { label: 'Blood cultures', category: 'assessment', section: 'labs' },
      { label: 'Antibiotics', category: 'assessment', section: 'meds' },
      { label: 'Lactate', category: 'assessment', section: 'labs' },
      { label: 'Pressors', category: 'assessment', section: 'meds' },
      { label: 'CVP monitoring', category: 'assessment', section: 'monitoring' }
    ]
  }
];

export const QuickAccessPanel: React.FC<QuickAccessPanelProps> = ({
  onItemSelect,
  selectedItems,
  recentItems,
  frequentItems
}) => {
  const [quickItems, setQuickItems] = useState(DEFAULT_QUICK_ACCESS);
  const [showBundles, setShowBundles] = useState(false);

  // Update quick access based on user behavior
  useEffect(() => {
    const updateQuickAccess = () => {
      // Combine default items with frequently used items
      const userFrequent = Object.entries(frequentItems)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([item, count]) => {
          const [category, section, label] = item.split('-');
          return { label, category, section, icon: Brain, usage: count };
        });

      // Merge with defaults, prioritizing user frequent items
      const merged = [...userFrequent, ...DEFAULT_QUICK_ACCESS];
      const unique = merged.filter((item, index, self) =>
        index === self.findIndex((t) => t.label === item.label)
      );

      setQuickItems(unique.slice(0, 15));
    };

    updateQuickAccess();
  }, [frequentItems]);

  const handleBundleSelect = (bundle: typeof SMART_BUNDLES[0]) => {
    bundle.items.forEach(item => {
      onItemSelect(item.category, item.section, item.label);
    });
  };

  const isItemSelected = (item: typeof DEFAULT_QUICK_ACCESS[0]) => {
    const key = `${item.category}-${item.section}-${item.label}`;
    return !!selectedItems[key];
  };

  return (
    <div className="quick-access-panel">
      <div className="panel-header">
        <h3>Quick</h3>
        <button 
          className="bundle-toggle"
          onClick={() => setShowBundles(!showBundles)}
        >
          {showBundles ? '📋' : '📦'}
        </button>
      </div>

      {!showBundles ? (
        <div className="quick-items-grid">
          {quickItems.map((item, index) => {
            const Icon = item.icon;
            const selected = isItemSelected(item);
            const isRecent = recentItems.includes(item.label);
            
            return (
              <button
                key={`${item.label}-${index}`}
                className={`quick-item ${selected ? 'selected' : ''} ${isRecent ? 'recent' : ''}`}
                onClick={() => onItemSelect(item.category, item.section, item.label)}
                title={item.label}
              >
                <Icon size={14} />
                <span className="item-label">{item.label}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="bundles-grid">
          {SMART_BUNDLES.map((bundle, index) => {
            const Icon = bundle.icon;
            
            return (
              <div
                key={`bundle-${index}`}
                className="bundle-card"
                style={{ borderColor: bundle.color }}
              >
                <button
                  className="bundle-apply"
                  style={{ backgroundColor: bundle.color, width: '100%', height: '100%' }}
                  onClick={() => handleBundleSelect(bundle)}
                  title={bundle.items.map(i => i.label).join(', ')}
                >
                  <Icon size={16} color="white" />
                  <span style={{ fontSize: '10px', color: 'white' }}>{bundle.name}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};