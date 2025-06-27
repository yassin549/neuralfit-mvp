'use client';

import { Button } from '@/components/ui/button';
import { Book, Bot, BrainCircuit, Calendar, Target, TrendingUp, Zap } from 'lucide-react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { SpaceHistory } from '@/components/dashboard/space-history';
import { User } from 'next-auth';
import { motion } from 'framer-motion';

// Mock data
const improvementData = [
  { name: 'W1', score: 45 }, { name: 'W2', score: 50 }, { name: 'W3', score: 62 }, 
  { name: 'W4', score: 58 }, { name: 'W5', score: 72 }, { name: 'W6', score: 78 }, { name: 'W7', score: 85 },
];
const recentActivity = [
  { description: 'Completed a 30-minute AI therapy session.', time: '2h ago', icon: <Bot size={18} /> },
  { description: 'Wrote a new journal entry about today\'s goals.', time: '1d ago', icon: <Book size={18} /> },
  { description: 'Set a new goal: "Practice mindfulness daily."', time: '2d ago', icon: <Target size={18} /> },
];
const goals = [
  { title: 'Meditate 3 times this week', progress: 66 },
  { title: 'Complete 1 journal entry', progress: 100 },
  { title: 'Try a new breathing exercise', progress: 0 },
];

interface UserDashboardProps {
  user: User;
}

const GlassCard = ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <motion.div 
    className={`bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <GlassCard className="p-4 flex flex-col justify-between">
    <div className="flex justify-between items-center">
      <p className="text-sm text-white/70 font-medium">{title}</p>
      <div className="text-white/70">{icon}</div>
    </div>
    <p className="text-3xl font-bold text-white/90 mt-2">{value}</p>
  </GlassCard>
);

export default function UserDashboard({ user }: UserDashboardProps) {
  return (
    <div className="p-4 sm:p-6 text-white h-full overflow-y-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white/90">
            Welcome back, {user.name || 'User'}!
          </h1>
          <p className="text-white/70 mt-1">
            Your journey to wellness continues.
          </p>
        </div>
        <Button className="bg-white/20 hover:bg-white/30 text-white mt-4 sm:mt-0">
          <Zap className="w-4 h-4 mr-2"/>
          Start New Session
        </Button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="lg:col-span-3 xl:col-span-4 grid grid-flow-col sm:grid-cols-3 auto-cols-[80%] sm:auto-cols-fr gap-4 overflow-x-auto pb-2">
          <StatCard title="Sessions This Week" value="3" icon={<Calendar size={20}/>} />
          <StatCard title="Journal Entries" value="5" icon={<Book size={20}/>} />
          <StatCard title="Current Streak" value="12 days" icon={<TrendingUp size={20}/>} />
        </div>

        <GlassCard className="lg:col-span-3 xl:col-span-2 row-span-2 p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-white/90 mb-4">Improvement Over Time</h2>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={improvementData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.6)" fontSize={12} />
                <YAxis stroke="rgba(255, 255, 255, 0.6)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 10, 10, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    borderRadius: '12px'
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#A78BFA" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2 xl:col-span-2 p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-white/90 mb-4">My Goals</h2>
          <div className="space-y-4">
            {goals.map((goal, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-white/80">{goal.title}</p>
                  <p className="text-sm font-bold text-white/90">{goal.progress}%</p>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-violet-400 h-2 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        
        <GlassCard className="lg:col-span-1 xl:col-span-2 p-4 sm:p-6">
           <h2 className="text-xl font-semibold text-white/90 mb-4">Quote of the Day</h2>
           <blockquote className="text-center">
             <p className="text-lg italic text-white/80">"The best way to predict the future is to create it."</p>
             <footer className="mt-4 text-sm text-white/60">— Peter Drucker</footer>
           </blockquote>
        </GlassCard>

        <GlassCard className="lg:col-span-3 xl:col-span-2 p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-white/90 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivity.map((activity, index) => (
              <li key={index} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-violet-300">
                  {activity.icon}
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-white/90">{activity.description}</p>
                </div>
                <p className="text-xs text-white/70 whitespace-nowrap">{activity.time}</p>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="lg:col-span-3 xl:col-span-2 p-4 sm:p-6">
            <SpaceHistory />
        </GlassCard>
      </main>
    </div>
  );
}
