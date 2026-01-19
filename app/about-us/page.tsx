"use client";
import React from 'react';
import Footer from '../Footer';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import BackButton from '../components/BackButton';


const AboutUsContent = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #fef3f2 0%, #ffe4e1 100%)', minHeight: '100vh', color: '#1a1a1a' }}>
      <main style={{ height: '100vh', maxWidth: '900px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
        <BackButton />
        <div style={{ background: 'white', padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>About Us</h1>
          <div style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
            <p>
              Welcome to the home of the most advanced Free AI Voice Generator. Our
              mission is to make high-quality voice synthesis accessible to everyone.
              Whether you're a content creator, a student, a developer, or just someone
              looking to bring text to life, our tool is designed for you.
            </p>
            <p>
              We believe in the power of voice. That's why we've invested in
              state-of-the-art artificial intelligence to create a text-to-speech (TTS)
              engine that produces incredibly realistic and natural-sounding voices. Our
              platform is intuitive, easy to use, and, best of all, free for your basic
              needs.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default AboutUsContent;