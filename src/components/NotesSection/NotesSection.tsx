// src/components/NotesSection/NotesSection.tsx
import React from 'react';
import { FileText, Maximize2, Minimize2 } from 'lucide-react';
import './NotesSection.css';

interface NotesSectionProps {
  notes: string;
  expanded: boolean;
  onNotesChange: (notes: string) => void;
  onToggleExpand: () => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  expanded,
  onNotesChange,
  onToggleExpand
}) => {
  return (
    <div className={`notes-section ${expanded ? 'expanded' : ''}`}>
      <div className="notes-header">
        <div className="notes-title">
          <FileText size={16} />
          <h3>Notes / Updates</h3>
        </div>
        <button className="expand-btn" onClick={onToggleExpand}>
          {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>
      <textarea
        className="notes-textarea"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Enter shift notes, updates, or important information..."
        rows={expanded ? 10 : 4}
      />
    </div>
  );
};