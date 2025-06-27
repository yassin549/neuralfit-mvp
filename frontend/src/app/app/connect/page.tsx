'use client';

import { AppLayout } from '@/components/app-layout';

export default function ConnectPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Speak Freely
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join meaningful conversations in our safe, anonymous spaces. Connect with others who understand.
          </p>
        </div>
        
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* Placeholder for conversation rooms */}
          <div className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50">
            <div className="h-48 rounded-xl bg-gray-700/30 mb-4 flex items-center justify-center">
              <span className="text-gray-500">Conversation Room 1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Mindful Mornings</h3>
            <p className="text-gray-400 text-sm">Start your day with intention and connection</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50">
            <div className="h-48 rounded-xl bg-gray-700/30 mb-4 flex items-center justify-center">
              <span className="text-gray-500">Conversation Room 2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Vulnerability Circle</h3>
            <p className="text-gray-400 text-sm">A space for honest sharing and deep listening</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
