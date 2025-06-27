import { ReactNode } from 'react';

declare module 'next' {
  export interface LayoutProps {
    children: ReactNode;
  }

  export interface PageProps {
    params: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  }
}

declare module 'next/app' {
  export interface AppProps {
    Component: {
      getLayout?: (page: ReactNode) => ReactNode;
    } & import('next').NextComponentType<import('next').NextPageContext>;
    pageProps: Record<string, unknown>;
  }
}
