'use client';

import { Home, MessageSquare, BarChart2, Settings, Heart } from 'lucide-react';

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Icon Test Page</h1>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-gray-700 dark:text-gray-200">Home Icon</span>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
            <span className="text-gray-700 dark:text-gray-200">Chat Icon</span>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
            <span className="text-gray-700 dark:text-gray-200">Therapy Icon</span>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <BarChart2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-700 dark:text-gray-200">Stats Icon</span>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Settings className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            <span className="text-gray-700 dark:text-gray-200">Settings Icon</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            If you can see the icons above, they are working correctly.
          </p>
        </div>
      </div>
    </div>
  );
}
