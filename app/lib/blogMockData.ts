export type BlogTag = 'Technology' | 'AI' | 'Tutorials';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  tag: BlogTag;
  date: string; // ISO or display-ready; backend can standardize later
};

const TAGS: BlogTag[] = ['Technology', 'AI', 'Tutorials'];

function makePost(i: number): BlogPost {
  const n = i + 1;
  const tag = TAGS[i % TAGS.length];

  // Keep this stable + deterministic so UI/tests don’t flake.
  const title = `The Future of AI Voice: Trends for 202${7 + (i % 3)}`;
  const description =
    'Discover the latest advancements in text-to-speech technology and how they are shaping the future of content creation, accessibility, and user interaction.';

  const content =
    `Artificial intelligence is evolving at an unprecedented pace, and AI-powered voice generation is no exception.\n\n` +
    `In this post we look at practical trends, real-world use-cases, and the tooling ecosystem around modern TTS.\n\n` +
    `Post number ${n} focuses on "${tag}" topics and serves as mock content until the backend is connected.`;

  // Keep date stable; “post-1” matches the existing hard-coded date.
  const date = n === 1 ? 'January 20, 2026' : 'January 01, 2026';

  return {
    id: `blog_${n}`,
    slug: `post-${n}`,
    title,
    description,
    content,
    imageUrl: `https://picsum.photos/seed/${n}/800/450`,
    tag,
    date,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  return Array.from({ length: 12 }, (_, i) => makePost(i));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return getAllBlogPosts().find((p) => p.slug === slug) ?? null;
}

