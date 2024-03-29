const { app, BrowserWindow, ipcMain, shell } = require('electron');
const storage = require('electron-storage');
const path = require('path');
const axios = require('axios');

import { createGameWindow } from './game';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let launcherWindow;
let profiles = [];

const createLauncherWindow = () => {
  // Create the browser window.
  launcherWindow = new BrowserWindow({
    width: 800,
    height: 420,
    autoHideMenuBar: true,
    show: false,
    resizable: true,
    icon: "icons/128x128.png",
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    },
  });

  // and load the index.html of the app.
  launcherWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  let wc = launcherWindow.webContents
  wc.on('will-navigate', function (e, url) {
    if (url != wc.getURL()) {
      e.preventDefault()
      shell.openExternal(url)
    }
  });

  storage.isPathExists('profiles.json', itDoes => {
    if (itDoes) {
      storage.get('profiles')
        .then(data => {
          profiles = data;
          if (profiles.length > 0) currentProfile = profiles[0]
        })
        .catch(err => console.log(err))
    }
  })

  launcherWindow.once('ready-to-show', () => {
    launcherWindow.show()
  });
};

ipcMain.handle('news', async () => {
  const result = await axios.get("https://universe.flyff.com/news");
  return result.data;
})

ipcMain.handle('launchGame', async (event, { profileName }) => {
  createGameWindow(profileName);
})

ipcMain.handle('setProfiles', async (event, { newProfiles }) => {
    profiles = newProfiles;
    storage.set('profiles', profiles).catch(err => console.log(err));
})

ipcMain.handle('getProfiles', () => profiles);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createLauncherWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createLauncherWindow();
  }
});