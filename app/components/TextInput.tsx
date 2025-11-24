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
    <div style={{ marginBottom: ds.spacing['2xl'], position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: ds.spacing.md }}>
        <label style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: ds.spacing.sm,
          fontSize: ds.typography.sizes.base,
          fontWeight: ds.typography.weights.semibold,
          color: ds.colors.gray[700],
          fontFamily: ds.typography.fonts.heading,
        }}>
          <FaEdit style={{ fontSize: '1.2rem' }} />
          Enter Your Text
        </label>
        <span style={{
          fontSize: ds.typography.sizes.sm,
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
          onChange={(e) => onTextChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type or paste your text here... The AI will convert it into natural-sounding speech."
          maxLength={maxChars}
          style={{
            width: '100%',
            minHeight: '180px',
            padding: ds.spacing.lg,
            border: `1px solid ${isFocused ? '#ff9b8f' : '#e5e7eb'}`,
            borderRadius: ds.borderRadius.lg,
            fontSize: ds.typography.sizes.base,
            fontFamily: ds.typography.fonts.body,
            lineHeight: ds.typography.lineHeights.relaxed,
            resize: 'vertical',
            transition: `all ${ds.transitions.base}`,
            outline: 'none',
            backgroundColor: 'white',
            boxShadow: isFocused ? '0 0 0 3px rgba(255, 155, 143, 0.1)' : 'none',
            boxSizing: 'border-box',
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
            background: text.trim() ? '#9333ea' : ds.colors.gray[300],
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
              e.currentTarget.style.background = '#7e22ce';
            }
          }}
          onMouseLeave={(e) => {
            if (text.trim()) {
              e.currentTarget.style.background = '#9333ea';
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
