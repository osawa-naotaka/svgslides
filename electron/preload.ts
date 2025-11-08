import { contextBridge, ipcRenderer } from "electron";
import type { Slides } from "./lib/yaml";

contextBridge.exposeInMainWorld("api", {
    getSlides: async (): Promise<Slides> => ipcRenderer.invoke("getSlides"),
});
