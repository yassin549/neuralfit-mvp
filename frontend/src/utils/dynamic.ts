import dynamic from 'next/dynamic';

export const DynamicChatInterface = dynamic(
  () => import('@/components/chat/ChatInterface').then(mod => mod.ChatInterface),
  { ssr: false }
);
