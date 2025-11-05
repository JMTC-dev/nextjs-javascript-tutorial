import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';

export const metadata = {
  title: 'Tags | My Blog',
  description: 'Browse blog posts by tag',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Tags</h1>
          <p className="text-xl text-blue-100 text-center mt-4">
            Browse posts by tag
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {tags.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No tags yet.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {tags.map((tag) => {
              const postCount = getPostsByTag(tag).length;
              return (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 px-6 py-4 inline-flex flex-col items-center"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    #{tag}
                  </span>
                  <span className="text-sm text-gray-600 mt-1">
                    {postCount} {postCount === 1 ? 'post' : 'posts'}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
