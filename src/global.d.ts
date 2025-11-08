import type { Slides } from "../electron/lib/yaml";

declare global {
    interface Window {
        api: {
            getSlides: (yaml_name: string) => Promise<Slides>;
        };
    }
}
