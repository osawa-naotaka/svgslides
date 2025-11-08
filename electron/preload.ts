import { contextBridge, ipcRenderer } from "electron";
import type { Slides } from "./lib/yaml";

contextBridge.exposeInMainWorld("api", {
    getSlides: async (yaml_name: string): Promise<Slides> => ipcRenderer.invoke("getSlides", yaml_name),
});
