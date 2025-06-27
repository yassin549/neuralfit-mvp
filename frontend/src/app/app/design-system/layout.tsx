import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System | NeuralFit',
  description: 'NeuralFit Design System - A collection of reusable UI components and design tokens',
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ios-secondary/30 dark:bg-ios-dark-secondary/30">
      <div className="sticky top-0 z-10 glass border-b border-ios-separator/30 dark:border-ios-dark-separator/30">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">NeuralFit Design System</h1>
          <p className="text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">
            A collection of reusable UI components and design tokens
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
