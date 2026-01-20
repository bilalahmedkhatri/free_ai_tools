'use client';
import React from 'react';
import PostCard from './PostCard';

interface Post {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  tag: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '2rem',
    }}>
      {posts.map((post) => <PostCard key={post.slug} {...post} />)}
    </div>
  );
};

export default PostList;
