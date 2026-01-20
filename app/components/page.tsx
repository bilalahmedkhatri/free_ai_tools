import React from 'react';
import type { Metadata } from 'next';
import PostHeader from '../../components/PostHeader';
import PostBody from '../../components/PostBody';

// Mock data - in a real app, this would come from a database or CMS
const mockPosts: { [key: string]: any } = {
  'post-1': {
    title: 'The Future of AI Voice: Trends for 2027',
    tag: 'Technology',
    date: 'January 20, 2026',
    content: `Artificial intelligence is evolving at an unprecedented pace, and AI-powered voice generation is no exception. As we look toward 2027, several key trends are set to redefine how we interact with digital content. From hyper-realistic voice cloning to emotionally-aware digital assistants, the line between human and synthetic speech is becoming increasingly blurred.

One of the most exciting developments is the rise of real-time voice conversion. Imagine speaking into a microphone and having your words instantly translated and spoken in another language, all while retaining the unique characteristics of your own voice. This technology holds immense potential for global communication, breaking down language barriers in everything from international business meetings to personal conversations. We are committed to exploring these frontiers to bring you the most advanced and accessible voice tools on the market.`
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = mockPosts[params.slug] || { title: 'Blog Post', description: 'Read this exciting blog post.' };
  return {
    title: `${post.title} | Free AI Voice Generator`,
    description: post.content.substring(0, 160),
  };
}

const PostPage = ({ params }: { params: { slug: string } }) => {
  const post = mockPosts[params.slug];

  if (!post) {
    // In a real app, you'd render a 404 page here.
    return <div>Post not found.</div>;
  }

  return (
    <main>
      <PostHeader title={post.title} tag={post.tag} date={post.date} />
      <PostBody content={post.content} />
    </main>
  );
};

export default PostPage;