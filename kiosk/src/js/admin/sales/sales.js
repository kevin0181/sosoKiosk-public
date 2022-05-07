var selectSalesDateData;

$(document).ready(function () {
    searchBetweenDate();
});

function allSearchBetweenDate() {
    $("#startDate").val("");
    $("#endDate").val("");
    searchBetweenDate();
}

function searchBetweenDate() {

    if ($("#startDate").val() == null || $("#endDate").val() == null) {
        return false;
    }

    $(".admin-sales-tbody").empty();

    $.ajax
    ({
        url: "/admin/sales/searchDate",
        type: "POST",
        dataType: "JSON",
        data: {
            "startDate": $("#startDate").val(),
            "endDate": $("#endDate").val()
        },
        success: function (data) {

            selectSalesDateData = null;
            selectSalesDateData = data;

            var totalPrice = 0;

            $(data).each(function (index, item) {

                totalPrice = totalPrice + parseInt(this.orderTotalPrice);

                $(".admin-sales-tbody").last('tr').append('<tr class="admin-tbody-tr admin-tbody-sales-tr' + index + '">');

                var orderStatus;

                var orderPlaceStatus;

                if (this.orderStatus) {
                    orderStatus = "성공";
                } else {
                    orderStatus = "실패";
                }

                if (this.orderPlace == 'inner') {
                    orderPlaceStatus = "매장";
                } else {
                    orderPlaceStatus = "포장";
                }

                $(".admin-tbody-sales-tr" + index).append('<td class="search dateSearch" style="font-size: 21px;">\n' +
                    '                        ' + this.orderDate + '    </td>\n' +
                    '                            <td class="search" style="text-align: center;">\n' +
                    '                                <p style="display: inline-block; margin-right: 5px;"\n' +
                    '                                  >' + this.orderTelegramNo + '</p>\n' +
                    '                            </td>\n' +
                    '                            <td class="search">\n' +
                    '                      ' + this.orderTotalPrice + '원</td>\n' +
                    '                            <td class="search paySearch">\n' +
                    '                                <p>' + orderStatus + '</p>\n' +
                    '                            </td>\n' +
                    '                            <td class="search">\n' +
                    '                                <p>' + this.orderPayStatus + '</p>\n' +
                    '                            </td>\n' +
                    '                            <td class="search">\n' +
                    '                           ' + orderPlaceStatus + ' </td>');


                $(".admin-sales-tbody").last('tr').append('</tr>');

            });

            $("#totalPrice").text(totalPrice);

        },
    });

}

function searchSalesPrint() {

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
                if (this.settingName = "printerName") {
                    printerName = (this.settingValue);
                }
            });


            $.ajax
            ({
                url: "/admin/get/startDate",
                type: "get",
                dataType: "JSON",
                success: function (data) {

                    let taxByTotal = getTax(parseInt(10), parseInt($("#totalPrice").text()));

                    let Tax = parseInt($("#totalPrice").text()) - taxByTotal;

                    let total = taxByTotal + Tax;

                    let cardTotal = 0;
                    let cardNum = 0;
                    let moneyTotal = 0;
                    let moneyNum = 0;

                    let innerTotal = 0;
                    let innerNum = 0;
                    let outerTotal = 0;
                    let outerNum = 0;


                    $(selectSalesDateData).each(function () {

                        if (this.orderPayStatus == "money") {
                            moneyTotal = moneyTotal + parseInt(this.orderTotalPrice);
                            moneyNum++;
                        } else {
                            cardTotal = cardTotal + parseInt(this.orderTotalPrice);
                            cardNum++;
                        }

                        if (this.orderPlace == "inner") {
                            innerTotal = innerTotal + parseInt(this.orderTotalPrice);
                            innerNum++;
                        } else {
                            outerTotal = outerTotal + parseInt(this.orderTotalPrice);
                            outerNum++;
                        }

                    });

                    var issueID = 1;
                    var _inch = 2;

                    setPosId(issueID);
                    checkPrinterStatus();


                    printText("\n\n&pastel\n\n\n", 0, 1, false, false, false, 0, 1);
                    printText("\n\n경기도 안산시 \n단원구 예술대학로 171,\n15263, 한국\n\n\n", 0, 0, false, false, false, 0, 1);
                    // printText("--------------------------------", 0, 0, false, false, false, 0, 1);

                    if (_inch == 2) {
                        // 2inch sample
                        // printText("개점 일시 : " + data.date + "\n", 0, 0, false, false, false, 0, 0);
                        // printText("정산 일시 : " + finishDate() + "\n", 0, 0, false, false, false, 0, 0);
                        printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                        printText("매출 합계\n\n", 0, 0, false, false, false, 0, 1);
                        printText("총 판매액 :              " + $("#totalPrice").text() + "\n", 0, 0, false, false, false, 0, 0);
                        printText("과세매출액 :             " + Tax + "\n", 0, 0, false, false, false, 0, 0);
                        printText("부과세액 :               " + taxByTotal + "\n\n", 0, 0, false, false, false, 0, 0);
                        printText("매출 합계 :              " + total + "\n", 0, 0, false, false, false, 0, 0);
                        printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                        printText("결제수단별 매출\n\n", 0, 0, false, false, false, 0, 1);
                        printText("카드 매출 :       " + cardNum + "        " + cardTotal + "\n", 0, 0, false, false, false, 0, 0);
                        printText("현금 매출 :       " + moneyNum + "        " + moneyTotal + "\n", 0, 0, false, false, false, 0, 0);
                        printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                        printText("장소별 매출\n\n", 0, 0, false, false, false, 0, 1);
                        printText("포장 매출 :        " + outerNum + "      " + outerTotal + "\n", 0, 0, false, false, false, 0, 0);
                        printText("매장 매출 :        " + innerNum + "      " + innerTotal + "\n", 0, 0, false, false, false, 0, 0);
                        printText("--------------------------------\n\n\n\n", 0, 0, false, false, false, 0, 0);


                    } else {
                        // error
                        return;
                    }

                    printText("Tel : 010 - 8650 - 9052\n", 0, 0, true, false, false, 0, 0);
                    printText("문의 주소 : https://kevin0181.github.io/\n\n\n\n\n\n\n\n", 0, 0, false, false, false, 0, 0);

                    // printQRCode("www.soso-kitchen.com", 0, 2, 7, 0);
                    // print1DBarcode("&pastel 인터넷으로 주문하기", 0, 4, 70, 2, 1);
                    // printText("\n\n\n\n\n", 0, 0, false, false, false, 0, 0);
                    cutPaper(1);

                    var strSubmit = getPosData();


                    issueID++;

                    requestPrint(printerName, strSubmit, viewResult);

                },
            });

        },
    });

}


