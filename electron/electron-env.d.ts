/// <reference types="vite-plugin-electron/electron-env" />

import { Slides } from "./lib/yaml";

// Used in Renderer process, expose in `preload.ts`
interface Window {
    api: {
        getSlides: () => Slides;
    };
}
