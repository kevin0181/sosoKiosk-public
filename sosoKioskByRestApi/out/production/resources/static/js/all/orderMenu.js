var sideCategoryList;
var menuList;
var sideMenuList;

var orderTotalPrice;

var allSelectMenuArr = [];

function openSideModal() {
    $("#menuOrSideModal").show();
    $(".O-modal-top-title>p").text("사이드 메뉴 선택");
    $(".O-side-select-ok-part").show();
    $(".O-side-select-menu-part-left").addClass('O-side-select-menu-part-left2');
}

function clickMenu(menuSq, sideSq) { //modal 보이게

    var menuStatus = false;


    if (sideSq != null) { // 사이드 있으면
        openSideModal();


        if (allSelectMenuArr.length != 0) {
            for (var i = 0; i < allSelectMenuArr.length; i++) {
                if (allSelectMenuArr[i].addSide != undefined && allSelectMenuArr[i].menuSq == menuSq) { //만약에 이미 선택된 사이드 메뉴가 있다면?
                    menuStatus = true;

                    $(".O-side-select-menu-part-left").append(' <div class="O-select-mini-card" style="width: 85%;">\n' +
                        '                        <div class="O-mini-card-header">\n' +
                        '                            <div class="O-mini-card-header-img">\n' +
                        '                                <img class="O-mini-img" src="' + allSelectMenuArr[i].imgDTOList[0].imgPath + '/' + allSelectMenuArr[i].imgDTOList[0].imgName + '">\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="O-mini-card-body">\n' +
                        '                            <div class="O-mini-card-body-content">\n' +
                        '                                  <input type="hidden" value="' + allSelectMenuArr[i].menuSq + '" name="selectMenuSq">' +
                        '                                <p class="M-font O-font-mini-size">' + allSelectMenuArr[i].menuName + '</p>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div>' +
                        '<div class="O-menu-side-number M-flex-column M-flex-center">\n' +
                        ' <div class="side-number-top M-font O-font-middle-size" onclick="upOrDownMenu(true, this,' + menuSq + ')">+ ' +
                        '</div>' +
                        '<div class="M-font O-font-middle-size">' +
                        '<input type="hidden" value="' + allSelectMenuArr[i].size + '" id="hiddenMenuSq">' +
                        '<p>' + allSelectMenuArr[i].size + '</p>' +
                        '</div>' +
                        '<div class="side-number-bottom M-font O-font-middle-size" onclick="upOrDownMenu(false, this, ' + menuSq + ')">-' +
                        '</div>' +
                        '</div>');

                    showSelectSide(menuSq);

                    showSideCategoryAndSideMenu(sideSq);

                }
            }
        }


        if (menuStatus == false) { //선택된 메뉴 없음.

            $(menuList).each(function () {

                if (this.menuSq == menuSq) {
                    $(".O-side-select-menu-part-left").append(' <div class="O-select-mini-card" style="width: 85%;">\n' +
                        '                        <div class="O-mini-card-header">\n' +
                        '                            <div class="O-mini-card-header-img">\n' +
                        '                                <img class="O-mini-img" src="' + this.imgDTOList[0].imgPath + '/' + this.imgDTOList[0].imgName + '">\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="O-mini-card-body">\n' +
                        '                            <div class="O-mini-card-body-content">\n' +
                        '                                  <input type="hidden" value="' + this.menuSq + '" name="selectMenuSq">' +
                        '                                <p class="M-font O-font-mini-size">' + this.menuName + '</p>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div>' +
                        '<div class="O-menu-side-number M-flex-column M-flex-center">\n' +
                        ' <div class="side-number-top M-font O-font-middle-size" onclick="upOrDownMenu(true, this,' + menuSq + ')">+ ' +
                        '</div>' +
                        '<div class="M-font O-font-middle-size">' +
                        '<input type="hidden" value="1" id="hiddenMenuSq">' +
                        '<p>1</p>' +
                        '</div>' +
                        '<div class="side-number-bottom M-font O-font-middle-size" onclick="upOrDownMenu(false, this, ' + menuSq + ')">-' +
                        '</div>' +
                        '</div>');
                    return false;
                }


            });

            showSideCategoryAndSideMenu(sideSq);


        }


    } else { //사이드 없으면

        // $(menuList).each(function () {
        //
        //     if (menuSq == this.menuSq) {
        //
        //         if (allSelectMenuArr.length == 0) {
        //             allSelectMenuArr[0] = this;
        //             allSelectMenuArr[0].size = 1;
        //         } else {
        //             var arrSize = allSelectMenuArr.length;
        //             var checkResult = false;
        //
        //             for (var i = 0; i < arrSize; i++) {
        //
        //                 if (allSelectMenuArr[i].menuSq == menuSq) { //이미 있는메뉴면? 사이즈 추가
        //                     allSelectMenuArr[i].size = allSelectMenuArr[i].size + 1;
        //                     checkResult = true;
        //                 }
        //             }
        //
        //             if (checkResult == false) {  //없는 메뉴면  새로 추가
        //                 allSelectMenuArr[arrSize] = this;
        //                 allSelectMenuArr[arrSize].size = 1;
        //             }
        //         }
        //     }
        // });


        if (allSelectMenuArr.length == 0) { //일반 메뉴인데 선택된게 없으면
            showMenu(menuSq);
        } else {
            var menuResult = false;

            for (var i = 0; i < allSelectMenuArr.length; i++) {
                if (allSelectMenuArr[i].menuSq == menuSq) {
                    menuResult = true;

                    menuModal(); //menu 모달 open

                    $(".O-side-order-part").append('<div class="M-container M-flex-row M-flex-center">\n' +
                        '                        <div class="O-select-mini-card" style="width: 60%;">\n' +
                        '                            <div class="O-mini-card-header" style="width: 70%; height: 200px;">\n' +
                        '                                <div class="O-mini-card-header-img">\n' +
                        '                                    <img class="O-mini-img" ' +
                        '                        src="' + allSelectMenuArr[i].imgDTOList[0].imgPath + '/' + allSelectMenuArr[i].imgDTOList[0].imgName + '">\n' +
                        '                                </div>\n' +
                        '                            </div>\n' +
                        '                            <div class="O-mini-card-body">\n' +
                        '                                <div class="O-mini-card-body-content">\n' +
                        '                                    <p class="M-font O-font-mini-size">' + allSelectMenuArr[i].menuName + '</p>\n' +
                        '                                </div>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="O-menu-side-number M-flex-column M-flex-center">\n' +
                        '                            <div class="side-number-top M-font O-font-middle-size"\n' +
                        '                                 onclick="upOrDownMenu(true, this,' + menuSq + ')">+\n' +
                        '                            </div>\n' +
                        '                            <div class="M-font O-font-middle-size"><input type="hidden" value="' + allSelectMenuArr[i].size + '" id="hiddenMenuSq">\n' +
                        '                                <p>' + allSelectMenuArr[i].size + '</p></div>\n' +
                        '                            <div class="side-number-bottom M-font O-font-middle-size"\n' +
                        '                                 onclick="upOrDownMenu(false, this,' + menuSq + ')">-\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div>'); //메뉴

                    $(".O-side-select-menu-part").append('<div class="O-side-select-close M-flex-column M-flex-center" onclick="selectMenu(' + menuSq + ')"\n' +
                        '                             style="width: 100%; height: 80%; background-color: #eb8282;">\n' +
                        '                            <p class="M-font O-font-middle-size">메뉴 추가</p>\n' +
                        '                        </div>');//메뉴 추가 버튼


                }

            }

            if (menuResult == false) { //일반 메뉴에 선택된게 없으면
                showMenu(menuSq);
            }

        }


    }
}

