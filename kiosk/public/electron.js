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
    // win.setMenu(null);
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    win.loadURL(startUrl);

}

let progressBar;

autoUpdater.on('checking-for-update', () => {
    log.info('업데이트 확인 중...');
});

/* 업데이트가 가능한지 확인하는 부분이다.
업데이트가 가능한 경우 팝업이 뜨면서 업데이트를 하겠냐고 묻는다.
Update를 클릭하면 업데이트 가능한 파일을 다운로드 받는다. */
autoUpdater.on('update-available', () => {
    log.info('업데이트가 가능합니다.');
    dialog
        .showMessageBox({
            type: 'info',
            title: 'Update available',
            message:
                'A new version of Project is available. Do you want to update now?',
            buttons: ['Update', 'Later'],
        })
        .then((result) => {
            const buttonIndex = result.response;

            if (buttonIndex === 0) autoUpdater.downloadUpdate();
        });
});

autoUpdater.on('update-not-available', (info) => {
    log.info('현재 최신버전입니다.');
});
autoUpdater.on('error', (err) => {
    log.info('에러가 발생하였습니다. 에러내용 : ' + err);
});
autoUpdater.once('download-progress', (progressObj) => {
    progressBar = new ProgressBar({
        text: 'Downloading...',
        detail: 'Downloading...',
    });
    progressBar
        .on('completed', function () {
            console.info(`completed...`);
            progressBar.detail = 'Task completed. Exiting...';
        })
        .on('aborted', function () {
            console.info(`aborted...`);
        });
});

// 업데이트를 다운받고 나면 업데이트 설치 후 재시작을 요청하는 팝업이 뜬다.
autoUpdater.on('update-downloaded', (info) => {
    log.info('업데이트가 완료되었습니다.');
    progressBar.setCompleted();
    dialog
        .showMessageBox({
            type: 'info',
            title: 'Update ready',
            message: 'Install & restart now?',
            buttons: ['Restart', 'Later'],
        })
        .then((result) => {
            const buttonIndex = result.response;

            if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true);
        });
});


app.on('window-all-closed', () => {
    app.quit();
})

app.on('ready', createWindow);