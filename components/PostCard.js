import Link from 'next/link';
import { format } from 'date-fns';

export default function PostCard({ post }) {
  const { slug, frontmatter } = post;
  const formattedDate = format(new Date(frontmatter.date), 'MMMM dd, yyyy');

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {frontmatter.coverImage && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {frontmatter.draft && (
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">
            Draft
          </span>
        )}

        <Link href={`/blog/${slug}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {frontmatter.title}
          </h2>
        </Link>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <time dateTime={frontmatter.date}>{formattedDate}</time>
          <span className="mx-2">•</span>
          <span>{frontmatter.author}</span>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-3">
          {frontmatter.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {frontmatter.categories.slice(0, 2).map((category) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-gray-600 text-xs hover:text-gray-900 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        <Link
          href={`/blog/${slug}`}
          className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
