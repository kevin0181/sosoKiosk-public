import axios from "axios";
import serverUrl from "../../../pages/config/server.json";
import {getSettingData, getTax, numberReceipt} from "../../kiosk/receipt";
import $ from "jquery";
import {checkPrinterStatus, cutPaper, getPosData, printQRCode, printText, setPosId} from "../../all/printer/bxlpos";
import {requestPrint} from "../../all/printer/bxlcommon";


let getSettingTax;
let leaderName;
let readerNo;
let businessNumber;

let issueID = 1;
let _inch = 2;

let printerName = "Printer1";

export const cancelPay = (data, menuModalContentChange, setDataFun, allData) => {

    if (data.orderPayStatus === 'card') {
        if (data.orderApprovalNo === null) {
            menuModalContentChange({
                status: true,
                modalType: 'adminTotalModal',
                modalTitle: '알림 메시지',
                modalContent: '결제 정보가 없습니다.'
            });
            return false;
        }
    }

    if (data.orderPayStatus === 'money') {

        requestCancelMoneyPay(data.order_sq).then(function (res) {
            if (res) {

                let deleteAllData = allData.order.filter((it) => it.order_sq !== data.order_sq);
                setDataFun({
                    ...allData,
                    ['order']: deleteAllData
                });

                menuModalContentChange({
                    status: true,
                    modalType: 'adminTotalModal',
                    modalTitle: '알림 메시지',
                    modalContent: '결제가 취소되었습니다.'
                });

            } else {
                alert('취소 오류');
                return false;
            }
        })

    } else if (data.orderPayStatus === 'card') {


        getSettingData().then(function (getSetting) { //setting 가져옴
                getSetting.map((it) => {
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

                let totalPrice = data.orderTotalPrice.toString().padStart((12), '0');

                if (parseInt(getSettingTax) === 0) {
                    alert("세금 오류! 키오스크를 재시작 해주세요.");
                } else if (readerNo == null) {
                    alert("단말기 세팅 오류! 키오스크를 재시작 해주세요");
                }

                let totalTax;
                getTax(parseInt(getSettingTax), totalPrice).then(function (Tax) { //총금액의 10프로 세금
                    totalTax = Tax.toString().padStart((12), '0');

                    let request_msg = "";

                    // 전문길이 마지막에 입력
                    request_msg += String.fromCharCode(2);                     // STX
                    request_msg += "IC";                                       // 거래구분
                    request_msg += "01";                                       // 업무구분
                    request_msg += "0420";                                     // 전문구분
                    request_msg += "N";                                        // 거래형태
                    request_msg += readerNo;                               // 단말기번호 (TEST용 : DPT0TEST03)
                    request_msg += "soso";                                     // 업체정보
                    request_msg += data.orderTelegramNo;                             // 전문일련번호
                    request_msg += " ";                                        // Pos Entry Mode
                    request_msg += "                    ";                		 // 거래고유번호
                    request_msg += "                    ";                     // 암호화하지않은 카드번호
                    request_msg += " ";                                        // 암호화여부
                    request_msg += "                ";                         // SW모델번호
                    request_msg += "                ";                         // CAT or Reader 모델번호
                    request_msg += "                                        "; // 암호화정보
                    request_msg += "                                     ";    // 카드번호
                    request_msg += String.fromCharCode(28);                    // FS
                    request_msg += "00";                                       // 할부개월수
                    request_msg += totalPrice;                                  // 총금액
                    request_msg += "000000000000";                             // 봉사료
                    request_msg += totalTax;                                    // 세금
                    request_msg += "000000000000";                             // 공급금액
                    request_msg += "000000000000";                             // 면세금액
                    request_msg += "  ";                                       // WorkingKey Index
                    request_msg += "                ";                         // 비밀번호

                    request_msg += data.orderApprovalNo;                   				 // 원거래승인번호 (* 원거래 승인번호 입력)
                    for (let i = 0; i < 12 - data.orderApprovalNo.length; i++) {
                        request_msg += " ";
                    }		   				 // 필드 데이터가 작을 시 보완

                    request_msg += data.orderTradeTime;                          // 원거래승인일자 (* 원거래 승인일자 입력)
                    for (let i = 0; i < 6 - data.orderTradeTime.length; i++) {
                        request_msg += " ";
                    }		   				 // 필드 데이터가 작을 시 보완

                    for (let i = 0; i < 163; i++) {
                        request_msg += " ";
                    }		   				 // 사용자정보~DCC
                    request_msg += "X";                                        // 전자서명유무 (5만원 이하는 X = 무서명, 그 외엔 KSCAT 이미지 저장을 위해 "F")
                    request_msg += String.fromCharCode(3);                    // ETX
                    request_msg += String.fromCharCode(13);                		 // CR

                    var telegramLen = ("" + request_msg.length).fillZero(4);   // 길이

                    request_msg = telegramLen + request_msg;

                    request_msg = "AP" + request_msg;

                    $.ajax
                    ({
                        url: "http://127.0.0.1:27098",
                        type: "POST",
                        dataType: "jsonp",
                        jsonp: "callback",
                        data: {"REQ": request_msg},
                        success: function (getRes) {

                            console.log(getRes);

                            if (getRes.RES === "0000" && getRes.RESPCODE === "0000") {

                                requestCancelCardPay(data.order_sq).then(function (res) {
                                    console.log(res);
                                    if (res) {

                                        let deleteAllData = allData.order.filter((it) => it.order_sq !== data.order_sq);
                                        setDataFun({
                                            ...allData,
                                            ['order']: deleteAllData
                                        });

                                        menuModalContentChange({
                                            status: true,
                                            modalType: 'adminTotalModal',
                                            modalTitle: '알림 메시지',
                                            modalContent: '결제가 취소되었습니다.'
                                        });

                                    } else {
                                        alert('취소 오류');
                                        return false;
                                    }
                                });

                            } else if (getRes.RESPCODE === "7001") {
                                modalSend(menuModalContentChange, 'adminTotalModal', '취소 실패', "이미 취소된 거래입니다. (데이터 삭제 희망 시 관리자 호출) : " + getRes.RESPCODE, '', '');
                            } else if (getRes.RESPCODE === "7003") {
                                modalSend(menuModalContentChange, 'adminTotalModal', '취소 실패', "원거래 내역이 없습니다. : " + getRes.RESPCODE, '', '');
                            } else if (getRes.RESPCODE === "8000") {
                                modalSend(menuModalContentChange, 'adminTotalModal', '취소 실패', "신용카드가 맞지 않습니다. : " + getRes.RESPCODE, '', '');
                            } else if (getRes.RESPCODE === "8009") {
                                modalSend(menuModalContentChange, 'adminTotalModal', '취소 실패', "취소 금액이 입력되지 않았습니다. : " + getRes.RESPCODE, '', '');
                            } else if (getRes.RESPCODE === "8324") {
                                modalSend(menuModalContentChange, 'adminTotalModal', '취소 실패', "거래가 정지된 카드입니다. : " + getRes.RESPCODE, '', '');
                            } else if (getRes.RESPCODE === "8326") {
                                modalSend(menuModalContentChange, 'adminTotalModal', '취소 실패', "한도액 초과 : " + getRes.RESPCODE, '', '');
                            } else if (getRes.RESPCODE === "8350") {
                                modalSend(menuModalContentChange, 'adminTotalModal', '취소 실패', "도난 및 분실카드 입니다. : " + getRes.RESPCODE, '', '');
                            } else if (getRes.RESPCODE === "8381") {
                                modalSend(menuModalContentChange, 'adminTotalModal', '취소 실패', "전산장애 KSNET 전화요망 : " + getRes.RESPCODE, '', '');
                            } else {
                                modalSend(menuModalContentChange, 'adminTotalModal', '취소 실패', "취소 불가능 : " + getRes.RESPCODE, '', '');
                            }

                        },
                        error: function () {
                            alert("결제 에러 (관리자에게 문의해주세요)");
                        }
                    });


                });
            }
        );

    }
    cancelReceipt(data);

}

const cancelReceipt = (cancelData) => { //취소 영수증

    getTax(parseInt(getSettingTax), parseInt(cancelData.orderTotalPrice)).then(function (Tax) { //총금액의 10프로 세금

        setPosId(issueID);
        checkPrinterStatus();

        printText("\n\n&pastel(취소)\n\n\n", 0, 1, false, false, false, 0, 1);
        printText("\n\n경기도 안산시 \n단원구 예술대학로 171,\n15263, 한국\n\n\n", 0, 0, false, false, false, 0, 1);
        printText("--------------------------------", 0, 0, false, false, false, 0, 1);

        if (_inch == 2) {
            // 2inch sample
            printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
            printText("메뉴        단가    수량    금액\n\n", 0, 0, false, false, false, 0, 0);


            $(cancelData.orderDetailEntityList).each(function () {

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
            printText("  부가세 과세 물품가액 : " + (parseInt(cancelData.orderTotalPrice) - parseInt(Tax)) + "\n", 0, 0, true, false, false, 0, 0);
            printText("           부  과  세  : " + Tax + "\n", 0, 0, true, false, false, 0, 0);
            printText("            --------------------\n", 0, 0, false, false, false, 0, 0);
            printText("               총 금액 : " + cancelData.orderTotalPrice + "\n", 0, 0, true, false, false, 0, 0);
            printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
            printText("        주문 번호 : " + cancelData.orderTelegramNo + "\n\n", 0, 0, false, false, false, 0, 0);

            if (cancelData.orderPlace == "inner") {
                printText("                          매장\n\n", 0, 0, false, false, false, 0, 0);
            } else if (cancelData.orderPlace == "outer") {
                printText("                          포장\n\n", 0, 0, false, false, false, 0, 0);
            }


            if (cancelData.orderPayStatus == "card") {
                printText("결제 방식  : 카드\n", 0, 0, false, false, false, 0, 0);
            } else if (cancelData.orderPayStatus == "money") {
                printText("결제 방식  : 현금\n", 0, 0, false, false, false, 0, 0);
            }

            printText("대 표 자  : " + leaderName + "\n", 0, 0, false, false, false, 0, 0);
            printText("사업자 번호: " + businessNumber + "\n", 0, 0, false, false, false, 0, 0);
            printText("주문 시각 : " + cancelData.orderDate + "\n\n\n", 0, 0, false, false, false, 0, 0);

            if (cancelData.orderPayStatus === 'card') {
                printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                printText("신용 승인 정보\n\n", 0, 0, false, false, false, 0, 1);
                printText("승인번호 : " + cancelData.orderApprovalNo + "\n\n\n", 0, 0, false, false, false, 0, 0);
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

        console.log(strSubmit);

        issueID++;

        requestPrint(printerName, strSubmit, viewResult);

    });

}

const modalSend = (menuModalContentChange, modalType, modalTitle, modalContent, cardPayData, cardInfo) => {
    menuModalContentChange({
        status: true,
        param: '',
        modalType: modalType,
        modalTitle: modalTitle,
        modalContent: modalContent,
        menu: '',
        cardPayData: cardPayData,
        cardInfo: cardInfo
    });
}


export const requestCancelCardPay = async (sq) => {
    const response = await axios.post('http://' + serverUrl.server + '/admin/order/cancel/card', null, {
        params: {
            'orderSq': sq
        },
        maxRedirects: 0
    });
    return response.data;
}

export const requestCancelMoneyPay = async (sq) => {
    const response = await axios.post('http://' + serverUrl.server + '/admin/order/cancel/money', null, {
        params: {
            'orderSq': sq
        },
        maxRedirects: 0
    });
    return response.data;
}

String.prototype.fillZero = function (n) {
    let str = this;
    let zeros = "";


    if (str.length < n) {
        for (let i = 0; i < n - str.length; i++) {
            zeros += '0';
        }
    }

    return zeros + str;
}

function FindJSONtoString(Key, object) {
    var results = "";
    for (var property in object) {
        var value = object[property];
        if (value) {
            if (Key == property.toString()) {
                results = value;
                break;
            }
        }
    }

    return results;
}

String.prototype.substrKor = function (idx, len) {
    if (!this.valueOf()) return "";

    var str = this;
    var pos = 0;

    for (var i = 0; pos < idx; i++) {
        pos += (str.charCodeAt(i) > 127) ? 2 : 1;
    }

    var beg = i;
    var byteLen = str.byteLength();
    var lim = 0;

    for (var i = beg; i < byteLen; i++) {
        lim += (str.charCodeAt(i) > 127) ? 2 : 1;

        if (lim > len) {
            str = str.substring(beg, i);
            break;
        }
    }

    return str;
}


function JSONtoString(object) {
    var results = [];
    for (var property in object) {
        var value = object[property];
        if (value) results.push(property.toString() + ': ' + value);
    }

    return '{' + results.join(', ') + '}';
}

String.prototype.byteLength = function () {
    var len = 0;

    for (var i = 0; i < this.length; i++) {
        len += (this.charCodeAt(i) > 127) ? 2 : 1;
    }

    return len;
}

export const afterLongReceipt = async (payInfoData) => { //영수증 출력 O


    if (payInfoData === null) {
        alert("주문을 저장할 수 없습니다. 관리자를 호출해주세요 (error : 1001)");
        return false;
    }

    getSetting().then(function () {
        getTax(parseInt(getSettingTax), parseInt(payInfoData.orderTotalPrice)).then(function (Tax) { //총금액의 10프로 세금

            setPosId(issueID);
            checkPrinterStatus();

            printText("\n\n&pastel\n\n\n", 0, 1, false, false, false, 0, 1);
            printText("\n\n경기도 안산시 \n단원구 예술대학로 171,\n15263, 한국\n\n\n", 0, 0, false, false, false, 0, 1);
            printText("--------------------------------", 0, 0, false, false, false, 0, 1);

            if (_inch == 2) {
                // 2inch sample
                printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                printText("메뉴        단가    수량    금액\n\n", 0, 0, false, false, false, 0, 0);


                $(payInfoData.orderDetailEntityList).each(function () {

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
                printText("  부가세 과세 물품가액 : " + (parseInt(payInfoData.orderTotalPrice) - parseInt(Tax)) + "\n", 0, 0, true, false, false, 0, 0);
                printText("           부  과  세  : " + Tax + "\n", 0, 0, true, false, false, 0, 0);
                printText("            --------------------\n", 0, 0, false, false, false, 0, 0);
                printText("               총 금액 : " + payInfoData.orderTotalPrice + "\n", 0, 0, true, false, false, 0, 0);
                printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                printText("        주문 번호 : " + payInfoData.orderTelegramNo + "\n\n", 0, 0, false, false, false, 0, 0);

                if (payInfoData.orderPlace == "inner") {
                    printText("                          매장\n\n", 0, 0, false, false, false, 0, 0);
                } else if (payInfoData.orderPlace == "outer") {
                    printText("                          포장\n\n", 0, 0, false, false, false, 0, 0);
                }


                if (payInfoData.orderPayStatus == "card") {
                    printText("결제 방식  : 카드\n", 0, 0, false, false, false, 0, 0);
                } else if (payInfoData.orderPayStatus == "money") {
                    printText("결제 방식  : 현금\n", 0, 0, false, false, false, 0, 0);
                }

                printText("대 표 자  : " + leaderName + "\n", 0, 0, false, false, false, 0, 0);
                printText("사업자 번호: " + businessNumber + "\n", 0, 0, false, false, false, 0, 0);
                printText("주문 시각 : " + payInfoData.orderDate + "\n\n\n", 0, 0, false, false, false, 0, 0);

                if (payInfoData.orderPayStatus === 'card') {
                    printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                    printText("신용 승인 정보\n\n", 0, 0, false, false, false, 0, 1);
                    // printText("카 드 명 : " + cardInfo.CARDNAME + "\n", 0, 0, false, false, false, 0, 0);
                    printText("승인번호 : " + payInfoData.orderApprovalNo + "\n\n\n", 0, 0, false, false, false, 0, 0);
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

            console.log(strSubmit);

            issueID++;

            requestPrint(printerName, strSubmit, viewResult);

        });
    });
}


function viewResult(result) {
    console.log(result);
}

const getSetting = async () => {

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