function showMenu(menuSq) {
    $(menuList).each(function () {

        if (this.menuSq == menuSq) {
            menuModal(); //menu 모달 open
            $(".O-side-order-part").append('<div class="M-container M-flex-row M-flex-center">\n' +
                '                        <div class="O-select-mini-card" style="width: 60%;">\n' +
                '                            <div class="O-mini-card-header" style="width: 70%; height: 200px;">\n' +
                '                                <div class="O-mini-card-header-img">\n' +
                '                                    <img class="O-mini-img" src="' + this.imgDTOList[0].imgPath + '/' + this.imgDTOList[0].imgName + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="O-mini-card-body">\n' +
                '                                <div class="O-mini-card-body-content">\n' +
                '                                    <p class="M-font O-font-mini-size">' + this.menuName + '</p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="O-menu-side-number M-flex-column M-flex-center">\n' +
                '                            <div class="side-number-top M-font O-font-middle-size"\n' +
                '                                 onclick="upOrDownMenu(true, this,' + menuSq + ')">+\n' +
                '                            </div>\n' +
                '                            <div class="M-font O-font-middle-size"><input type="hidden" value="1" id="hiddenMenuSq">\n' +
                '                                <p>1</p></div>\n' +
                '                            <div class="side-number-bottom M-font O-font-middle-size"\n' +
                '                                 onclick="upOrDownMenu(false, this,' + menuSq + ')">-\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>'); //메뉴

            $(".O-side-select-menu-part").append('<div class="O-side-select-close M-flex-column M-flex-center" onclick="selectMenu(' + menuSq + ')"\n' +
                '                             style="width: 100%; height: 80%; background-color: #eb8282;">\n' +
                '                            <p class="M-font O-font-middle-size">메뉴 추가</p>\n' +
                '                        </div>');//메뉴 추가 버튼
            return false;
        }

    });
}

