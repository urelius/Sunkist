const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getNews: () => ipcRenderer.invoke('news'),
    launchGame: (profileName) => ipcRenderer.invoke('launchGame', { profileName }),
    getProfiles: () => ipcRenderer.invoke('getProfiles'),
    setProfiles: (newProfiles) => ipcRenderer.invoke('setProfiles', { newProfiles }),
});