import { BottomNav } from "@/components/bottom-nav";
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 overflow-auto pb-16">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
