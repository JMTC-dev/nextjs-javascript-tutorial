import Link from 'next/link';
import { getAllCategories, getPostsByCategory } from '@/lib/posts';

export const metadata = {
  title: 'Categories | My Blog',
  description: 'Browse blog posts by category',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Categories</h1>
          <p className="text-xl text-blue-100 text-center mt-4">
            Browse posts by category
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No categories yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const postCount = getPostsByCategory(category).length;
              return (
                <Link
                  key={category}
                  href={`/categories/${encodeURIComponent(category)}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-600"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {category}
                  </h2>
                  <p className="text-gray-600">
                    {postCount} {postCount === 1 ? 'post' : 'posts'}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
