"use client";

import dynamic from 'next/dynamic';

const BottomNav = dynamic(() => import('@/components/bottom-nav-new').then(mod => mod.BottomNav), { ssr: false });

export function ClientBottomNav() {
  return <BottomNav />;
}
