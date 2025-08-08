import React, { useState, useEffect, useRef } from 'react';
import { X, Save, FileText, Clock, Edit3 } from 'lucide-react';
import './QuickNote.css';

interface QuickNoteProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  buttonName: string;
  existingNote?: string;
  timestamp?: Date;
}

export const QuickNote: React.FC<QuickNoteProps> = ({
  isOpen,
  onClose,
  onSave,
  buttonName,
  existingNote = '',
  timestamp
}) => {
  const [note, setNote] = useState(existingNote);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
      // Place cursor at end of existing text
      textareaRef.current.setSelectionRange(note.length, note.length);
    }
  }, [isOpen, note.length]);

  useEffect(() => {
    setNote(existingNote);
  }, [existingNote]);

  const handleSave = () => {
    onSave(note.trim());
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="quick-note-overlay" onClick={onClose}>
      <div className="quick-note-modal" onClick={(e) => e.stopPropagation()}>
        <div className="quick-note-header">
          <div className="quick-note-title">
            <FileText size={18} />
            <span>Note for: {buttonName}</span>
          </div>
          <button className="quick-note-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="quick-note-content">
          {timestamp && (
            <div className="quick-note-timestamp">
              <Clock size={14} />
              <span>{new Date(timestamp).toLocaleString()}</span>
            </div>
          )}
          
          <textarea
            ref={textareaRef}
            className="quick-note-input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Add specific details about ${buttonName}...\nExamples:\n• Medication doses and times\n• Specific observations\n• Patient responses\n• Important context`}
            rows={6}
          />
          
          <div className="quick-note-tips">
            <span><kbd>Ctrl</kbd>+<kbd>Enter</kbd> to save</span>
            <span><kbd>Esc</kbd> to cancel</span>
          </div>
        </div>

        <div className="quick-note-footer">
          <button className="quick-note-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="quick-note-save" onClick={handleSave}>
            <Save size={16} />
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};