function showSelectSide(menuSq) {


    for (var i = 0; i < allSelectMenuArr.length; i++) {
        if (allSelectMenuArr[i].menuSq == menuSq) {
            $(allSelectMenuArr[i].addSide).each(function () {
                $(".O-side-select-menu-part").append('<div class="O-side-select-card O-side-select-card' + this.sideSq + '" name="selectSideCardName">\n' +
                    '                            <div class="O-side-select-number">\n' +
                    '                                <p class="M-font O-font-number-size" name="sideSelectSize' + this.sideSq + '">' + this.sideSize + '</p>\n' +
                    '                            </div>\n' +
                    '                            <div class="O-side-mini-close-Btn" onclick="deleteSideMenuSelect(this,' + this.sideSq + ')">\n' +
                    '                                <div class="O-close O-close2"></div>\n' +
                    '                            </div>\n' +
                    '                            <div class="O-side-select-name M-flex-column M-flex-center">\n' +
                    '                            <input type="hidden"' +
                    '                                 value="' + this.sidePrice + '" id="sideSelectPrice">' +
                    '                                <input type="hidden" value="' + this.sideSq + '" name="sideSelectSq">\n' +
                    '                                <p class="M-font O-font-mini-size">' + this.sideName + '</p>\n' +
                    '                            </div>\n' +
                    '                        </div>'
                );
            });
        }
    }
}


function showSideCategoryAndSideMenu(sideSq) {
    $.ajax({
        type: "POST",
        url: "/kiosk/side/get/sideSq",
        dataType: "JSON",
        data: {
            "sideSq": sideSq,
        },
        success: function (data) {

            sideCategoryList = data.sideCategoryDTOList;

            $(".O-modal-category-bar").empty();
            $(".O-side-order-part").empty();

            $(data.sideCategoryDTOList).each(function (index, item) { //카테고리

                if (index == 0) {
                    $(".O-modal-category-bar").append(' <div class="O-category-part">\n' +
                        '                    <div class="M-font O-font-mini-size O-category-box O-category-click-color" ' +
                        'onclick="clickSideCategory(this,' + this.sideCategorySq + ')">\n' +
                        '                        <p>' + this.sideCategoryName + '</p>\n' +
                        '                    </div>\n' +
                        '                </div>');
                } else {
                    $(".O-modal-category-bar").append(' <div class="O-category-part">\n' +
                        '                    <div class="M-font O-font-mini-size O-category-box" ' +
                        'onclick="clickSideCategory(this,' + this.sideCategorySq + ')">\n' +
                        '                        <p>' + this.sideCategoryName + '</p>\n' +
                        '                    </div>\n' +
                        '                </div>');
                }

            });

            sideMenuList = data.sideCategoryDTOList[0].menuSideDTOList;

            addSideMenu(sideMenuList);

        }
    });
}

function selectMenu(menuSq) { //메뉴 선택 완료
    var selectSize = allSelectMenuArr.length;

    for (var i = 0; i < selectSize; i++) {
        if (allSelectMenuArr[i].menuSq == menuSq) { //이미 있는메뉴면 삭제
            delete allSelectMenuArr[i];
        }
    }


    $(menuList).each(function () { //다시 추가
        if (menuSq == this.menuSq) {
            allSelectMenuArr[selectSize] = this;
            allSelectMenuArr[selectSize].size = parseInt($('#hiddenMenuSq').val());
            return false;
        }
    });
    allSelectMenuArr = allSelectMenuArr.filter((element, i) => element !== undefined); //array 빈 값 제거
    modalClose();
}

function menuModal() { //메뉴 선택 시 모달
    $("#menuOrSideModal").show();
    $(".O-modal-top-title>p").text("메뉴 수량 선택");
    $(".O-side-select-ok-part").hide();
    $(".O-modal").addClass('O-menu-modal');
}


