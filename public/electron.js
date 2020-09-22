const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
        // width: 1200,
        // height: 600,
        webPreferences:{
            nodeIntegration: true
        },
        // frame: false
    });
    mainWindow.maximize();
    mainWindow.setMenuBarVisibility(false)
    // mainWindow.webContents.openDevTools();
    // mainWindow.loadURL('http://localhost:3000/')
    mainWindow.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
        );
    


  mainWindow.on('closed', () => mainWindow = null);
  
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});