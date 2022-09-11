const { app, BrowserWindow } = require('electron');
const url = require("url");
const path = require("path");
const { fork } = require('child_process');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        
        /*webPreferences: {
            nodeIntegration: true
        }*/
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    mainWindow.setMenuBarVisibility(false);
    mainWindow.maximize();    

    mainWindow.on('closed', function () {
        mainWindow = null;
    })
}

app.whenReady().then(() => {
    fork(path.join(__dirname, '/serverproc.js'), [], {
        stdio: 'pipe'
    });
    createWindow();
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
});
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});