function selectSideBtn() { //사이드 선택완료


    var selectMenuSq = $('input[name=selectMenuSq]').val();

    $(menuList).each(function () {

        if (selectMenuSq == this.menuSq) {

            var arrSize = allSelectMenuArr.length;
            var checkResult = false;

            for (var i = 0; i < arrSize; i++) {

                if (allSelectMenuArr[i].menuSq == selectMenuSq) { //이미 있는메뉴면? 사이즈 추가
                    // allSelectMenuArr.splice(i, 1);
                    delete allSelectMenuArr[i];
                }
            }

            allSelectMenuArr[arrSize] = this;
            allSelectMenuArr[arrSize].size = parseInt($("#hiddenMenuSq").val());

            var selectSideCardName = $("div[name=selectSideCardName]");
            var sideMenuSelectArray = [];

            if ($('input[name=sideSelectSq]').length == selectSideCardName.children('.O-side-select-number').children('p').length) { //사이드메뉴 json으로 가져옴
                for (var i = 0; i < $('input[name=sideSelectSq]').length; i++) {

                    var selectData = new Object();

                    selectData.sideSq = $('input[name=sideSelectSq]').eq(i).val();
                    selectData.sideName = $('input[name=sideSelectSq] + p').eq(i).text();
                    selectData.sideSize = selectSideCardName.children('.O-side-select-number').children('p').eq(i).text();
                    selectData.sidePrice = $('input[id=sideSelectPrice]').eq(i).val();
                    sideMenuSelectArray.push(selectData);

                }
                allSelectMenuArr[arrSize].addSide = sideMenuSelectArray;

                allSelectMenuArr = allSelectMenuArr.filter((element, i) => element !== undefined); //array 빈 값 제거

            } else {
                location.href = "/"; //error
            }

        }

    });


    modalClose(); //사이드 창닫음.
}

function modalClose() { //modal 숨기기
    $("#menuOrSideModal").hide();
    $(".O-modal-category-bar").empty();
    $(".O-side-order-part").empty();
    $(".O-side-select-menu-part-left").empty();
    $(".O-side-select-menu-part").empty();
    $(".O-modal").removeClass('O-menu-modal');
    $(".O-side-select-menu-part-left").removeClass('O-side-select-menu-part-left2');

    //모달창 닫고 메뉴 가격 변경!
    $('.totalPrice-div').empty();

    menuPrice();

    selectMenuAdd();

}

function selectMenuAdd() { //메뉴 추가
    $('.O-mini-select-bar').empty(); //비워주고

    $(allSelectMenuArr).each(function () { //menu select 부분

        var getSideSq;

        if (this.side.length == 0) {
            getSideSq = null;
        } else {
            getSideSq = this.side[0].sideSq;
        }

        $('.O-mini-select-bar').append(' <div class="O-select-mini-card">\n' +
            '                                                                    <div class="O-select-mini-number">\n' +
            '                                                                        <p class="M-font O-font-number-size">' + this.size + '</p>\n' +
            '                                                                    </div>\n' +
            '                                                                    <div class="O-select-mini-close-Btn">\n' +
            '                                                                        <div class="O-close O-close2" onclick="deleteSelectMenu(' + this.menuSq + ')"></div>\n' +
            '                                                                    </div>\n' +
            '                                                                    <div class="O-mini-card-header">\n' +
            '                                                                        <div class="O-mini-card-header-img" onclick="clickMenu(' + this.menuSq + ',' + getSideSq + ')">\n' +
            '                                                                            <img class="O-mini-img"' +
            '                                                               src="' + this.imgDTOList[0].imgPath + '/' + this.imgDTOList[0].imgName + '">\n' +
            '                                                                        </div>\n' +
            '                                                                    </div>\n' +
            '                                                                    <div class="O-mini-card-body">\n' +
            '                                                                        <div class="O-mini-card-body-content">\n' +
            '                                                                            <p class="M-font O-font-mini-size">' + this.menuName + '</p>\n' +
            '                                                                        </div>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>'
        )
        ;

    });
}

function menuPrice() { //메뉴 가격 계산

    $('.totalPrice-div').empty();

    var menuTotalPrice;
    menuTotalPrice = 0;
    var sidePrice = 0;
    $(allSelectMenuArr).each(function () {

        menuTotalPrice = menuTotalPrice + (parseInt(this.menuPrice) * parseInt(this.size));
        if (this.addSide != undefined) { //사이드메뉴있음
            $(this.addSide).each(function () {
                sidePrice = sidePrice + (parseInt(this.sidePrice) * parseInt(this.sideSize));
            });
        }

    });

    menuTotalPrice = menuTotalPrice + sidePrice; //메뉴 총액과 사이드 메뉴 총액을 더한 금액

    if (menuTotalPrice == 0) {
        $('.totalPrice-div').empty();
    } else {
        $('.totalPrice-div').append('<div class="M-font O-font-middle-size">\n' +
            '                                <span>총액 : </span>\n' +
            '                                <span>' + menuTotalPrice + '</span>\n' +
            '                            </div>');

    }

}

