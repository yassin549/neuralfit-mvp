import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { User } from '@/types';
import { ProfileForm } from './_components/profile-form';

async function getUserData(token: string | undefined): Promise<User | null> {
  if (!token) return null;

  try {
    // We use the backend URL directly here for server-side fetching
    const res = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
      headers: {
        Cookie: `accessToken=${token}`,
      },
      cache: 'no-store', // Ensure fresh data
    });

    if (!res.ok) {
      console.error('Failed to fetch user data:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export default async function SettingsProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const user = await getUserData(accessToken);

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <ProfileForm user={user} />
    </div>
  );
}
