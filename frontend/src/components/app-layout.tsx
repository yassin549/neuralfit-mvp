import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AppLayout({ children, className = '' }: AppLayoutProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'h-full w-full overflow-y-auto pb-24', // Add padding bottom for bottom nav
        'scrollbar-hide', // Hide scrollbar for cleaner look
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.h1 
          className="text-center text-2xl md:text-3xl font-medium mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          You're not meant to scroll, you're meant to live.
        </motion.h1>
        {children}
      </div>
    </motion.div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
