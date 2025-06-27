import { ReactNode } from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
};

export default function Layout({ 
  children, 
  showHeader = true,
  showFooter = true 
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      {showHeader && (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container px-4 sm:px-6 md:px-8 flex h-16 items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              NeuralFit
            </Link>
            <nav className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="relative inline-flex h-9 items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </header>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && (
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} NeuralFit. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
