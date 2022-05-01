function saveCardOrder(cardMenuList, cardPlaceStatus, cardTotalPrice) {

    var data = {
        "orderMenu": cardMenuList,
        "totalPrice": cardTotalPrice.toString(),
        "placeStatus": cardPlaceStatus,
        "payStatus": "card"
    }

    $.ajax({
        anyne: true,
        type: "POST",
        contentType: 'application/json',
        url: "/kiosk/menu/order/menu",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {

            checkCardReader(data.orderTelegramNo, data.orderTotalPrice, data, cardMenuList);

        },
        error: function () {
            alert("주문에 실패하였습니다. 관리자에게 문의해주세요.");
            location.href = "/";
        }
    });

}


function checkCardReader(orderTelegramNo, orderTotalPrice, saveData, cardMenuList) { //카드 리더기 초기화 해서 데이터 가져오기

    var getSettingTax = 0;
    var getSettingReaderNo = null;
    //세금 가져오기
    $.ajax({
        type: "GET",
        contentType: 'application/json',
        url: "/kiosk/get/setting",
        dataType: "json",
        data: {
            "setting": "all"
        },
        success: function (data) {

            console.log(data);

            $(data).each(function () {
                if (this.settingName == "tax") {
                    getSettingTax = (this.settingValue);
                }
                if (this.settingName == "readerNo") {
                    getSettingReaderNo = (this.settingValue);
                }
            });

            let totalPrice = orderTotalPrice.padStart((12), '0');

            if (parseInt(getSettingTax) === 0) {
                alert("세금오류");
                location.href = "/";
            } else if (getSettingReaderNo == null) {
                alert("단말기 세팅 오류");
                location.href = "/";
            }

            let Tax = getTax(parseInt(getSettingTax), totalPrice); //총금액의 10프로 세금

            let totalTax = Tax.toString().padStart((12), '0');

            //데이터 저장 후 여기서 다시 결제하고 만약 결제 오류시 다시 데이터 삭제 결제 완료시 데이터 넘김.

            var request_msg = "";

            console.log(totalPrice);

            // 전문길이 마지막에 입력
            request_msg += String.fromCharCode(2);                     // STX
            request_msg += "IC";                                       // 거래구분
            request_msg += "01";                                       // 업무구분
            request_msg += "0200";                                     // 전문구분
            request_msg += "N";                                        // 거래형태
            request_msg += getSettingReaderNo;                               // 단말기번호 (TEST용 : DPT0TEST03) -> 데이터 베이스에서 가져와야함.
            request_msg += "soso";                                     // 업체정보
            request_msg += orderTelegramNo;                             // 전문일련번호   <- 가게에서 사용하는 주문 번호
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

            for (i = 0; i < 163; i++) {
                request_msg += " ";
            }		   				 // 사용자정보~DCC
            request_msg += "X";                                        // 전자서명유무 (5만원 이하는 X = 무서명, 그 외엔 KSCAT 이미지 저장을 위해 "F")
            request_msg += String.fromCharCode(3);                    // ETX
            request_msg += String.fromCharCode(13);                		 // CR

            var telegramLen = ("" + request_msg.length).fillZero(4);   // 길이

            request_msg = telegramLen + request_msg;


            var Message = "AP" + request_msg;

            console.log(Message);

            $.ajax
            ({
                url: "http://127.0.0.1:27098",
                type: "POST",
                dataType: "jsonp",
                jsonp: "callback",
                data: {"REQ": Message},
                success: function (data) {

                    console.log(data);

                    if (data.RES == 1000) { //결제 취소
                        cancelOrder(saveData);
                        location.href = "/";
                    }
                    if (data.RES == "0000" && data.RESPCODE == "0000") {
                        let approvalNo = FindJSONtoString("APPROVALNO", data);					// 승인번호
                        let tradeTime = FindJSONtoString("TRADETIME", data).substrKor(0, 6);	// 승인일시
                        let tradeUniqueNo = FindJSONtoString("TRADEUNIQUENO", data);				// VANTR
                        let oriApprovalNo = FindJSONtoString("ORIAPPROVALNO", data);			// 원거래승인번호

                        saveData.orderApprovalNo = approvalNo;
                        saveData.orderTradeTime = tradeTime;
                        saveData.orderTradeUniqueNo = tradeUniqueNo;

                        cardPayAfterSaveOrder(saveData, cardMenuList);

                        cardPayData = data;

                    } else if (data.RESPCODE == "1001") {
                        cancelOrder(saveData);
                        payErrorModal("전문 오류 : " + data.RESPCODE);
                    } else if (data.RESPCODE == "1003") {
                        cancelOrder(saveData);
                        payErrorModal("이전 거래가 완료되지 않았습니다 : " + data.RESPCODE);
                    } else if (data.RESPCODE == "2312" || data.RESPCODE == "2329") {
                        cancelOrder(saveData);
                        payErrorModal("지원하지 않는 카드입니다.");
                    } else if (data.RESPCODE == "2316" || data.RESPCODE == "2315" || data.RESPCODE == "8326") {
                        cancelOrder(saveData);
                        payErrorModal("잔액이 부족합니다.");
                    } else if (data.RESPCODE == "2317") {
                        cancelOrder(saveData);
                        payErrorModal("카드 인식 오류");
                    } else if (data.RESPCODE == "2322") {
                        cancelOrder(saveData);
                        payErrorModal("거래가 불가능한 카드입니다.");
                    } else if (data.RESPCODE == "8350") {
                        cancelOrder(saveData);
                        var audio = new Audio('/voice/도난 및 분실 카드입니다.wav');
                        audio.play();
                        payErrorModal("도난 및 분실 카드");
                    } else if (data.RESPCODE == "2327") {
                        cancelOrder(saveData);
                        payErrorModal("존재하지 않는 카드입니다.");
                    } else if (data.RESPCODE == "2328") {
                        cancelOrder(saveData);
                        payErrorModal("한장의 카드를 넣어주세요.");
                    } else {
                        cancelOrder(saveData);
                        payErrorModal("결제 불가능 : " + data.RESPCODE);
                    }


                },
                error: function () {
                    cancelOrder(saveData);
                    payErrorModal("결제오류 : 결제가 되었다면 관리자에게 문의해주세요.");
                }
            });


        }
    });


}

