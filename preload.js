const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize'),
    maximizeRestore: () => ipcRenderer.send('maximizeRestoreApp'),
    close: () => ipcRenderer.send('close'),
    isMaximized: (callback) => ipcRenderer.on('isMaximized', callback),
    isRestored: (callback) => ipcRenderer.on('isRestored', callback),
})


