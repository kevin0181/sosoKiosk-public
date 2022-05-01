const {app, BrowserWindow} = require('electron');
const path = require("path");
const env = process.env.NODE_ENV || 'development';

app.commandLine.appendSwitch('ignore-certificate-errors');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: false,
        }
    });
    win.kiosk = true;
    win.loadFile("./kiosk/index.html");
}

app.on('ready', createWindow);


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
})


// If development environment 라이브 화면
if (env === 'development') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit'
    });
}
