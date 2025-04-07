import { app, BrowserWindow, Menu, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  // 앱 전체의 메뉴바를 제거합니다.
  Menu.setApplicationMenu(null);

  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
    autoHideMenuBar: true,
    titleBarStyle: "hidden", // 타이틀바 숨김 (단, 창 드래그 영역 등은 남아 있음)
    frame: false, // OS 기본 창 테두리와 타이틀바 제거
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(`${VITE_DEV_SERVER_URL}#/`);
    // 개발 모드일 때 개발자 도구 자동 오픈
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"), { hash: "/" });
  }
}

// IPC 이벤트로 창 최소화/최대화/전체화면 토글 기능 구현
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
