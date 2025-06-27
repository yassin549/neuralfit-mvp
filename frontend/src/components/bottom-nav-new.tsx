'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { useWindowSystem } from '@/components/window-system';
import { DashboardContent } from './window-content/dashboard-content';
import { SocialSpaceContent } from './window-content/social-space-content';
import { VoiceCallContent } from './window-content/voice-call-content';
import { VideoCallContent } from './window-content/video-call-content';
import { ChattingContent } from './window-content/chatting-content';
import { SettingsContent } from './window-content/settings-content';
import { 
  BarChart2 as BarChart2Icon,
  Users as UsersIcon,
  Mic as MicIcon,
  Video as VideoIcon,
  FileText as FileTextIcon,
  Settings as SettingsIcon
} from 'lucide-react';

type NavItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
  content: React.ComponentType;
};

const navItems: NavItem[] = [
  { id: 'dashboard', name: 'Dashboard', icon: <BarChart2Icon className="w-6 h-6" />, content: DashboardContent },
  { id: 'social', name: 'Social Space', icon: <UsersIcon className="w-6 h-6" />, content: SocialSpaceContent },
  { id: 'voice', name: 'Voice Call', icon: <MicIcon className="w-6 h-6" />, content: VoiceCallContent },
  { id: 'video', name: 'Video Call', icon: <VideoIcon className="w-6 h-6" />, content: VideoCallContent },
  { id: 'text', name: 'Chatting', icon: <FileTextIcon className="w-6 h-6" />, content: ChattingContent },
  { id: 'settings', name: 'Settings', icon: <SettingsIcon className="w-6 h-6" />, content: SettingsContent },
];

const springTransition: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  mass: 0.7,
};

export function BottomNav() {
  const { openWindow, windows } = useWindowSystem();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isActive = (id: string) => {
    return windows.some(win => win.id === id && !win.isMinimized);
  };

  return (
    <motion.div
      className="fixed bottom-4 inset-x-0 z-[110] flex justify-center pointer-events-none"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative z-10 px-3 sm:px-4 py-2 w-auto h-full flex items-center justify-center backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/20 bg-gradient-to-b from-white/5 to-white/[0.02] dark:from-gray-900/90 dark:to-gray-950/90 pointer-events-auto">
        <div className="absolute inset-0 bg-white/5 dark:bg-black/20 rounded-xl -z-10" />
        <nav className="flex items-center justify-center space-x-1 sm:space-x-2">
          {navItems.map((item, index) => {
            const active = isActive(item.id);
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.id}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="relative"
                  initial={{ y: 0, scale: 1 }}
                  animate={{ y: isHovered ? -16 : 0, scale: isHovered ? 1.3 : 1 }}
                  transition={springTransition}
                >
                  <motion.button
                    ref={el => { itemRefs.current[index] = el; }}
                    onClick={() => {
                      openWindow(
                        { id: item.id, title: item.name, content: item.content, icon: item.icon },
                        itemRefs.current[index]
                      );
                    }}
                    className={cn(
                      'flex items-center justify-center w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 relative transition-colors duration-300',
                      active ? 'text-white' : 'text-white/70 hover:text-white'
                    )}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className={cn(
                        'absolute inset-0 -z-10 rounded-full transition-colors duration-300',
                        active ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/5',
                        'scale-90',
                        active && 'scale-100'
                      )}
                      layoutId={`highlight-${item.id}`}
                      transition={springTransition}
                    />
                    <motion.span
                      className={cn(
                        'flex items-center justify-center transition-transform duration-300',
                        active ? 'scale-110' : 'scale-100'
                      )}
                    >
                      {item.icon}
                    </motion.span>
                  </motion.button>
                </motion.div>

                <AnimatePresence>
                  {(isHovered || active) && (
                    <motion.div
                      className="absolute -bottom-8"
                      initial={{ opacity: 0, y: 5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.2 }}
                    >
                      <div className="text-xs font-medium text-white/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
                        {item.name}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {active && (
                    <motion.div
                      className="absolute bottom-[-4px] w-1 h-1 bg-white rounded-full shadow-[0_0_3px_1px_rgba(255,255,255,0.7)]"
                      layoutId={`active-dot-${item.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
}
