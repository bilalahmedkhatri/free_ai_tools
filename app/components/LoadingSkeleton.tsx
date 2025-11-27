import { designSystem as ds } from '../lib/designSystem';

interface LoadingSkeletonProps {
  variant?: 'textInput' | 'voiceControls' | 'audioPlayer' | 'savedPrompts' | 'voiceDropdown' | 'full';
}

export default function LoadingSkeleton({ variant = 'full' }: LoadingSkeletonProps) {
  const shimmerStyle = {
    position: 'relative' as const,
    overflow: 'hidden',
    backgroundColor: ds.colors.gray[200],
  };

  const shimmerAnimation = `
    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `;

  const ShimmerBox = ({ width, height, borderRadius = ds.borderRadius.lg, marginBottom = '0' }: { width: string; height: string; borderRadius?: string; marginBottom?: string }) => (
    <div style={{
      ...shimmerStyle,
      width,
      height,
      borderRadius,
      marginBottom,
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
        animation: 'shimmer 1.5s infinite',
      }} />
    </div>
  );

  // Text Input Skeleton
  const TextInputSkeleton = () => (
    <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: ds.spacing.md }}>
        <ShimmerBox width="150px" height="24px" />
        <ShimmerBox width="120px" height="24px" />
      </div>
      <ShimmerBox width="100%" height="180px" marginBottom={ds.spacing.lg} />
      <div style={{ display: 'flex', gap: ds.spacing.md }}>
        <ShimmerBox width="140px" height="44px" />
        <ShimmerBox width="100px" height="44px" />
      </div>
    </div>
  );

  // Voice Dropdown Skeleton
  const VoiceDropdownSkeleton = () => (
    <div style={{ marginBottom: ds.spacing.xl }}>
      <ShimmerBox width="120px" height="20px" marginBottom={ds.spacing.md} />
      <ShimmerBox width="100%" height="52px" borderRadius={ds.borderRadius.xl} />
    </div>
  );

  // Voice Controls Skeleton
  const VoiceControlsSkeleton = () => (
    <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: ds.spacing.sm, marginBottom: ds.spacing.xl }}>
        <ShimmerBox width="24px" height="24px" borderRadius={ds.borderRadius.md} />
        <ShimmerBox width="180px" height="28px" />
      </div>
      
      <VoiceDropdownSkeleton />
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: ds.spacing.xl,
      }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: ds.spacing.md }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ShimmerBox width="100px" height="20px" />
              <ShimmerBox width="60px" height="32px" borderRadius={ds.borderRadius.md} />
            </div>
            <ShimmerBox width="100%" height="8px" borderRadius={ds.borderRadius.full} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <ShimmerBox width="80px" height="14px" />
              <ShimmerBox width="80px" height="14px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Audio Player Skeleton
  const AudioPlayerSkeleton = () => (
    <div style={{
      padding: ds.spacing.xl,
      background: 'white',
      border: `2px dashed ${ds.colors.gray[200]}`,
      borderRadius: ds.borderRadius.xl,
    }}>
      <ShimmerBox width="100%" height="120px" marginBottom={ds.spacing.lg} borderRadius={ds.borderRadius.lg} />
      <div style={{ display: 'flex', gap: ds.spacing.md, marginBottom: ds.spacing.lg }}>
        <ShimmerBox width="60px" height="60px" borderRadius={ds.borderRadius.full} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: ds.spacing.sm }}>
          <ShimmerBox width="100%" height="8px" borderRadius={ds.borderRadius.full} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ShimmerBox width="60px" height="14px" />
            <ShimmerBox width="60px" height="14px" />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: ds.spacing.md, justifyContent: 'center' }}>
        <ShimmerBox width="120px" height="44px" />
        <ShimmerBox width="120px" height="44px" />
      </div>
    </div>
  );

  // Saved Prompts Skeleton
  const SavedPromptsSkeleton = () => (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: ds.spacing.lg,
      }}>
        <ShimmerBox width="180px" height="32px" />
        <ShimmerBox width="100px" height="32px" borderRadius={ds.borderRadius.full} />
      </div>
      <ShimmerBox width="100%" height="52px" marginBottom={ds.spacing.xl} borderRadius={ds.borderRadius.xl} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'clamp(1rem, 2vw, 1.5rem)',
      }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{
            background: 'white',
            border: `2px solid ${ds.colors.gray[200]}`,
            borderRadius: ds.borderRadius.xl,
            padding: ds.spacing.lg,
          }}>
            <ShimmerBox width="100%" height="120px" marginBottom={ds.spacing.md} borderRadius={ds.borderRadius.lg} />
            <ShimmerBox width="120px" height="16px" marginBottom={ds.spacing.md} />
            <div style={{ display: 'flex', gap: ds.spacing.sm }}>
              <ShimmerBox width="100%" height="40px" />
              <ShimmerBox width="60px" height="40px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Full Page Skeleton
  const FullPageSkeleton = () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: ds.spacing['2xl'],
    }}>
      <TextInputSkeleton />
      <VoiceControlsSkeleton />
      <div style={{ textAlign: 'center', marginBottom: ds.spacing.lg }}>
        <ShimmerBox width="220px" height="54px" marginBottom="0" />
        <div style={{ margin: '0 auto', display: 'inline-block' }} />
      </div>
      <AudioPlayerSkeleton />
    </div>
  );

  // Render based on variant
  const renderSkeleton = () => {
    switch (variant) {
      case 'textInput':
        return <TextInputSkeleton />;
      case 'voiceControls':
        return <VoiceControlsSkeleton />;
      case 'audioPlayer':
        return <AudioPlayerSkeleton />;
      case 'savedPrompts':
        return <SavedPromptsSkeleton />;
      case 'voiceDropdown':
        return <VoiceDropdownSkeleton />;
      case 'full':
      default:
        return <FullPageSkeleton />;
    }
  };

  return (
    <>
      {renderSkeleton()}
      <style jsx>{shimmerAnimation}</style>
    </>
  );
}
