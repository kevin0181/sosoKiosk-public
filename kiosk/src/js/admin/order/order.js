import axios from "axios";
import serverUrl from "../../../pages/config/server.json";

export const getAllOrderList = async () => {
    const response = await axios.get('http://' + serverUrl.server + '/admin/order', {
        params: {
            'status': 'AllOrder'
        },
        maxRedirects: 0
    });
    return response.data;
}


// let cardData;
//
// function cancelOrder(orderSq, orderTotalPrice, orderTelegramNo, orderTradeTime, orderApprovalNo, orderTradeUniqueNo, orderDate) { //결제 취소
//
//     if (orderTelegramNo == null || orderTradeTime == null || orderApprovalNo == null || orderTradeUniqueNo == null) { //현금 결제 취소
//
//
//         adminTotalModalYesOrNoShow("취소 하시겠습니까?", "moneyCancel", orderSq);
//
//
//     } else if (orderTelegramNo != null && orderTradeTime != null) { //카드 결제 취소
//
//         //카드 결제 응답 받은 후 삭제 해야함.
//
//         cardData = null;
//
//         //세금 가져옴
//         $.ajax({
//             type: "GET",
//             contentType: 'application/json',
//             url: "/kiosk/get/setting",
//             dataType: "json",
//             data: {
//                 "setting": "all"
//             },
//             success: function (data) {
//
//                 let getSettingTax = 0;
//
//                 let getSettingReaderNo = null;
//
//                 $(data).each(function () {
//                     if (this.settingName == "tax") {
//                         getSettingTax = (this.settingValue);
//                     }
//
//                     if (this.settingName == "readerNo") {
//                         getSettingReaderNo = (this.settingValue);
//                     }
//                 });
//
//                 let totalPrice = orderTotalPrice.padStart((12), '0');
//
//                 if (parseInt(getSettingTax) === 0) {
//                     alert("세금오류");
//                     location.href = "/";
//                 } else if (getSettingReaderNo == null) {
//                     alert("단말기 세팅 오류");
//                     location.href = "/";
//                 }
//
//                 let Tax = getTax(parseInt(getSettingTax), totalPrice); //총금액의 10프로 세금
//
//                 let totalTax = Tax.toString().padStart((12), '0');
//
//                 //데이터 저장 후 여기서 다시 결제하고 만약 결제 오류시 다시 데이터 삭제 결제 완료시 데이터 넘김.
//
//                 var request_msg = "";
//
//                 // 전문길이 마지막에 입력
//                 request_msg += String.fromCharCode(2);                     // STX
//                 request_msg += "IC";                                       // 거래구분
//                 request_msg += "01";                                       // 업무구분
//                 request_msg += "0420";                                     // 전문구분
//                 request_msg += "N";                                        // 거래형태
//                 request_msg += getSettingReaderNo;                               // 단말기번호 (TEST용 : DPT0TEST03)
//                 request_msg += "soso";                                     // 업체정보
//                 request_msg += orderTelegramNo;                             // 전문일련번호
//                 request_msg += " ";                                        // Pos Entry Mode
//                 request_msg += "                    ";                		 // 거래고유번호
//                 request_msg += "                    ";                     // 암호화하지않은 카드번호
//                 request_msg += " ";                                        // 암호화여부
//                 request_msg += "                ";                         // SW모델번호
//                 request_msg += "                ";                         // CAT or Reader 모델번호
//                 request_msg += "                                        "; // 암호화정보
//                 request_msg += "                                     ";    // 카드번호
//                 request_msg += String.fromCharCode(28);                    // FS
//                 request_msg += "00";                                       // 할부개월수
//                 request_msg += totalPrice;                                  // 총금액
//                 request_msg += "000000000000";                             // 봉사료
//                 request_msg += totalTax;                                    // 세금
//                 request_msg += "000000000000";                             // 공급금액
//                 request_msg += "000000000000";                             // 면세금액
//                 request_msg += "  ";                                       // WorkingKey Index
//                 request_msg += "                ";                         // 비밀번호
//
//                 request_msg += orderApprovalNo;                   				 // 원거래승인번호 (* 원거래 승인번호 입력)
//                 for (i = 0; i < 12 - orderApprovalNo.length; i++) {
//                     request_msg += " ";
//                 }		   				 // 필드 데이터가 작을 시 보완
//
//                 request_msg += orderTradeTime;                          // 원거래승인일자 (* 원거래 승인일자 입력)
//                 for (i = 0; i < 6 - orderTradeTime.length; i++) {
//                     request_msg += " ";
//                 }		   				 // 필드 데이터가 작을 시 보완
//
//                 for (i = 0; i < 163; i++) {
//                     request_msg += " ";
//                 }		   				 // 사용자정보~DCC
//                 request_msg += "X";                                        // 전자서명유무 (5만원 이하는 X = 무서명, 그 외엔 KSCAT 이미지 저장을 위해 "F")
//                 request_msg += String.fromCharCode(3);                    // ETX
//                 request_msg += String.fromCharCode(13);                		 // CR
//
//                 var telegramLen = ("" + request_msg.length).fillZero(4);   // 길이
//
//                 request_msg = telegramLen + request_msg;
//
//                 cardData = "AP" + request_msg;
//
//                 console.log(cardData);
//
//             }
//         });
//
//         adminTotalModalYesOrNoShow("취소 하시겠습니까?", "cardCancel", orderSq); //db 에서 데이터 삭제
//
//     } else {
//         adminTotalModalYesOrNoClose();
//         adminTotalModalShow("취소를 실패하였습니다.");
//     }
//
// }
//
//
// function cancelMoneyOrder(orderSq) {
//     $.ajax({
//         type: "POST",
//         url: "/admin/order/cancel/money",
//         dataType: "JSON",
//         data: {
//             "orderSq": orderSq,
//         },
//         success: function (data) {
//
//             if (data) {
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("취소 되었습니다.");
//             } else {
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("취소를 실패하였습니다.");
//             }
//
//         },
//         error: function () {
//             adminTotalModalYesOrNoClose();
//             adminTotalModalShow("취소를 실패하였습니다.");
//         }
//     });
// }
//
//
// function cancelCardOrder(orderSq) {
//
//     $.ajax
//     ({
//         url: "http://127.0.0.1:27098",
//         type: "POST",
//         dataType: "jsonp",
//         jsonp: "callback",
//         data: {"REQ": cardData},
//         success: function (data) {
//
//             console.log(data);
//
//             if (data.RES == 1000) { //결제 취소
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("결제를 취소하셨습니다.");
//             }
//             if (data.RES == "0000" && data.RESPCODE == "0000") {
//
//                 $.ajax({
//                     type: "POST",
//                     url: "/admin/order/cancel/card",
//                     dataType: "JSON",
//                     data: {
//                         "orderSq": orderSq,
//                     },
//                     success: function (data) {
//
//                         if (data) {
//                             adminTotalModalYesOrNoClose();
//                             adminTotalModalShow("취소 되었습니다.");
//                         } else {
//                             adminTotalModalYesOrNoClose();
//                             adminTotalModalShow("결제 취소 성공 (데이터 삭제 실패, 관리자에게 문의 바람)");
//                         }
//
//                     },
//                     error: function () {
//                         adminTotalModalYesOrNoClose();
//                         adminTotalModalShow("취소를 실패하였습니다. (관리자에게 문의 해주세요)");
//                     }
//                 });
//
//
//             } else if (data.RESPCODE == "7001") {
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("이미 취소된 거래입니다. (데이터 삭제 희망 시 관리자 호출) : " + data.RESPCODE);
//             } else if (data.RESPCODE == "7003") {
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("원거래 내역이 없습니다. : " + data.RESPCODE);
//             } else if (data.RESPCODE == "8000") {
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("신용카드가 맞지 않습니다. : " + data.RESPCODE);
//             } else if (data.RESPCODE == "8009") {
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("취소 금액이 입력되지 않았습니다. : " + data.RESPCODE);
//             } else if (data.RESPCODE == "8324") {
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("거래가 정지된 카드입니다. : " + data.RESPCODE);
//             } else if (data.RESPCODE == "8326") {
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("한도액 초과 : " + data.RESPCODE);
//             } else if (data.RESPCODE == "8350") {
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("도난 및 분실카드 입니다. : " + data.RESPCODE);
//             } else if (data.RESPCODE == "8381") {
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("전산장애 KSNET 전화요망 : " + data.RESPCODE);
//             } else {
//                 adminTotalModalYesOrNoClose();
//                 adminTotalModalShow("취소 불가능 : " + data.RESPCODE);
//             }
//
//         },
//         error: function () {
//             alert("결제 에러 (관리자에게 문의해주세요)");
//             location.href = "/";
//         }
//     });
//
//
//     //----------------
// }
//
//
// function orderInfoModalClose() {
//     $("#orderInfoModal").hide()
// }
//
// function afterReceipt() {
//
// }
//
// function orderInfoModalShow(orderSq) {
//
//     $("#orderInfoCategoryBar").empty();
//     $("#orderInfoBody").empty();
//
//     $("#orderInfoCategoryBar").append('<div class="O-category-part" >\n' +
//         '                    <div  onclick="getOrderInfo(' + orderSq + ',this)" id="orderPart" class="M-font O-font-mini-size O-category-box O-category-box-menu.js"\n' +
//         '                       style="background-color: #838383;">\n' +
//         '                        <p>주문 정보</p>\n' +
//         '                    </div>\n' +
//         '                </div>\n' +
//         '                <div class="O-category-part" >\n' +
//         '                    <div onclick="getOrderMenuInfo(' + orderSq + ',this)" id="menuPart" class="M-font O-font-mini-size O-category-box O-category-box-side">\n' +
//         '                        <p>주문 메뉴</p>\n' +
//         '                    </div>\n' +
//         '                </div>');
//
//     getOrderInfo(orderSq);
//
//
//     $("#orderInfoModal").show();
// }
//
// function getOrderMenuInfo(orderSq, categoryData) {
//
//     $("#orderInfoBody").empty();
//
//     $(categoryData).css("background-color", "#838383");
//     $("#orderPart").css("background-color", "#e7e7e7");
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/order/get/orderSq",
//         dataType: "JSON",
//         data: {
//             "orderSq": orderSq,
//         },
//         success: function (data) {
//
//             console.log(data);
//
//
//             $(data.orderDetailEntityList).each(function () {
//
//                 var getMenuSq = this.menuSq;
//
//                 if (this.menuEntity != null) {
//                     var imgSrc = this.menuEntity.imgDTOList[0].imgPath + '/' + this.menuEntity.imgDTOList[0].imgName;
//                 } else {
//                     var imgSrc = '';
//                 }
//
//
//                 $("#orderInfoBody").append(' <div class="O-pay-order-part M-flex-row" id="orderMenuListLeft' + getMenuSq + '">');
//
//                 var mainMenu = '<div class="O-pay-order-card O-pay-order-card-left">\n' +
//                     '                        <div class="O-pay-img">\n' +
//                     '                            <img src="' + imgSrc + '" class="O-side-img">\n' +
//                     '                        </div>\n' +
//                     '                        <div class="O-pay-name M-font O-font-middle-size M-flex-column M-flex-center">\n' +
//                     '                            <p class="">' + this.orderMenuName + '</p>\n' +
//                     '                        </div>\n' +
//                     '                        <div class="O-pay-number M-flex-column M-flex-center">\n' +
//                     '                            <div class="M-font O-font-middle-size M-flex-column M-flex-center">\n' +
//                     '                                <p>' + this.orderDetailMenuSize + '개</p>\n' +
//                     '                            </div>\n' +
//                     '                        </div>\n' +
//                     '                        <div class="O-pay-price M-flex-column M-flex-center">\n' +
//                     '                            <div class="M-font O-font-middle-size M-flex-column M-flex-center">\n' +
//                     '                                <p>' + (parseInt(this.orderDetailMenuSize) * parseInt(this.orderDetailMenuPrice)) + '원</p>\n' +
//                     '                            </div>\n' +
//                     '                        </div>\n' +
//                     '                    </div>';
//
//                 $("#orderMenuListLeft" + getMenuSq).append(mainMenu); //메뉴만 먼저 추가
//
//
//                 if (this.orderDetailSideEntityList.length != 0) {
//
//
//                     $("#orderMenuListLeft" + getMenuSq).append('<div class="O-pay-order-card O-pay-order-card-right M-flex-column"  style="margin: 10px 0px;" id="orderMenuListRight' + getMenuSq + '">');
//
//
//                     $(this.orderDetailSideEntityList).each(function () {
//                         console.log(this);
//                         var sideMenu = '<div class="O-pay-order-card-div M-flex-row">\n' +
//                             '                                <div class="O-pay-name M-font M-flex-column M-flex-center"\n' +
//                             '                                     style="font-size: 30px; width: 30%;">\n' +
//                             '                                    <p class="">' + this.orderSideName + '</p>\n' +
//                             '                                </div>\n' +
//                             '                                <div class="O-pay-name M-font M-flex-column M-flex-center"\n' +
//                             '                                     style="font-size: 30px;width: 10%">\n' +
//                             '                                    <p class="">' + this.orderSideSize + '개</p>\n' +
//                             '                                </div>\n' +
//                             '                                <div class="O-pay-number M-flex-column M-flex-center" style="width: 20%">\n' +
//                             '                                    <div class="M-font M-flex-column M-flex-center" style="font-size: 30px;">\n' +
//                             '                                        <p>' + (parseInt(this.orderSideSize) * parseInt(this.orderSidePrice)) + '원</p>\n' +
//                             '                                    </div>\n' +
//                             '                                </div>\n' +
//                             '                            </div>';
//
//                         $("#orderMenuListRight" + getMenuSq).append(sideMenu);
//
//                     });
//
//                     $("#orderMenuListLeft" + getMenuSq).append('</div>');
//                     $("#orderInfoBody").append('</div>');
//                 }
//
//                 $("#orderInfoBody").append('</div>');
//             });
//
//
//         },
//         error: function () {
//             adminTotalModalShow("주문 상세를 가져오지 못했습니다.");
//         }
//     });
//
//
// }
//
// function getOrderInfo(orderSq, categoryData) {
//
//     $("#orderInfoBody").empty();
//     $("#modalReceiptAfterBtn").remove();
//
//     $(categoryData).css("background-color", "#838383");
//     $("#menuPart").css("background-color", "#e7e7e7");
//
//     $("#orderDetailModalButton").prepend('<div id="modalReceiptAfterBtn" class="O-side-select-close" style="background-color: #f79d9d;"\n' +
//         '                         onclick="afterReceipt(' + orderSq + ')">\n' +
//         '                        <p class="M-font O-font-middle-size">영수증 출력하기</p>\n' +
//         '                    </div>');
//
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/order/get/orderSq",
//         dataType: "JSON",
//         data: {
//             "orderSq": orderSq,
//         },
//         success: function (data) {
//
//             console.log(data);
//
//             if (data.orderApprovalNo == null) {
//                 data.orderApprovalNo = "";
//             }
//
//             $("#orderInfoBody").append('<div class="M-container" style="padding: 5px 50px;">\n' +
//                 '                    <div class="M-font O-font-middle-size M-flex-column" style="width: 80%; height: 100%; justify-content: center;">\n' +
//                 '                        <div class="M-flex-row" style="height: 15%;">\n' +
//                 '                            <div class="M-container" style="flex: 1; text-align: center;">\n' +
//                 '                                <p>주문 번호 : </p>\n' +
//                 '                            </div>\n' +
//                 '                            <div class="M-container" style="flex: 1">\n' +
//                 '                                <p>' + data.orderTelegramNo + '</p>\n' +
//                 '                            </div>\n' +
//                 '                        </div>\n' +
//                 '                        <div class="M-flex-row" style="height: 15%;">\n' +
//                 '                            <div class="M-container" style="flex: 1; text-align: center;">\n' +
//                 '                                <p>주문 날짜 : </p>\n' +
//                 '                            </div>\n' +
//                 '                            <div class="M-container" style="flex: 1">\n' +
//                 '                                <p>' + data.orderDate + '</p>\n' +
//                 '                            </div>\n' +
//                 '                        </div>\n' +
//                 '                        <div class="M-flex-row" style="height: 15%;">\n' +
//                 '                            <div class="M-container" style="flex: 1; text-align: center;">\n' +
//                 '                                <p>총 금액 : </p>\n' +
//                 '                            </div>\n' +
//                 '                            <div class="M-container" style="flex: 1">\n' +
//                 '                                <p>' + data.orderTotalPrice + '</p>\n' +
//                 '                            </div>\n' +
//                 '                        </div>\n' +
//                 '                        <div class="M-flex-row" style="height: 15%;">\n' +
//                 '                            <div class="M-container" style="flex: 1; text-align: center;">\n' +
//                 '                                <p>장소 : </p>\n' +
//                 '                            </div>\n' +
//                 '                            <div class="M-container" style="flex: 1">\n' +
//                 '                                <p>' + data.orderPlace + '</p>\n' +
//                 '                            </div>\n' +
//                 '                        </div>\n' +
//                 '                        <div class="M-flex-row" style="height: 15%;">\n' +
//                 '                            <div class="M-container" style="flex: 1; text-align: center;">\n' +
//                 '                                <p>결제 방법 : </p>\n' +
//                 '                            </div>\n' +
//                 '                            <div class="M-container" style="flex: 1">\n' +
//                 '                                <p>' + data.orderPayStatus + '</p>\n' +
//                 '                            </div>\n' +
//                 '                        </div>\n' +
//                 '                        <div class="M-flex-row" style="height: 15%;">\n' +
//                 '                            <div class="M-container" style="flex: 1; text-align: center;">\n' +
//                 '                                <p>승인 번호 (카드결제) : </p>\n' +
//                 '                            </div>\n' +
//                 '                            <div class="M-container" style="flex: 1">\n' +
//                 '                                <p>' + data.orderApprovalNo + '</p>\n' +
//                 '                            </div>\n' +
//                 '                        </div>\n' +
//                 '                    </div>\n' +
//                 '                </div>');
//
//
//         },
//         error: function () {
//             adminTotalModalShow("주문 상세를 가져오지 못했습니다.");
//         }
//     });
//
// }
//
//
// $(document).ready(function () {
//
//     let searchYear = "";
//     let searchMonth = "";
//     let searchDay = "";
//
//     $("#year").change(function () {
//
//         searchYear = $(this).val();
//
//         if (searchYear == "") {
//             $("#month").val("");
//             $("#day").val("");
//         }
//
//         searchDate();
//
//     });
//
//     $("#month").change(function () {
//
//         searchMonth = $(this).val();
//
//         if (searchMonth == "") {
//             $("#year").val("");
//             $("#day").val("");
//         }
//
//         searchDate();
//
//     });
//
//     $("#day").change(function () {
//
//         searchDay = $(this).val();
//
//         if (searchDay == "") {
//             $("#year").val("");
//             $("#month").val("");
//         }
//
//         searchDate();
//
//     });
//
//     // $("#payStatus").change(function () {
//     //
//     //
//     //     var status = "";
//     //     if ($(this).val() == "true") {
//     //         status = "성공";
//     //     } else if ($(this).val() == "false") {
//     //         status = "실패";
//     //     } else {
//     //         status = "";
//     //     }
//     //
//     //     $(".admin-tbody-tr").hide();
//     //
//     //     var totalSearchDate = $(".admin-tbody-tr>.paySearch:contains('" + status + "')");
//     //     $(totalSearchDate).show();
//     //
//     // });
//
//     function searchDate() {
//
//         var totalSearchDate;
//
//         if (searchYear == "") {
//             totalSearchDate = "";
//         } else if (searchMonth == "") {
//             totalSearchDate = searchYear;
//         } else if (searchDay == "") {
//             totalSearchDate = searchYear + "-" + searchMonth;
//         } else {
//             totalSearchDate = searchYear + "-" + searchMonth + "-" + searchDay;
//         }
//
//         $(".admin-tbody-tr").hide();
//
//         var totalSearchDate = $(".admin-tbody-tr:contains('" + totalSearchDate + "')");
//         $(totalSearchDate).show();
//
//     }
//
// });
//
//
// function afterReceipt(orderSq) {
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/order/get/orderSq",
//         dataType: "json",
//         data: {
//             "orderSq": orderSq
//         },
//         success: function (payData) {
//
//
//             var getSettingTax;
//             var leaderName;
//             var businessNumber;
//
//             var issueID = 1;
//             var _inch = 2;
//
//             var printerName = "Printer1";
//
//
//             $.ajax({
//                 type: "GET",
//                 contentType: 'application/json',
//                 url: "/kiosk/get/setting",
//                 dataType: "json",
//                 data: {
//                     "setting": "all"
//                 },
//                 success: function (getSettingData) {
//
//                     $(getSettingData).each(function () {
//
//                         if (this.settingName == "tax") {
//                             getSettingTax = (this.settingValue);
//                         }
//
//                         // if (this.settingName == "leaderName") {
//                         //     getSettingTax = (this.settingValue);
//                         // }
//
//                         // if (this.settingName == "businessNumber") {
//                         //     getSettingTax = (this.settingValue);
//                         // }
//
//                         if (this.settingName == "businessNumber") {
//                             businessNumber = (this.settingValue);
//                         }
//
//                         if (this.settingName == "printerName") {
//                             printerName = (this.settingValue);
//                         }
//
//                         if (this.settingName == "leaderName") {
//                             leaderName = (this.settingValue);
//                         }
//
//
//                     });
//
//                     let Tax = getTax(parseInt(getSettingTax), parseInt(payData.orderTotalPrice)); //총금액의 10프로 세금
//
//                     setPosId(issueID);
//                     checkPrinterStatus();
//
//
//                     printText("\n\n&pastel\n\n\n", 0, 1, false, false, false, 0, 1);
//                     printText("\n\n경기도 안산시 \n단원구 예술대학로 171,\n15263, 한국\n\n\n", 0, 0, false, false, false, 0, 1);
//                     printText("--------------------------------", 0, 0, false, false, false, 0, 1);
//
//                     if (_inch == 2) {
//                         // 2inch sample
//                         printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
//                         printText("메뉴        단가    수량    금액\n\n", 0, 0, false, false, false, 0, 0);
//
//
//                         $(payData.orderDetailEntityList).each(function () {
//
//                             // printText(" " + this.orderMenuName + "      " + this.orderDetailMenuSize + "        " + this.orderDetailMenuPrice + " \n", 0, 0, false, false, false, 0, 0);
//
//                             printText(this.orderMenuName + "\n", 0, 0, false, false, false, 0, 0);
//
//                             printText(this.orderDetailMenuPrice + "       " + this.orderDetailMenuSize + "       " + (parseInt(this.orderDetailMenuPrice) * parseInt(this.orderDetailMenuSize)) + "\n", 0, 0, false, false, false, 0, 2);
//
//                             if (this.orderDetailSideEntityList.length != 0) {
//
//                                 $(this.orderDetailSideEntityList).each(function () {
//                                     // printText("(SIDE) " + this.orderSideName + "       " + this.orderSideSize + "     " + this.orderSidePrice + " \n", 0, 0, false, false, false, 0, 0);
//
//                                     printText("(SIDE) " + this.orderSideName + "\n", 0, 0, false, false, false, 0, 0);
//
//                                     printText(this.orderSidePrice + "       " + this.orderSideSize + "       " + (parseInt(this.orderSidePrice) * parseInt(this.orderSideSize)) + "\n", 0, 0, false, false, false, 0, 2);
//
//                                 });
//
//                             }
//
//                         });
//
//                         printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
//                         printText("  부가세 과세 물품가액 : " + (parseInt(payData.orderTotalPrice) - parseInt(Tax)) + "\n", 0, 0, true, false, false, 0, 0);
//                         printText("           부  과  세  : " + Tax + "\n", 0, 0, true, false, false, 0, 0);
//                         printText("            --------------------\n", 0, 0, false, false, false, 0, 0);
//                         printText("               총 금액 : " + payData.orderTotalPrice + "\n", 0, 0, true, false, false, 0, 0);
//                         printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
//                         printText("        주문 번호 : " + payData.orderTelegramNo + "\n\n", 0, 0, false, false, false, 0, 0);
//
//                         if (payData.orderPlace == "inner") {
//                             printText("                          매장\n\n", 0, 0, false, false, false, 0, 0);
//                         } else if (payData.orderPlace == "outer") {
//                             printText("                          포장\n\n", 0, 0, false, false, false, 0, 0);
//                         }
//
//
//                         if (payData.orderPayStatus == "card") {
//                             printText("결제 방식  : 카드\n", 0, 0, false, false, false, 0, 0);
//                         } else if (payData.orderPayStatus == "money") {
//                             printText("결제 방식  : 현금\n", 0, 0, false, false, false, 0, 0);
//                         }
//
//
//                         printText("대 표 자  : " + leaderName + "\n", 0, 0, false, false, false, 0, 0);
//                         printText("사업자 번호: " + businessNumber + "\n", 0, 0, false, false, false, 0, 0);
//                         printText("주문 시각 : " + payData.orderDate + "\n\n\n", 0, 0, false, false, false, 0, 0);
//
//                         if (cardPayData != null) {
//                             printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
//                             printText("신용 승인 정보\n\n", 0, 0, false, false, false, 0, 1);
//                             printText("카 드 명 : " + cardPayData.CARDNAME + "\n", 0, 0, false, false, false, 0, 0);
//                             printText("승인번호 : " + payData.orderApprovalNo + "\n\n\n", 0, 0, false, false, false, 0, 0);
//                         }
//
//
//                     } else {
//                         // error
//                         return;
//                     }
//
//                     printText("Tel : 070 - 8888 - 9956\n", 0, 0, true, false, false, 0, 0);
//                     printText("Homepage : www.soso-kitchen.com\n\n\n\n", 0, 0, false, false, false, 0, 0);
//
//                     printQRCode("www.soso-kitchen.com", 0, 2, 7, 0);
//                     // print1DBarcode("&pastel 인터넷으로 주문하기", 0, 4, 70, 2, 1);
//                     printText("\n\n\n\n\n", 0, 0, false, false, false, 0, 0);
//                     cutPaper(1);
//
//                     var strSubmit = getPosData();
//
//
//                     issueID++;
//
//                     requestPrint(printerName, strSubmit, viewResult);
//
//                 }
//             });
//
//         }
//     });
//
// }
