import { ReactNode } from 'react';

declare module 'next' {
  export interface LayoutProps {
    children: ReactNode;
  }
}

declare module 'next/app' {
  export interface AppProps {
    Component: NextComponentType<NextPageContext> & {
      getLayout?: (page: ReactNode) => ReactNode;
    };
    pageProps: any;
  }
}
