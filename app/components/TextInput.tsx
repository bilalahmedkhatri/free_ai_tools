import { useState, memo } from 'react';
import { FaEdit, FaSave, FaTrash, FaFont, FaExclamationTriangle } from 'react-icons/fa';
import { designSystem as ds } from '../lib/designSystem';

interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onSave: () => boolean;
}

const TextInput = memo(function TextInput({ text, onTextChange, onSave }: TextInputProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  
  const charCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const maxChars = 5000;
  const recommendedLimit = 2500;
  const showLengthWarning = charCount > recommendedLimit;

  const handleSave = () => {
    const success = onSave();
    if (success) {
      setToastMessage('Prompt saved successfully!');
    } else if (!text.trim()) {
      setToastMessage('Please enter some text first');
    } else {
      setToastMessage('This prompt is already saved');
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 3rem)', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: ds.spacing.md, flexWrap: 'wrap', gap: ds.spacing.sm }}>
        <label style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: ds.spacing.sm,
          fontSize: 'clamp(0.95rem, 2vw, 1rem)',
          fontWeight: ds.typography.weights.semibold,
          color: ds.colors.gray[700],
          fontFamily: ds.typography.fonts.heading,
        }}>
          <FaEdit style={{ fontSize: '1.2rem' }} />
          Enter Your Text
        </label>
        <span style={{
          fontSize: 'clamp(0.8rem, 1.5vw, 0.875rem)',
          color: charCount > maxChars * 0.9 ? ds.colors.error : ds.colors.gray[500],
          fontWeight: ds.typography.weights.medium,
          fontFamily: ds.typography.fonts.mono,
          display: 'flex',
          alignItems: 'center',
          gap: ds.spacing.xs,
        }}>
          <FaFont />
          {charCount.toLocaleString()} / {maxChars.toLocaleString()}
        </span>
      </div>

      <div style={{ position: 'relative' }}>
        <textarea
          value={text}
          onChange={(e) => {
            onTextChange(e.target.value);
            // Auto-expand textarea
            e.target.style.height = 'auto';
            const newHeight = Math.max(120, Math.min(e.target.scrollHeight, 500));
            e.target.style.height = newHeight + 'px';
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type or paste your text here... The AI will convert it into natural-sounding speech."
          maxLength={maxChars}
          style={{
            width: '100%',
            minHeight: 'clamp(120px, 20vh, 180px)',
            maxHeight: '500px',
            padding: ds.spacing.lg,
            border: `1px solid ${isFocused ? '#ff9b8f' : '#e5e7eb'}`,
            borderRadius: ds.borderRadius.lg,
            fontSize: ds.typography.sizes.base,
            fontFamily: ds.typography.fonts.body,
            lineHeight: ds.typography.lineHeights.relaxed,
            resize: 'none',
            overflow: 'auto',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            outline: 'none',
            backgroundColor: 'white',
            boxShadow: isFocused ? '0 0 0 3px rgba(255, 155, 143, 0.1)' : 'none',
            boxSizing: 'border-box',
            scrollBehavior: 'smooth',
          }}
          onMouseEnter={(e) => {
            if (!isFocused) {
              e.currentTarget.style.borderColor = '#ffb4a8';
            }
          }}
          onMouseLeave={(e) => {
            if (!isFocused) {
              e.currentTarget.style.borderColor = '#e5e7eb';
            }
          }}
        />
        
        {!text && (
          <div style={{
            position: 'absolute',
            bottom: ds.spacing.lg,
            right: ds.spacing.lg,
            display: 'flex',
            gap: ds.spacing.sm,
            pointerEvents: 'none',
          }}>
            <span style={{ fontSize: ds.typography.sizes.xs, color: ds.colors.gray[400], background: ds.colors.gray[50], padding: '4px 8px', borderRadius: ds.borderRadius.sm }}>
              Ctrl + V to paste
            </span>
          </div>
        )}
      </div>

      {/* Length Warning Message */}
      {showLengthWarning && (
        <div style={{
          marginTop: ds.spacing.md,
          padding: ds.spacing.md,
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          border: '1px solid #fbbf24',
          borderRadius: ds.borderRadius.lg,
          display: 'flex',
          alignItems: 'flex-start',
          gap: ds.spacing.md,
          fontSize: ds.typography.sizes.sm,
          color: '#92400e',
          lineHeight: ds.typography.lineHeights.relaxed,
        }}>
          <FaExclamationTriangle style={{ 
            fontSize: '1.1rem', 
            color: '#f59e0b',
            marginTop: '2px',
            flexShrink: 0,
          }} />
          <div>
            <strong style={{ fontWeight: ds.typography.weights.semibold, display: 'block', marginBottom: '4px' }}>
              Large Text Detected
            </strong>
            <span>
              You've entered {wordCount.toLocaleString()} words ({charCount.toLocaleString()} characters). 
              Texts over {recommendedLimit.toLocaleString()} characters may take longer to process. 
              Please be patient while our servers generate your voiceover.
            </span>
          </div>
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        gap: ds.spacing.md, 
        marginTop: ds.spacing.lg,
        flexWrap: 'wrap',
      }}>
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: ds.spacing.sm,
            padding: `${ds.spacing.sm} ${ds.spacing.lg}`,
            background: text.trim() ? 'linear-gradient(135deg, #ff9b8f 0%, #ffb4a8 100%)' : ds.colors.gray[300],
            color: 'white',
            border: 'none',
            borderRadius: ds.borderRadius.lg,
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            fontSize: ds.typography.sizes.sm,
            fontWeight: ds.typography.weights.semibold,
            transition: `all ${ds.transitions.base}`,
            boxShadow: 'none',
            fontFamily: ds.typography.fonts.heading,
          }}
          onMouseEnter={(e) => {
            if (text.trim()) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = ds.shadows.lg;
            }
          }}
          onMouseLeave={(e) => {
            if (text.trim()) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          <FaSave style={{ fontSize: '1rem' }} />
          Save Prompt
        </button>

        <button
          onClick={() => onTextChange('')}
          disabled={!text}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: ds.spacing.sm,
            padding: `${ds.spacing.sm} ${ds.spacing.lg}`,
            background: 'white',
            color: text ? ds.colors.gray[700] : ds.colors.gray[400],
            border: `1px solid ${text ? ds.colors.gray[300] : ds.colors.gray[200]}`,
            borderRadius: ds.borderRadius.lg,
            cursor: text ? 'pointer' : 'not-allowed',
            fontSize: ds.typography.sizes.sm,
            fontWeight: ds.typography.weights.medium,
            transition: `all ${ds.transitions.base}`,
            fontFamily: ds.typography.fonts.heading,
          }}
          onMouseEnter={(e) => {
            if (text) {
              e.currentTarget.style.backgroundColor = ds.colors.gray[50];
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
          }}
        >
          <FaTrash style={{ fontSize: '1rem' }} />
          Clear
        </button>
      </div>

      {showToast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            background: ds.colors.gray[900],
            color: 'white',
            padding: `${ds.spacing.md} ${ds.spacing.xl}`,
            borderRadius: ds.borderRadius.xl,
            boxShadow: ds.shadows['2xl'],
            zIndex: 1000,
            animation: 'slideIn 0.3s ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: ds.spacing.md,
            fontSize: ds.typography.sizes.base,
            fontWeight: ds.typography.weights.medium,
            maxWidth: '400px',
          }}
        >
          {toastMessage}
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
});

export default TextInput;
