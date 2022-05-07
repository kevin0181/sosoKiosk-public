
function locationSetTime4(result) {
    setTimeout(() => location.href = result, 400);
}

function logout() {
    $.ajax({
        url: "/admin/logout",
        method: "post",
        dataType: "json",
    });
    location.href = "/";
}


function showImg(data, object) { //img url show
    $("#" + object).show();

    if (data.files && data.files[0]) {
        var reader = new FileReader();
        reader.onload = function (data) {
            $("#" + object).attr("src", data.target.result);
        }
        reader.readAsDataURL(data.files[0]);
    }
}

function selectA(option) {
    $("#" + option).children("input:first").addClass("M-input-select-top");
    $("#" + option).children("input:last").addClass("M-input-select-bottom");

    if ($("#" + option).is(':visible')) {
        $("#" + option).hide();
    } else {
        $("#" + option).show();
    }
}

function selectB(select, option, result) {
    $("#" + option).hide();
    $("#" + select).val($(result).val());
    $("#" + select).attr("name", $(result).attr("name"));
}

//메뉴 관리

function menu() {
    locationSetTime4('/admin/index');
}

function logoutBtn() {
    setTimeout(() => logout(), 400);
}

function allMenu() { // 전체 메뉴
    locationSetTime4('/admin/menu?status=all');
}

function addMenuPage() { // 메뉴 추가
    locationSetTime4('/admin/menu?status=addMenu');
}

function deleteMenuPage() { // 메뉴 삭제
    locationSetTime4('/admin/menu?status=deleteMenu');
}

function allSideMenu() { //사이드 메뉴
    locationSetTime4('/admin/menu?status=sideAll');
}

function addSidePage() {
    locationSetTime4('/admin/menu?status=sideAdd');
}

function addCategoryPage() {
    locationSetTime4('/admin/menu?status=addCategory');
}

function categoryPage() {
    locationSetTime4('/admin/menu?status=category');
}


//---------------------------------------------------------


//매출 계산

function salesPage() {
    locationSetTime4('/admin/sales?status=sales');
}


//---------------------------------------------------------


//주문 내역

function orderListPage() {
    locationSetTime4('/admin/order?status=AllOrder');
}


function orderListCard() {
    location.href = "/admin/order?status=cardOrder";
}

function orderListMoney() {
    location.href = "/admin/order?status=moneyOrder";
}


//---------------------------------------------------------


//일반 설정


function settingIndexPage() {
    locationSetTime4('/admin/setting?status=paySetting');
}

//---------------------------------------------------------


//관리자 공통 모달 닫기
function adminTotalCloseBtn() {
    $("#adminTotalModal").hide();
    $("#adminTotalModalBody").empty();
    location.reload();
}


//관리자 공통 모달 열기
function adminTotalModalShow(data) {
    $("#adminTotalModalBody").append('<small style="font-size: 30px;">' + data + '</small>');
    $("#adminTotalModal").show();
}

//관리자 공통 yes or no modal 닫기
function adminTotalModalYesOrNoClose() {
    $("#adminTotalModalYesOrNo").hide();
    $("#adminTotalModalYesOrNoBody").empty();
}

//관리자 결제취소 yes or no modal 열기
function adminTotalModalYesOrNoShow(data, inputStatus, orderSq) {
    $("#hiddenStatusYesOrNo").val(inputStatus);
    $("#yesOrNoHiddenOrderSq").val(orderSq);
    $("#adminTotalModalYesOrNoBody").append(' <small style="font-size: 20px;">' + data + '</small>');
    $("#adminTotalModalYesOrNo").show();
}

function adminTotalModalYesOrNoSelect(data) {

    var getInputStatusData = $("#hiddenStatusYesOrNo").val();
    var orderSq = $("#yesOrNoHiddenOrderSq").val();

    if (data) {

        if (getInputStatusData == "moneyCancel") {  //현금 취소
            cancelMoneyOrder(orderSq);
        } else if (getInputStatusData == "cardCancel") {
            cancelCardOrder(orderSq);
        }

    } else {
        adminTotalModalYesOrNoClose();
    }

}