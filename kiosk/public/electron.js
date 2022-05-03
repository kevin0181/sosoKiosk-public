// const {app, BrowserWindow} = require('electron');
// const path = require("path");
// const env = process.env.NODE_ENV || 'development';
//
// app.commandLine.appendSwitch('ignore-certificate-errors');
//
// function createWindow() {
//     const win = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             webSecurity: false,
//         }
//     });
//     win.kiosk = true;
//     // win.loadFile("./kiosk/index.html");
//     const startUrl = process.env.ELECTRON_START_URL || url.format({
//         pathname: path.join(__dirname, '/../build/index.html'),
//         protocol: 'file:',
//         slashes: true
//     });
//
//     /*
//     * startUrl에 배정되는 url을 맨 위에서 생성한 BrowserWindow에서 실행시킵니다.
//     * */
//     win.loadURL(startUrl);
// }
//
//
// app.on('ready', createWindow);
//
//
// app.on('window-all-closed', function () {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });
//
// app.on('activate', function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
// })
//
//
// // If development environment 라이브 화면
// if (env === 'development') {
//     require('electron-reload')(__dirname, {
//         electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
//         hardResetMethod: 'exit'
//     });
// }

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
    /*
    * 넓이 1920에 높이 1080의 FHD 풀스크린 앱을 실행시킵니다.
    * */
    const win = new BrowserWindow({
        width: 1920,
        height: 1080
    });

    /*
    * ELECTRON_START_URL을 직접 제공할경우 해당 URL을 로드합니다.
    * 만일 URL을 따로 지정하지 않을경우 (프로덕션빌드) React 앱이
    * 빌드되는 build 폴더의 index.html 파일을 로드합니다.
    * */
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