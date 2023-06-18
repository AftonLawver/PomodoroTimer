// main process = backend
// renderer process = frontend
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;

function createLoginWindow() {
    const loginWindow = new BrowserWindow({
        title: 'Login',
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
        loginWindow.minimize();
    })

    // CLOSE APP
    ipcMain.on('close', ()=> {
        loginWindow.close();
    })

    // MAXIMIZE APP
    ipcMain.on('maximizeRestoreApp', ()=> {
        if (loginWindow.isMaximized()) {
            console.log("clicked on restore.");
            loginWindow.restore();
        }
        else {
            console.log("clicked on maximize.")
            loginWindow.maximize();
        }
    })

    loginWindow.on('maximize', ()=>{
        loginWindow.webContents.send('isMaximized');
        console.log("sent is maximized to the renderer process.");
    })

    loginWindow.on('unmaximize', ()=>{
        loginWindow.webContents.send('isRestored');
        console.log("sent is restored to the renderer process..");
    })

    ipcMain.on('openMainWindow', ()=> {
        createMainWindow();
    })

    if (isDev) {
        loginWindow.webContents.openDevTools();
    }
    loginWindow.loadFile(path.join(__dirname, './renderer/login.html'));
}

function createMainWindow() {
    let mainWindow = new BrowserWindow({
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
        show: true,
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
        mainWindow = null;
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

    ipcMain.on('openSettingsWindow', ()=>{
        createSettingsWindow();
    })

    // Open devtools if in dev env
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadFile(path.join(__dirname, './renderer/mainWindow.html'));

    mainWindow.once('ready-to-show', ()=> {
        mainWindow.show();
    })
}

function createSettingsWindow() {
    settingsWindow = new BrowserWindow({
        title: 'User Settings',
        width: isDev ? 600 : 400,
        // width: 450,
        height: 300,
        minHeight: 250,
        // maxHeight: 450,
        minWidth: 450,
        // maxWidth: 550,
        icon: 'assets/icons/png/icon.png',
        frame: false,
        show: true,
        parent: mainWindow, // Make sure to add parent window here

        // Make sure to add webPreferences with below configuration
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: true,
        },
    });

    // MINIMIZE APP
    ipcMain.on('minimize', (event, title) => {
        settingsWindow.minimize();
    })

    // CLOSE APP
    ipcMain.on('close', ()=> {
        settingsWindow.close();
    })

    // MAXIMIZE APP
    ipcMain.on('maximizeRestoreApp', ()=> {
        if (settingsWindow.isMaximized()) {
            console.log("clicked on restore.");
            settingsWindow.restore();
        }
        else {
            console.log("clicked on maximize.")
            settingsWindow.maximize();
        }
    })

    settingsWindow.on('maximize', ()=>{
        settingsWindow.webContents.send('isMaximized');
        console.log("sent is maximized to the renderer process.");
    })

    settingsWindow.on('unmaximize', ()=>{
        settingsWindow.webContents.send('isRestored');
        console.log("sent is restored to the renderer process..");
    })

    // Open devtools if in dev env
    if (isDev) {
        settingsWindow.webContents.openDevTools();
    }


    // Child window loads settings.html file
    settingsWindow.loadFile(path.join(__dirname, './renderer/settings.html'));

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