function deleteSelectMenu(menuSq) { //선택된 메뉴 삭제

    var arrSize = allSelectMenuArr.length;

    for (var i = 0; i < arrSize; i++) {

        if (allSelectMenuArr[i].menuSq == menuSq) { //같은 메뉴 삭제
            delete allSelectMenuArr[i];
        }
    }

    allSelectMenuArr = allSelectMenuArr.filter((element, i) => element !== undefined); //array 빈 값 제거

    menuPrice();
    selectMenuAdd();

}

function resetSideCategory() { //side category reset
    $(".O-modal-category-bar").empty();
    $(".O-side-order-part").empty();
}


function clickSideCategory(selectSideCategory, sideCategorySq) { //사이드 카테고리 변경


    resetSideCategory();

    $(sideCategoryList).each(function () { //카테고리 변경해주는 부분

        if (this.sideCategorySq == sideCategorySq) {
            $(".O-modal-category-bar").append(' <div class="O-category-part">\n' +
                '                    <div class="M-font O-font-mini-size O-category-box O-category-click-color" ' +
                'onclick="clickSideCategory(this,' + this.sideCategorySq + ')">\n' +
                '                        <p>' + this.sideCategoryName + '</p>\n' +
                '                    </div>\n' +
                '                </div>');
        } else {
            $(".O-modal-category-bar").append(' <div class="O-category-part">\n' +
                '                    <div class="M-font O-font-mini-size O-category-box" ' +
                'onclick="clickSideCategory(this,' + this.sideCategorySq + ')">\n' +
                '                        <p>' + this.sideCategoryName + '</p>\n' +
                '                    </div>\n' +
                '                </div>');
        }

    });

    $.ajax({ //사이드 메뉴 가져옴
        type: "POST",
        url: "/kiosk/side/get/sideCategorySq",
        dataType: "JSON",
        data: {
            "sideCategorySq": sideCategorySq,
        },
        success: function (data) {

            sideMenuList = data.menuSideDTOList;

            addSideMenu(sideMenuList);

        }
    });


}


var menuSideArr = [];
var menuSideSelectPartArr = [];

function upOrDownSideMenu(status, getDivData, menuSideSq) {

    menuSideSelectPartArr.length = 0;


    var number;

    if (status) { //사이드 메뉴 수량 +
        number = $(getDivData).parent().children().children('p').text();
        number++;
        $(getDivData).parent().children().children('p').text(number);
    } else { //사이드 메뉴 수량 -
        number = $(getDivData).parent().children().children('p').text();
        number--;
        if (isPositive(number)) {
            $(getDivData).parent().children().children('p').text(number);
        } else {
            $(getDivData).parent().children().children('p').text('0');
        }
    }

    if (isPositive(number)) {

        //지금 선택 되어있는 사이드 메뉴 가져오기
        var checkSideMenu = $('p[name=sideSelectSize' + menuSideSq + ']').text();
        if (checkSideMenu == "") { //사이드 메뉴 없음
            $(sideMenuList).each(function () {
                if (menuSideSq == this.menuSideSq) {
                    $(".O-side-select-menu-part").append('<div class="O-side-select-card O-side-select-card' + menuSideSq + '" name="selectSideCardName">\n' +
                        '                            <div class="O-side-select-number">\n' +
                        '                                <p class="M-font O-font-number-size" name="sideSelectSize' + menuSideSq + '">' + number + '</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="O-side-mini-close-Btn" onclick="deleteSideMenuSelect(this,' + menuSideSq + ')">\n' +
                        '                                <div class="O-close O-close2"></div>\n' +
                        '                            </div>\n' +
                        '                            <div class="O-side-select-name M-flex-column M-flex-center">\n' +
                        '                            <input type="hidden"' +
                        ' value="' + $(getDivData).next('div').children('input[id=hiddenSidePrice]').val() + '" id="sideSelectPrice">' +
                        '                                <input type="hidden" value="' + menuSideSq + '" name="sideSelectSq">\n' +
                        '                                <p class="M-font O-font-mini-size">' + this.menuSideName + '</p>\n' +
                        '                            </div>\n' +
                        '                        </div>'
                    )
                    ;
                    return false;
                }
            });
        } else { //사이드 메뉴 있음
            $('p[name=sideSelectSize' + menuSideSq + ']').text(number);
            if (number == 0) {
                $('p[name=sideSelectSize' + menuSideSq + ']').parent().parent().remove();
            }
            return false;
        }

    }
}

