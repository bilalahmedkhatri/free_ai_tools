import React from 'react';

const TermsOfServiceContent = () => {
  return (
    <>
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
    </>
  );
}
export default TermsOfServiceContent;