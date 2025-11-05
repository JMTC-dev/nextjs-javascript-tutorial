import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }) {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `#${tag} | Tags`,
    description: `Browse blog posts tagged with ${tag}`,
  };
}

export default function TagPage({ params }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/tags"
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            ← All Tags
          </Link>
          <h1 className="text-4xl font-bold mb-2">#{tag}</h1>
          <p className="text-xl text-blue-100">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
