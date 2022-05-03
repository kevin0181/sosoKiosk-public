const {app, BrowserWindow} = require('electron');
const path = require("path");

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
    /*
    * startUrl에 배정되는 url을 맨 위에서 생성한 BrowserWindow에서 실행시킵니다.
    * */
    win.loadURL(startUrl);
}

app.on('ready', createWindow);