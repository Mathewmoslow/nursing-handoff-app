import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Save, Trash2, Edit2, Check, 
  // Healthcare icons
  Heart, Brain, Wind, Activity, Pill, Syringe,
  Stethoscope, Thermometer, Eye, Droplet, Shield,
  Package, Clock, User, Users, Home, Building2,
  Ambulance, TestTube, Monitor, Phone, AlertTriangle,
  Bed, MapPin, Navigation, Car, Zap, Wifi,
  Cloud, ShieldCheck, ChevronRight, MinusCircle,
  PlusCircle, Circle, Square, Triangle, Star,
  Sun, Moon, Coffee, Apple, Heart as HeartIcon
} from 'lucide-react';
import './ButtonStudio.css';

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

interface ButtonStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveButton: (button: CustomButton) => void;
  existingButtons?: CustomButton[];
  sectionColors: Record<string, string>;
}

const availableIcons = [
  { name: 'Heart', icon: Heart },
  { name: 'Brain', icon: Brain },
  { name: 'Wind', icon: Wind },
  { name: 'Activity', icon: Activity },
  { name: 'Pill', icon: Pill },
  { name: 'Syringe', icon: Syringe },
  { name: 'Stethoscope', icon: Stethoscope },
  { name: 'Thermometer', icon: Thermometer },
  { name: 'Eye', icon: Eye },
  { name: 'Droplet', icon: Droplet },
  { name: 'Shield', icon: Shield },
  { name: 'Package', icon: Package },
  { name: 'Clock', icon: Clock },
  { name: 'User', icon: User },
  { name: 'Users', icon: Users },
  { name: 'Home', icon: Home },
  { name: 'Building2', icon: Building2 },
  { name: 'Ambulance', icon: Ambulance },
  { name: 'TestTube', icon: TestTube },
  { name: 'Monitor', icon: Monitor },
  { name: 'Phone', icon: Phone },
  { name: 'AlertTriangle', icon: AlertTriangle },
  { name: 'Bed', icon: Bed },
  { name: 'MapPin', icon: MapPin },
  { name: 'Navigation', icon: Navigation },
  { name: 'Car', icon: Car },
  { name: 'Zap', icon: Zap },
  { name: 'PlusCircle', icon: PlusCircle },
  { name: 'MinusCircle', icon: MinusCircle },
  { name: 'Circle', icon: Circle },
  { name: 'Square', icon: Square },
  { name: 'Star', icon: Star }
];

const categories = ['assessment', 'situation', 'background', 'recommendation'];
const sections = [
  'neuro', 'respiratory', 'cardiac', 'gi', 'gu', 'skin', 
  'safety', 'lines', 'history', 'admission', 'custom'
];

