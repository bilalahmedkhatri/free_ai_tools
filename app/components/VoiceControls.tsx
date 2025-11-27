import { memo, useState, useEffect } from 'react';
import { FaVolumeUp, FaMusic, FaSlidersH } from 'react-icons/fa';
import { SiSpeedtest } from "react-icons/si";
import { VoiceParams } from '../types';
import { designSystem as ds } from '../lib/designSystem';
import VoiceDropdown from './VoiceDropdown';
import { VoiceSample } from '../lib/voiceoverApi';

interface VoiceControlsProps {
  params: VoiceParams;
  onParamsChange: (params: VoiceParams) => void;
  apiVoices?: VoiceSample[];
  apiVoicesLoading?: boolean;
  apiVoicesError?: string | null;
  onApiVoiceChange?: (voiceId: string) => void;
  selectedApiVoice?: string;
}

const VoiceControls = memo(function VoiceControls({ 
  params, 
  onParamsChange,
  apiVoices = [],
  apiVoicesLoading = false,
  apiVoicesError = null,
  onApiVoiceChange,
  selectedApiVoice = '',
}: VoiceControlsProps) {
  const [useReplicate, setUseReplicate] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/voiceover/config')
      .then(res => res.json())
      .then(data => {
        setUseReplicate(data.useReplicate);
        setConfigLoaded(true);
      })
      .catch(() => {
        setUseReplicate(false);
        setConfigLoaded(true);
      });
  }, []);
  const controlStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: ds.spacing.md,
    minWidth: 0,
    width: '100%',
  };

  const labelStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    fontWeight: ds.typography.weights.semibold,
    color: ds.colors.gray[700],
    fontFamily: ds.typography.fonts.heading,
    flexWrap: 'nowrap' as const,
    gap: ds.spacing.xs,
  };

  const valueStyle = {
    fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
    fontWeight: ds.typography.weights.bold,
    color: ds.colors.primary[600],
    fontFamily: ds.typography.fonts.mono,
    background: ds.colors.primary[50],
    padding: 'clamp(3px, 1vw, 4px) clamp(8px, 2vw, 12px)',
    borderRadius: ds.borderRadius.md,
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  };

  const sliderStyle = {
    width: '100%',
    height: '8px',
    borderRadius: ds.borderRadius.full,
    appearance: 'none' as const,
    background: `linear-gradient(to right, ${ds.colors.primary[500]} 0%, ${ds.colors.primary[500]} var(--value), ${ds.colors.gray[200]} var(--value), ${ds.colors.gray[200]} 100%)`,
    outline: 'none',
    cursor: 'pointer',
    transition: `all ${ds.transitions.base}`,
  };

  return (
    <div style={{ 
      marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
    }}>
      <h3 style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
        fontWeight: ds.typography.weights.semibold,
        color: ds.colors.gray[800],
        marginBottom: ds.spacing.xl,
        display: 'flex',
        alignItems: 'center',
        gap: ds.spacing.sm,
        fontFamily: ds.typography.fonts.heading,
      }}>
        <FaSlidersH style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }} />
        Voice Parameters
      </h3>

      {/* Voice Selection Section - Full Width */}
      <div style={{ marginBottom: ds.spacing.xl }}>
        <VoiceDropdown
          voices={apiVoices}
          selectedVoice={selectedApiVoice}
          onVoiceChange={onApiVoiceChange || (() => {})}
          loading={apiVoicesLoading}
          error={apiVoicesError}
        />
      </div>

      {/* Sliders Section - Responsive Grid Layout */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: useReplicate 
          ? 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' // Voice + Speed in row for Replicate
          : 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', // All 3 controls for custom API
        gap: 'clamp(1rem, 3vw, 1.5rem)',
        width: '100%',
      }}>
        {/* Speed Control */}
        <div style={controlStyle}>
          <label style={labelStyle}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.3rem, 1vw, 0.5rem)' }}>
              <SiSpeedtest style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', flexShrink: 0 }} />
              Speed
            </span>
            <span style={valueStyle}>
              {params.rate.toFixed(1)}x
            </span>
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={params.rate}
            onChange={(e) => onParamsChange({ ...params, rate: parseFloat(e.target.value) })}
            style={{
              ...sliderStyle,
              // @ts-ignore - CSS custom property
              '--value': `${((params.rate - 0.5) / 1.5) * 100}%`,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)', color: ds.colors.gray[500] }}>
            <span>Slow (0.5x)</span>
            <span>Fast (2.0x)</span>
          </div>
        </div>

        {/* Pitch Control - Hidden when using Replicate */}
        {!useReplicate && (
          <div style={{ ...controlStyle, visibility: configLoaded ? 'visible' : 'hidden' }}>
            <label style={labelStyle}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.3rem, 1vw, 0.5rem)' }}>
                <FaMusic style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', flexShrink: 0 }} />
                Pitch
              </span>
              <span style={valueStyle}>
                {params.pitch.toFixed(1)}
              </span>
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={params.pitch}
              onChange={(e) => onParamsChange({ ...params, pitch: parseFloat(e.target.value) })}
              style={{
                ...sliderStyle,
                // @ts-ignore - CSS custom property
                '--value': `${((params.pitch - 0.5) / 1.5) * 100}%`,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)', color: ds.colors.gray[500] }}>
              <span>Lower (0.5)</span>
              <span>Higher (2.0)</span>
            </div>
          </div>
        )}

        {/* Volume Control - Hidden when using Replicate */}
        {!useReplicate && (
          <div style={{ ...controlStyle, visibility: configLoaded ? 'visible' : 'hidden' }}>
            <label style={labelStyle}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.3rem, 1vw, 0.5rem)' }}>
                <FaVolumeUp style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', flexShrink: 0 }} />
                Volume
              </span>
              <span style={valueStyle}>
                {Math.round(params.volume * 100)}%
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={params.volume}
              onChange={(e) => onParamsChange({ ...params, volume: parseFloat(e.target.value) })}
              style={{
                ...sliderStyle,
                // @ts-ignore - CSS custom property
                '--value': `${params.volume * 100}%`,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)', color: ds.colors.gray[500] }}>
              <span>Mute (0%)</span>
              <span>Max (100%)</span>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${ds.colors.primary[500]};
          cursor: pointer;
          box-shadow: ${ds.shadows.md};
          transition: all ${ds.transitions.base};
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: ${ds.shadows.lg};
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${ds.colors.primary[500]};
          cursor: pointer;
          border: none;
          box-shadow: ${ds.shadows.md};
          transition: all ${ds.transitions.base};
        }

        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: ${ds.shadows.lg};
        }
      `}</style>
    </div>
  );
});

export default VoiceControls;
