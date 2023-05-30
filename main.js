// main process = backend
// renderer process = frontend

const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

// process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Pomodoro Timer',
        width: isDev ? 600 : 400,
        // width: 450,
        height: 350,
        // minHeight: 350,
        // maxHeight: 350,
        // minWidth: 450,
        // maxWidth: 450,
        frame: false,
        preload: path.join(__dirname, 'preload.js'),
        webPreferences: {
            nodeIntegration: true,
            sandbox: false,

            //This is the statement that gives me problems.
            // By changing contextIsolation: false it renders the jquery inaccessible
            contextIsolation: true,



        },
    });
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadFile(path.join(__dirname, './renderer/mainWindow.html'));

    // CLOSE APP
    ipc.on('closeApp', ()=> {
        mainWindow.close();
    })

    // MINIMIZE APP
    ipc.on('minimizeApp', ()=> {
        mainWindow.minimize();
    })

    mainWindow.on('maximize', ()=>{
        mainWindow.webContents.send('isMaximized');
    })

    mainWindow.on('unmaximize', ()=>{
        mainWindow.webContents.send('isRestored')
    })

    // MAXIMIZE APP
    ipc.on('maximizeRestoreApp', ()=> {
        if (mainWindow.isMaximized()) {
            mainWindow.restore();
        }
        else {
            mainWindow.maximize();
        }
    })
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