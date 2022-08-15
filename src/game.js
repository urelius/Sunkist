const { BrowserWindow } = require('electron');

const createGameWindow = (profile) => {
  const flyffWin = new BrowserWindow({
    autoHideMenuBar: true,
    show: false,
    icon: 'icons/128x128.png',
    webPreferences: {
      partition: profile.id ? `persist:${profile.id}` : undefined,
    },
  });

  flyffWin.maximize();

  flyffWin.loadURL('https://universe.flyff.com/play');

  const titleProfile = profile.name ? `- ${profile.name} | ${profile.id}` : '';

  flyffWin.once('ready-to-show', () => {
    flyffWin.setTitle(`Flyff Universe ${titleProfile}`);
    flyffWin.show();
  });
};

export default createGameWindow;
