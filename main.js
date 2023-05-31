// main process = backend
// renderer process = frontend
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV === 'production';
const isMac = process.platform === 'darwin';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Pomodoro Timer',
        width: isDev ? 600 : 400,
        // width: 450,
        height: 300,
        minHeight: 250,
        // maxHeight: 450,
        minWidth: 450,
        // maxWidth: 550,
        icon: 'assets/icons/png/icon.png',
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    // MINIMIZE APP
    ipcMain.on('minimize', (event, title) => {
        mainWindow.minimize();
    })

    // CLOSE APP
    ipcMain.on('close', ()=> {
        mainWindow.close();
    })

    // MAXIMIZE APP
    ipcMain.on('maximizeRestoreApp', ()=> {
        if (mainWindow.isMaximized()) {
            console.log("clicked on restore.");
            mainWindow.restore();
        }
        else {
            console.log("clicked on maximize.")
            mainWindow.maximize();
        }
    })

    mainWindow.on('maximize', ()=>{
        mainWindow.webContents.send('isMaximized');
        console.log("sent is maximized to the renderer process.");
    })

    mainWindow.on('unmaximize', ()=>{
        mainWindow.webContents.send('isRestored');
        console.log("sent is restored to the renderer process..");

    })

    // Open devtools if in dev env
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
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