function upOrDownMenu(status, getDivData, menuSideSq) {

    var number;

    if (status) { //사이드 메뉴 수량 +
        number = $(getDivData).parent().children().children('p').text();
        number++;
        $(getDivData).parent().children().children('p').text(number);
    } else { //사이드 메뉴 수량 -
        number = $(getDivData).parent().children().children('p').text();
        number--;
        if (isPositive(number)) {
            $(getDivData).parent().children().children('p').text(number);
        } else {
            $(getDivData).parent().children().children('p').text('1');
        }
    }

    if (number == 0) {
        $(getDivData).parent().children().children('p').text('1');
        $("#hiddenMenuSq").val(1);
    }

    $("#hiddenMenuSq").val(number);

}

function deleteSideMenuSelect(data, menuSideSq) {

    $(data).parent().remove();
    $("#hiddenSideSq" + menuSideSq + "").val(0);
    $("#hiddenSideSq" + menuSideSq + " + p").text(0);

}


$(document).ready(function () {

    $(".O-side-select-close").on("click", function () { //modal 닫기버튼
        modalClose();
    });

    var audio = new Audio('/voice/메뉴를 선택해주세요.wav');
    audio.play();


    //초반 메뉴가져오기
    findMenu(0);
});

function selectCategoryByMenu(select, categorySq) {

    $(".O-category-name").removeClass('O-click-color');

    $(select).addClass('O-click-color');
    findMenu(categorySq);
}


function findMenu(categorySq) {
    $.ajax({
        type: "POST",
        url: "/kiosk/category/get/categorySq",
        dataType: "JSON",
        data: {
            "categorySq": categorySq,
        },
        success: function (data) {

            $(".O-flex-menu").empty();

            menuList = data;

            console.log(data);

            $(data).each(function () {
                var sideSqSend;
                if (this.side.length == 0) {
                    sideSqSend = null;
                } else {
                    sideSqSend = this.side[0].sideSq;
                }

                if (this.menuEnable == false) {
                    if (this.menuSoldOut == false) {
                        $(".O-flex-menu").append('<div class="O-card">\n' +
                            '                                <div class="O-card-all" onclick="clickMenu(' + this.menuSq + ',' + sideSqSend + ')">' +
                            '                                    <div class="O-card-header">\n' +
                            '                                        <div class="O-card-header-img">\n' +
                            '                                            <img class="O-card-header-img-img" src="' + this.imgDTOList[0].imgPath + '/' + this.imgDTOList[0].imgName + '">\n' +
                            '                                        </div>\n' +
                            '                                    </div>\n' +
                            '                                    <div class="O-card-body">\n' +
                            '                                        <div class="O-card-body-top">\n' +
                            '                                            <p class="O-menu-name">' + this.menuName + '</p>\n' +
                            '                                        </div>\n' +
                            '                                        <div class="O-card-body-body">\n' +
                            '                                            <div style="text-align: center;">\n' +
                            '                                                <p class="O-menu-name" style="display: inline-block">가격 : </p>\n' +
                            '                                                <p class="O-menu-name" style="display: inline-block">' + this.menuPrice + '</p>\n' +
                            '                                            </div>\n' +
                            '                                        </div>\n' +
                            '                                    </div>\n' +
                            '                                </div>\n' +
                            '                            </div>');
                    } else {
                        $(".O-flex-menu").append('<div class="O-card">\n' +
                            '                                <div class="O-card-all">' +
                            '                                    <div class="O-card-header">\n' +
                            '                                        <div class="O-card-header-img">\n' +
                            '                                            <img class="O-card-header-img-img" src="' + this.imgDTOList[0].imgPath + '/' + this.imgDTOList[0].imgName + '">\n' +
                            '                                        </div>\n' +
                            '                                    </div>\n' +
                            '                                    <div class="O-card-body">\n' +
                            '                                        <div class="O-card-body-top">\n' +
                            '                                            <p class="O-menu-name">' + this.menuName + '</p>\n' +
                            '                                        </div>\n' +
                            '                                        <div class="O-card-body-body">\n' +
                            '                                            <div style="text-align: center;">\n' +
                            '                                                <p class="O-menu-name" style="display: inline-block">가격 : </p>\n' +
                            '                                                <p class="O-menu-name" style="display: inline-block">' + this.menuPrice + '</p><br>\n' +
                            '                                                <small class="O-menu-name"' +
                            ' style="display: inline-block;font-size: 30px;color: red;">(품절)</small>\n' +
                            '                                            </div>\n' +
                            '                                        </div>\n' +
                            '                                    </div>\n' +
                            '                                </div>\n' +
                            '                            </div>');
                    }

                }


            });
        }
    });
}


