// app/components/Footer.tsx
'use client';

import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { designSystem as ds } from './lib/designSystem';

const footerLinks = [
  { href: '/about-us', text: 'About Us' },
  { href: '/contact-us', text: 'Contact Us' },
  { href: '/faq', text: 'FAQ' },
  { href: '/terms-of-service', text: 'Terms of Service' },
  { href: '/privacy-policy', text: 'Privacy Policy' },
  { href: '/blog', text: 'Blog' },
];

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: `${ds.spacing['2xl']} ${ds.spacing.xl}`,
      color: ds.colors.gray[600],
      fontSize: ds.typography.sizes.sm,
      fontFamily: ds.typography.fonts.body,
      background: 'rgba(255, 255, 255, 0.5)',
      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: ds.spacing.lg,
        flexWrap: 'wrap',
        marginBottom: ds.spacing.lg,
      }}>
        {footerLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: ds.colors.gray[700],
              textDecoration: 'none',
              fontWeight: ds.typography.weights.medium,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as any).style.color = ds.colors.primary[600]; }}
            onMouseLeave={(e) => { (e.currentTarget as any).style.color = ds.colors.gray[700]; }}
          >
            {link.text}
          </a>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: ds.spacing.md }}>
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
        <p>&copy; {new Date().getFullYear()} AI Voiceover Generator. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;