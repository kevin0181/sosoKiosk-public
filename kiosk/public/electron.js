const {app, BrowserWindow} = require('electron');
const path = require("path");
const url = require('url');


function createWindow() {

    const win = new BrowserWindow({
        webPreferences: {
            webSecurity: false,
        }
    });
    win.kiosk = true;
    win.setMenu(null);
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    win.loadURL(startUrl);

}

app.on('window-all-closed', () => {
    app.quit();
})

app.on('ready', createWindow);