isPositive = function (num) { //음수 양수 확인
    return num >= 0;
};


function addSideMenu(sideMenuList) {

    console.log(sideMenuList);

    $(sideMenuList).each(function () {


        var selectSideCheck = $("p[name=sideSelectSize" + this.menuSideSq + "]").text();

        if (selectSideCheck == "") {
            selectSideCheck = 0;
        }

        if (this.menuSideEnable == false) {

            if (this.menuSideSoldOut == true) {

                $(".O-side-order-part").append('<div class="O-side-order-card">\n' +
                    '                        <div class="O-menu-side-img">\n' +
                    '                            <img src="' + this.menuSideImgDTOList[0].menuSideImgPath + '/' + this.menuSideImgDTOList[0].menuSideImgName + '"' +
                    '                                       class="O-side-img">\n' +
                    '                        </div>\n' +
                    '                        <div class="O-menu-side-name M-font O-font-middle-size M-flex-column M-flex-center">\n' +
                    '                            <p class="">' + this.menuSideName + '</p>\n' +
                    '                            <small class="O-side-mini-size-font">가격 : ' + this.menuSidePrice + '</small>\n' +
                    '                        </div>\n' +
                    '                        <div class="O-menu-side-number M-flex-column M-flex-center">\n' +
                    '<p class="M-font" style="font-size: 30px; color: red;">품절</p>' +
                    '                         </div>'
                );

            } else {

                $(".O-side-order-part").append('<div class="O-side-order-card">\n' +
                    '                        <div class="O-menu-side-img">\n' +
                    '                            <img src="' + this.menuSideImgDTOList[0].menuSideImgPath + '/' + this.menuSideImgDTOList[0].menuSideImgName + '"' +
                    '                                       class="O-side-img">\n' +
                    '                        </div>\n' +
                    '                        <div class="O-menu-side-name M-font O-font-middle-size M-flex-column M-flex-center">\n' +
                    '                            <p class="">' + this.menuSideName + '</p>\n' +
                    '                            <small class="O-side-mini-size-font">가격 : ' + this.menuSidePrice + '</small>\n' +
                    '                        </div>\n' +
                    '                        <div class="O-menu-side-number M-flex-column M-flex-center">\n' +
                    '                         <div class="side-number-top M-font O-font-middle-size" onclick="upOrDownSideMenu(true, this,' + this.menuSideSq + ')">+' +
                    '                         </div>' +
                    '                         <div class="M-font O-font-middle-size">' +
                    '                           <input type="hidden" value="' + this.menuSidePrice + '" id="hiddenSidePrice">' +
                    '                           <input type="hidden" value="' + this.menuSideSq + '" id="hiddenSideSq' + this.menuSideSq + '">' +
                    '                           <p>' + selectSideCheck + '</p>' +
                    '                         </div>' +
                    '                         <div class="side-number-bottom M-font O-font-middle-size" onclick="upOrDownSideMenu(false, this,' + this.menuSideSq + ')">-' +
                    '                         </div>' +
                    '                        </div>\n' +
                    '                    </div>'
                );

            }

        }
    });
}


