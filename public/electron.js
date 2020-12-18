const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu
const Tray = electron.Tray
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let isQuiting;
let tray;

function createWindow() {
  app.on('before-quit', function () {
    isQuiting = true;
  });

  tray = new Tray(path.join(__dirname, 'download.png'));

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Quit', click: function () {
        isQuiting = true;
        app.quit();
      }
    },
    
  ]));

  tray.on('double-click', () => {
    mainWindow.show();
  })

  mainWindow = new BrowserWindow({
    width: 530,
    height: 420,
    /* webPreferences: {
      devTools: false
      } */
  })
  
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
   // mainWindow.webContents.openDevTools();
  }
  mainWindow.on('minimize',function(event){
    event.preventDefault();
    mainWindow.hide();
});
   mainWindow.show()
  mainWindow.on('closed', () => {
    if (!isQuiting) {
      event.preventDefault();
      window.hide();
      event.returnValue = false;
    }
  });

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