'use client';

import { 
  Home as HomeIcon,
  MessageSquare as MessageSquareIcon,
  Heart as HeartIcon,
  BarChart2 as BarChart2Icon,
  Settings as SettingsIcon
} from 'lucide-react';

export function TestIcons() {
  return (
    <div className="fixed top-4 right-4 p-4 bg-white/90 dark:bg-gray-900/90 rounded-lg shadow-lg z-50">
      <h2 className="text-lg font-bold mb-4">Icon Test</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <HomeIcon className="w-6 h-6" />
          <span>Home</span>
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquareIcon className="w-6 h-6" />
          <span>Chat</span>
        </div>
        <div className="flex items-center space-x-2">
          <HeartIcon className="w-6 h-6" />
          <span>Therapy</span>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart2Icon className="w-6 h-6" />
          <span>Stats</span>
        </div>
        <div className="flex items-center space-x-2">
          <SettingsIcon className="w-6 h-6" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}
