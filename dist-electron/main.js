import { ipcMain, app, BrowserWindow, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    },
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    // 타이틀바 숨김 (단, 창 드래그 영역 등은 남아 있음)
    frame: false
    // OS 기본 창 테두리와 타이틀바 제거
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(`${VITE_DEV_SERVER_URL}#/`);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"), { hash: "/" });
  }
}
ipcMain.on("window-minimize", () => {
  if (win) win.minimize();
});
ipcMain.on("window-toggle-fullscreen", () => {
  if (win) win.setFullScreen(!win.isFullScreen());
});
ipcMain.on("window-toggle-maximize", () => {
  if (!win) return;
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
