const { BrowserWindow } = require('electron');

export const createGameWindow = (profileName) => {
    const flyffWin = new BrowserWindow({
      autoHideMenuBar: true,
      show: false, 
      icon: "icons/128x128.png",
      webPreferences: {
        partition: profileName ? `persist:${profileName}` : undefined
      }
    })
  
    flyffWin.maximize();
  
    flyffWin.loadURL('https://universe.flyff.com/play');
  
    const titleProfile = profileName ? `- ${profileName}` : "";
  
    flyffWin.once('ready-to-show', () => {
      flyffWin.setTitle(`Flyff Universe ${titleProfile}`)
      flyffWin.show()
    });
  }