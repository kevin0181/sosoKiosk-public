import {getSettingData, getTax, longReceipt, numberReceipt} from './receipt';
import {shortReceipt} from "./receipt";
import axios from "axios";
import serverUrl from "../../pages/config/server.json";
import $ from 'jquery';

export const NoReceiptMoneyPayStart = async (data, orderNumber, menuModalStatus) => { //영수증 출력 X
    if (data.payStatus === 'card') {
        shortReceipt(menuModalStatus.cardPayData, orderNumber);
    } else {
        saveData(data).then(function (res) {
            shortReceipt(res, orderNumber);
        });
    }
}

export const YesReceiptMoneyPayStart = async (data, orderNumber, menuModalStatus) => { //영수증 출력 O
    if (data.payStatus === 'card') {
        longReceipt(menuModalStatus.cardPayData, orderNumber, menuModalStatus.cardInfo);
    } else {
        saveData(data).then(function (res) {
            longReceipt(res, orderNumber);
        });
    }
}


export const saveData = async (data) => { //주문 DB 전송 저장

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

export const showCardPay = (res, getTotalPrice, menuModalContentChange) => {

    let getSettingTax;
    let leaderName;
    let readerNo;
    let businessNumber;

    let issueID = 1;
    let _inch = 2;

    let printerName = "Printer1";

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

            let totalPrice = getTotalPrice.toString().padStart((12), '0');

            if (parseInt(getSettingTax) === 0) {
                alert("세금 오류! 키오스크를 끈 후 켜주세요.");
            } else if (readerNo == null) {
                alert("단말기 세팅 오류! 키오스크를 끈 후 켜주세요.");
            }

            let totalTax;
            getTax(parseInt(getSettingTax), totalPrice).then(function (Tax) { //총금액의 10프로 세금

                totalTax = Tax.toString().padStart((12), '0');

                let request_msg = "";

                // 전문길이 마지막에 입력
                request_msg += String.fromCharCode(2);                     // STX
                request_msg += "IC";                                       // 거래구분
                request_msg += "01";                                       // 업무구분
                request_msg += "0200";                                     // 전문구분
                request_msg += "N";                                        // 거래형태
                request_msg += readerNo;                               // 단말기번호 (TEST용 : DPT0TEST03) -> 데이터 베이스에서 가져와야함.
                request_msg += "soso";                                     // 업체정보
                request_msg += res.orderTelegramNo;                             // 전문일련번호   <- 가게에서 사용하는 주문 번호
                request_msg += " ";                                        // Pos Entry Mode
                request_msg += "                    ";                		 // 거래고유번호 -> 공백
                request_msg += "                    ";                     // 암호화하지않은 카드번호 -> 공백
                request_msg += " ";                                        // 암호화여부
                request_msg += "                ";                         // SW모델번호
                request_msg += "                ";                         // CAT or Reader 모델번호
                request_msg += "                                        "; // 암호화정보
                request_msg += "                                     ";    // 카드번호
                request_msg += String.fromCharCode(28);                    // FS
                request_msg += "00";                                       // 할부개월수
                request_msg += totalPrice;                             // 총금액
                request_msg += "000000000000";                             // 봉사료
                request_msg += totalTax;                             // 세금
                request_msg += "000000000000";                             // 공급금액
                request_msg += "000000000000";                             // 면세금액
                request_msg += "  ";                                       // WorkingKey Index
                request_msg += "                ";                         // 비밀번호
                request_msg += "            ";                   					 // 원거래승인번호
                request_msg += "      ";                          				 // 원거래승인일자

                for (let i = 0; i < 163; i++) {
                    request_msg += " ";
                }		   				 // 사용자정보~DCC
                request_msg += "X";                                        // 전자서명유무 (5만원 이하는 X = 무서명, 그 외엔 KSCAT 이미지 저장을 위해 "F")
                request_msg += String.fromCharCode(3);                    // ETX
                request_msg += String.fromCharCode(13);                		 // CR

                let telegramLen = ("" + request_msg.length).fillZero(4);   // 길이

                request_msg = telegramLen + request_msg;

                let Message = "AP" + request_msg;

                console.log(Message);

                $.ajax({
                    url: "http://127.0.0.1:27098",
                    type: "POST",
                    dataType: "jsonp",
                    jsonp: "callback",
                    data: {"REQ": Message},
                    success: function (data) {

                        if (data.RES === 1000) { //결제 취소
                            modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 취소', '결제가 취소 되었습니다.', '');
                        }
                        if (data.RES === "0000" && data.RESPCODE === "0000") {
                            let approvalNo = FindJSONtoString("APPROVALNO", data);					// 승인번호
                            let tradeTime = FindJSONtoString("TRADETIME", data).substrKor(0, 6);	// 승인일시
                            let tradeUniqueNo = FindJSONtoString("TRADEUNIQUENO", data);				// VANTR
                            let oriApprovalNo = FindJSONtoString("ORIAPPROVALNO", data);			// 원거래승인번호
                            res.orderApprovalNo = approvalNo;
                            res.orderTradeTime = tradeTime;
                            res.orderTradeUniqueNo = tradeUniqueNo;

                            cardPayAfterSaveOrder(res).then(function () {
                                modalSend(menuModalContentChange, 'checkReceipt', '', '', res, data);
                            });

                        } else if (data.RESPCODE === "1001") {
                            modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 실패', "전문 오류 : " + data.RESPCODE, '', '');
                        } else if (data.RESPCODE === "1003") {
                            modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 실패', "이전 거래가 완료되지 않았습니다 : " + data.RESPCODE, '', '');
                        } else if (data.RESPCODE === "2312" || data.RESPCODE === "2329") {
                            modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 실패', '지원하지 않는 카드입니다.', '', '');
                        } else if (data.RESPCODE === "2316" || data.RESPCODE === "2315" || data.RESPCODE === "8326") {
                            modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 실패', '잔액이 부족합니다.', '', '');
                        } else if (data.RESPCODE === "2317") {
                            modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 실패', '카드 인식 오류', '', '');
                        } else if (data.RESPCODE === "2322") {
                            modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 실패', '거래가 불가능한 카드입니다.', '', '');
                        } else if (data.RESPCODE === "8350") {
                            modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 실패', '도난 및 분실 카드', '', '');
                            // var audio = new Audio('/voice/도난 및 분실 카드입니다.wav');
                            // audio.play();
                        } else if (data.RESPCODE === "2327") {
                            modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 실패', '존재하지 않는 카드입니다.', '', '');
                        } else if (data.RESPCODE === "2328") {
                            modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 실패', '한장의 카드를 넣어주세요.', '', '');
                        } else {
                            modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 실패', "결제 불가능 : " + data.RESPCODE, '', '');
                        }
                    },
                    error: function () {
                        modalSend(menuModalContentChange, 'kioskTotalMessage', '결제 실패', "결제오류 : 결제가 되었다면 관리자에게 문의해주세요.", '', '');
                    }

                });


            });
        }
    );
}


async function cardPayAfterSaveOrder(data) {

    const response = await axios.post('http://' + serverUrl.server + '/kiosk/menu/order/saveMenu', data, {
        headers: {
            "Content-Type": `application/json`,
        },
    });
    return response.data;

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