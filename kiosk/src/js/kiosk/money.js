import {longReceipt} from './receipt';
import {shortReceipt} from "./receipt";
import axios from "axios";
import serverUrl from "../../pages/config/server.json";

export const NoReceiptMoneyPayStart = async (data, orderNumber) => { //영수증 출력 X
    saveData(data).then(function (res) {
        shortReceipt(res, orderNumber);
    });
}

export const YesReceiptMoneyPayStart = async (data, orderNumber) => { //영수증 출력 O
    saveData(data).then(function (res) {
        longReceipt(res, orderNumber, null);
    });
}


const saveData = async (data) => { //주문 DB 전송 저장

    let sendData = {
        "orderMenu": data.orderMenu,
        "totalPrice": (data.totalPrice).toString(),
        "placeStatus": data.placeStatus,
        "payStatus": data.payStatus
    }


    const response = await axios.post('http://' + serverUrl.server + '/kiosk/menu/order/menu', sendData, {
        headers: {
            "Content-Type": `application/json`,
        },
    });
    return response.data;
}