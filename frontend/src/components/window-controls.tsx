'use client';

declare global {
  interface Window {
    electron?: {
      closeWindow: () => void;
      minimizeWindow: () => void;
      maximizeWindow: () => void;
    };
  }
}

import { cn } from '@/lib/utils';

export function WindowControls() {
  // Check if we're in Electron environment
  const isElectron = typeof window !== 'undefined' && window.electron;

  return (
    <div className={cn(
      'fixed top-0 left-0 right-0 z-50 hidden sm:flex items-center px-4',
      'macos-window-controls glass',
      'border-b border-border/20',
      'transition-colors duration-200',
    )}>
      <div className="flex items-center">
        {isElectron ? (
          <>
            <button 
              className="macos-window-control macos-close" 
              aria-label="Close window"
              onClick={() => isElectron && window.electron?.closeWindow()}
            />
            <button 
              className="macos-window-control macos-minimize" 
              aria-label="Minimize window"
              onClick={() => isElectron && window.electron?.minimizeWindow()}
            />
            <button 
              className="macos-window-control macos-maximize" 
              aria-label="Maximize window"
              onClick={() => isElectron && window.electron?.maximizeWindow()}
            />
          </>
        ) : (
          // Fallback for browser
          <>
            <div className="macos-window-control macos-close" />
            <div className="macos-window-control macos-minimize" />
            <div className="macos-window-control macos-maximize" />
          </>
        )}
      </div>
      <div className="flex-1 text-center text-xs text-muted-foreground font-medium select-none">
        NeuralFit
      </div>
    </div>
  );
}
