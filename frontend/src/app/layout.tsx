import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { BottomNav } from '@/components/bottom-nav-new';
import { AuthProvider } from '@/components/auth-provider';
import { AuthProvider as CustomAuthProvider } from '@/hooks/useAuth';
import { ThemeProvider } from '@/components/theme-provider';
import { WindowSystemProvider } from '@/components/window-system';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'NeuralFit',
  description: 'Your personal AI therapist and mental wellness companion',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  applicationName: 'NeuralFit',
  authors: [{ name: 'NeuralFit Team' }],
  generator: 'Next.js',
  keywords: ['therapy', 'mental health', 'AI', 'counseling', 'wellness'],
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  colorScheme: 'light dark',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={cn(
        'h-full',
        inter.variable,
        'antialiased',
        'bg-background text-foreground',
        'transition-colors duration-200',
        'motion-reduce:transition-none motion-reduce:transform-none',
      )}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.variable
      )}>
        <AuthProvider>
          <CustomAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <WindowSystemProvider>
                <TooltipProvider delayDuration={300}>
                  <div className="flex flex-col min-h-screen">
                    <main className="flex-1 overflow-y-auto pb-16">
                      {children}
                    </main>
                    <BottomNav />
                  </div>
                  <Toaster position="top-center" richColors />
                </TooltipProvider>
              </WindowSystemProvider>
            </ThemeProvider>
          </CustomAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
