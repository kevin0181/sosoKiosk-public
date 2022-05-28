$(document).ready(function () {

    $("#all-menu.js-search").on("change keyup paste", function () { //search

        var result = $(this).val();
        $(".admin-tbody-tr").hide();

        var temp = $(".admin-tbody-tr:contains('" + result + "')");
        $(temp).show();

    });
});


//메뉴 상세 가져옴
function menuDetailModal(menuSq) {

    $("#menuDetailPartParent").empty();

    modalAllResetByMenu();

    modalDetailReset();


    $("#menuDetailFooter").children().show();
    $("#menuChangeBtn").show();
    $("#menuDetailCloseBtn").width('100%');

    $("#menuPart").children().attr("style", 'background-color:#838383');
    $("#sidePart").children().attr("style", 'background-color:#e7e7e7');

    $.ajax({
        type: "POST",
        url: "/admin/menu/get/find/menu",
        dataType: "JSON",
        data: {
            "menuSq": menuSq,
        },
        success: function (data) {

            $("#menuPart").removeAttr('onclick');
            $("#menuPart").attr('onclick', 'menuDetailModal(' + data.menuSq + ')');

            $("#menuSq").val(data.menuSq);
            $("#menuName").val(data.menuName); //메뉴 이름
            $("#menuPrice").val(data.menuPrice); //메뉴 가격
            $("#categorySelect").val(data.categoryDTO.categoryName); //메뉴 카테고리
            $("#categorySelect").attr("name", data.categorySq);
            $("#admin-main-menu.js-select-img").attr("src", data.imgDTOList[0].imgPath + "/" + data.imgDTOList[0].imgName);//메뉴 이미지 넣기
            $("#admin-main-menu.js-select-img").show(); //메뉴 이미지 보이게
            $("input:checkbox[id='menuSoldOut-checkBox']").prop("checked", data.menuSoldOut); //품절 체크
            $("input:checkbox[id='menuEnable-checkBox']").prop("checked", data.menuEnable); //메뉴 숨기기 체크

            if (data.side.length != 0) {
                $("#sideSelect").val(data.side[0].sideName);
                $("#sideSelect").attr("name", data.side[0].sideSq);
                $("#sidePart").show();
                $("#sidePart").attr("onclick", 'allMenuDetailSide(' + data.side[0].sideSq + ')');
            } else {
                $("#sidePart").hide();
            }

        }
    });

    $(".menu.js-detail-modal").show();
}

