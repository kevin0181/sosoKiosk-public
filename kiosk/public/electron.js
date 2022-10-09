const {app, BrowserWindow, dialog} = require('electron');
const path = require("path");
const url = require('url');
const {autoUpdater} = require("electron-updater");
const log = require('electron-log');
const ProgressBar = require('electron-progressbar');

function createWindow() {

    // 자동 업데이트 등록
    autoUpdater.checkForUpdates();

    const win = new BrowserWindow({
        webPreferences: {
            webSecurity: false,
        }
    });
    win.kiosk = true;
    win.setMenu(null);
    // console.log(process.env.ELECTRON_START_URL);
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    // const startUrl = 'http://localhost:3000'


    win.loadURL(startUrl);

}

let progressBar;

autoUpdater.on('checking-for-update', () => {
    log.info('업데이트 확인 중...');
});
autoUpdater.on('update-available', (info) => {
    log.info('업데이트가 가능합니다.');
    progressBar = new ProgressBar({
        text: '새로운 파일을 다운받고 있습니다.',
        detail: '잠시만 기다려주세요....',
    });
});
autoUpdater.on('update-not-available', (info) => {
    log.info('현재 최신버전입니다.');
});
autoUpdater.on('error', (err) => {
    log.info('에러가 발생하였습니다. 에러내용 : ' + err);
});

autoUpdater.on('update-downloaded', (info) => {
    log.info('업데이트가 완료되었습니다.');
    progressBar.close();
    app.quit();
});

app.on('window-all-closed', () => {
    app.quit();
})

app.on('ready', createWindow);