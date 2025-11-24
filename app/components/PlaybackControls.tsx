import { designSystem as ds } from '../lib/designSystem';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onGenerate: () => void;
  onStop: () => void;
}

export default function PlaybackControls({ isPlaying, onGenerate, onStop }: PlaybackControlsProps) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      gap: ds.spacing.xl,
      padding: `${ds.spacing.xl} 0`,
    }}>
      <div style={{ 
        display: 'flex', 
        gap: ds.spacing.lg,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        <button
          onClick={onGenerate}
          disabled={isPlaying}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: ds.spacing.md,
            padding: `${ds.spacing.md} ${ds.spacing['2xl']}`,
            background: isPlaying ? ds.colors.gray[400] : '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: ds.borderRadius.lg,
            fontSize: ds.typography.sizes.base,
            fontWeight: ds.typography.weights.semibold,
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            boxShadow: 'none',
            transition: `all ${ds.transitions.base}`,
            minWidth: '200px',
            height: '48px',
            overflow: 'hidden',
            fontFamily: ds.typography.fonts.heading,
          }}
          onMouseEnter={(e) => {
            if (!isPlaying) {
              e.currentTarget.style.background = '#2d2d2d';
            }
          }}
          onMouseLeave={(e) => {
            if (!isPlaying) {
              e.currentTarget.style.background = '#1a1a1a';
            }
          }}
        >
          {isPlaying ? (
            <>
              <span style={{ fontSize: '1.75rem', animation: 'pulse 1.5s ease-in-out infinite' }}>🎵</span>
              <span>Playing...</span>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'rgba(255, 255, 255, 0.3)',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  background: 'white',
                  animation: 'loadingBar 2s linear infinite',
                }}></div>
              </div>
            </>
          ) : (
            <>
              <span style={{ fontSize: '1.75rem' }}>▶️</span>
              <span>Generate Voiceover</span>
            </>
          )}
        </button>

        {isPlaying && (
          <button
            onClick={onStop}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: ds.spacing.md,
              padding: ds.components.button.padding.xl,
              background: `linear-gradient(135deg, ${ds.colors.error} 0%, #dc2626 100%)`,
              color: 'white',
              border: 'none',
              borderRadius: ds.borderRadius.xl,
              fontSize: ds.typography.sizes.xl,
              fontWeight: ds.typography.weights.bold,
              cursor: 'pointer',
              boxShadow: `0 0 30px rgba(239, 68, 68, 0.4)`,
              transition: `all ${ds.transitions.base}`,
              minWidth: '180px',
              height: ds.components.button.height.xl,
              animation: 'scaleIn 0.3s ease-out',
              fontFamily: ds.typography.fonts.heading,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = `${ds.shadows['2xl']}, 0 0 40px rgba(239, 68, 68, 0.6)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.4)';
            }}
          >
            <span style={{ fontSize: '1.75rem' }}>⏹️</span>
            <span>Stop</span>
          </button>
        )}
      </div>

      {/* Visual Equalizer Animation when playing */}
      {isPlaying && (
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '6px',
          height: '60px',
          padding: `${ds.spacing.md} ${ds.spacing.xl}`,
          background: ds.colors.gray[50],
          borderRadius: ds.borderRadius.xl,
          boxShadow: ds.shadows.inner,
        }}>
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '8px',
                background: `linear-gradient(to top, ${ds.colors.primary[500]}, ${ds.colors.secondary[400]})`,
                borderRadius: ds.borderRadius.sm,
                animation: `equalizer ${0.6 + i * 0.1}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes loadingBar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes equalizer {
          0% {
            height: 10px;
          }
          100% {
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
}
