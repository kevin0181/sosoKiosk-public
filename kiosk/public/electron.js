const {app, BrowserWindow} = require('electron');
const path = require("path");
const url = require('url');
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');


function createWindow() {

    // 자동 업데이트 등록
    autoUpdater.checkForUpdates();

    const win = new BrowserWindow({
        webPreferences: {
            webSecurity: false,
        }
    });
    win.kiosk = true;
    // win.setMenu(null);
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    win.loadURL(startUrl);

}


autoUpdater.on('checking-for-update', () => {
    log.info('업데이트 확인 중...');
});
autoUpdater.on('update-available', (info) => {
    log.info('업데이트가 가능합니다.');
});
autoUpdater.on('update-not-available', (info) => {
    log.info('현재 최신버전입니다.');
});
autoUpdater.on('error', (err) => {
    log.info('에러가 발생하였습니다. 에러내용 : ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "다운로드 속도: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - 현재 ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    log.info(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
    log.info('업데이트가 완료되었습니다.');
});


app.on('window-all-closed', () => {
    app.quit();
})

app.on('ready', createWindow);