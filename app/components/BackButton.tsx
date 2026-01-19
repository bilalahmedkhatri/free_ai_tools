'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  // State to manage hover effects, since they can't be done with inline styles alone
  const [isHovered, setIsHovered] = useState(false);

  // Base styles for the main link container
  const linkStyle = {
    top: '-0.5rem', // Equivalent to -top-2
    left: '-0.5rem', // Equivalent to -left-2
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    gap: '1rem', // Equivalent to gap-2
    color: isHovered ? '#f43f5e' : '#475569', // Handles hover:text-rose-500
    transition: 'color 0.2s', // Equivalent to transition-colors
    textDecoration: 'none',
    cursor: 'pointer',
    width: 'fit-content',
  };

  // Styles for the icon's circular background
  const iconContainerStyle = {
    display: 'flex',
    height: '2.5rem', // Equivalent to h-10
    width: '2.5rem', // Equivalent to w-10
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px', // Equivalent to rounded-full
    backgroundColor: isHovered ? '#fff1f2' : 'rgba(255, 255, 255, 0.8)', // Handles group-hover:bg-rose-50
    transition: 'background-color 0.2s', // Equivalent to transition-all
  };

  // Styles for the arrow icon
  const iconStyle = {
    height: '1rem', // Equivalent to h-4
    width: '1rem', // Equivalent to w-4
  };

  // Styles for the "Back" text
  const textStyle = {
    fontWeight: '500', // Equivalent to font-medium
    // The 'hidden sm:inline' classes are responsive and cannot be directly
    // replicated with inline styles. This would require media queries.
    // For this example, we will make it always visible.
    display: 'inline',
  };

  return (
    <Link
      href="/"
      style={linkStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Back to home"
    >
      <span style={iconContainerStyle}>
        <FaArrowLeft style={iconStyle} />
      </span>
      {/* 
        NOTE: Responsive styles like `hidden sm:inline` cannot be directly 
        applied via inline styles. For simplicity, this text is always visible. 
        To achieve the responsive effect, you would need to use a CSS-in-JS 
        library or a separate stylesheet with media queries.
      */}
      <span style={textStyle}>BACK</span>
    </Link>
  );
};

export default BackButton;
