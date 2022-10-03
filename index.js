const { app, BrowserWindow } = require('electron');
const url = require("url");
const path = require("path");
const { fork } = require('child_process');

let mainWindow;
let splash;

const splashTemplate = () => {
    return (`
    <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">        
        </head>
        <body>
            <div style="text-align:center;vertical-align:middle;background-color:#cecece;margin:0;padding:20px">
                <h1 align="center">Solution by <br/> Nishad Nerurkar </h1>
            </div>
        </body>
    </html>
    `)
  }

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

function createSplash(){
    splash = new BrowserWindow({ 
        width: 300, 
        height: 200, 
        transparent: true, 
        frame: false, 
        alwaysOnTop: true 
      });

      var file = 'data:text/html;charset=UTF-8,' + encodeURIComponent(splashTemplate());
      
      splash.loadURL(file);
      splash.center();      
}

app.whenReady().then(() => {
    createSplash();
    const child = fork(path.join(__dirname, '/serverproc.js'), [], {
        stdio: 'pipe'
    });
    child.on('message',(evt)=>{
        if (evt.status === true){
            createWindow();
            splash.close();        
        }
    });
    
  
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