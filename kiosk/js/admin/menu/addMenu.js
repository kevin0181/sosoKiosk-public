$(document).ready(function () {

    //file upload url 내보내기
    $("#menu.js-file").on("change", function () {
        var fileUrl = $("#menu.js-file").val();
        $("#menu.js-fileUrl").text(fileUrl);
        showImg(this, "admin-main-menu.js-select-img");
    });

    $("#categorySelect").on("click", function () { //카테고리 선택

        $("#categorySelectOption").empty();

        $.ajax({
            type: "get",
            url: "/admin/menu/get/list",
            dataType: "JSON",
            data: {
                "status": "category"
            },
            success: function (data) {
                if (data.length == 0) {
                    //없다고 표시
                }
                $(data).each(function () {
                    $("#categorySelectOption").append('<input type="text" value="' + this.categoryName + '" name="' + this.categorySq + '" \n' +
                        '                                       class="M-input-select M-font M-mini-size M-input-select-middle"\n' +
                        '                                       onclick="selectCategory(this)" readonly\n' +
                        '                                       onfocus="this.blur()">');
                });
                selectA("categorySelectOption");
            }
        });


        $("#sideSelectOption").hide();

    });


    $("#sideSelect").on("click", function () { //side 선택

        $("#sideSelectOption").empty();

        $.ajax({
            type: "get",
            url: "/admin/menu/get/list",
            dataType: "JSON",
            data: {
                "status": "side"
            },
            success: function (data) {
                if (data.length == 0) {
                    //없다고 표시
                }
                $("#sideSelectOption").append('<input type="text" value="사이드 선택 안함" name="0"\n' +
                    '                                           class="M-input-select M-font M-mini-size M-input-select-middle"\n' +
                    '                                           onclick="selectSide(this)"\n' +
                    '                                           readonly\n' +
                    '                                           onfocus="this.blur()">')
                $(data).each(function () {
                    $("#sideSelectOption").append('<input type="text" value="' + this.sideName + '" name="' + this.sideSq + '" \n' +
                        '                                                                       class="M-input-select M-font M-mini-size M-input-select-middle"\n' +
                        '                                                                       onclick="selectSide(this)" readonly\n' +
                        '                                                                       onfocus="this.blur()">');
                });

                selectA("sideSelectOption");

            }
        });


        $("#categorySelectOption").hide();

    });


});

// 메뉴추가
function addMenu() {

    var formData = new FormData($("#addMenuForm")[0]);

    var categorySq = $("#categorySelect").attr("name");
    var sideSq = $("#sideSelect").attr("name");

    $("#progress-small-menu.js").text("");
    $("#menu.js-progressBar").show();


    if ($("#menuName").val() == "") {
        $("#progress-small-menu.js").text("메뉴 이름을 입력하세요.");
        return false;
    }

    if ($("#menuName").val().length > 10) {
        $("#progress-small-menu.js").text("메뉴 이름의 최대 길이를 초과하였습니다. (10자리수)");
        return false;
    }

    if ($("#menuPrice").val() == "") {
        $("#progress-small-menu.js").text("가격을 입력하세요.");
        return false;
    }

    if ($("#menuPrice").val().length > 8) {
        $("#progress-small-menu.js").text("가격의 최대 길이를 초과하였습니다. (8자리수)");
        return false;
    }

    var regExp = /^[0-9]*$/;
    if (!regExp.test($("#menuPrice").val())) {
        $("#progress-small-menu.js").text("숫자를 입력하세요.");
        return false;
    }

    if (categorySq == null) {
        $("#progress-small-menu.js").text("카테고리를 선택하세요.");
        categorySq = 0;
        return false;
    }

    console.log(sideSq);

    if (sideSq == null || sideSq == "") {
        sideSq = 0;
    }


    formData.append("categorySq", categorySq);
    formData.append("sideSq", sideSq);

    $.ajax({
        type: "POST",
        url: "/admin/menu/add/menu",
        dataType: "json",
        processData: false,
        contentType: false,
        data: formData,
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.upload.onprogress = function (e) {
                var per = e.loaded * 100 / e.total;
                progressBar(per, "menu.js-progressBar");
            };
            return xhr;
        },
        success: function (data) {

            if (data.status) { //에러

                $("#progress-small-menu.js").text(data.message);
                $("#menu.js-progressBar").val(0);
                $("#categorySelect").val("");
                $(".menuInputDiv input").val("");
                $("#menu.js-fileUrl").text("");
                $("#admin-main-menu.js-select-img").hide();
                resetAddMenuForm();

            } else { //정상
                $("#progress-small-menu.js").text($("#menuName").val() + "를 추가하였습니다.");
                $("#categorySelect").val("");
                $(".menuInputDiv input").val("");
                $("#menu.js-fileUrl").text("");
                $("#admin-main-menu.js-select-img").hide();
                resetAddMenuForm();
            }
        },
    });


}


function selectCategory(result) { //select category option
    selectB("categorySelect", "categorySelectOption", result);
}

function selectSide(result) { //select side option
    selectB("sideSelect", "sideSelectOption", result);
}

function resetAddMenuForm() {

    $("#categorySelect").val("");
    $("#categorySelect").attr("name", "");
    $("#sideSelect").val("");
    $("#sideSelect").attr("name", "");

}