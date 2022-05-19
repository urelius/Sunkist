const { app, ipcMain, shell, BrowserWindow, globalShortcut} = require('electron')
const axios = require('axios');

let launcherWin;
let flyffWin;


const createLauncherWindow = () => {
  launcherWin = new BrowserWindow({
    width: 767,
    height: 400,
    autoHideMenuBar: true,
    show: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    },
  })

  launcherWin.loadFile('launcher.html');

  // Force links to open in browser inside the launcher
  let wc = launcherWin.webContents
  wc.on('will-navigate', function (e, url) {
    if (url != wc.getURL()) {
      e.preventDefault()
      shell.openExternal(url)
    }
  })

  launcherWin.once('ready-to-show', () => {
    launcherWin.show()
  });
}

const createGameWindow = () => {
  flyffWin = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    show: false,
  })

  flyffWin.loadURL('https://universe.flyff.com/play');

  flyffWin.once('ready-to-show', () => {
    flyffWin.show()
  });
}

ipcMain.handle('news', async () => {
  const result = await axios.get("https://universe.flyff.com/news");
  return result.data;
})

ipcMain.handle('launchGame', async () => {
  createGameWindow();
})

app.whenReady().then(() => {
  
  createLauncherWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createLauncherWindow()
  }
})
