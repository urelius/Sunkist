const { app, BrowserWindow, globalShortcut} = require('electron')


let flyffWin;

function createWindow () {
  flyffWin = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    show: false,
    icon: "icon.png"
  })

  flyffWin.loadURL('https://universe.flyff.com/play')

  flyffWin.once('ready-to-show', () => {
    flyffWin.show()
  })
}

app.whenReady().then(() => {
  }).then(createWindow)



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})