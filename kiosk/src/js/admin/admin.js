import $ from 'jquery';


export function showImg(data, object) { //img url show
    $("#" + object).show();

    if (data.files && data.files[0]) {
        var reader = new FileReader();
        reader.onload = function (data) {
            $("#" + object).attr("src", data.target.result);
        }
        reader.readAsDataURL(data.files[0]);
    }
}

// export function selectA(option) {
//     $("#" + option).children("input:first").addClass("M-input-select-top");
//     $("#" + option).children("input:last").addClass("M-input-select-bottom");
//
//     if ($("#" + option).is(':visible')) {
//         $("#" + option).hide();
//     } else {
//         $("#" + option).show();
//     }
// }
//
// export function selectB(select, option, result) {
//     $("#" + option).hide();
//     $("#" + select).val($(result).val());
//     $("#" + select).attr("name", $(result).attr("name"));
// }

//
//
// //관리자 공통 모달 닫기
// function adminTotalCloseBtn() {
//     $("#adminTotalModal").hide();
//     $("#adminTotalModalBody").empty();
// }
//
//
// //관리자 공통 모달 열기
// function adminTotalModalShow(data) {
//     $("#adminTotalModalBody").append('<small style="font-size: 30px;">' + data + '</small>');
//     $("#adminTotalModal").show();
// }
//
// //관리자 공통 yes or no modal 닫기
// function adminTotalModalYesOrNoClose() {
//     $("#adminTotalModalYesOrNo").hide();
//     $("#adminTotalModalYesOrNoBody").empty();
// }
//
// //관리자 결제취소 yes or no modal 열기
// function adminTotalModalYesOrNoShow(data, inputStatus, orderSq) {
//     $("#hiddenStatusYesOrNo").val(inputStatus);
//     $("#yesOrNoHiddenOrderSq").val(orderSq);
//     $("#adminTotalModalYesOrNoBody").append(' <small style="font-size: 20px;">' + data + '</small>');
//     $("#adminTotalModalYesOrNo").show();
// }

// function adminTotalModalYesOrNoSelect(data) {
//
//     var getInputStatusData = $("#hiddenStatusYesOrNo").val();
//     var orderSq = $("#yesOrNoHiddenOrderSq").val();
//
//     if (data) {
//
//         if (getInputStatusData == "moneyCancel") {  //현금 취소
//             cancelMoneyOrder(orderSq);
//         } else if (getInputStatusData == "cardCancel") {
//             cancelCardOrder(orderSq);
//         }
//
//     } else {
//         adminTotalModalYesOrNoClose();
//     }
//
// }