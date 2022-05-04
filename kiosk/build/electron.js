const {app, BrowserWindow} = require('electron');
const path = require("path");
const url = require('url');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: false,
        }
    });
    win.kiosk = true;
    // win.loadFile("./kiosk/index.html");
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    win.loadURL(startUrl);
}

app.on('ready', createWindow);