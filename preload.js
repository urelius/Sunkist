const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getNews: () => ipcRenderer.invoke('news'),
    launchGame: () => ipcRenderer.invoke('launchGame')
});