function finishDate() {
    let now = new Date();
    var dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');
    return dateStringWithTime;
}


function kioskDeadLine() {

    let now = new Date();
    var dateStringWithTime = moment(now).format('YYYY-MM-DD');

    $.ajax
    ({
        url: "/admin/sales/searchDate",
        type: "POST",
        dataType: "JSON",
        data: {
            "startDate": dateStringWithTime,
            "endDate": ""
        },
        success: function (OrderData) {

            console.log(OrderData);

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
                        if (this.settingName = "printerName") {
                            printerName = (this.settingValue);
                        }
                    });


                    $.ajax
                    ({
                        url: "/admin/get/startDate",
                        type: "get",
                        dataType: "JSON",
                        success: function (data) {



                            let cardTotal = 0;
                            let cardNum = 0;
                            let moneyTotal = 0;
                            let moneyNum = 0;

                            let innerTotal = 0;
                            let innerNum = 0;
                            let outerTotal = 0;
                            let outerNum = 0;

                            var totalToday = 0;

                            $(OrderData).each(function () {

                                totalToday += parseInt(this.orderTotalPrice);

                                if (this.orderPayStatus == "money") {
                                    moneyTotal = moneyTotal + parseInt(this.orderTotalPrice);
                                    moneyNum++;
                                } else {
                                    cardTotal = cardTotal + parseInt(this.orderTotalPrice);
                                    cardNum++;
                                }

                                if (this.orderPlace == "inner") {
                                    innerTotal = innerTotal + parseInt(this.orderTotalPrice);
                                    innerNum++;
                                } else {
                                    outerTotal = outerTotal + parseInt(this.orderTotalPrice);
                                    outerNum++;
                                }

                            });

                            let taxByTotal = getTax(parseInt(10), parseInt(totalToday));

                            let Tax = parseInt(totalToday) - taxByTotal;

                            let total = taxByTotal + Tax;


                            var issueID = 1;
                            var _inch = 2;

                            setPosId(issueID);
                            checkPrinterStatus();


                            printText("\n\n&pastel\n\n\n", 0, 1, false, false, false, 0, 1);
                            printText("\n\n경기도 안산시 \n단원구 예술대학로 171,\n15263, 한국\n\n\n", 0, 0, false, false, false, 0, 1);
                            // printText("--------------------------------", 0, 0, false, false, false, 0, 1);

                            if (_inch == 2) {
                                // 2inch sample
                                printText("개점 일시 : " + data.date + "\n", 0, 0, false, false, false, 0, 0);
                                printText("정산 일시 : " + finishDate() + "\n", 0, 0, false, false, false, 0, 0);
                                printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                                printText("매출 합계\n\n", 0, 0, false, false, false, 0, 1);
                                printText("총 판매액 :              " + $("#totalPrice").text() + "\n", 0, 0, false, false, false, 0, 0);
                                printText("과세매출액 :             " + Tax + "\n", 0, 0, false, false, false, 0, 0);
                                printText("부과세액 :               " + taxByTotal + "\n\n", 0, 0, false, false, false, 0, 0);
                                printText("매출 합계 :              " + total + "\n", 0, 0, false, false, false, 0, 0);
                                printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                                printText("결제수단별 매출\n\n", 0, 0, false, false, false, 0, 1);
                                printText("카드 매출 :       " + cardNum + "        " + cardTotal + "\n", 0, 0, false, false, false, 0, 0);
                                printText("현금 매출 :       " + moneyNum + "        " + moneyTotal + "\n", 0, 0, false, false, false, 0, 0);
                                printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                                printText("장소별 매출\n\n", 0, 0, false, false, false, 0, 1);
                                printText("포장 매출 :        " + outerNum + "      " + outerTotal + "\n", 0, 0, false, false, false, 0, 0);
                                printText("매장 매출 :        " + innerNum + "      " + innerTotal + "\n", 0, 0, false, false, false, 0, 0);
                                printText("--------------------------------\n\n\n\n", 0, 0, false, false, false, 0, 0);


                            } else {
                                // error
                                return;
                            }

                            printText("Tel : 010 - 8650 - 9052\n", 0, 0, true, false, false, 0, 0);
                            printText("문의 주소 : https://kevin0181.github.io/\n\n\n\n", 0, 0, false, false, false, 0, 0);

                            // printQRCode("www.soso-kitchen.com", 0, 2, 7, 0);
                            // print1DBarcode("&pastel 인터넷으로 주문하기", 0, 4, 70, 2, 1);
                            // printText("\n\n\n\n\n", 0, 0, false, false, false, 0, 0);
                            cutPaper(1);

                            var strSubmit = getPosData();


                            issueID++;

                            requestPrint(printerName, strSubmit, viewResult);

                        },
                    });

                },
            });


        },
    });


}