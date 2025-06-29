import dynamic from 'next/dynamic';

// This explicitly loads the named export 'ChatInterface' from the module.
// This is the correct way to dynamically load non-default exports and ensures
// that TypeScript can correctly infer the component's props.
export const DynamicChatInterface = dynamic(
  () => import('@/components/chat/ChatInterface').then((mod) => mod.ChatInterface),
  {
    ssr: false, // This component will only be rendered on the client-side
  }
);