function cancelOrder(data) {

    $.ajax({
        anyne: true,
        type: "POST",
        contentType: 'application/json',
        url: "/kiosk/menu/cancel/saveMenu",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {

        },
        error: function () {
            alert("주문 취소.");
            location.href = "/";
        }
    });
}

var payData;

function cardPayAfterSaveOrder(data, cardMenuList) {

    $.ajax({
        anyne: true,
        type: "POST",
        contentType: 'application/json',
        url: "/kiosk/menu/order/saveMenu",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {

            cardSendData = data;
            payData = data;

            cardStompClient.send("/order/kiosk", {}, JSON.stringify({
                "orderMenu": cardMenuList,
                "orderData": data,
                "orderNumber": ("C-" + data.orderNumber)
            }));

            $("#receiptModal").show();

        },
        error: function () {
            alert("주문에 실패하였습니다. 관리자에게 문의해주세요.");
            location.href = "/";
        }
    });

}

function checkReceipt(status) {
    if (status) {
        var audio = new Audio('/voice/주문이 완료되었습니다.wav');
        audio.play();
        longReceipt(payData);
        // numberReceipt(payData);
        $("#receiptModal").hide();
        successPayModalShow();
        setTime();

    } else {
        var audio = new Audio('/voice/주문이 완료되었습니다.wav');
        audio.play();
        numberReceipt(payData);
        $("#receiptModal").hide();
        successPayModalShow();
        setTime();
    }
}


function getTax(par, total) {
    return Math.ceil((total * par) / 100);
}

String.prototype.fillZero = function (n) {
    var str = this;
    var zeros = "";


    if (str.length < n) {
        for (i = 0; i < n - str.length; i++) {
            zeros += '0';
        }
    }

    return zeros + str;
}

String.prototype.fillSpace = function (n) {
    var str = this;
    var space = "";

    if (str.length < n) {
        for (i = 0; i < n - str.length; i++) {
            space += ' ';
        }
    }

    return str + space;
}

String.prototype.byteLength = function () {
    var len = 0;

    for (var i = 0; i < this.length; i++) {
        len += (this.charCodeAt(i) > 127) ? 2 : 1;
    }

    return len;
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
        if (value)
            results.push(property.toString() + ': ' + value);
    }

    return '{' + results.join(', ') + '}';
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

stringformat = function (text) {
    if (arguments.length <= 1) return text;

    for (var i = 0; i <= arguments.length - 2; i++) {
        text = text.replace(new RegExp("\\{" + i + "\\}", "gi"), arguments[i + 1]);
    }

    return text;
}
