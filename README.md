# Next.js Markdown Blog

A beautiful, full-featured blog built with Next.js 15, Markdown, and Tailwind CSS. Write blog posts in Markdown and manage them through an intuitive admin panel with a live preview editor.

## Features

### Content Management
- **Markdown-based posts** - Write content in Markdown format
- **Frontmatter support** - Metadata including title, date, author, excerpt, categories, tags, and draft status
- **Admin panel** - Browser-based editor with live preview
- **Direct file editing** - Edit Markdown files in your code editor
- **Image uploads** - Upload and manage images through the admin panel

### Organization
- **Categories** - Group related posts together
- **Tags** - Fine-grained post organization
- **Draft mode** - Work on posts before publishing
- **Search functionality** - Full-text search across all posts

### Technical Features
- **Syntax highlighting** - Beautiful code blocks with highlight.js
- **Responsive design** - Mobile-friendly Tailwind CSS styling
- **Static generation** - Fast page loads with Next.js SSG
- **Secure authentication** - Password-protected admin panel
- **SEO-friendly** - Optimized metadata and structure

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-javascript-tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and set your admin password:
   ```
   ADMIN_PASSWORD=your-secure-password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Writing Blog Posts

#### Option 1: Admin Panel (Recommended)
1. Navigate to `/admin` (or click the Admin button in the header)
2. Login with your `ADMIN_PASSWORD`
3. Click "New Post" to create a post
4. Fill in the metadata and write your content
5. Use the toolbar for formatting and preview modes
6. Upload images using the image upload feature
7. Save as draft or publish immediately

#### Option 2: Direct File Editing
1. Create a new `.md` file in `content/posts/`
2. Add frontmatter at the top:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2024-01-15"
   author: "Your Name"
   excerpt: "A brief description"
   categories: ["Category1", "Category2"]
   tags: ["tag1", "tag2"]
   coverImage: "/uploads/image.jpg"
   draft: false
   ---

   Your content here...
   ```
3. Write your content in Markdown
4. Save the file

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `date` | string (YYYY-MM-DD) | Yes | Publication date |
| `author` | string | No | Author name |
| `excerpt` | string | No | Short description |
| `categories` | array | No | Post categories |
| `tags` | array | No | Post tags |
| `coverImage` | string | No | Image URL or path |
| `draft` | boolean | No | Draft status (default: false) |

### Managing Content

#### Categories & Tags
- Categories and tags are automatically generated from your posts
- View all categories at `/categories`
- View all tags at `/tags`
- Click on any category or tag to see related posts

#### Search
- Use the search bar on the homepage or `/search`
- Searches across titles, excerpts, content, categories, and tags

#### Drafts
- Set `draft: true` in frontmatter to hide posts from public view
- Drafts are visible in the admin panel
- Perfect for work-in-progress content

### Image Uploads

1. In the admin panel editor, scroll to "Cover Image URL"
2. Click "Upload Image"
3. Select an image file (max 5MB, JPEG/PNG/GIF/WebP)
4. The image URL is automatically inserted
5. Images are stored in `public/uploads/`

## Project Structure

```
nextjs-javascript-tutorial/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin panel pages
│   ├── api/                 # API routes
│   ├── blog/                # Blog post pages
│   ├── categories/          # Category pages
│   ├── tags/                # Tag pages
│   ├── search/              # Search page
│   ├── layout.js            # Root layout
│   ├── page.js              # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Header.js            # Navigation header
│   ├── PostCard.js          # Post preview card
│   ├── SearchBar.js         # Search component
│   ├── MarkdownEditor.js    # Admin editor
│   ├── AdminDashboard.js    # Admin dashboard
│   ├── LoginForm.js         # Login component
│   └── ImageUpload.js       # Image upload
├── content/                 # Blog content
│   └── posts/              # Markdown posts
├── lib/                     # Utility functions
│   ├── posts.js            # Post management
│   └── auth.js             # Authentication
├── public/                  # Static files
│   └── uploads/            # Uploaded images
└── package.json            # Dependencies
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel automatically detects Next.js

3. **Configure environment variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add `ADMIN_PASSWORD` with your chosen password
   - Redeploy if necessary

4. **Done!**
   Your blog is now live at `your-project.vercel.app`

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform
- Self-hosted Node.js server

## Security

### Best Practices
- **Strong passwords** - Use a strong, unique password for `ADMIN_PASSWORD`
- **HTTPS** - Always use HTTPS in production (automatic on Vercel)
- **Environment variables** - Never commit `.env.local` to git
- **Regular updates** - Keep dependencies up to date

### Authentication
- Admin routes are protected by session-based authentication
- Sessions use secure, httpOnly cookies
- Password is validated server-side only
- No database required - stateless authentication

## Customization

### Styling
- Edit `app/globals.css` for global styles
- Modify Tailwind classes in components
- Update `tailwind.config.js` for theme customization

### Site Information
- Update site name in `components/Header.js`
- Modify metadata in `app/layout.js`
- Customize hero section in `app/page.js`

### Syntax Highlighting Theme
- Change highlight.js theme in `app/globals.css`
- Available themes: [highlight.js themes](https://github.com/highlightjs/highlight.js/tree/main/src/styles)

## Troubleshooting

### Admin login not working
- Check `ADMIN_PASSWORD` is set in `.env.local` (development) or Vercel environment variables (production)
- Ensure no extra spaces in the password
- Try clearing browser cookies

### Posts not showing up
- Verify frontmatter format is correct
- Check `draft: false` for published posts
- Ensure `.md` files are in `content/posts/`
- Restart development server

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check for syntax errors in Markdown files
- Verify all imports are correct

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Built With

- [Next.js 15](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parsing
- [unified](https://unifiedjs.com/) - Markdown processing
- [highlight.js](https://highlightjs.org/) - Syntax highlighting
- [SimpleMDE](https://simplemde.com/) - Markdown editor
- [react-icons](https://react-icons.github.io/react-icons/) - Icons

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
