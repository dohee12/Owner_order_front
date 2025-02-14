import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window-minimize"),
  toggleFullScreen: () => ipcRenderer.send("window-toggle-fullscreen"),
  toggleMaximize: () => ipcRenderer.send("window-toggle-maximize"),
});
