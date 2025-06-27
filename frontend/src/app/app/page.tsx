'use client';

import { motion } from 'framer-motion';
import { AppLayout } from '@/components/app-layout';

export default function HomePage() {
  return (
    <AppLayout>
      <div className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Welcome to NeuralFit
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Where meaningful connections and emotional well-being come together in a space designed for you.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            {
              title: 'Connect',
              description: 'Join meaningful conversations in our safe, anonymous spaces',
              href: '/connect',
              gradient: 'from-blue-500 to-cyan-400'
            },
            {
              title: 'Reflect',
              description: 'Journal your thoughts and track your emotional journey',
              href: '/reflect',
              gradient: 'from-purple-500 to-pink-500'
            },
            {
              title: 'Therapy',
              description: 'Talk with our AI therapist, trained in modern therapeutic approaches',
              href: '/therapy',
              gradient: 'from-emerald-500 to-teal-400'
            },
            {
              title: 'Learn',
              description: 'Understand the science behind emotional well-being',
              href: '/learn',
              gradient: 'from-amber-500 to-orange-400'
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className={cn(
                'p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50',
                'transition-all hover:bg-gray-800/70 hover:border-gray-600/50',
                'hover:shadow-lg hover:shadow-blue-500/10',
                'h-full flex flex-col'
              )}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <h3 className={`text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${item.gradient}`}>
                {item.title}
              </h3>
              <p className="text-gray-300 flex-1">{item.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Explore →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AppLayout>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
