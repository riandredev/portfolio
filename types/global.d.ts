import { Post } from './post'

declare global {
  interface Window {
    __PRELOADED_POSTS__?: Post[]
  }
}

declare module '*.glb' {
    const content: string;
    export default content;
  }

  declare module '*.png' {
    const content: string;
    export default content;
  }

  declare module 'meshline' {
    export const MeshLineGeometry: any;
    export const MeshLineMaterial: any;
  }

  declare global {
    namespace JSX {
      interface IntrinsicElements {
        meshLineGeometry: any;
        meshLineMaterial: any;
      }
    }
  }

export {}
