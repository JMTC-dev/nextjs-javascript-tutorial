import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Ensure posts directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

/**
 * Get all markdown files from the posts directory
 */
export function getPostSlugs() {
  try {
    const files = fs.readdirSync(postsDirectory);
    return files.filter(file => file.endsWith('.md'));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Get post data by slug
 * @param {string} slug - The post slug (filename without .md)
 * @param {boolean} includeDrafts - Whether to include draft posts
 */
export function getPostBySlug(slug, includeDrafts = false) {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Don't return draft posts unless explicitly requested
    if (data.draft && !includeDrafts) {
      return null;
    }

    return {
      slug: realSlug,
      frontmatter: {
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Anonymous',
        excerpt: data.excerpt || '',
        categories: Array.isArray(data.categories) ? data.categories : [],
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: data.coverImage || '',
        draft: data.draft || false,
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts with their frontmatter
 * @param {boolean} includeDrafts - Whether to include draft posts
 */
export function getAllPosts(includeDrafts = false) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.md$/, ''), includeDrafts))
    .filter(post => post !== null)
    .sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1));

  return posts;
}

/**
 * Get all unique categories from all posts
 */
export function getAllCategories() {
  const posts = getAllPosts();
  const categoriesSet = new Set();

  posts.forEach(post => {
    post.frontmatter.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });

  return Array.from(categoriesSet).sort();
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags() {
  const posts = getAllPosts();
  const tagsSet = new Set();

  posts.forEach(post => {
    post.frontmatter.tags.forEach(tag => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get posts by category
 * @param {string} category - The category to filter by
 */
export function getPostsByCategory(category) {
  const posts = getAllPosts();
  return posts.filter(post =>
    post.frontmatter.categories.includes(category)
  );
}

/**
 * Get posts by tag
 * @param {string} tag - The tag to filter by
 */
export function getPostsByTag(tag) {
  const posts = getAllPosts();
  return posts.filter(post =>
    post.frontmatter.tags.includes(tag)
  );
}

/**
 * Search posts by query string
 * @param {string} query - The search query
 */
export function searchPosts(query) {
  const posts = getAllPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter(post => {
    const titleMatch = post.frontmatter.title.toLowerCase().includes(lowercaseQuery);
    const excerptMatch = post.frontmatter.excerpt.toLowerCase().includes(lowercaseQuery);
    const contentMatch = post.content.toLowerCase().includes(lowercaseQuery);
    const categoryMatch = post.frontmatter.categories.some(cat =>
      cat.toLowerCase().includes(lowercaseQuery)
    );
    const tagMatch = post.frontmatter.tags.some(tag =>
      tag.toLowerCase().includes(lowercaseQuery)
    );

    return titleMatch || excerptMatch || contentMatch || categoryMatch || tagMatch;
  });
}

/**
 * Convert markdown to HTML with syntax highlighting
 * @param {string} markdown - The markdown content
 */
export async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}

/**
 * Create or update a blog post
 * @param {string} slug - The post slug
 * @param {object} frontmatter - The frontmatter data
 * @param {string} content - The markdown content
 */
export function savePost(slug, frontmatter, content) {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);

    const fileContent = matter.stringify(content, frontmatter);
    fs.writeFileSync(fullPath, fileContent, 'utf8');

    return { success: true, slug: realSlug };
  } catch (error) {
    console.error(`Error saving post ${slug}:`, error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a blog post
 * @param {string} slug - The post slug
 */
export function deletePost(slug) {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return { success: true };
    }

    return { success: false, error: 'Post not found' };
  } catch (error) {
    console.error(`Error deleting post ${slug}:`, error);
    return { success: false, error: error.message };
  }
}
