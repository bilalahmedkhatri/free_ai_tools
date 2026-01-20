import { Metadata } from "next";
import React from 'react'
import BackButton from "../components/BackButton";
import Footer from "../Footer";

export const metadata: Metadata = {
  title: 'Contact Us | Free AI Voice Generator',
  description: 'Get in touch with the AI Voice Generator team. We welcome your questions, feedback, and inquiries. Find our contact details here.',
};


export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ background: 'linear-gradient(135deg, #fef3f2 0%, #ffe4e1 100%)', minHeight: '100vh', color: '#1a1a1a' }}>
            <main style={{ height: '100%', maxWidth: '900px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
                <BackButton />
                <div style={{ background: 'white', padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}
