import axios from "axios";
import serverUrl from "../../pages/config/server.json";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const longReceipt = (saveData, orderNumber) => { //영수증 출력 O
    if (saveData === null) {
        alert("주문을 저장할 수 없습니다. 관리자를 호출해주세요 (error : 1001)");
        return false;
    }

    sendByServerOrder(saveData, orderNumber);
}

export const shortReceipt = (saveData, orderNumber) => { //영수증 출력 X
    if (saveData === null) {
        alert("주문을 저장할 수 없습니다. 관리자를 호출해주세요 (error : 1001)");
        return false;
    }

    sendByServerOrder(saveData, orderNumber);

}

const sendByServerOrder = (saveData, orderNumber) => {

    console.log(saveData);

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

const cancelOrderData = async (saveData) => {
    const response = await axios.post('http://' + serverUrl.server + '/kiosk/menu/cancel/saveMenu', saveData, {
        headers: {
            "Content-Type": `application/json`,
        },
    });
    return response.data;
}