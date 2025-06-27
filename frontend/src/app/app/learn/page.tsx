'use client';

import { AppLayout } from '@/components/app-layout';

export default function LearnPage() {
  const articles = [
    {
      title: 'The Science of Emotional Well-being',
      description: 'Explore how modern psychology understands emotional health and resilience.',
      category: 'Psychology',
      readTime: '5 min',
      gradient: 'from-amber-500 to-orange-400'
    },
    {
      title: 'Mindfulness and Mental Health',
      description: 'Learn how mindfulness practices can reduce stress and improve emotional regulation.',
      category: 'Mindfulness',
      readTime: '4 min',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Building Meaningful Connections',
      description: 'Discover the importance of social connections for mental well-being.',
      category: 'Relationships',
      readTime: '6 min',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      title: 'Cognitive Behavioral Therapy Basics',
      description: 'An introduction to CBT techniques you can use in daily life.',
      category: 'Therapy',
      readTime: '7 min',
      gradient: 'from-emerald-500 to-teal-400'
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
            How It Works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Learn about the science and philosophy behind NeuralFit's approach to emotional well-being.
          </p>
        </div>
        
        <div className="mt-12">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6">Featured Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <div 
                  key={index}
                  className="group p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-700/50 text-amber-400">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {article.readTime} read
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {article.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-700/30 flex items-center">
                    <span className="text-xs text-amber-400 font-medium">Read article</span>
                    <svg className="w-3.5 h-3.5 ml-1 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                {
                  question: 'How does NeuralFit ensure my privacy?',
                  answer: 'We use end-to-end encryption for all conversations and never store personal identifiers. Your data is used solely to improve your experience and is never sold to third parties.'
                },
                {
                  question: 'Is the AI therapist a replacement for professional help?',
                  answer: 'No, our AI therapist is designed to provide support and guidance but is not a replacement for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider with any questions you may have.'
                },
                {
                  question: 'How often should I use NeuralFit?',
                  answer: 'You can use NeuralFit as often as you like. Many users find daily check-ins helpful, while others prefer to use it when they need extra support. The app is designed to adapt to your needs and schedule.'
                }
              ].map((faq, index) => (
                <div key={index} className="p-5 rounded-xl bg-gray-800/30 border border-gray-700/50">
                  <h4 className="font-medium text-gray-200">{faq.question}</h4>
                  <p className="mt-2 text-sm text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
