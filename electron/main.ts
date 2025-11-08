import path from "node:path";
import { cwd } from "node:process";
import { app, BrowserWindow, ipcMain } from "electron";
import { readAllSlides, readAndParseYaml } from "./lib/yaml";

export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(cwd(), "public", "gear-round-svgrepo-com.svg"),
        webPreferences: {
            preload: path.join(cwd(), "dist-electron", "preload.mjs"),
        },
    });

    // Test active push message to Renderer-process.
    win.webContents.on("did-finish-load", () => {
        win?.webContents.send("main-process-message", new Date().toLocaleString());
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        win.loadFile(path.join(cwd(), "dist", "index.html"));
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
        win = null;
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(() => {
    ipcMain.handle("getSlides", (_e, yaml_name) => readAllSlides(readAndParseYaml(yaml_name)));
    createWindow();
});
