'use client';

import { useState, useEffect } from 'react';
import AuthForm from '@/components/auth/auth-form';
import TherapistDashboard from '@/components/therapist/dashboard';
import { User } from 'next-auth';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export function TherapyContent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          console.error('Failed to fetch session:', data.error);
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <AuthForm />;
  }

  return <TherapistDashboard user={user} />;
}
