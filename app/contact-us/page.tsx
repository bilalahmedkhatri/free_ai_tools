// app/components/legal/ContactUsContent.tsx
import React from 'react';
import Footer from '../Footer';
import BackButton from '../components/BackButton';

const ContactUs = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #fef3f2 0%, #ffe4e1 100%)', minHeight: '100vh', color: '#1a1a1a' }}>
      <main style={{ height: '100vh', maxWidth: '900px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
        <BackButton />
        <div style={{ background: 'white', padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Contact Us</h1>
          <div style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
            <p style={{ marginBottom: '2rem', textAlign: 'center' }}>
              We'd love to hear from you! Whether you have a question about our features, a suggestion for improvement, or a business inquiry, please don't hesitate to reach out.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.5rem', borderBottom: '2px solid #ffe4e1', paddingBottom: '0.5rem' }}>General Inquiries</h2>
              <p>
                For general questions, feedback, or support, please email us at:
                <br />
                <a href="mailto:info@azeemlab.com" style={{ color: '#d9534f', textDecoration: 'none', fontWeight: '500' }}>info@azeemlab.com</a>
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.5rem', borderBottom: '2px solid #ffe4e1', paddingBottom: '0.5rem' }}>Business & Press</h2>
              <p>
                For partnership opportunities or press inquiries, please contact our business team at:
                <br />
                <a href="mailto:info@azeemlab.com" style={{ color: '#d9534f', textDecoration: 'none', fontWeight: '500' }}>info@azeemlab.com</a>
              </p>
            </div>
            
            <p style={{ textAlign: 'center', fontSize: '1rem', color: '#555' }}>
              Before reaching out, you might find a quick answer to your question in our <a href="/faq" style={{ color: '#d9534f', textDecoration: 'underline' }}>FAQ section</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ContactUs;