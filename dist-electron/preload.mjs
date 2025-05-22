"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => electron.ipcRenderer.send("window-minimize"),
  toggleFullScreen: () => electron.ipcRenderer.send("window-toggle-fullscreen"),
  toggleMaximize: () => electron.ipcRenderer.send("window-toggle-maximize")
});
