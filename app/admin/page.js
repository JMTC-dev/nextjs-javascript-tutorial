import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard | My Blog',
  description: 'Manage your blog posts',
};

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  return session?.value === 'authenticated';
}

export default async function AdminPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    // Show login form by redirecting to login page
    redirect('/admin/login');
  }

  return <AdminDashboard />;
}
