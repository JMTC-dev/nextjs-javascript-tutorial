import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { getPostBySlug, getAllPosts, markdownToHtml } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getAllPosts(true); // Include drafts for build time
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug, true);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.frontmatter.title} | My Blog`,
    description: post.frontmatter.excerpt,
  };
}

export default async function BlogPost({ params }) {
  const post = getPostBySlug(params.slug, false);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);
  const formattedDate = format(new Date(post.frontmatter.date), 'MMMM dd, yyyy');

  return (
    <article className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            ← Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-blue-100">
            <time dateTime={post.frontmatter.date}>{formattedDate}</time>
            <span>•</span>
            <span>{post.frontmatter.author}</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {post.frontmatter.categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category)}`}
                className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded-full text-sm transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.frontmatter.coverImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
          <img
            src={post.frontmatter.coverImage}
            alt={post.frontmatter.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Tags */}
        {post.frontmatter.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
