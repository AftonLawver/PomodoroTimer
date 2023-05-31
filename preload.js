const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize'),
    maximizeRestore: () => ipcRenderer.send('maximizeRestoreApp'),
    close: () => ipcRenderer.send('close'),
    isMaximized: () => ipcRenderer.on('isMaximized'),
    isRestored: () => ipcRenderer.on('isRestored'),
})


