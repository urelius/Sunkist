const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getNews: () => ipcRenderer.invoke('news'),
    launchGame: () => ipcRenderer.invoke('launchGame'),
    getProfiles: () => ipcRenderer.invoke('getProfiles'),
    setProfiles: (newProfiles) => ipcRenderer.invoke('setProfiles', { newProfiles }),
    switchProfile: (profileName) => ipcRenderer.invoke('switchProfile', {profileName })
});