// src/components/VitalsLabsGrid/VitalsLabsGrid.tsx
import React, { useState } from 'react';
import { Activity, TestTube, Plus, RotateCw } from 'lucide-react';
import { Patient } from '../../types';
import { CircularKeypad } from '../CircularKeypad/CircularKeypad';
import { validateVital, validateLab } from '../../utils/validation';
import { getNormalRange } from '../../utils/normalRanges';
import './VitalsLabsGrid.css';

interface VitalsLabsGridProps {
  patient: Patient;
  onPatientUpdate: (patient: Patient) => void;
}

interface VitalEntry {
  time: string;
  value: string;
  abnormal?: boolean;
}

export const VitalsLabsGrid: React.FC<VitalsLabsGridProps> = ({
  patient,
  onPatientUpdate
}) => {
  const [showVitalInput, setShowVitalInput] = useState<{ type: string; time: string; position: { x: number; y: number } } | null>(null);
  const [showLabInput, setShowLabInput] = useState<{ type: string; time: string; position: { x: number; y: number } } | null>(null);
  const [swapOrientation, setSwapOrientation] = useState(false);

  const vitalTypes = ['HR', 'BP', 'RR', 'O2', 'Temp', 'BG'];
  const labTypes = ['Na', 'K', 'Cr', 'Hgb', 'WBC', 'Plt'];

  // Mock data for demonstration - replace with actual patient data
  const vitalsData: Record<string, VitalEntry[]> = {
    HR: [
      { time: '0800', value: '88', abnormal: false },
      { time: '1200', value: '102', abnormal: true },
      { time: '1600', value: '95', abnormal: false }
    ],
    BP: [
      { time: '0800', value: '128/82', abnormal: false },
      { time: '1200', value: '142/90', abnormal: true },
      { time: '1600', value: '130/85', abnormal: false }
    ],
    BG: [
      { time: '0600', value: '110', abnormal: false },
      { time: '1200', value: '245', abnormal: true },
      { time: '1800', value: '180', abnormal: true }
    ]
  };

  const handleVitalInput = (type: string, time: string, value: string) => {
    // Validate input
    const validation = validateVital(type, value);
    if (!validation.isValid) {
      alert(validation.error); // In production, use a proper toast/notification
      return;
    }
    
    // Update patient vitals with time-specific key
    const updatedVitals = {
      ...patient.vitals,
      [`${type}-${time}`]: validation.value,
      [type]: validation.value // Also store latest value without time
    };
    
    onPatientUpdate({
      ...patient,
      vitals: updatedVitals
    });
    
    setShowVitalInput(null);
  };

  const handleLabInput = (type: string, time: string, value: string) => {
    // Validate input
    const validation = validateLab(type, value);
    if (!validation.isValid) {
      alert(validation.error); // In production, use a proper toast/notification
      return;
    }

    // Update patient labs with time-specific key
    const updatedLabs = {
      ...patient.labs,
      [`${type}-${time}`]: validation.value,
      [type]: validation.value // Also store latest value without time
    };
    
    onPatientUpdate({
      ...patient,
      labs: updatedLabs
    });
    
    setShowLabInput(null);
  };

  return (
    <div className="vitals-labs-grid">
      <div className="grid-section vitals-section">
        <div className="section-header">
          <Activity size={16} />
          <h3>Vitals</h3>
          <button 
            className="swap-btn"
            onClick={() => setSwapOrientation(!swapOrientation)}
            title="Swap rows/columns"
          >
            <RotateCw size={14} />
          </button>
        </div>
        <div className="grid-table">
          <div className="grid-header">
            <div className="time-column">Time</div>
            {vitalTypes.map(type => (
              <div key={type} className="vital-column">
                {type}
              </div>
            ))}
          </div>
          <div className="grid-body">
            {['0600', '0800', '1000', '1200', '1400', '1600', '1800'].map(time => (
              <div key={time} className="grid-row">
                <div className="time-cell">{time}</div>
                {vitalTypes.map(type => {
                  const data = vitalsData[type]?.find(v => v.time === time);
                  return (
                    <div 
                      key={type} 
                      className={`vital-cell ${data?.abnormal ? 'abnormal' : ''} ${patient.vitals[`${type}-${time}`] ? 'has-value' : ''}`}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setShowVitalInput({ 
                          type, 
                          time,
                          position: { 
                            x: rect.left + rect.width / 2, 
                            y: rect.top + rect.height / 2 
                          } 
                        });
                      }}
                    >
                      {patient.vitals[`${type}-${time}`] || data?.value || <Plus size={12} />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-section labs-section">
        <div className="section-header">
          <TestTube size={16} />
          <h3>Labs</h3>
        </div>
        <div className="grid-table">
          <div className="grid-header">
            <div className="time-column">Time</div>
            {labTypes.map(type => (
              <div key={type} className="lab-column">
                {type}
              </div>
            ))}
          </div>
          <div className="grid-body">
            {['AM', 'PM'].map(time => (
              <div key={time} className="grid-row">
                <div className="time-cell">{time}</div>
                {labTypes.map(type => (
                  <div 
                    key={type} 
                    className={`lab-cell ${patient.labs[`${type}-${time}`] ? 'has-value' : ''}`}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setShowLabInput({ 
                        type, 
                        time,
                        position: { 
                          x: rect.left + rect.width / 2, 
                          y: rect.top + rect.height / 2 
                        } 
                      });
                    }}
                  >
                    {patient.labs[`${type}-${time}`] || <Plus size={12} />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showVitalInput && (
        <CircularKeypad
          isOpen={true}
          onClose={() => setShowVitalInput(null)}
          onSubmit={(value) => handleVitalInput(showVitalInput.type, showVitalInput.time, value)}
          label={`${showVitalInput.type} at ${showVitalInput.time}`}
          normalRange={getNormalRange('vital', showVitalInput.type)}
          position={showVitalInput.position}
        />
      )}

      {showLabInput && (
        <CircularKeypad
          isOpen={true}
          onClose={() => setShowLabInput(null)}
          onSubmit={(value) => handleLabInput(showLabInput.type, showLabInput.time, value)}
          label={`${showLabInput.type} ${showLabInput.time}`}
          normalRange={getNormalRange('lab', showLabInput.type)}
          position={showLabInput.position}
        />
      )}
    </div>
  );
};