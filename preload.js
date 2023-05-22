
const { contextBridge  } = require('electron');
const mysql = require('mysql');
const os = require('os');
const path = require('path');


contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args),
    // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld('os', {
    homedir: () => os.homedir(),
    // we can also expose variables, not just functions
});

