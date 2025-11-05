import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: 'Admin Login | My Blog',
  description: 'Login to manage your blog',
};

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  return session?.value === 'authenticated';
}

export default async function LoginPage() {
  const isAuthenticated = await checkAuth();

  if (isAuthenticated) {
    redirect('/admin');
  }

  return <LoginForm />;
}
