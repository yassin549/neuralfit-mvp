'use client';

import { AppLayout } from '@/components/app-layout';

export default function ReflectPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Feel Deeply
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your private space for reflection, journaling, and emotional exploration.
          </p>
        </div>
        
        <div className="mt-12">
          <div className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4">Today's Reflection</h3>
            <textarea 
              className="w-full h-48 bg-gray-900/30 border border-gray-700/50 rounded-xl p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              placeholder="How are you feeling today?"
            />
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                Save Reflection
              </button>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Recent Entries</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Yesterday</span>
                    <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-300 rounded-full">
                      {item} min read
                    </span>
                  </div>
                  <p className="text-gray-300 line-clamp-2">
                    Today I felt a mix of emotions. The morning started with anxiety about work, but I managed to center myself with some deep breathing...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
