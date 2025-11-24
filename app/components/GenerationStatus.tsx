import { memo } from 'react';
import { FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { designSystem as ds } from '../lib/designSystem';

interface GenerationStatusProps {
  statusMessage?: string | null;
  errorMessage?: string | null;
  onDismissError?: () => void;
}

const GenerationStatus = memo(function GenerationStatus({
  statusMessage,
  errorMessage,
  onDismissError,
}: GenerationStatusProps) {
  if (!statusMessage && !errorMessage) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: ds.spacing.sm, marginTop: ds.spacing.md }}>
      {errorMessage && (
        <div
          role="alert"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            color: ds.colors.error,
            border: `1px solid ${ds.colors.error}`,
            borderRadius: ds.borderRadius.lg,
            padding: `${ds.spacing.sm} ${ds.spacing.lg}`,
            boxShadow: ds.shadows.sm,
            fontFamily: ds.typography.fonts.body,
            gap: ds.spacing.sm,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: ds.spacing.sm, flex: 1 }}>
            <FaExclamationTriangle />
            <span>{errorMessage}</span>
          </div>
          {onDismissError && (
            <button
              onClick={onDismissError}
              style={{
                border: 'none',
                background: 'transparent',
                color: ds.colors.error,
                cursor: 'pointer',
                fontWeight: ds.typography.weights.semibold,
                textDecoration: 'underline',
              }}
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      {statusMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
            color: ds.colors.primary[700],
            border: `1px solid ${ds.colors.primary[300]}`,
            borderRadius: ds.borderRadius.lg,
            padding: `${ds.spacing.sm} ${ds.spacing.lg}`,
            boxShadow: ds.shadows.sm,
            fontFamily: ds.typography.fonts.body,
            gap: ds.spacing.sm,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: ds.spacing.sm, flex: 1 }}>
            <FaInfoCircle />
            <span>{statusMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default GenerationStatus;
