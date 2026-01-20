import React from 'react';
import type { Metadata } from 'next';
import PostList from '../components/PostList';

export const metadata: Metadata = {
  title: 'Blog | Free AI Voice Generator',
  description: 'Explore articles, tutorials, and updates on text-to-speech technology, AI voice generation, and content creation best practices from our expert team.',
};

// Mock data for blog posts
const mockPosts = Array.from({ length: 12 }, (_, i) => ({
  slug: `post-${i + 1}`,
  title: `The Future of AI Voice: Trends for 202${7 + (i % 3)}`,
  description: 'Discover the latest advancements in text-to-speech technology and how they are shaping the future of content creation, accessibility, and user interaction. This is a longer sentence to test truncation.',
  imageUrl: `https://picsum.photos/seed/${i + 1}/800/450`,
  tag: ['Technology', 'AI', 'Tutorials'][i % 3],
}));

const Blogs = () => (
  <>
    <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
      Our Blog
    </h1>
    <div style={{ fontSize: '1.1rem', lineHeight: '1.7', textAlign: 'center' }}>
      <p style={{ marginBottom: '2rem' }}>
        Welcome to our blog! Here you'll find the latest news, tutorials, and insights into the world of AI voice generation and text-to-speech technology.
      </p>
      
      {/* Placeholder for blog posts list */}
      <div style={{ marginTop: '3rem', borderTop: '1px solid #ffe4e1', paddingTop: '2rem', color: '#555' }}>
        <p>Our latest articles will appear here soon. Stay tuned!</p>
      </div>
    </div>

    <PostList posts={mockPosts} />
  </>
);

export default Blogs;