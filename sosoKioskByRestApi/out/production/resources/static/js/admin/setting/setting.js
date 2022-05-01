function changeTax() {

    if ($("#taxInput").val().length > 10) {
        adminTotalModalShow("최대 크기를 초과하였습니다. (10자리수)");
    } else {
        $.ajax({
            type: "GET",
            url: "/admin/save/setting/tax",
            dataType: "JSON",
            data: {
                "tax": $("#taxInput").val()
            },
            success: function (data) {
                if (data) {
                    adminTotalModalShow("설정을 변경하였습니다.");
                } else {
                    adminTotalModalShow("설정 변경에 실패하였습니다. (숫자입력)");
                }
            }
        });
    }
}

function changeReaderNo() {

    if ($("#readerNoInput").val().length > 20) {
        adminTotalModalShow("최대 크기를 초과하였습니다. (20자리수)");
    } else {
        $.ajax({
            type: "GET",
            url: "/admin/save/setting/readerNo",
            dataType: "JSON",
            data: {
                "readerNo": $("#readerNoInput").val()
            },
            success: function (data) {
                if (data) {
                    adminTotalModalShow("설정을 변경하였습니다.");
                } else {
                    adminTotalModalShow("설정 변경에 실패하였습니다. (관리자 문의)");
                }
            }
        });
    }
}


function changeLeaderName() {

    if ($("#leaderName").val().length > 5) {
        adminTotalModalShow("최대 크기를 초과하였습니다. (5자리수)");
    } else {
        $.ajax({
            type: "GET",
            url: "/admin/save/setting/leaderName",
            dataType: "JSON",
            data: {
                "leaderName": $("#leaderName").val()
            },
            success: function (data) {
                if (data) {
                    adminTotalModalShow("설정을 변경하였습니다.");
                } else {
                    adminTotalModalShow("설정 변경에 실패하였습니다. (관리자 문의)");
                }
            }
        });
    }
}


function changeBusinessNumber() {

    if ($("#businessNumber").val().length > 20) {
        adminTotalModalShow("최대 크기를 초과하였습니다. (20자리수)");
    } else {
        $.ajax({
            type: "GET",
            url: "/admin/save/setting/businessNumber",
            dataType: "JSON",
            data: {
                "businessNumber": $("#businessNumber").val()
            },
            success: function (data) {
                if (data) {
                    adminTotalModalShow("설정을 변경하였습니다.");
                } else {
                    adminTotalModalShow("설정 변경에 실패하였습니다. (관리자 문의)");
                }
            }
        });
    }
}

function changePrinterName() {
    $.ajax({
        type: "GET",
        url: "/admin/save/setting/printerName",
        dataType: "JSON",
        data: {
            "printerName": $("#printerName").val()
        },
        success: function (data) {
            if (data) {
                adminTotalModalShow("설정을 변경하였습니다.");
            } else {
                adminTotalModalShow("설정 변경에 실패하였습니다. (관리자 문의)");
            }
        }
    });
}