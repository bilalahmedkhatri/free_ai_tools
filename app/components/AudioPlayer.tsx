import { useState, useRef, useEffect, memo } from 'react';
import { FaPlay, FaPause, FaDownload } from 'react-icons/fa';
import { designSystem as ds } from '../lib/designSystem';

interface AudioPlayerProps {
  audioUrl: string | null;
  audioBlob?: Blob | null;
  isGenerating?: boolean;
  onEnded?: () => void;
  fileName?: string;
}

const AudioPlayer = memo(function AudioPlayer({ 
  audioUrl, 
  audioBlob,
  isGenerating = false,
  onEnded,
  fileName = 'voiceover.mp3',
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize audio context and analyser
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    audioContextRef.current = new AudioContextClass();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;
    analyserRef.current.smoothingTimeConstant = 0.8;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, []);

  // Setup audio element
  useEffect(() => {
    if (!audioUrl && !audioBlob) return;

    setIsLoading(true);
    
    const audio = new Audio();
    
    if (audioBlob) {
      audio.src = URL.createObjectURL(audioBlob);
    } else if (audioUrl) {
      audio.src = audioUrl;
    }

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onEnded?.();
    };

    audio.onerror = () => {
      setIsLoading(false);
      console.error('Error loading audio');
    };

    audioRef.current = audio;

    // Connect audio to analyser
    if (audioContextRef.current && analyserRef.current && !sourceRef.current) {
      try {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audio);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      } catch (err) {
        console.error('Error connecting audio context:', err);
      }
    }

    return () => {
      audio.pause();
      if (audioBlob) {
        URL.revokeObjectURL(audio.src);
      }
    };
  }, [audioUrl, audioBlob, onEnded]);

  // Visualize audio
  const visualize = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);

      analyserRef.current!.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(249, 250, 251)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = isPlaying ? '#9333ea' : '#d1d5db';

      canvasCtx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  // Handle play/pause
  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        setIsPlaying(false);
      } else {
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        await audioRef.current.play();
        setIsPlaying(true);
        visualize();
      }
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Format time
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    if (!audioBlob && !audioUrl) return;

    const url = audioBlob ? URL.createObjectURL(audioBlob) : audioUrl!;
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    if (audioBlob) {
      URL.revokeObjectURL(url);
    }
  };

  if (isGenerating) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
        borderRadius: ds.borderRadius.xl,
        padding: ds.spacing['2xl'],
        textAlign: 'center',
      }}>
        <div style={{ 
          fontSize: '3rem', 
          marginBottom: ds.spacing.md,
          animation: 'pulse 1.5s ease-in-out infinite',
        }}>
          🎵
        </div>
        <p style={{ 
          color: ds.colors.gray[600], 
          fontSize: ds.typography.sizes.base,
          fontFamily: ds.typography.fonts.body,
        }}>
          Generating voiceover...
        </p>
      </div>
    );
  }

  if (!audioUrl && !audioBlob) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
        borderRadius: ds.borderRadius.xl,
        padding: ds.spacing['2xl'],
        textAlign: 'center',
        border: `2px dashed ${ds.colors.gray[300]}`,
      }}>
        <div style={{ fontSize: '3rem', marginBottom: ds.spacing.md }}>🎧</div>
        <p style={{ 
          color: ds.colors.gray[600], 
          fontSize: ds.typography.sizes.base,
          fontFamily: ds.typography.fonts.body,
        }}>
          No audio to play. Generate a voiceover to get started!
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
      borderRadius: ds.borderRadius.xl,
      padding: ds.spacing.xl,
      boxShadow: ds.shadows.lg,
      border: `1px solid ${ds.colors.gray[200]}`,
    }}>
      {/* Waveform Visualization */}
      <canvas
        ref={canvasRef}
        width={800}
        height={150}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: ds.borderRadius.lg,
          marginBottom: ds.spacing.lg,
          background: '#f9fafb',
        }}
      />

      {/* Progress Bar */}
      <div style={{ marginBottom: ds.spacing.lg }}>
        <div 
          onClick={(e) => {
            if (!audioRef.current || isLoading) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newTime = percentage * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
          }}
          style={{
            width: '100%',
            height: '8px',
            background: ds.colors.gray[200],
            borderRadius: ds.borderRadius.full,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${(currentTime / duration) * 100}%`,
            background: 'linear-gradient(90deg, #ff9b8f 0%, #ffb4a8 100%)',
            borderRadius: ds.borderRadius.full,
            transition: isPlaying ? 'none' : 'width 0.1s ease',
          }} />
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginTop: ds.spacing.sm,
          fontSize: ds.typography.sizes.sm,
          color: ds.colors.gray[600],
          fontFamily: ds.typography.fonts.mono,
          fontWeight: ds.typography.weights.medium,
        }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: ds.spacing.lg,
      }}>
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          disabled={isLoading || (!audioUrl && !audioBlob)}
          style={{
            width: '64px',
            height: '64px',
            background: isPlaying 
              ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
              : 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: `all ${ds.transitions.base}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isPlaying 
              ? '0 8px 20px rgba(236, 72, 153, 0.4)'
              : '0 4px 14px rgba(249, 168, 212, 0.3)',
            opacity: isLoading ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isPlaying ? (
            <FaPause size={24} color="white" />
          ) : (
            <FaPlay size={24} color="white" style={{ marginLeft: '4px' }} />
          )}
        </button>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={isLoading || (!audioUrl && !audioBlob)}
          style={{
            padding: `${ds.spacing.sm} ${ds.spacing.lg}`,
            background: isLoading || (!audioUrl && !audioBlob)
              ? ds.colors.gray[300]
              : 'linear-gradient(135deg, #ff9b8f 0%, #ffb4a8 100%)',
            color: 'white',
            border: 'none',
            borderRadius: ds.borderRadius.lg,
            cursor: isLoading || (!audioUrl && !audioBlob) ? 'not-allowed' : 'pointer',
            transition: `all ${ds.transitions.base}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: ds.spacing.xs,
            boxShadow: ds.shadows.md,
            opacity: isLoading || (!audioUrl && !audioBlob) ? 0.5 : 1,
            fontSize: ds.typography.sizes.sm,
            fontWeight: ds.typography.weights.semibold,
            fontFamily: ds.typography.fonts.heading,
          }}
          onMouseEnter={(e) => {
            if (!isLoading && (audioUrl || audioBlob)) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = ds.shadows.lg;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = ds.shadows.md;
          }}
          title="Download audio"
        >
          <FaDownload size={20} />
          <span>Download</span>
        </button>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
});

export default AudioPlayer;
