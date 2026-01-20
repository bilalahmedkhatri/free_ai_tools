'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  tag: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

const PostCard: React.FC<PostCardProps> = ({ slug, title, description, imageUrl, tag }) => {
  return (
    <Link href={`/blog/${slug}`} passHref className='text' style={{ textDecoration: "none" }} >
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
      }}
      >
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
          <span style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 1,
            background: 'rgba(255, 228, 225, 0.9)',
            color: '#d9534f',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: '500',
            backdropFilter: 'blur(4px)',
          }}>
            {tag}
          </span>
        </div>
        <div style={{ padding: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', textAlign: 'left', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#1a1a1a' }}>{truncateText(title, 100)}</h3>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
