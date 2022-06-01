import axios from "axios";
import serverUrl from "../../pages/config/server.json";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import $ from 'jquery';
import {checkPrinterStatus, cutPaper, getPosData, printQRCode, printText, setPosId} from "../all/printer/bxlpos";
import {requestPrint} from "../all/printer/bxlcommon";

let getSettingTax;
let leaderName;
let readerNo;
let businessNumber;

let issueID = 1;
let _inch = 2;

let printerName = "Printer1";

export const longReceipt = (saveData, orderNumber, menuModalStatus) => { //영수증 출력 O
    if (saveData === null) {
        alert("주문을 저장할 수 없습니다. 관리자를 호출해주세요 (error : 1001)");
        return false;
    }

    let cardPayData;

    if (menuModalStatus.cardPayData !== undefined) {
        cardPayData = menuModalStatus.cardPayData;
    }

    sendByServerOrder(saveData, orderNumber).then(function () {

        getSettingData().then(function () {

            let Tax = getTax(parseInt(getSettingTax), parseInt(saveData.orderTotalPrice)); //총금액의 10프로 세금
            setPosId(issueID);
            checkPrinterStatus();

            printText("\n\n&pastel\n\n\n", 0, 1, false, false, false, 0, 1);
            printText("\n\n경기도 안산시 \n단원구 예술대학로 171,\n15263, 한국\n\n\n", 0, 0, false, false, false, 0, 1);
            printText("--------------------------------", 0, 0, false, false, false, 0, 1);

            if (_inch == 2) {
                // 2inch sample
                printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                printText("메뉴        단가    수량    금액\n\n", 0, 0, false, false, false, 0, 0);


                $(saveData.orderDetailEntityList).each(function () {

                    // printText(" " + this.orderMenuName + "      " + this.orderDetailMenuSize + "        " + this.orderDetailMenuPrice + " \n", 0, 0, false, false, false, 0, 0);

                    printText(this.orderMenuName + "\n", 0, 0, false, false, false, 0, 0);

                    printText(this.orderDetailMenuPrice + "       " + this.orderDetailMenuSize + "       " + (parseInt(this.orderDetailMenuPrice) * parseInt(this.orderDetailMenuSize)) + "\n", 0, 0, false, false, false, 0, 2);

                    if (this.orderDetailSideEntityList.length != 0) {

                        $(this.orderDetailSideEntityList).each(function () {
                            // printText("(SIDE) " + this.orderSideName + "       " + this.orderSideSize + "     " + this.orderSidePrice + " \n", 0, 0, false, false, false, 0, 0);

                            printText("(SIDE) " + this.orderSideName + "\n", 0, 0, false, false, false, 0, 0);

                            printText(this.orderSidePrice + "       " + this.orderSideSize + "       " + (parseInt(this.orderSidePrice) * parseInt(this.orderSideSize)) + "\n", 0, 0, false, false, false, 0, 2);

                        });

                    }

                });

                printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                printText("  부가세 과세 물품가액 : " + (parseInt(saveData.orderTotalPrice) - parseInt(Tax)) + "\n", 0, 0, true, false, false, 0, 0);
                printText("           부  과  세  : " + Tax + "\n", 0, 0, true, false, false, 0, 0);
                printText("            --------------------\n", 0, 0, false, false, false, 0, 0);
                printText("               총 금액 : " + saveData.orderTotalPrice + "\n", 0, 0, true, false, false, 0, 0);
                printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                printText("        주문 번호 : " + saveData.orderTelegramNo + "\n\n", 0, 0, false, false, false, 0, 0);

                if (saveData.orderPlace == "inner") {
                    printText("                          매장\n\n", 0, 0, false, false, false, 0, 0);
                } else if (saveData.orderPlace == "outer") {
                    printText("                          포장\n\n", 0, 0, false, false, false, 0, 0);
                }


                if (saveData.orderPayStatus == "card") {
                    printText("결제 방식  : 카드\n", 0, 0, false, false, false, 0, 0);
                } else if (saveData.orderPayStatus == "money") {
                    printText("결제 방식  : 현금\n", 0, 0, false, false, false, 0, 0);
                }


                printText("대 표 자  : " + leaderName + "\n", 0, 0, false, false, false, 0, 0);
                printText("사업자 번호: " + businessNumber + "\n", 0, 0, false, false, false, 0, 0);
                printText("주문 시각 : " + saveData.orderDate + "\n\n\n", 0, 0, false, false, false, 0, 0);

                if (cardPayData != null) {
                    printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                    printText("신용 승인 정보\n\n", 0, 0, false, false, false, 0, 1);
                    printText("카 드 명 : " + cardPayData.CARDNAME + "\n", 0, 0, false, false, false, 0, 0);
                    printText("승인번호 : " + saveData.orderApprovalNo + "\n\n\n", 0, 0, false, false, false, 0, 0);
                }


            } else {
                // error
                return;
            }

            printText("Tel : 070 - 8888 - 9956\n", 0, 0, true, false, false, 0, 0);
            printText("Homepage : www.soso-kitchen.com\n\n\n\n", 0, 0, false, false, false, 0, 0);

            printQRCode("www.soso-kitchen.com", 0, 2, 7, 0);
            // print1DBarcode("&pastel 인터넷으로 주문하기", 0, 4, 70, 2, 1);
            printText("\n\n\n\n\n", 0, 0, false, false, false, 0, 0);
            cutPaper(1);

            let strSubmit = getPosData();

            issueID++;

            requestPrint(printerName, strSubmit, viewResult);

            numberReceipt(saveData);

        });
    });
}

function viewResult(result) {
    console.log(result);
}

export const shortReceipt = (saveData, orderNumber) => { //영수증 출력 X
    if (saveData === null) {
        alert("주문을 저장할 수 없습니다. 관리자를 호출해주세요 (error : 1001)");
        return false;
    }

    sendByServerOrder(saveData, orderNumber).then(function () {
        numberReceipt(saveData);
    });

}

const numberReceipt = (saveData) => { //번호표 출력

    setPosId(issueID);
    checkPrinterStatus();

    var payStatus = "";

    if (saveData.orderPayStatus === "money") {
        payStatus = "M";
    } else if (saveData.orderPayStatus === "card") {
        payStatus = "C";
    }
    printText("주문 번호\n", 0, 0, true, false, false, 0, 1);
    printText("\n\n" + payStatus + "-" + saveData.orderNumber + "\n\n\n", 0, 3, true, false, false, 0, 1);
    // printText("주문을 진행중입니다.\n", 0, 0, true, false, false, 0, 0);
    printText("\n\n\n\n\n", 0, 0, false, false, false, 0, 0);
    cutPaper(1);
    var strSubmit = getPosData();

    issueID++;

    requestPrint(printerName, strSubmit, viewResult);

    return true;
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

export const getSettingData = async () => {
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

    return response.data;
}

export async function getTax(par, total) {
    return Math.ceil((total * par) / 100);
}