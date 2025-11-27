'use client';

import { FaMicrophone, FaSync, FaHeart } from 'react-icons/fa';
import { useVoiceGenerator } from './hooks/useVoiceGenerator';
import { useVoiceSamples } from './hooks/useVoiceSamples';
import TextInput from './components/TextInput';
import VoiceControls from './components/VoiceControls';
import AudioPlayer from './components/AudioPlayer';
import GenerationStatus from './components/GenerationStatus';
import ApiToggle from './components/ApiToggle';
import { designSystem as ds } from './lib/designSystem';
import { useState, useMemo, lazy, Suspense } from 'react';
import LoadingSkeleton from './components/LoadingSkeleton';

const SavedPrompts = lazy(() => import('./components/SavedPrompts'));

export default function Home() {
  const {
    params,
    setParams,
    savedPrompts,
    audioBlob,
    handleGenerate,
    handleSavePrompt,
    loadPrompt,
    deletePrompt,
    isGenerating,
    statusMessage,
    errorMessage,
    dismissError,
  } = useVoiceGenerator();

  const { voices: apiVoices, loading: apiVoicesLoading, error: apiVoicesError, refetch: refetchVoices } = useVoiceSamples();
  const [selectedApiVoice, setSelectedApiVoice] = useState('');
  const [apiModeKey, setApiModeKey] = useState(0);

  const handleApiToggle = (useReplicate: boolean) => {
    // Force re-render of VoiceControls and refetch voices
    setApiModeKey(prev => prev + 1);
    refetchVoices();
    setSelectedApiVoice(''); // Reset selected voice
  };

  const features = useMemo(() => [
    { text: 'Instant Generation' },
    { text: 'Voice Customization' },
    { text: 'Save Prompts' },
    { text: 'Free & Browser-based' },
  ], []);

  const handleGenerateClick = async () => {
    await handleGenerate(selectedApiVoice || undefined);
  };

  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AI Voiceover Generator',
    description: 'Free online text-to-speech voiceover generator with customizable voice parameters',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Text to speech conversion',
      'Multiple voice options',
      'Adjustable speech rate',
      'Customizable pitch',
      'Volume control',
      'Save and manage prompts',
    ],
  }), []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef3f2 0%, #ffe4e1 30%, #ffd4cc 60%, #ffc5bd 100%)',
        position: 'relative',
      }}>
        {/* API Toggle - Fixed Top Right (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{
            position: 'fixed',
            top: 'clamp(1rem, 3vw, 1.5rem)',
            right: 'clamp(1rem, 3vw, 2rem)',
            zIndex: 1000,
          }}>
            <ApiToggle onToggle={handleApiToggle} />
          </div>
        )}

        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #ffc9c1 0%, #ffb4a8 100%)',
          color: '#1a1a1a',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem) clamp(2rem, 4vw, 3rem)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'transparent',
          }} />
          
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
            padding: '0 clamp(1rem, 3vw, 2rem)',
          }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: ds.typography.weights.extrabold,
              fontFamily: ds.typography.fonts.heading,
              marginBottom: ds.spacing.md,
              color: '#1a1a1a',
              letterSpacing: '-0.02em',
            }}>
              AI Voiceover Generator
            </h1>
            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
              fontFamily: ds.typography.fonts.body,
              maxWidth: '700px',
              margin: `0 auto ${ds.spacing.lg}`,
              color: '#2d2d2d',
              lineHeight: '1.6',
              fontWeight: ds.typography.weights.normal,
              padding: '0 1rem',
            }}>
              Transform your text into natural-sounding speech with advanced voice controls. 
              Perfect for content creators, educators, and accessibility.
            </p>

            {/* Feature Pills */}
            <div style={{
              display: 'flex',
              gap: ds.spacing.md,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: ds.spacing.lg,
            }}>
              {features.map((feature, i) => (
                <div
                  key={feature.text}
                  style={{
                    padding: `${ds.spacing.xs} ${ds.spacing.lg}`,
                    background: 'rgba(0,0,0,0.05)',
                    borderRadius: ds.borderRadius.full,
                    fontSize: ds.typography.sizes.sm,
                    fontWeight: ds.typography.weights.medium,
                    border: '1px solid rgba(0,0,0,0.08)',
                    color: '#1a1a1a',
                    fontFamily: ds.typography.fonts.body,
                  }}
                >
                  {feature.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: 'clamp(1rem, 4vw, 4rem)',
        }}>
          {/* Generator Section */}
          <section 
            aria-label="Voiceover generation controls"
            style={{
              background: 'white',
              borderRadius: ds.borderRadius.xl,
              padding: 'clamp(1rem, 3vw, 2rem)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
            }}
          >
            <h2 style={{
              fontSize: ds.typography.sizes['2xl'],
              fontWeight: ds.typography.weights.bold,
              fontFamily: ds.typography.fonts.heading,
              color: ds.colors.gray[800],
              marginBottom: ds.spacing.xl,
              textAlign: 'center',
            }}>
              Create Your Voiceover
            </h2>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: ds.spacing['2xl'],
            }}>
              <TextInput
                text={params.text}
                onTextChange={(text) => setParams({ ...params, text })}
                onSave={handleSavePrompt}
              />
              
              <section aria-label="Voice parameters">
                <h3 className="sr-only">Adjust Voice Parameters</h3>
                <VoiceControls
                  key={apiModeKey}
                  params={params}
                  onParamsChange={setParams}
                  apiVoices={apiVoices}
                  apiVoicesLoading={apiVoicesLoading}
                  apiVoicesError={apiVoicesError}
                  onApiVoiceChange={setSelectedApiVoice}
                  selectedApiVoice={selectedApiVoice}
                />
              </section>
              
              {/* Generate Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleGenerateClick}
                  disabled={!params.text.trim() || isGenerating}
                  style={{
                    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 3rem)',
                    background: isGenerating 
                      ? ds.colors.gray[400]
                      : 'linear-gradient(135deg, #ff9b8f 0%, #ffb4a8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: ds.borderRadius.lg,
                    fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                    fontWeight: ds.typography.weights.bold,
                    cursor: isGenerating || !params.text.trim() ? 'not-allowed' : 'pointer',
                    transition: `all ${ds.transitions.base}`,
                    fontFamily: ds.typography.fonts.heading,
                    boxShadow: ds.shadows.lg,
                    minWidth: 'clamp(180px, 40vw, 220px)',
                    minHeight: '44px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: ds.spacing.xs,
                  }}
                  onMouseEnter={(e) => {
                    if (!isGenerating && params.text.trim()) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = ds.shadows.xl;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = ds.shadows.lg;
                  }}
                >
                  {isGenerating ? (
                    <>
                      <FaSync className="animate-spin" style={{ marginRight: ds.spacing.xs }} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FaMicrophone style={{ marginRight: ds.spacing.xs }} />
                      Generate Voiceover
                    </>
                  )}
                </button>
              </div>

              <GenerationStatus
                statusMessage={statusMessage}
                errorMessage={errorMessage}
                onDismissError={dismissError}
              />

              {/* Audio Player */}
              <AudioPlayer
                audioUrl={null}
                audioBlob={audioBlob}
                isGenerating={isGenerating}
              />
            </div>
          </section>

          {/* Saved Prompts Section */}
          {savedPrompts.length > 0 && (
            <Suspense fallback={
              <section style={{
                background: 'white',
                borderRadius: ds.borderRadius['2xl'],
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                boxShadow: ds.shadows.md,
              }}>
                <LoadingSkeleton variant="savedPrompts" />
              </section>
            }>
              <section style={{
                background: 'white',
                borderRadius: ds.borderRadius['2xl'],
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                boxShadow: ds.shadows.md,
              }}>
                <SavedPrompts
                  prompts={savedPrompts}
                  onLoad={loadPrompt}
                  onDelete={deletePrompt}
                />
              </section>
            </Suspense>
          )}
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: `${ds.spacing['2xl']} ${ds.spacing.xl}`,
          color: ds.colors.gray[600],
          fontSize: ds.typography.sizes.sm,
          fontFamily: ds.typography.fonts.body,
        }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            Made with <FaHeart style={{ color: '#ef4444' }} /> using <b>
              <a
                href="https://www.azeemlab.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: ds.colors.primary[600],
                  textDecoration: 'none',
                  fontWeight: ds.typography.weights.bold,
                }}
                onMouseEnter={(e) => { (e.currentTarget as any).style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { (e.currentTarget as any).style.textDecoration = 'none'; }}
              >
                AzeemLAB API
              </a>
            </b>
          </p>
        </footer>
      </main>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        html {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        /* Ensure buttons have proper touch targets on mobile */
        button {
          min-height: 44px;
          min-width: 44px;
        }
      `}</style>
    </>
  );
}
