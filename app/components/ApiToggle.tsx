import { useState, useEffect } from 'react';
import { designSystem as ds } from '../lib/designSystem';
import Toast from './Toast';

interface ApiToggleProps {
  onToggle?: (useReplicate: boolean) => void;
}

export default function ApiToggle({ onToggle }: ApiToggleProps) {
  const [useReplicate, setUseReplicate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'warning' | 'success' | 'info' } | null>(null);

  useEffect(() => {
    // Fetch current config
    fetch('/api/voiceover/config')
      .then(res => res.json())
      .then(data => {
        setUseReplicate(data.useReplicate);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleToggle = async () => {
    setIsSwitching(true);
    try {
      const newUseReplicate = !useReplicate;
      
      const response = await fetch('/api/voiceover/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ useReplicate: newUseReplicate }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setUseReplicate(data.useReplicate);
        
        // Check if switching to Default API (useReplicate = false)
        if (!data.useReplicate) {
          // Try to fetch voices to verify API is working
          try {
            const voicesResponse = await fetch('/api/voiceover/voiceover_samples');
            if (!voicesResponse.ok) {
              const error = await voicesResponse.json();
              setToast({
                message: `Failed to connect to the default API server.\n\n${error.error || 'Please make sure your backend API is running at http://localhost:8000'}`,
                type: 'warning'
              });
            }
          } catch (err) {
            setToast({
              message: 'Failed to connect to the default API server. Please make sure your backend API is running at http://localhost:8000',
              type: 'warning'
            });
          }
        }
        
        // Notify parent component to refresh affected areas
        if (onToggle) {
          onToggle(data.useReplicate);
        }
      }
    } catch (error) {
      // console.error('Failed to toggle API mode:', error);
      setToast({
        message: 'Failed to toggle API mode. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSwitching(false);
    }
  };

  if (isLoading) return null;

  return (
    <label style={{ 
      display: 'flex', 
      alignItems: 'center',
      cursor: isSwitching ? 'not-allowed' : 'pointer',
      opacity: isSwitching ? 0.6 : 1,
    }}>
        <span style={{
        marginLeft: '0.5rem',
        fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
        fontWeight: ds.typography.weights.medium,
        color: '#1a1a1a',
        fontFamily: ds.typography.fonts.body,
        whiteSpace: 'nowrap',
      }}>
        {useReplicate ? 'Replicate' : 'Default'}
      </span>
      <input
        type="checkbox"
        checked={useReplicate}
        onChange={handleToggle}
        disabled={isSwitching}
        style={{
          position: 'relative',
          width: '2.5rem',
          height: '1.25rem',
          transition: 'all 200ms ease-in-out',
          backgroundColor: useReplicate ? '#7f9cf5' : '#9ca3af',
          borderRadius: '9999px',
          outline: 'none',
          appearance: 'none',
          cursor: isSwitching ? 'not-allowed' : 'pointer',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        }}
        aria-label={`Switch to ${useReplicate ? 'Default API' : 'Replicate'}`}
      />
      <style jsx>{`
        input:before {
          content: '';
          position: absolute;
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          top: 0;
          left: 0;
          transform: scale(1.1);
          box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.2);
          background-color: white;
          transition: .2s ease-in-out;
        }

        input:checked:before {
          left: 1.25rem;
        }
      `}</style>
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </label>
  );
}
