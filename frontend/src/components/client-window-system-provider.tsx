"use client";

import dynamic from 'next/dynamic';

const WindowSystemProvider = dynamic(() => import('@/components/window-system').then(mod => mod.WindowSystemProvider), { ssr: false });

export function ClientWindowSystemProvider({ children }: { children: React.ReactNode }) {
  return <WindowSystemProvider>{children}</WindowSystemProvider>;
}
