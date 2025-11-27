import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'error' | 'warning' | 'success' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    error: '#fee2e2',
    warning: '#fef3c7',
    success: '#d1fae5',
    info: '#dbeafe',
  };

  const borderColors = {
    error: '#fecaca',
    warning: '#fde68a',
    success: '#a7f3d0',
    info: '#bfdbfe',
  };

  const icons = {
    error: '❌',
    warning: '⚠️',
    success: '✅',
    info: 'ℹ️',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: bgColors[type],
        border: `2px solid ${borderColors[type]}`,
        borderRadius: '12px',
        padding: '1rem 1.5rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        maxWidth: '400px',
        zIndex: 9999,
        animation: 'slideInRight 0.3s ease-out, fadeOut 0.5s ease-out 9.5s forwards',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
      }}
    >
      <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>
        {icons[type]}
      </span>
      <div style={{ flex: 1 }}>
        <p style={{ 
          margin: 0, 
          fontSize: '0.95rem', 
          color: '#1a1a1a',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
        }}>
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.25rem',
          color: '#6b7280',
          padding: 0,
          lineHeight: 1,
          flexShrink: 0,
        }}
        aria-label="Close notification"
      >
        ×
      </button>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(20px);
          }
        }
      `}</style>
    </div>
  );
}
