import React from 'react';
import type { Metadata } from 'next';
import PostList from '../components/PostList';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Blog | Free AI Voice Generator',
  description: 'Explore articles, tutorials, and updates on text-to-speech technology, AI voice generation, and content creation best practices from our expert team.',
};

async function fetchPosts(h: Headers) {
  // Server-side fetch to our internal API route.
  // const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  // const proto = h.get('x-forwarded-proto') ?? 'http';
  // const baseUrl = `${proto}://${host}`;

  const res = await fetch(`http://localhost:3000/api/blog?limit=12`, {
  // const res = await fetch(`${baseUrl}/api/blog?limit=12`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return { items: [] as any[] };
  }

  return (await res.json()) as { items: any[] };
}

const Blogs = async () => {
  const data = await fetchPosts(headers());

  return (
    <>
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
        Our Blog
      </h1>
      <div style={{ fontSize: '1.1rem', lineHeight: '1.7', textAlign: 'center' }}>
        <p style={{ marginBottom: '2rem' }}>
          Welcome to our blog! Here you'll find the latest news, tutorials, and insights into the world of AI voice generation and text-to-speech technology.
        </p>

        <PostList posts={data.items} />
      </div>

    </>
  );
};

export default Blogs;