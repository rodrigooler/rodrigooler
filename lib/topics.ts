import { slugifyTag, type BlogPostMeta } from '@/lib/blog';

export type TopicDefinition = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  searchIntent: string;
  tags: string[];
  posts?: string[];
};

export const topics: TopicDefinition[] = [
  {
    slug: 'frontend-systems',
    title: 'Frontend Systems',
    eyebrow: 'React, Angular, and UI delivery',
    summary: 'Architecture notes for building and debugging modern frontends with TypeScript, React, Angular, SCSS, and Next.js.',
    description:
      'A focused hub for frontend engineering topics: state, rendering, metadata, styling, and the practical trade-offs that make a user interface stable in production.',
    searchIntent: 'Frontend architecture, React patterns, Angular notes, SCSS tooling, and Next.js implementation details.',
    tags: ['nextjs', 'react', 'typescript', 'angular', 'angular18', 'frontend', 'front', 'css', 'scss', 'mixins', 'responsivedesign'],
  },
  {
    slug: 'devtools-macos',
    title: 'macOS & DevTools',
    eyebrow: 'Terminal workflows and system hygiene',
    summary: 'Practical guides for macOS maintenance, CLI workflows, Docker issues, Xcode cleanup, and storage recovery.',
    description:
      'This hub collects the operational posts that help engineers keep a Mac environment clean, predictable, and ready for development.',
    searchIntent: 'macOS troubleshooting, Docker warnings, Xcode removal, disk cleanup, and terminal-based maintenance workflows.',
    tags: ['macos', 'xcode', 'terminal', 'developertools', 'docker', 'malware', 'cleanup', 'ssd', 'storage', 'mac'],
  },
  {
    slug: 'automation-agents',
    title: 'Automation & Agents',
    eyebrow: 'CLI-first execution and orchestration',
    summary: 'Content about agent-driven workflows, automation defaults, and the operational shift away from manual command-line interaction.',
    description:
      'A practical collection of posts about automation, agents, and CLI ergonomics for teams building tools that need to work in CI, scripts, and orchestration layers.',
    searchIntent: 'Agent-first CLI design, automation workflows, AI-assisted command execution, and developer tooling that is safe to run non-interactively.',
    tags: ['cli', 'automation', 'ai', 'agents', 'developer-tools'],
  },
  {
    slug: 'web3-trading',
    title: 'Web3 & Trading',
    eyebrow: 'Execution systems and market plumbing',
    summary: 'Articles about exchange APIs, trading workflows, settlement systems, and blockchain-adjacent infrastructure.',
    description:
      'A hub for posts that explore execution quality, market data, and the infrastructure decisions behind high-volume trading systems.',
    searchIntent: 'Binance API usage, execution price calculations, market order analysis, trading systems, and Web3 infrastructure.',
    tags: ['binance', 'api', 'crypto', 'trading', 'web3', 'ccxt', 'solana', 'solidity'],
  },
];

export function getTopicBySlug(slug: string) {
  return topics.find((topic) => topic.slug === slug) ?? null;
}

function matchesTopic(topic: TopicDefinition, post: BlogPostMeta) {
  const topicTags = new Set(topic.tags.map((tag) => slugifyTag(tag)));
  const postTags = post.tags.map((tag) => slugifyTag(tag));

  if (topic.posts?.includes(post.slug)) {
    return true;
  }

  return postTags.some((tag) => topicTags.has(tag));
}

export function getTopicPosts(topic: TopicDefinition, posts: BlogPostMeta[]) {
  return posts.filter((post) => matchesTopic(topic, post));
}

export function getTopicCounts(posts: BlogPostMeta[]) {
  return topics.map((topic) => ({
    ...topic,
    count: getTopicPosts(topic, posts).length,
  }));
}

export function getTopicLastModified(topic: TopicDefinition, posts: BlogPostMeta[]) {
  const topicPosts = getTopicPosts(topic, posts);

  if (!topicPosts.length) {
    return null;
  }

  return topicPosts
    .map((post) => post.lastModified)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
}
