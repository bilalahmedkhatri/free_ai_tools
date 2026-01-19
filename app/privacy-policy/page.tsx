// app/components/legal/PrivacyPolicyContent.tsx
import React from 'react';
import Footer from '@/app/Footer';
import BackButton from '../components/BackButton';

const PrivacyPolicyContent = () => (
  <div style={{ background: 'linear-gradient(135deg, #fef3f2 0%, #ffe4e1 100%)', minHeight: '100vh', color: '#1a1a1a' }}>
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
      <BackButton />
      <div style={{ background: 'white', padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Privacy Policy</h1>
        <div style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information when you use our Free AI Voice
            Generator.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>Information We Collect</h2>
          <p>
            We may collect information you provide to us, such as the text you submit
            for voice generation. We do not store your text or the generated audio on
            our servers long-term for the free service. We may also collect anonymous
            usage data to improve our text-to-speech (TTS) service.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>How We Use Your Information</h2>
          <p>
            The primary use of the text you provide is to generate the audio output. We
            may use anonymized data to train and improve our AI voice synthesis models.
            We will never sell your personal data to third parties.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicyContent;