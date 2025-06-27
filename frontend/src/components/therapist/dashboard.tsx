import { User } from 'next-auth';

interface TherapistDashboardProps {
  user: Pick<User, 'name' | 'email' | 'image'>;
}

const Widget = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    {children}
  </div>
);

export default function TherapistDashboard({ user }: TherapistDashboardProps) {
  return (
    <div className="flex flex-col h-full p-8 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Therapist Session</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Welcome, {user.name}. Choose your interaction method.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Widget title="Text Chat">
          <p className="text-gray-600 dark:text-gray-400">Engage in a text-based conversation with your AI therapist.</p>
        </Widget>
        <Widget title="Voice Call">
          <p className="text-gray-600 dark:text-gray-400">Speak directly with your AI therapist in a voice session.</p>
        </Widget>
        <Widget title="Video Session">
          <p className="text-gray-600 dark:text-gray-400">Have a face-to-face video call with your AI therapist.</p>
        </Widget>
      </div>
    </div>
  );
}
