// main process = backend
// renderer process = frontend

const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

process.env.NODE_ENV = 'production';

// const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Pomodoro Timer',
        // width: isDev ? 600 : 400,
        width: 450,
        height: 350,
        minHeight: 350,
        maxHeight: 350,
        minWidth: 450,
        maxWidth: 450,
        autoHideMenuBar: true,
        preload: path.join(__dirname, 'preload.js'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
        },
    });
    // ipcMain.handle('ping', () => 'pong');

    // Open devtools if in dev env
    // if (isDev) {
    //     mainWindow.webContents.openDevTools();
    // }

    mainWindow.loadFile(path.join(__dirname, './renderer/mainWindow.html'));
}

// App is ready

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow(); 
        }
    })
});

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
});