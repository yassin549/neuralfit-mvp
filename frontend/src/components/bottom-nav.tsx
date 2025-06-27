'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useWindowSystem } from './window-system';
import { 
  Home as HomeIcon,
  MessageSquare as MessageSquareIcon,
  Heart as HeartIcon,
  BarChart2 as BarChart2Icon,
  Settings as SettingsIcon
} from 'lucide-react';

const MotionDiv = motion.div;
const MotionButton = motion.button;

type NavItem = {
  id: string;
  name: string;
  content: React.ComponentType;
  icon: React.ReactNode;
  exact?: boolean;
};

const navItems: NavItem[] = [
  {
    id: 'home',
    name: 'Home',
    icon: <HomeIcon />,
    content: () => <div className="p-6 text-white"><h2 className="text-2xl font-bold">Home</h2></div>,
    exact: true,
  },
  {
    id: 'chat',
    name: 'Chat',
    icon: <MessageSquareIcon />,
    content: () => <div className="p-6 text-white"><h2 className="text-2xl font-bold">Chat</h2><p>Start a conversation with our AI assistant</p></div>,
  },
  {
    id: 'therapy',
    name: 'Therapy',
    icon: <HeartIcon />,
    content: () => <div className="p-6 text-white"><h2 className="text-2xl font-bold">Therapy</h2><p>Explore therapeutic exercises</p></div>,
  },
  {
    id: 'stats',
    name: 'Stats',
    icon: <BarChart2Icon />,
    content: () => <div className="p-6 text-white"><h2 className="text-2xl font-bold">Statistics</h2><p>Track your progress</p></div>,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: <SettingsIcon />,
    content: () => <div className="p-6 text-white"><h2 className="text-2xl font-bold">Settings</h2><p>Customize your experience</p></div>,
  },
];

const dockVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

export function BottomNav() {
  const pathname = usePathname();
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const { openWindow, windows } = useWindowSystem();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const isActive = (id: string) => {
    return windows.some(win => win.id === id && !win.isMinimized);
  };

  const handleIconClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    const targetElement = e.currentTarget as HTMLElement;
    openWindow({
      id: item.id,
      title: item.name,
      content: item.content,
      icon: item.icon,
    }, targetElement);
  };

  return (
    <MotionDiv 
      ref={dockRef}
      className={cn(
        'fixed bottom-4 left-1/2 -translate-x-1/2 z-40',
        'flex justify-center w-auto pointer-events-auto max-w-[calc(100vw-2rem)]',
        'backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/20',
        'bg-gradient-to-b from-white/5 to-white/[0.02]',
        'dark:from-gray-900/90 dark:to-gray-950/90',
        'overflow-hidden group'
      )}
      initial="hidden"
      animate={controls}
      variants={dockVariants}
    >
      <div className={cn(
        'relative z-10 px-3 sm:px-4 py-2 w-full h-full flex items-center justify-center backdrop-blur-md'
      )}>
        <div className="absolute inset-0 bg-white/5 dark:bg-black/20 rounded-xl -z-10"></div>
        <nav className="flex items-center justify-center space-x-1 sm:space-x-2">
          {navItems.map((item, index) => {
            const active = isActive(item.id);
            const isHovered = hoveredIndex === index;
            
            return (
              <MotionDiv 
                key={item.name}
                className="relative flex flex-col items-center group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{ y: isHovered ? -10 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <MotionButton
                  onClick={(e) => handleIconClick(e, item)}
                  className={cn(
                    'flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 relative transition-all duration-300 group/button',
                    active ? 'text-white' : 'text-white/70 hover:text-white'
                  )}
                  aria-label={item.name}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <MotionDiv 
                    className={cn(
                      'absolute inset-0 -z-10 rounded-2xl transition-all duration-300',
                      active ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/5 group-hover/button:bg-white/10',
                      'scale-90 group-hover/button:scale-100',
                      active && 'scale-100'
                    )}
                  />
                  <motion.div animate={{ scale: active ? 1.1 : 1 }}>
                    {item.icon}
                  </motion.div>
                </MotionButton>
              </MotionDiv>
            );
          })}
        </nav>
      </div>
    </MotionDiv>
  );
}
