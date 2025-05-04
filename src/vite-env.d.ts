/// <reference types="vite/client" />

// Vite environment variables
interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_DESCRIPTION: string;
    readonly VITE_APP_ENV: 'development' | 'staging' | 'production';
    readonly VITE_WS_URL: string;
    readonly VITE_STRIPE_PUBLIC_KEY: string;
    readonly VITE_PAYPAL_CLIENT_ID: string;
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
    readonly VITE_SENTRY_DSN: string;
    readonly VITE_ANALYTICS_ID: string;
    // Add more env variables as needed
  }
  
  export interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
  // Module declarations for asset imports
  declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  declare module '*.jpg' {
    const src: string;
    export default src;
  }
  
  declare module '*.jpeg' {
    const src: string;
    export default src;
  }
  
  declare module '*.png' {
    const src: string;
    export default src;
  }
  
  declare module '*.webp' {
    const src: string;
    export default src;
  }
  
  declare module '*.avif' {
    const src: string;
    export default src;
  }
  
  declare module '*.gif' {
    const src: string;
    export default src;
  }
  
  declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
  
  declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
  
  declare module '*.module.sass' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
  
  // Global type declarations
  declare global {
    interface Window {
      // For third-party libraries
      gtag?: (...args: any[]) => void;
      dataLayer?: any[];
      
      // Custom window extensions
      app?: {
        version: string;
        environment: string;
      };
    }
  }
  
  // Styled-components theme declaration
  declare module 'styled-components' {
    export interface DefaultTheme {
      colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        border: string;
        error: string;
        success: string;
        warning: string;
        info: string;
      };
      spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
      breakpoints: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    }
  }
  
  export {};