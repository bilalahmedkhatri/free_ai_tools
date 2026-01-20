// app/components/legal/PrivacyPolicyContent.tsx
import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/app/Footer';
import BackButton from '../components/BackButton';



const PrivacyPolicyContent = () => (
  <>
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
  </>
);

export default PrivacyPolicyContent;