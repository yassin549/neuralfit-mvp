import { getCurrentUser } from '@/lib/auth-utils';
import AuthForm from '@/components/auth/auth-form';
import TherapistDashboard from '@/components/therapist/dashboard';

export default async function TherapistWindow() {
  const user = await getCurrentUser();

  if (!user) {
    return <AuthForm />;
  }

  return <TherapistDashboard user={user} />;
}