//메뉴 상세보기에서 사이드 선택
function allMenuDetailSide(sideSq) {

    modalAllResetBySide();

    $.ajax({
        type: "POST",
        url: "/admin/side/get/side",
        dataType: "JSON",
        data: {
            "sideSq": sideSq,
        },
        success: function (sideData) {

            console.log(sideData);

            var sideTable = '<div class="admin-menu.js-all-list M-font M-mini-size">\n' +
                '                    <div class="admin-menu.js-all-list-div M-overlay">\n' +
                '                        <table class="admin-menu.js-all-table M-text-center">\n' +
                '                            <thead class="">\n' +
                '                                <tr class="admin-menu.js-all-table-tr" style="text-align: center;">\n' +
                '                                    <th style="width: 15%;">\n' +
                '                                        사이드\n' +
                '                                    </th>\n' +
                '                                    <th style="width: 15%;">\n' +
                '                                        사이드 카테고리\n' +
                '                                    </th>\n' +
                '                                    <th style="width: 25%;">\n' +
                '                                        사이드 메뉴\n' +
                '                                    </th>\n' +
                '                                    <th style="width: 15%;">\n' +
                '                                        가격\n' +
                '                                    </th>\n' +
                '                                    <th style="width: 15%;">\n' +
                '                                        상태\n' +
                '                                    </th>\n' +
                '                                    <th style="width: 7%">\n' +
                '                                        삭제\n' +
                '                                    </th>\n' +
                '                                </tr>\n' +
                '                            </thead>\n' +
                '                            <tbody class="admin-tbody">';

            $(sideData.sideCategoryDTOList).each(function () {

                var categoryData = this.sideCategoryName;

                $(this.menuSideDTOList).each(function () {

                    sideTable += '<tr class="M-text-center admin-tbody-tr">\n' +
                        '                                    <td class="search" style="width: 15%;">\n' +
                        '                                        ' + sideData.sideName + '   ' +
                        '                                    </td>\n' +
                        '                                    <td class="search">\n' +
                        '                                       ' + categoryData + '     ' +
                        '                                    </td>';

                    var sideSoldOut = '';
                    var sideEnable = '';

                    if (this.menuSideSoldOut) {
                        sideSoldOut = '(품절)';
                    }
                    if (this.menuSideEnable) {
                        sideEnable = '(메뉴 숨김)';
                    }

                    sideTable += '                           <td class="search">\n' +
                        '                                        <p style="display: inline-block; margin-right: 5px;">' + this.menuSideName + '</p>\n' +
                        '                                    </td>\n' +
                        '                                    <td class="search">\n' +
                        '                                    ' + this.menuSidePrice + '   ' +
                        '                                    </td>\n' +
                        '                                    <td class="search">\n' +
                        '                                        <p class="soldOut-font">' + sideSoldOut + '</p>\n' +
                        '                                        <p class="enableMenu-font">' + sideEnable + '</p>\n' +
                        '                                    </td>\n' +
                        '                                    <td class="search"> \n' +
                        '                                    </td>\n' +
                        '                                </tr>';


                });


            });


            sideTable += '</tbody>' +
                '</table>' +
                '</div>' +
                '</div>';

            $("#menuDetailPartParent").append(sideTable);

        }
    });


}


//메뉴 수정
function changeMenu() {

    var formData = new FormData($("#addMenuForm")[0]);

    var categorySq = $("#categorySelect").attr("name");
    var sideSq = $("#sideSelect").attr("name");
    var menuSoldOut;
    var menuEnable;


    if ($("input:checkbox[id='menuSoldOut-checkBox']").is(":checked") == true) {
        menuSoldOut = true;
    } else {
        menuSoldOut = false;
    }

    if ($("input:checkbox[id='menuEnable-checkBox']").is(":checked") == true) {
        menuEnable = true;
    } else {
        menuEnable = false;
    }

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

    if (sideSq == null) {
        sideSq = 0;
    }


    formData.append("categorySq", categorySq);
    formData.append("sideSq", sideSq);

    formData.append("menuSoldOut", menuSoldOut);
    formData.append("menuEnable", menuEnable);

    $.ajax({
        type: "POST",
        url: "/admin/menu/change/menu",
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

            } else { //정상
                $("#progress-small-menu.js").text($("#menuName").val() + "를 수정하였습니다.");
                $("#menu.js-fileUrl").text("이미지 변경을 원하시면 선택하세요.");
                $("#changeStatus").val(true);
            }
        },
    });

}

//메뉴 삭제
function deleteMenuOpenModal(menuSq, menuName) {

    $("#delete-modal").show();
    $("#delete-modal-Body").append('<small style="color: red;font-size: 20px;">' + menuName + '을(를) 삭제하시겠습니까?</small>');
    $("#delete-modal-footer").append(' <div class="O-side-select-close" onclick="deleteMenu(' + menuSq + ')" style="width: 50%; background-color: #eb8282;">\n' +
        '                                    <p class="M-font O-font-middle-size">네</p>\n' +
        '                                </div>');

}

