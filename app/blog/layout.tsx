import React from 'react';
import Footer from '../Footer';
import BackButton from '../components/BackButton';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: 'linear-gradient(135deg, #fef3f2 0%, #ffe4e1 100%)', minHeight: '100vh', color: '#1a1a1a' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
        <header style={{ marginBottom: '2rem' }}>
          <BackButton />
        </header>
        <main>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}