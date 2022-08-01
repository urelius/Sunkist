const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getNews: () => ipcRenderer.invoke("news"),
  launchGame: (profile) =>
    ipcRenderer.invoke("launchGame", profile),
  getProfiles: () => ipcRenderer.invoke("getProfiles"),
  setProfiles: (newProfiles) =>
    ipcRenderer.invoke("setProfiles", { newProfiles }),
});