function deleteMenu(menuSq) {

    $.ajax({
        type: "POST",
        url: "/admin/menu/delete/menu",
        dataType: "json",
        data: {
            "menuSq": menuSq,
        },
        success: function (data) {
            if (data) {
                // deleteModalClose();
                location.href = "/admin/index";
            } else {
                $("#delete-modal-Body").empty();
                $("#delete-modal-Body").append('<small style="color: red;font-size: 20px;">삭제를 실패하였습니다. 다시 시도하시겠습니까?</small>');
            }
        }, error: function () {
            $("#delete-modal-Body").empty();
            $("#delete-modal-Body").append('<small style="color: red;font-size: 20px;">삭제를 실패하였습니다. 다시 시도하시겠습니까?</small>');
        }
    });

}

function modalDetailReset() {
    $("#menuName").val(""); //메뉴 이름
    $("#menuPrice").val(""); //메뉴 가격
    $("#categorySelect").val(""); //메뉴 카테고리
    $("#admin-main-menu.js-select-img").attr("src", "");//메뉴 이미지 넣기
    $("#admin-main-menu.js-select-img").hide(); //메뉴 이미지 보이게
    $("#sideSelect").val("");
    $("input:checkbox[id='menuSoldOut-checkBox']").prop("checked", false);
    $("input:checkbox[id='menuEnable-checkBox']").prop("checked", false);
}

function modalAllResetBySide() {
    modalDetailReset();

    $("#menuDetailPartParent").empty();
    $("#menuDetailFooter").children().hide();
    $("#menuChangeBtn").hide();
    $("#menuDetailCloseBtn").width('50%');

    $("#sidePart").children().attr("style", 'background-color:#838383');
    $("#menuPart").children().attr("style", 'background-color:#e7e7e7');
}