export const ButtonStudio: React.FC<ButtonStudioProps> = ({
  isOpen,
  onClose,
  onSaveButton,
  existingButtons = [],
  sectionColors
}) => {
  const [mainButton, setMainButton] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Heart');
  const [category, setCategory] = useState('assessment');
  const [section, setSection] = useState('custom');
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');
  const [editingButton, setEditingButton] = useState<CustomButton | null>(null);
  const [customButtons, setCustomButtons] = useState<CustomButton[]>([]);

  // Load custom buttons from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('customButtons');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCustomButtons(parsed.map((btn: any) => ({
          ...btn,
          createdAt: new Date(btn.createdAt),
          lastModified: new Date(btn.lastModified)
        })));
      } catch (e) {
        console.error('Error loading custom buttons:', e);
      }
    }
  }, []);

  // Save custom buttons to localStorage (persistent storage)
  const saveToStorage = (buttons: CustomButton[]) => {
    localStorage.setItem('customButtons', JSON.stringify(buttons));
  };

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!mainButton.trim()) {
      alert('Please enter a button name');
      return;
    }

    const button: CustomButton = {
      id: editingButton?.id || `custom-${Date.now()}`,
      mainButton: mainButton.trim(),
      icon: selectedIcon,
      category,
      section,
      options,
      color: sectionColors[section] || '#6b7280',
      createdAt: editingButton?.createdAt || new Date(),
      lastModified: new Date()
    };

    let updatedButtons: CustomButton[];
    if (editingButton) {
      updatedButtons = customButtons.map(btn => 
        btn.id === editingButton.id ? button : btn
      );
    } else {
      updatedButtons = [...customButtons, button];
    }

    setCustomButtons(updatedButtons);
    saveToStorage(updatedButtons);
    onSaveButton(button);

    // Reset form
    setMainButton('');
    setSelectedIcon('Heart');
    setCategory('assessment');
    setSection('custom');
    setOptions([]);
    setEditingButton(null);
  };

  const handleEdit = (button: CustomButton) => {
    setEditingButton(button);
    setMainButton(button.mainButton);
    setSelectedIcon(button.icon);
    setCategory(button.category);
    setSection(button.section);
    setOptions(button.options);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this custom button? This cannot be undone.')) {
      const updatedButtons = customButtons.filter(btn => btn.id !== id);
      setCustomButtons(updatedButtons);
      saveToStorage(updatedButtons);
    }
  };

  if (!isOpen) return null;

  const SelectedIconComponent = availableIcons.find(i => i.name === selectedIcon)?.icon || Heart;

  return (
    <div className="button-studio-overlay">
      <div className="button-studio-modal">
        <div className="button-studio-header">
          <h2>Button Studio</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="button-studio-content">
          <div className="studio-form">
            <h3>{editingButton ? 'Edit Button' : 'Create New Button'}</h3>
            
            <div className="form-group">
              <label>Button Name</label>
              <input
                type="text"
                value={mainButton}
                onChange={(e) => setMainButton(e.target.value)}
                placeholder="e.g., Custom Assessment"
                maxLength={30}
              />
            </div>

            <div className="form-group">
              <label>Select Icon</label>
              <div className="icon-grid">
                {availableIcons.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    className={`icon-btn ${selectedIcon === name ? 'selected' : ''}`}
                    onClick={() => setSelectedIcon(name)}
                    title={name}
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Section</label>
                <select value={section} onChange={(e) => setSection(e.target.value)}>
                  {sections.map(sec => (
                    <option key={sec} value={sec}>
                      {sec.charAt(0).toUpperCase() + sec.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Sub-options (Optional)</label>
              <div className="option-input">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add sub-option"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
                />
                <button className="add-option-btn" onClick={handleAddOption}>
                  <Plus size={16} />
                </button>
              </div>
              <div className="options-list">
                {options.map((option, index) => (
                  <div key={index} className="option-tag">
                    <span>{option}</span>
                    <button onClick={() => handleRemoveOption(index)}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-preview">
              <label>Preview</label>
              <div className="preview-button" style={{ backgroundColor: sectionColors[section] || '#6b7280' }}>
                <SelectedIconComponent size={16} />
                <span>{mainButton || 'Button Name'}</span>
                {options.length > 0 && (
                  <span className="option-count">+{options.length}</span>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button className="save-btn" onClick={handleSave}>
                <Save size={16} />
                {editingButton ? 'Update' : 'Save'} Button
              </button>
              {editingButton && (
                <button className="cancel-btn" onClick={() => {
                  setEditingButton(null);
                  setMainButton('');
                  setOptions([]);
                }}>
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className="custom-buttons-list">
            <h3>Your Custom Buttons</h3>
            {customButtons.length === 0 ? (
              <p className="empty-state">No custom buttons yet. Create your first one!</p>
            ) : (
              <div className="buttons-grid">
                {customButtons.map(button => {
                  const ButtonIcon = availableIcons.find(i => i.name === button.icon)?.icon || Heart;
                  return (
                    <div key={button.id} className="custom-button-card">
                      <div 
                        className="button-preview"
                        style={{ backgroundColor: button.color }}
                      >
                        <ButtonIcon size={16} />
                        <span>{button.mainButton}</span>
                      </div>
                      <div className="button-info">
                        <span className="button-section">{button.section}</span>
                        <span className="button-category">{button.category}</span>
                        {button.options.length > 0 && (
                          <span className="button-options">{button.options.length} options</span>
                        )}
                      </div>
                      <div className="button-actions">
                        <button onClick={() => handleEdit(button)} title="Edit">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(button.id)} title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};