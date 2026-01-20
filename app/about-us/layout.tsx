import { Metadata } from "next";
import React from 'react'
import BackButton from "../components/BackButton";
import Footer from "../Footer";

export const metadata: Metadata = {
    title: 'About Us | Free AI Voice Generator',
    description: 'Learn about the mission and technology behind our free AI voice generator. We are dedicated to making high-quality, natural-sounding text-to-speech accessible for everyone.',
};


export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gradient-to-br from-red-50 to-red-100 min-h-screen text-gray-900">
            <main className="h-screen max-w-4xl mx-auto p-8 sm:p-12 md:p-16">
                <BackButton />
                <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-lg">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}
