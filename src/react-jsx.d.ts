/* eslint-disable @typescript-eslint/no-namespace */
declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: string): React.ReactElement;
  export function jsxs(type: any, props: any, key?: string): React.ReactElement;
  export const Fragment: React.FC<{children?: React.ReactNode}>;
}