function showCheckModal(payStatus) { //결제 전 주문 목록

    if (allSelectMenuArr.length == 0) {
        return false;
    }

    var leftMenu;
    var rightSideMenu;
    var menuLinePrice = 0;
    var menuTotalPrice = 0;

    $(allSelectMenuArr).each(function () {
        menuLinePrice = 0;
        menuLinePrice = menuLinePrice + (parseInt(this.menuPrice) * parseInt(this.size));

        var menuSq = this.menuSq;

        $(".O-pay-order-part-up").append('<div class="O-pay-order-part M-flex-row" style="margin: 10px 0px;" id="O-pay-first' + menuSq + '">'); //하나 열고

        leftMenu = '<div class="O-pay-order-card O-pay-order-card-left">\n' +
            '                            <div class="O-pay-img">\n' +
            '                                <img src="' + this.imgDTOList[0].imgPath + '/' + this.imgDTOList[0].imgName + '" class="O-side-img">\n' +
            '                            </div>\n' +
            '                            <div class="O-pay-name M-font O-font-middle-size M-flex-column M-flex-center">\n' +
            '                                <p class="">' + this.menuName + '</p>\n' +
            '                            </div>\n' +
            '                            <div class="O-pay-number M-flex-column M-flex-center">\n' +
            '                                <div class="M-font O-font-middle-size M-flex-column M-flex-center">\n' +
            '                                    <p>' + this.size + '개</p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <div class="O-pay-price M-flex-column M-flex-center">\n' +
            '                                <div class="M-font O-font-middle-size M-flex-column M-flex-center">\n' +
            '                                    <p>' + this.menuPrice + '원</p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>';

        $("#O-pay-first" + menuSq).append(leftMenu); //메뉴만 먼저 추가

        if (this.addSide != undefined) { //사이드가 있을 경우

            if (this.addSide.length != 0) {
                $("#O-pay-first" + menuSq).append('<div class="O-pay-order-card O-pay-order-card-right M-flex-column" id="O-pay-right' + this.menuSq + '">');
                $(this.addSide).each(function () {

                    menuLinePrice = menuLinePrice + parseInt(this.sidePrice) * parseInt(this.sideSize);

                    rightSideMenu = '<div class="O-pay-order-card-div M-flex-row">\n' +
                        '                                <div class="O-pay-name M-font M-flex-column M-flex-center"\n' +
                        '                                     style="font-size: 30px; width: 30%;">\n' +
                        '                                    <p class="">' + this.sideName + '</p>\n' +
                        '                                </div>\n' +
                        '                                <div class="O-pay-name M-font M-flex-column M-flex-center"\n' +
                        '                                     style="font-size: 30px;width: 10%">\n' +
                        '                                    <p class="">' + this.sideSize + '개</p>\n' +
                        '                                </div>\n' +
                        '                                <div class="O-pay-number M-flex-column M-flex-center" style="width: 20%">\n' +
                        '                                    <div class="M-font M-flex-column M-flex-center" style="font-size: 30px;">\n' +
                        '                                        <p>' + this.sidePrice + '원</p>\n' +
                        '                                    </div>\n' +
                        '                                </div>\n' +
                        '                            </div>';

                    $("#O-pay-right" + menuSq).append(rightSideMenu);

                });

                $("#O-pay-first" + menuSq).append('</div>');
                $(".O-pay-order-part-up").append('</div>');
            } else {
                $(".O-pay-order-part-up").append('</div>');
            }

        } else { //사이드가 없을경우
            $(".O-pay-order-part-up").append('</div>');
        }

        menuTotalPrice += menuLinePrice;

        $(".O-pay-totalPrice>p").text("총 금액 : " + menuTotalPrice + "원");
        orderTotalPrice = menuTotalPrice;

    });

    if (payStatus == 'card') { //결제 방식 확인.

        $('.O-pay-menu-part').append('<div class="O-pay-select-close M-flex-column M-flex-center"\n' +
            '                             onclick="liquidateMenuByCard()"\n' +
            '                             style="width: 50%; height: 50%; background-color: #eb8282;">\n' +
            '                            <p class="M-font O-font-middle-size">결제 하기</p>\n' +
            '                        </div>');


    } else if (payStatus == 'money') {
        $('.O-pay-menu-part').append('<div class="O-pay-select-close M-flex-column M-flex-center"\n' +
            '                             onclick="openReceiptModal()"\n' +
            '                             style="width: 50%; height: 50%; background-color: #eb8282;">\n' +
            '                            <p class="M-font O-font-middle-size">주문 하기</p>\n' +
            '                        </div>');
    } else {
        location.href = "/";
    }


    $("#checkMenuModal").show();

}

function payModalClose() { //결제 전 주문 목록 닫기

    $("#checkMenuModal").hide();

    $(".O-pay-order-part-up").empty();
    $(".O-pay-menu-part").empty();

}

function liquidateMenuByCard() { //카드결제하러가기
    localStorage.setItem('menuList', JSON.stringify(allSelectMenuArr));
    localStorage.setItem('placeStatus', placeStatus);
    localStorage.setItem('totalPrice', orderTotalPrice);
    location.href = "/kiosk/card/pay";
}


function openReceiptModal() { //현금 결제 -> 영수증 출력
    receiptModalOpen();
}

function receiptModalOpen() { //영수증 모달 열기
    $("#receiptModal").show();
}

function receiptModalClose() { //영수증 모달 닫기
    $("#receiptModal").hide();
}