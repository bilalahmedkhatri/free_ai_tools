// app/components/legal/FaqContent.tsx
import React from 'react';
import Footer from '../Footer';
import BackButton from '../components/BackButton';

const FaqContent = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #fef3f2 0%, #ffe4e1 100%)', minHeight: '100vh', color: '#1a1a1a' }}>
      <main style={{ height: '100%', maxWidth: '900px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
        <BackButton />
        <div style={{ background: 'white', padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Frequently Asked Questions</h1>
          <div style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
            <h3>What is the Free AI Voice Generator?</h3>
            <p>
              Our Free AI Voice Generator is a cutting-edge text-to-speech (TTS) tool
              that uses artificial intelligence to convert your text into realistic,
              natural-sounding audio. You can use it for a variety of projects, from
              videos and presentations to e-learning materials and personal use.
            </p>

            <h3>Is the voice generator completely free?</h3>
            <p>
              Yes, our basic text-to-speech service is free to use. We offer a selection
              of high-quality AI voices and a generous character limit for your projects.
              For users who need more advanced features, we may offer premium plans.
            </p>

            <h3>Can I use the generated audio for commercial purposes?</h3>
            <p>
              Audio generated with our free plan can typically be used for personal
              projects. For commercial use rights, please refer to our Terms of Service
              or check the details of our premium offerings which grant broader licensing
              options.
            </p>

            <h3>What audio formats can I download?</h3>
            <p>
              You can download the generated audio in MP3 format, which is widely
              compatible with most devices and software. We aim to provide high-quality
              audio output for all your needs.
            </p>

            <h3>How does the AI voice synthesis work?</h3>
            <p>
              Our tool uses advanced deep learning models to analyze the text and generate
              human-like speech. The AI is trained on vast amounts of voice data to
              understand context, intonation, and pronunciation, resulting in a highly
              realistic and natural voiceover.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FaqContent;