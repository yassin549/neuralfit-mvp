import { ReactNode } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-8 w-8" />
            <span className="text-xl font-bold">NeuralFit</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container flex h-full flex-col items-center justify-center py-12">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to NeuralFit
              </h1>
              <p className="text-sm text-muted-foreground">
                Your personal AI mental health assistant
              </p>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
