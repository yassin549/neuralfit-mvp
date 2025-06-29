"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { DynamicChatInterface } from '@/utils/dynamic';
import { Message as MessageType } from '@/types/chat';

export default function ChatPage() {
  const { isAuthenticated, loading, logout, user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatInterfaceRef = useRef<any>(null);

  // Check authentication status
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Load initial messages or conversation history
  useEffect(() => {
    if (isAuthenticated) {
      // In a real app, you would fetch the conversation history here
      const welcomeMessage: MessageType = {
        id: 'welcome',
        content: 'Hello! I\'m your NeuralFit AI assistant. How can I help you today?',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isAuthenticated]);

  // Auto-scroll to bottom when messages change or typing state updates
  useEffect(() => {
    if (chatInterfaceRef.current) {
      chatInterfaceRef.current.scrollToBottom();
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isTyping) return;

    // Add user message to chat
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // In a real app, you would make an API call to your backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          message: content,
          userId: user?.email,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: data.response || `I'm sorry, I couldn't process your request at the moment.`,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: MessageType = {
        id: `error-${Date.now()}`,
        content: 'Sorry, I encountered an error. Please try again later.',
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const startNewChat = () => {
    const welcomeMessage: MessageType = {
      id: 'welcome',
      content: 'Hello! I\'m your NeuralFit AI assistant. How can I help you today?',
      role: 'assistant',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mr-4">NeuralFit AI</h1>
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {user?.email || 'User'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={startNewChat}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Chat
              </button>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="container py-8">
          <DynamicChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            onTypingChange={setIsTyping}
          />
        </div>
      </main>
    </div>
  );
}
