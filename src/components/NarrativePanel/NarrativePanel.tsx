import React, { useState } from 'react';
import { FileText, Clock, Save, Copy, Maximize2, Minimize2 } from 'lucide-react';
import { Patient } from '../../types';
import { formatTime } from '../../utils/helpers';
import './NarrativePanel.css';

interface NarrativePanelProps {
  patient: Patient;
  onExport: () => void;
}

export const NarrativePanel: React.FC<NarrativePanelProps> = ({
  patient,
  onExport
}) => {
  const [activeTab, setActiveTab] = useState<'report' | 'timeline'>('report');
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(patient.narrative);
    // Could add a toast notification here
  };

  return (
    <div className={`narrative-panel ${isExpanded ? 'expanded' : ''}`}>
      <div className="narrative-header">
        <h2>Patient Story</h2>
        <div className="narrative-controls">
          <div className="narrative-tabs">
            <button
              className={`tab ${activeTab === 'report' ? 'active' : ''}`}
              onClick={() => setActiveTab('report')}
            >
              <FileText size={14} />
              Report
            </button>
            <button
              className={`tab ${activeTab === 'timeline' ? 'active' : ''}`}
              onClick={() => setActiveTab('timeline')}
            >
              <Clock size={14} />
              Timeline
            </button>
          </div>
          <div className="narrative-actions">
            <button onClick={copyToClipboard} title="Copy to clipboard">
              <Copy size={14} />
            </button>
            <button onClick={onExport} title="Export report">
              <Save size={14} />
            </button>
            <button onClick={() => setIsExpanded(!isExpanded)} title="Toggle expand">
              {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'report' ? (
        <div className="narrative-content">
          <div className="update-timestamp">
            {patient.lastUpdate && (
              <span>Last updated: {formatTime(patient.lastUpdate)}</span>
            )}
          </div>
          <pre>{patient.narrative || 'Select items to build patient story...'}</pre>
        </div>
      ) : (
        <div className="timeline">
          {patient.timeline && patient.timeline.length > 0 ? (
            <>
              <h3>Recent Activity</h3>
              <div className="timeline-events">
                {patient.timeline.slice(0, 20).map(event => (
                  <div key={event.id} className="timeline-event">
                    <span className="time">{formatTime(event.timestamp)}</span>
                    <span className="category">{event.category}</span>
                    <span className="event">{event.item}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-timeline">
              <Clock size={32} />
              <p>No timeline events yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};