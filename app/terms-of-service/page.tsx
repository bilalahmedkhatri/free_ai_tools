// app/components/legal/TermsOfServiceContent.tsx
import React from 'react';
import Footer from '../Footer';
import BackButton from '../components/BackButton';


const TermsOfServiceContent = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #fef3f2 0%, #ffe4e1 100%)', minHeight: '100vh', color: '#1a1a1a' }}>
      <main style={{ height: '100%', maxWidth: '900px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
        <BackButton />
        <div style={{ background: 'white', padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Terms of Service</h1>
          <div style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
            <p>
              Welcome to our Free AI Voice Generator. By using our services, you agree
              to these terms. Please read them carefully.
            </p>

            <h3>1. Use of Service</h3>
            <p>
              Our text-to-speech (TTS) service is provided for both personal and, in some
              cases, commercial use. The free tier of our service is intended for
              non-commercial projects or evaluation. For commercial usage rights, you may
              need to upgrade to a premium plan.
            </p>

            <h3>2. Generated Content</h3>
            <p>
              You are responsible for the text you convert into audio. You may not
              generate content that is unlawful, offensive, or infringes on the rights
              of others. We reserve the right to terminate access for users who violate
              these terms.
            </p>

            <h3>3. Intellectual Property</h3>
            <p>
              While you own the text you provide, the synthesized audio voices are the
              property of our service and its licensors. Your license to use the
              generated audio is determined by your plan.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default TermsOfServiceContent;