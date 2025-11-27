// Optional: Page-level loading state component
import LoadingSkeleton from './LoadingSkeleton';
import { designSystem as ds } from '../lib/designSystem';

export default function PageLoading() {
  return (
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef3f2 0%, #ffe4e1 30%, #ffd4cc 60%, #ffc5bd 100%)',
      position: 'relative',
    }}>
      {/* Hero Section Skeleton */}
      <section style={{
        background: 'linear-gradient(135deg, #ffc9c1 0%, #ffb4a8 100%)',
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem) clamp(2rem, 4vw, 3rem)',
        textAlign: 'center',
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2rem)',
        }}>
          <div style={{
            height: 'clamp(3rem, 8vw, 5rem)',
            width: '70%',
            maxWidth: '600px',
            margin: '0 auto 1.5rem',
            background: 'rgba(0,0,0,0.08)',
            borderRadius: ds.borderRadius.lg,
          }} />
          <div style={{
            height: '1.5rem',
            width: '90%',
            maxWidth: '700px',
            margin: '0 auto 1rem',
            background: 'rgba(0,0,0,0.08)',
            borderRadius: ds.borderRadius.md,
          }} />
          <div style={{
            height: '1.5rem',
            width: '60%',
            maxWidth: '500px',
            margin: '0 auto 2rem',
            background: 'rgba(0,0,0,0.08)',
            borderRadius: ds.borderRadius.md,
          }} />
          
          {/* Feature Pills Skeleton */}
          <div style={{
            display: 'flex',
            gap: ds.spacing.md,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: ds.spacing.lg,
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  height: '32px',
                  width: '140px',
                  background: 'rgba(0,0,0,0.08)',
                  borderRadius: ds.borderRadius.full,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: 'clamp(1rem, 4vw, 4rem)',
      }}>
        <section style={{
          background: 'white',
          borderRadius: ds.borderRadius.xl,
          padding: 'clamp(1rem, 3vw, 2rem)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{
            height: '32px',
            width: '280px',
            margin: '0 auto 2rem',
            background: ds.colors.gray[200],
            borderRadius: ds.borderRadius.lg,
          }} />
          
          <LoadingSkeleton variant="full" />
        </section>
      </div>
    </main>
  );
}
