'use client';

import { AppLayout } from '@/components/app-layout';

export default function TherapyPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
            AI Therapist
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your personal AI therapist, available 24/7 to listen and help you navigate your thoughts and feelings.
          </p>
        </div>
        
        <div className="mt-12">
          <div className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50">
            <div className="h-96 rounded-xl bg-gray-900/50 border border-gray-700/50 p-4 overflow-y-auto space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-3 max-w-[80%]">
                  <p className="text-gray-200">
                    Hello! I'm here to listen and help you explore your thoughts and feelings. What's on your mind today?
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-blue-500/20 rounded-xl p-3 max-w-[80%] border border-blue-500/30">
                  <p className="text-gray-200">
                    I've been feeling really stressed about work lately.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-3 max-w-[80%]">
                  <p className="text-gray-200">
                    I hear that work is causing you stress. Could you tell me more about what specifically is making you feel this way? Understanding the details can help us find ways to manage it together.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
              />
              <button className="px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center">
                <span>Send</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700/30">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Prompts</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "I'm feeling anxious about...",
                  "How can I improve my sleep?",
                  "I'm struggling with motivation",
                  "Help me process my emotions"
                ].map((prompt) => (
                  <button 
                    key={prompt}
                    className="text-xs px-3 py-1.5 bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/50 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
