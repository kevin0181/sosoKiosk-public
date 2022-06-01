import axios from "axios";
import serverUrl from "../../pages/config/server.json";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

let getSettingTax;
let leaderName;
let readerNo;
let businessNumber;

let issueID = 1;
let _inch = 2;

let printerName = "Printer1";


export const longReceipt = (saveData, orderNumber) => { //영수증 출력 O
    if (saveData === null) {
        alert("주문을 저장할 수 없습니다. 관리자를 호출해주세요 (error : 1001)");
        return false;
    }

    sendByServerOrder(saveData, orderNumber).then(function () {
        console.log(123);
        getSettingData().then(function () {

        });
    });
}

export const shortReceipt = (saveData, orderNumber) => { //영수증 출력 X
    if (saveData === null) {
        alert("주문을 저장할 수 없습니다. 관리자를 호출해주세요 (error : 1001)");
        return false;
    }

    sendByServerOrder(saveData, orderNumber).then(function () {
        getSettingData().then(function () {

        });
    });

}

const sendByServerOrder = async (saveData, orderNumber) => {

    let moneyStompClient;
    let sosoServerStatus;

    moneyStompClient = Stomp.over(new SockJS('https://soso-kitchen.com/user/websocket'));

    moneyStompClient.connect({}, function (frame) {
        sosoServerStatus = moneyStompClient.connected;

        if (sosoServerStatus === false) {
            alert('소소한 부엌 서버가 꺼져있습니다.');//서버 꺼져있으면 모달 띄움
            return false;
        }

        moneyStompClient.send("/order/kiosk", {}, JSON.stringify({
            "orderMenu": saveData.orderMenu,
            "orderData": saveData,
            "orderNumber": ("M-" + orderNumber)
        }));

    });

}

const getSettingData = async () => {
    const response = await axios.get('http://' + serverUrl.server + '/kiosk/get/setting', {
        params: {
            "setting": "all"
        }
    });
    response.data.map((it) => {
        switch (it.settingName) {
            case 'tax':
                getSettingTax = Number(it.settingValue);
                break;
            case 'readerNo':
                readerNo = it.settingValue
                break;
            case 'leaderName':
                leaderName = it.settingValue
                break;
            case 'businessNumber':
                businessNumber = it.settingValue
                break;
            case 'printerName':
                printerName = it.settingValue
                break;
        }
    });
}