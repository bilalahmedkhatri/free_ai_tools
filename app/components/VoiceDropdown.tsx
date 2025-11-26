import { useState, useRef } from 'react';
import { FaPlay, FaPause, FaMicrophone } from 'react-icons/fa';
import { designSystem as ds } from '../lib/designSystem';
import { VoiceSample } from '../lib/voiceoverApi';

interface VoiceDropdownProps {
  voices: VoiceSample[];
  selectedVoice: string;
  onVoiceChange: (voiceId: string) => void;
  loading?: boolean;
  error?: string | null;
}

export default function VoiceDropdown({
  voices,
  selectedVoice,
  onVoiceChange,
  loading = false,
  error = null,
}: VoiceDropdownProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedVoiceData = voices.find(v => v.voice_id === selectedVoice);

  const handlePlaySample = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedVoiceData?.sample_url) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(selectedVoiceData.sample_url);
    audioRef.current = audio;
    setIsPlaying(true);

    audio.play().catch((err) => {
      console.error('Error playing audio:', err);
      console.error('Original Sample URL:', selectedVoiceData.sample_url);
      setIsPlaying(false);
      alert(`Failed to play audio sample. Error: ${err.message}\n\nOriginal URL: ${selectedVoiceData.sample_url}`);
    });

    audio.onended = () => {
      setIsPlaying(false);
    };

    audio.onerror = (err) => {
      console.error('Audio error event:', err);
      console.error('Original Sample URL:', selectedVoiceData.sample_url);
      setIsPlaying(false);
      alert(`Failed to load audio file. Check console for details.`);
    };
  };

  const handleStopSample = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleChangeVoice = () => {
    setIsDropdownOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: ds.spacing.sm }}>
      <label
        htmlFor="voice-select"
        style={{
          fontSize: ds.typography.sizes.sm,
          fontWeight: ds.typography.weights.semibold,
          color: ds.colors.gray[700],
          fontFamily: ds.typography.fonts.heading,
          display: 'flex',
          alignItems: 'center',
          gap: ds.spacing.xs,
        }}
      >
        <FaMicrophone /> Voice
      </label>

      {!selectedVoice || isDropdownOpen ? (
        // Dropdown mode - show when no selection or user wants to change
        <div style={{ display: 'flex', gap: ds.spacing.sm, alignItems: 'center' }}>
          <select
            id="voice-select"
            value={selectedVoice}
            onChange={(e) => {
              onVoiceChange(e.target.value);
              if (e.target.value) {
                setIsDropdownOpen(false);
              }
            }}
            disabled={loading || !!error}
            autoFocus={isDropdownOpen}
            style={{
              flex: 1,
              padding: `${ds.spacing.sm} ${ds.spacing.md}`,
              border: `1px solid ${ds.colors.gray[300]}`,
              borderRadius: ds.borderRadius.lg,
              fontSize: ds.typography.sizes.base,
              fontFamily: ds.typography.fonts.body,
              backgroundColor: 'white',
              cursor: loading || error ? 'not-allowed' : 'pointer',
              outline: 'none',
              transition: `all ${ds.transitions.base}`,
              color: ds.colors.gray[800],
            }}
            onFocus={(e) => {
              if (!loading && !error) {
                e.currentTarget.style.borderColor = '#ff9b8f';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 155, 143, 0.1)';
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = ds.colors.gray[300];
              e.currentTarget.style.boxShadow = 'none';
              if (selectedVoice) {
                setIsDropdownOpen(false);
              }
            }}
          >
            {loading && <option value="">Loading voices...</option>}
            {error && <option value="">Error loading voices</option>}
            {!loading && !error && voices.length === 0 && <option value="">No voices available</option>}
            {!loading && !error && voices.length > 0 && (
              <>
                <option value="">Select a voice</option>
                {voices.map((voice) => (
                  <option key={voice.voice_id} value={voice.voice_id}>
                    {voice.voice_name}
                    {voice.accent && ` - ${voice.accent}`}
                    {voice.language && ` (${voice.language})`}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      ) : (
        // Button mode - show when voice is selected
        <div style={{ display: 'flex', gap: ds.spacing.md, alignItems: 'center' }}>
          {/* Circular Play/Pause Button */}
          <button
            onClick={isPlaying ? handleStopSample : handlePlaySample}
            style={{
              width: 'clamp(64px, 15vw, 96px)',
              height: 'clamp(64px, 15vw, 96px)',
              background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: `all ${ds.transitions.base}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(139, 92, 246, 0.4)';
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <FaPause size={32} color="white" />
            ) : (
              <FaPlay size={32} color="white" style={{ marginLeft: '6px' }} />
            )}
          </button>

          {/* Voice Info and Change Link */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              gap: ds.spacing.sm,
              marginBottom: ds.spacing.xs,
            }}>
              <h4 style={{
                fontSize: ds.typography.sizes.base,
                fontWeight: ds.typography.weights.semibold,
                color: ds.colors.gray[900],
                fontFamily: ds.typography.fonts.heading,
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {selectedVoiceData?.voice_name}
              </h4>
              <button
                onClick={handleChangeVoice}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9333ea',
                  fontSize: ds.typography.sizes.sm,
                  fontWeight: ds.typography.weights.medium,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                  flexShrink: 0,
                  fontFamily: ds.typography.fonts.heading,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#7c3aed';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9333ea';
                }}
              >
                Change
              </button>
            </div>
            
            {selectedVoiceData?.description && (
              <p style={{
                fontSize: ds.typography.sizes.xs,
                color: ds.colors.gray[600],
                fontFamily: ds.typography.fonts.body,
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.4',
              }}>
                {selectedVoiceData.description}
              </p>
            )}

            {/* Voice Tags */}
            <div style={{ 
              display: 'flex', 
              gap: ds.spacing.xs, 
              marginTop: ds.spacing.xs,
              flexWrap: 'wrap',
            }}>
              {selectedVoiceData?.gender && (
                <span style={{
                  fontSize: ds.typography.sizes.xs,
                  padding: `2px ${ds.spacing.xs}`,
                  background: ds.colors.gray[100],
                  borderRadius: ds.borderRadius.full,
                  color: ds.colors.gray[600],
                  fontFamily: ds.typography.fonts.body,
                }}>
                  {selectedVoiceData.gender}
                </span>
              )}
              {selectedVoiceData?.accent && (
                <span style={{
                  fontSize: ds.typography.sizes.xs,
                  padding: `2px ${ds.spacing.xs}`,
                  background: ds.colors.gray[100],
                  borderRadius: ds.borderRadius.full,
                  color: ds.colors.gray[600],
                  fontFamily: ds.typography.fonts.body,
                }}>
                  {selectedVoiceData.accent}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <span
          style={{
            fontSize: ds.typography.sizes.xs,
            color: ds.colors.error,
            fontFamily: ds.typography.fonts.body,
          }}
        >
          ⚠️ {error}
        </span>
      )}
    </div>
  );
}
