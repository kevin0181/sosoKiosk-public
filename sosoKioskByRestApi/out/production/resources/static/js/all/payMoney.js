var orderSize = 1;

var cardPayData = null;

function liquidateMenuByMoney(receiptStatus) { //현금 결제 하기

    if (sosoServerStatus == false) {
        cancelOrder(moneySendData);
        payErrorModal("알수 없는 오류");
        return false;
    } else {

        var data = {
            "orderMenu": allSelectMenuArr,
            "totalPrice": orderTotalPrice.toString(),
            "placeStatus": placeStatus,
            "payStatus": "money"
        }

        $.ajax({
            anyne: true,
            type: "POST",
            contentType: 'application/json',
            url: "/kiosk/menu/order/menu",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (data) {
                if (data != null) {

                    if (receiptStatus) {
                        yesReceipt(data, allSelectMenuArr);
                    } else {
                        noReceipt(data, allSelectMenuArr);
                    }


                } else {
                    alert("주문에 실패하였습니다. 관리자에게 문의해주세요.");
                    location.href = "/";
                }
            },
            error: function () {
                alert("주문에 실패하였습니다. 관리자에게 문의해주세요.");
                location.href = "/";
            }
        });
    }
}


function addOrderBySosoPage(data, menuList) {

    moneySendData = data;

    moneyStompClient.send("/order/kiosk", {}, JSON.stringify({
        "orderMenu": menuList,
        "orderData": data,
        "orderNumber": ("M-" + data.orderNumber)
    }));


}


function yesReceipt(data, menuList) { //영수증 출력

    // longReceipt(data);
    addOrderBySosoPage(data, menuList);

}

function noReceipt(data, menuList) { //영수증 출력 X

    // numberReceipt(data);
    addOrderBySosoPage(data, menuList);

}


function longReceipt(payData) {

    var getSettingTax;
    var leaderName;
    var businessNumber;

    var issueID = 1;
    var _inch = 2;

    var printerName = "Printer1";


    $.ajax({
        type: "GET",
        contentType: 'application/json',
        url: "/kiosk/get/setting",
        dataType: "json",
        data: {
            "setting": "all"
        },
        success: function (getSettingData) {

            $(getSettingData).each(function () {

                if (this.settingName == "tax") {
                    getSettingTax = (this.settingValue);
                }

                // if (this.settingName == "leaderName") {
                //     getSettingTax = (this.settingValue);
                // }

                // if (this.settingName == "businessNumber") {
                //     getSettingTax = (this.settingValue);
                // }

                if (this.settingName == "businessNumber") {
                    businessNumber = (this.settingValue);
                }

                if (this.settingName == "printerName") {
                    printerName = (this.settingValue);
                }

                if (this.settingName == "leaderName") {
                    leaderName = (this.settingValue);
                }


            });

            let Tax = getTax(parseInt(getSettingTax), parseInt(payData.orderTotalPrice)); //총금액의 10프로 세금

            setPosId(issueID);
            checkPrinterStatus();


            printText("\n\n&pastel\n\n\n", 0, 1, false, false, false, 0, 1);
            printText("\n\n경기도 안산시 \n단원구 예술대학로 171,\n15263, 한국\n\n\n", 0, 0, false, false, false, 0, 1);
            printText("--------------------------------", 0, 0, false, false, false, 0, 1);

            if (_inch == 2) {
                // 2inch sample
                printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                printText("메뉴        단가    수량    금액\n\n", 0, 0, false, false, false, 0, 0);


                $(payData.orderDetailEntityList).each(function () {

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
                printText("  부가세 과세 물품가액 : " + (parseInt(payData.orderTotalPrice) - parseInt(Tax)) + "\n", 0, 0, true, false, false, 0, 0);
                printText("           부  과  세  : " + Tax + "\n", 0, 0, true, false, false, 0, 0);
                printText("            --------------------\n", 0, 0, false, false, false, 0, 0);
                printText("               총 금액 : " + payData.orderTotalPrice + "\n", 0, 0, true, false, false, 0, 0);
                printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                printText("        주문 번호 : " + payData.orderTelegramNo + "\n\n", 0, 0, false, false, false, 0, 0);

                if (payData.orderPlace == "inner") {
                    printText("                          매장\n\n", 0, 0, false, false, false, 0, 0);
                } else if (payData.orderPlace == "outer") {
                    printText("                          포장\n\n", 0, 0, false, false, false, 0, 0);
                }


                if (payData.orderPayStatus == "card") {
                    printText("결제 방식  : 카드\n", 0, 0, false, false, false, 0, 0);
                } else if (payData.orderPayStatus == "money") {
                    printText("결제 방식  : 현금\n", 0, 0, false, false, false, 0, 0);
                }


                printText("대 표 자  : " + leaderName + "\n", 0, 0, false, false, false, 0, 0);
                printText("사업자 번호: " + businessNumber + "\n", 0, 0, false, false, false, 0, 0);
                printText("주문 시각 : " + payData.orderDate + "\n\n\n", 0, 0, false, false, false, 0, 0);

                if (cardPayData != null) {
                    printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                    printText("신용 승인 정보\n\n", 0, 0, false, false, false, 0, 1);
                    printText("카 드 명 : " + cardPayData.CARDNAME + "\n", 0, 0, false, false, false, 0, 0);
                    printText("승인번호 : " + payData.orderApprovalNo + "\n\n\n", 0, 0, false, false, false, 0, 0);
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

            var strSubmit = getPosData();


            issueID++;

            requestPrint(printerName, strSubmit, viewResult);

            numberReceipt(payData);

        }
    });


}

function viewResult(result) {
    console.log(result);
}

function numberReceipt(payData) {

    var issueID = 1;
    var _inch = 2;

    var printerName = "Printer1";

    setPosId(issueID);
    checkPrinterStatus();

    var payStatus = "";

    if (payData.orderPayStatus == "money") {
        payStatus = "M";
    } else if (payData.orderPayStatus == "card") {
        payStatus = "C";
    }
    printText("주문 번호\n", 0, 0, true, false, false, 0, 1);
    printText("\n\n" + payStatus + "-" + payData.orderNumber + "\n\n\n", 0, 3, true, false, false, 0, 1);
    // printText("주문을 진행중입니다.\n", 0, 0, true, false, false, 0, 0);
    printText("\n\n\n\n\n", 0, 0, false, false, false, 0, 0);
    cutPaper(1);
    var strSubmit = getPosData();

    issueID++;
    orderSize++;

    requestPrint(printerName, strSubmit, viewResult);

    return true;
}


function successPayModalClose() {
    $("#successPay").hide();
    $("#fail-pay-modal-Body").empty();
    location.href = "/";
}

function successPayModalShowByMoney() {

    var audio = new Audio('/voice/주문이 완료되었습니다.wav');
    audio.play();

    console.log("영수증 출력 전");
    longReceipt(moneySendData);
    $("#successPay").show();
}


function setTime() {
    let time = 10;

    setInterval(function () {
        time = time - 1;

        $("#successPayTime").text(time);

        if (time == 0) {
            location.href = "/";
        }

    }, 1000);
}


function payErrorModal(data) {
    $("#fail-pay-modal-Body").append('<small style="font-size: 30px;">' + data + '</small>');
    $("#failPay").show();
}