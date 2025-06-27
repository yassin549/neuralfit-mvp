'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';

// Types
type WindowType = {
  id: string;
  title: string;
  content: React.ComponentType;
  icon: ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  previousSize?: { width: number; height: number };
  previousPosition?: { x: number; y: number };
  origin: { x: number; y: number };
};

type WindowSystemContextType = {
  windows: WindowType[];
  openWindow: (
    windowData: Omit<WindowType, 'isMinimized' | 'isMaximized' | 'position' | 'size' | 'origin'> & Partial<Pick<WindowType, 'size'>>,
    originElement: HTMLElement | null
  ) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  bringToFront: (id: string) => void;
};

// Context
const WindowSystemContext = createContext<WindowSystemContextType | null>(null);

// Provider
// Hook
export const useWindowSystem = () => {
  const context = useContext(WindowSystemContext);
  if (!context) {
    throw new Error('useWindowSystem must be used within a WindowSystemProvider');
  }
  return context;
};

export function WindowSystemProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowType[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 640;

  const bringToFront = (id: string) => {
    if (activeWindow !== id) {
      setActiveWindow(id);
    }
  };

  const openWindow = (
    windowData: Omit<WindowType, 'isMinimized' | 'isMaximized' | 'position' | 'size' | 'origin'> & Partial<Pick<WindowType, 'size'>>,
    originElement: HTMLElement | null
  ) => {
    setWindows(currentWindows => {
      const existingWindow = currentWindows.find(win => win.id === windowData.id);

      const originRect = originElement?.getBoundingClientRect();
      const origin = {
        x: originRect ? originRect.left + originRect.width / 2 : window.innerWidth / 2,
        y: originRect ? originRect.top + originRect.height / 2 : window.innerHeight / 2,
      };

      if (existingWindow) {
        return currentWindows.map(win =>
          win.id === windowData.id ? { ...win, isMinimized: false, isMaximized: false, origin } : win
        );
      } else {
        const newSize = { 
          width: window.innerWidth > 640 ? 800 : window.innerWidth - 40,
          height: window.innerHeight > 640 ? 600 : window.innerHeight - 120,
          ...windowData.size 
        };
        const newPosition = {
          x: Math.max(0, window.innerWidth > 640 ? (window.innerWidth - newSize.width) / 2 : 20),
          y: Math.max(0, window.innerHeight > 640 ? (window.innerHeight - newSize.height) / 2 : 20),
        };

        const newWindow: WindowType = {
          ...windowData,
          position: newPosition,
          size: newSize,
          isMinimized: false,
          isMaximized: false,
          origin,
        };
        return [...currentWindows, newWindow];
      }
    });
    setActiveWindow(windowData.id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows => windows.filter(win => win.id !== id));
    if (activeWindow === id) {
      const remainingWindows = windows.filter(win => win.id !== id && !win.isMinimized);
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  const toggleMaximize = (id: string) => {
    setWindows(windows =>
      windows.map(win => {
        if (win.id === id) {
          if (win.isMaximized) {
            // Restore
            return {
              ...win,
              isMaximized: false,
              size: win.previousSize || { width: 800, height: 600 },
              position: win.previousPosition || { x: (window.innerWidth - 800) / 2, y: (window.innerHeight - 600) / 2 },
            };
          } else {
            // Maximize
            return {
              ...win,
              isMaximized: true,
              previousSize: win.size,
              previousPosition: win.position,
              size: { width: window.innerWidth, height: window.innerHeight },
              position: { x: 0, y: 0 },
            };
          }
        }
        return win;
      })
    );
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows =>
      windows.map(win =>
        win.id === id ? { ...win, isMinimized: true } : win
      )
    );
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const value: WindowSystemContextType = {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    bringToFront,
  };

  return (
    <WindowSystemContext.Provider value={value}>
      {children}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {windows.map((win) => {
            const content = typeof win.content === 'function'
              ? React.createElement(win.content)
              : win.content;

            return !win.isMinimized ? (
              <motion.div
                key={win.id}
                className="absolute bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden flex flex-col"
                style={{
                  zIndex: activeWindow === win.id ? 100 : 10,
                  pointerEvents: 'all',
                }}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  x: win.origin.x - win.size.width / 2,
                  y: win.origin.y - win.size.height / 2,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: win.position.x,
                  y: win.position.y,
                  width: isMobileScreen ? window.innerWidth : win.size.width,
                  height: isMobileScreen ? window.innerHeight : win.size.height,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  x: win.origin.x - win.size.width / 2,
                  y: win.origin.y - win.size.height / 2,
                  transition: { duration: 0.2 }
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.8 }}
                drag={!win.isMaximized && !isMobileScreen}
                dragMomentum={false}
                dragConstraints={window.innerWidth > 640 ? {
                  top: 0,
                  left: 0,
                  right: window.innerWidth - win.size.width,
                  bottom: window.innerHeight - win.size.height,
                } : false}
                onDragStart={(event, info) => {
                  bringToFront(win.id);
                  if (win.isMaximized) {
                    toggleMaximize(win.id);
                  }
                }}
                onDragEnd={(event, info) => {
                  if (info.point.y <= 1 && !win.isMaximized) {
                    toggleMaximize(win.id);
                    return;
                  }

                  if (win.isMaximized) return;
                  
                  setWindows(currentWindows =>
                    currentWindows.map(w => {
                      if (w.id === win.id) {
                        return {
                          ...w,
                          position: {
                            x: w.position.x + info.offset.x,
                            y: w.position.y + info.offset.y,
                          },
                        };
                      }
                      return w;
                    })
                  );
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 cursor-move"
                  onDoubleClick={() => toggleMaximize(win.id)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-600 dark:text-gray-300">{win.icon}</div>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{win.title}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                     <button
                        onClick={() => minimizeWindow(win.id)}
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleMaximize(win.id)}
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                      >
                        <Square className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => closeWindow(win.id)}
                        className="p-1 rounded-full hover:bg-red-500/80 dark:hover:bg-red-500/80 text-gray-500 dark:text-gray-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  {content}
                </div>
              </motion.div>
            ) : null;
          })}
        </AnimatePresence>
      </div>
    </WindowSystemContext.Provider>
  );
}