function modalAllResetByMenu() {
    $("#menuDetailPartParent").append('<div class="O-side-order-part O-side-order-part-menu.js" id="menuDetailPart" style="padding: 10px;">\n' +
        '                    <form id="addMenuForm" class="M-flex-column admin-main-left-flex" method="post"\n' +
        '                          enctype="multipart/form-data">\n' +
        '                        <input type="hidden" id="menuSq" name="menuSq">\n' +
        '                        <div class="M-flex-row M-font admin-font-size" style="margin-bottom: 25px;">\n' +
        '                            <div class="M-flex-1 M-flex-row M-flex-center">\n' +
        '                                메뉴 이름\n' +
        '                            </div>\n' +
        '                            <div class="M-flex-1 M-flex-row M-flex-center menuInputDiv">\n' +
        '                                <input type="text" class="M-input-text M-font M-mini-size" id="menuName"\n' +
        '                                       name="menuName">\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="M-flex-row M-font admin-font-size" style="margin-bottom: 25px;">\n' +
        '                            <div class="M-flex-1 M-flex-row M-flex-center">\n' +
        '                                사진 업로드\n' +
        '                            </div>\n' +
        '                            <div class="M-flex-1 M-flex-row M-flex-center menuInputDiv">\n' +
        '                                <input type="file" value="" class="M-none-design" id="menu.js-file" name="menuImg"\n' +
        '                                       accept="image/*">\n' +
        '                                <label class="M-input-text" id="menu.js-fileUrl" for="menu.js-file"\n' +
        '                                       style="font-size: 20px; overflow: hidden">이미지 변경을 원하시면 선택하세요.\n' +
        '                                </label>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="M-flex-row M-font admin-font-size" style="margin-bottom: 25px;">\n' +
        '                            <div class="M-flex-1 M-flex-row M-flex-center">\n' +
        '                                가격\n' +
        '                            </div>\n' +
        '                            <div class="M-flex-1 M-flex-row M-flex-center menuInputDiv">\n' +
        '                                <input type="text" value="" class="M-input-text M-font M-mini-size" id="menuPrice"\n' +
        '                                       name="menuPrice">\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="M-flex-row M-font admin-font-size" style="margin-bottom: 25px;">\n' +
        '                            <div class="M-flex-1 M-flex-row M-flex-center">\n' +
        '                                카테고리\n' +
        '                            </div>\n' +
        '                            <div class="M-flex-1 M-flex-column M-flex-center" style="position: relative;">\n' +
        '                                <input type="text" value="" class="M-input-text M-font M-mini-size menuInputDiv"\n' +
        '                                       id="categorySelect"\n' +
        '                                       readonly\n' +
        '                                       onfocus="this.blur()">\n' +
        '                                <div class="M-input-select-div" id="categorySelectOption"\n' +
        '                                     style="display: none;">\n' +
        '                                    <!--                                <input type="text" value="1"-->\n' +
        '                                    <!--                                       class="M-input-select M-font M-mini-size M-input-select-middle"-->\n' +
        '                                    <!--                                       onclick="selectCategory(this)" readonly-->\n' +
        '                                    <!--                                       onfocus="this.blur()">-->\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="M-flex-row M-font admin-font-size" style="margin-bottom: 25px;">\n' +
        '                            <div class="M-flex-1 M-flex-row M-flex-center">\n' +
        '                                사이드\n' +
        '                            </div>\n' +
        '                            <div class="M-flex-1 M-flex-column M-flex-center menuInputDiv"\n' +
        '                                 style="position: relative;">\n' +
        '                                <input type="text" value="" class="M-input-text M-font M-mini-size" id="sideSelect"\n' +
        '                                       readonly\n' +
        '                                       onfocus="this.blur()">\n' +
        '                                <div class="M-input-select-div" id="sideSelectOption"\n' +
        '                                     style="display: none;">\n' +
        '                                    <!--                                    <input type="text" value="사이드 선택 안함" name="0"-->\n' +
        '                                    <!--                                           class="M-input-select M-font M-mini-size M-input-select-middle"-->\n' +
        '                                    <!--                                           onclick="selectSide(this)"-->\n' +
        '                                    <!--                                           readonly-->\n' +
        '                                    <!--                                           onfocus="this.blur()">-->\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="M-flex-row M-font admin-font-size" style="margin-bottom: 25px;">\n' +
        '                            <div class="M-flex-1 M-flex-row M-flex-center">\n' +
        '\n' +
        '                            </div>\n' +
        '                            <!--                            <div class="M-flex-1 M-flex-row M-flex-center">-->\n' +
        '                            <!--                                <div class="O-side-select-close" style="margin-top: 0px; margin-right: 10px"-->\n' +
        '                            <!--                                     onclick="changeMenu()">-->\n' +
        '                            <!--                                    <p class="M-font">메뉴 수정</p>-->\n' +
        '                            <!--                                </div>-->\n' +
        '                            <!--                            </div>-->\n' +
        '                        </div>\n' +
        '                    </form>\n' +
        '                    <div class="M-flex-column admin-main-right-flex" id="menuDetailImg">\n' +
        '                        <div class="admin-main-img">\n' +
        '                            <div class="img-part M-flex-column M-flex-center">\n' +
        '                                <p class="M-font M-mini-size" id="admin-main-menu.js-select-img-top-p">메뉴 이미지</p>\n' +
        '                                <img id="admin-main-menu.js-select-img" class="admin-main-select-img"\n' +
        '                                     style="display: none;">\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="admin-progress-bar" style="padding: 10px 60px;">\n' +
        '                            <div class="admin-progress-bar-div" style="text-align: center;">\n' +
        '                                <small class="M-font" style="font-size: 25px;" id="progress-small-menu.js"></small>\n' +
        '                                <progress id="menu.js-progressBar" style="margin-top: 30px; height: 20px;"\n' +
        '                                          class="M-progress-bar"\n' +
        '                                          value="0"\n' +
        '                                          max="100"></progress>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>');
}

function menuModalDetailClose() {

    if ($("#changeStatus").val() == 'true') {
        location.href = "/admin/index";
    }

    resetProgressBar("menu");
    $("#menu.js-progressBar").hide();
    $(".menu.js-detail-modal").hide();
}