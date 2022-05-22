import axios from "axios";
import serverUrl from "../../../pages/config/server.json";

export async function getSideList() { //get side List
    const response = await axios.post('http://' + serverUrl.server + '/admin/menu/get/all/side');
    return response.data;
}


// $(document).ready(function () {
//
//     $("#side-file").on("change", function () {
//         var fileUrl = $("#side-file").val();
//         $("#side-fileUrl").text(fileUrl);
//         showImg(this, "admin-main-side-select-img");
//     });
//
//     $("#sideSelectByAddSide").on("click", function () { //사이드 버튼
//
//         $("#sideCategorySelect").val("");
//         $("#sideCategorySelect").attr("name", "");
//
//         $("#sideSelectByAddSideOption").empty();
//         resetProgressBar("side");
//
//         $.ajax({
//             type: "get",
//             url: "/admin/menu/get/list",
//             dataType: "JSON",
//             data: {
//                 "status": "side"
//             },
//             success: function (data) {
//                 if (data.length == 0) {
//                     //없다고 표시
//                     resetProgressBar("side");
//                     $("#Side-progressBar").hide();
//                     $("#progress-small-side").text("사이드가 없습니다.");
//                 }
//                 $(data).each(function () {
//                     $("#sideSelectByAddSideOption").append('<input type="text" value="' + this.sideName + '" name="' + this.sideSq + '" \n' +
//                         '                                                                       class="M-input-select M-font M-mini-size M-input-select-middle"\n' +
//                         '                                                                       onclick="selectSideByAddMenu(this)" readonly\n' +
//                         '                                                                       onfocus="this.blur()">');
//                 });
//                 selectA("sideSelectByAddSideOption");
//             }
//         });
//
//         $("#sideCategorySelectOption").hide();
//
//     });
//
//     $("#sideCategorySelect").on("click", function () { //사이드 카테고리
//
//         $("#sideCategorySelectOption").empty();
//         resetProgressBar("side");
//
//         var sideSq = $("#sideSelectByAddSide").attr("name");
//
//         if (sideSq == undefined) {
//             resetProgressBar("side");
//             $("#Side-progressBar").hide();
//             $("#progress-small-side").text("사이드를 선택해주세요.");
//             return false;
//         }
//
//         $.ajax({
//             type: "get",
//             url: "/admin/menu/get/find/side",
//             dataType: "JSON",
//             data: {
//                 "sideSq": sideSq
//             },
//             success: function (data) {
//                 if (data.length == 0) {
//                     resetProgressBar("side");
//                     $("#Side-progressBar").hide();
//                     $("#progress-small-side").text("사이드 카테고리가 없습니다.");
//                 }
//
//                 $(data).each(function () {
//                     $("#sideCategorySelectOption").append('<input type="text" value="' + this.sideCategoryName + '" name="' + this.sideCategorySq + '" \n' +
//                         '                                                                       class="M-input-select M-font M-mini-size M-input-select-middle"\n' +
//                         '                                                                       onclick="selectSideCategory(this)" readonly\n' +
//                         '                                                                       onfocus="this.blur()">');
//                 });
//
//                 selectA("sideCategorySelectOption");
//             }
//         });
//
//
//     });
//
// });
//
//
// //사이드 메뉴 추가
// function AddSideMenu() {
//
//     var formData = new FormData($("#addSideMenuForm")[0]);
//
//     var sideSq = $("#sideSelectByAddSide").attr("name");
//     var sideCategorySq = $("#sideCategorySelect").attr("name");
//
//
//     if ($("#menu-side-name").val() == "") {
//         $("#progress-small-side").text("이름을 입력해주세요.");
//         return false;
//     }
//
//     if ($("#menu-side-name").val().length > 10) {
//         $("#progress-small-side").text("사이드 메뉴 이름의 최대 길이를 초과하였습니다. (10자리수)");
//         return false;
//     }
//
//     if ($("#menuSidePrice").val() == "") {
//         $("#progress-small-side").text("가격을 입력해주세요.");
//         return false;
//     }
//
//     if ($("#menuSidePrice").val().length > 8) {
//         $("#progress-small-side").text("가격의 최대 길이를 초과하였습니다. (8자리수)");
//         return false;
//     }
//
//     var regExp = /^[0-9]*$/;
//     if (!regExp.test($("#menuSidePrice").val())) {
//         $("#progress-small-side").text("숫자를 입력하세요.");
//         return false;
//     }
//
//
//     if (sideSq == undefined) {
//         resetProgressBar("side");
//         $("#Side-progressBar").hide();
//         $("#progress-small-side").text("사이드를 선택해주세요.");
//         return false;
//     }
//
//     if (sideCategorySq == undefined) {
//         resetProgressBar("side");
//         $("#Side-progressBar").hide();
//         $("#progress-small-side").text("사이드 카테고리를 선택해주세요.");
//         return false;
//     }
//
//     resetProgressBar("side");
//     $("#side-progressBar").show();
//
//     if (sideSq == null || sideSq == "") {
//         $("#progress-small-side").text("사이드를 선택해주세요.");
//         return false;
//         sideSq = 0;
//     }
//
//     if (sideCategorySq == null || sideCategorySq == "") {
//         $("#progress-small-side").text("사이드카테고리를 선택해주세요.");
//         return false;
//         sideCategorySq = 0;
//     }
//
//
//     formData.append("sideSq", sideSq);
//     formData.append("sideCategorySq", sideCategorySq);
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/menu/add/sideMenu",
//         dataType: "json",
//         processData: false,
//         contentType: false,
//         data: formData,
//         xhr: function () {
//             var xhr = $.ajaxSettings.xhr();
//             xhr.upload.onprogress = function (e) {
//                 var per = e.loaded * 100 / e.total;
//                 progressBar(per, "side-progressBar");
//             };
//             return xhr;
//         },
//         success: function (data) {
//
//             if (data.status) { //에러
//
//                 $("#progress-small-side").text(data.message);
//                 $("#side-progressBar").val(0);
//                 $("#categorySelect").val("");
//                 $(".sideMenuInputDiv input").val("");
//                 $("#side-fileUrl").text("");
//                 $("#admin-main-side-select-img").hide();
//
//             } else { //정상
//                 $("#progress-small-side").text($("#menu-side-name").val() + "를 추가하였습니다.");
//                 $("#categorySelect").val("");
//                 $(".sideMenuInputDiv input").val("");
//                 $("#side-fileUrl").text("");
//                 $("#admin-main-side-select-img").hide();
//             }
//         },
//     });
// }
//
// function selectSideCategory(result) { //select category option
//     selectB("sideCategorySelect", "sideCategorySelectOption", result);
// }
//
// function selectSideByAddMenu(result) { //사이드 선택
//     selectB("sideSelectByAddSide", "sideSelectByAddSideOption", result);
// }
//
//
// //사이드 메뉴 모달
// function deleteSideMenuOpenModal(menuSideSq, menuSideName) {
//     $("#delete-modal").show();
//     $("#delete-modal-Body").append('<small style="color: red;font-size: 20px;">' + menuSideName + '을(를) 삭제하시겠습니까?</small>');
//     $("#delete-modal-footer").append(' <div class="O-side-select-close" onclick="deleteSideMenu(' + menuSideSq + ')" style="width: 50%; background-color: #eb8282;">\n' +
//         '                                    <p class="M-font O-font-middle-size">네</p>\n' +
//         '                                </div>');
// }
//
//
// //사이드 메뉴 삭제
// function deleteSideMenu(menuSideSq) {
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/menu/delete/sideMenu",
//         dataType: "json",
//         data: {
//             "menuSideSq": menuSideSq,
//         },
//         success: function (data) {
//             if (data) {
//                 // deleteModalClose();
//                 location.href = "/admin/menu?status=sideAll";
//             } else {
//                 $("#delete-modal-Body").empty();
//                 $("#delete-modal-Body").append('<small style="color: red;font-size: 20px;">삭제를 실패하였습니다. 다시 시도하시겠습니까?</small>');
//             }
//         }, error: function () {
//             $("#delete-modal-Body").empty();
//             $("#delete-modal-Body").append('<small style="color: red;font-size: 20px;">삭제를 실패하였습니다. 다시 시도하시겠습니까?</small>');
//         }
//     });
//
// }
//
//
// //사이드 메뉴 상세
// function sideMenuDetailModal(menuSideSq) {
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/menu/get/find/sideMenu",
//         dataType: "JSON",
//         data: {
//             "menuSideSq": menuSideSq,
//         },
//         success: function (data) {
//
//             console.log(data);
//
//             $("#menuSideSq").val(data.menuSideSq);
//             $("#menu-side-name").val(data.menuSideName);
//             $("#menuSidePrice").val(data.menuSidePrice);
//             $("#sideSelectByAddSide").val(data.sideCategoryDTO.sideDTO.sideName);
//             $("#sideSelectByAddSide").attr("name", data.sideCategoryDTO.sideDTO.sideSq);
//             $("#sideCategorySelect").val(data.sideCategoryDTO.sideCategoryName);
//             $("#sideCategorySelect").attr("name", data.sideCategoryDTO.sideCategorySq);
//             $("#admin-main-side-select-img").attr("src", data.menuSideImgDTOList[0].menuSideImgPath + "/" + data.menuSideImgDTOList[0].menuSideImgName);
//             $("#admin-main-side-select-img").show();
//             $("input:checkbox[id='menuSideSoldOut-checkBox']").prop("checked", data.menuSideSoldOut); //품절 체크
//             $("input:checkbox[id='menuSideEnable-checkBox']").prop("checked", data.menuSideEnable); //메뉴 숨기기 체크
//         }
//     });
//
//     $(".menu-detail-modal").show();
//
// }
//
//
// //사이드 메뉴 변경
// function changeSideMenu() {
//
//     var formData = new FormData($("#changeSideMenuForm")[0]);
//
//     var sideSq = $("#sideSelectByAddSide").attr("name");
//     var sideCategorySq = $("#sideCategorySelect").attr("name");
//     var sideMenuSoldOut;
//     var sideMenuEnable;
//
//     if ($("input:checkbox[id='menuSideSoldOut-checkBox']").is(":checked") == true) {
//         sideMenuSoldOut = true;
//     } else {
//         sideMenuSoldOut = false;
//     }
//
//     if ($("input:checkbox[id='menuSideEnable-checkBox']").is(":checked") == true) {
//         sideMenuEnable = true;
//     } else {
//         sideMenuEnable = false;
//     }
//
//
//     if ($("#menu-side-name").val() == "") {
//         $("#progress-small-side").text("이름을 입력해주세요.");
//         return false;
//     }
//
//     if ($("#menu-side-name").val().length > 10) {
//         $("#progress-small-side").text("사이드 메뉴 이름의 최대 길이를 초과하였습니다. (10자리수)");
//         return false;
//     }
//
//     if ($("#menuSidePrice").val() == "") {
//         $("#progress-small-side").text("가격을 입력해주세요.");
//         return false;
//     }
//
//     if ($("#menuSidePrice").val().length > 8) {
//         $("#progress-small-side").text("가격의 최대 길이를 초과하였습니다. (8자리수)");
//         return false;
//     }
//
//     var regExp = /^[0-9]*$/;
//     if (!regExp.test($("#menuSidePrice").val())) {
//         $("#progress-small-side").text("숫자를 입력하세요.");
//         return false;
//     }
//
//
//     if (sideSq == undefined) {
//         resetProgressBar("side");
//         $("#Side-progressBar").hide();
//         $("#progress-small-side").text("사이드를 선택해주세요.");
//         return false;
//     }
//
//     if (sideCategorySq == undefined) {
//         resetProgressBar("side");
//         $("#Side-progressBar").hide();
//         $("#progress-small-side").text("사이드 카테고리를 선택해주세요.");
//         return false;
//     }
//
//     resetProgressBar("side");
//     $("#side-progressBar").show();
//
//     if (sideSq == null || sideSq == "") {
//         $("#progress-small-side").text("사이드를 선택해주세요.");
//         return false;
//         sideSq = 0;
//     }
//
//     if (sideCategorySq == null || sideCategorySq == "") {
//         $("#progress-small-side").text("사이드카테고리를 선택해주세요.");
//         return false;
//         sideCategorySq = 0;
//     }
//
//
//     formData.append("sideSq", sideSq);
//     formData.append("sideCategorySq", sideCategorySq);
//
//     formData.append("menuSideSoldOut", sideMenuSoldOut);
//     formData.append("menuSideEnable", sideMenuEnable);
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/menu/change/sideMenu",
//         dataType: "json",
//         processData: false,
//         contentType: false,
//         data: formData,
//         xhr: function () {
//             var xhr = $.ajaxSettings.xhr();
//             xhr.upload.onprogress = function (e) {
//                 var per = e.loaded * 100 / e.total;
//                 progressBar(per, "side-progressBar");
//             };
//             return xhr;
//         },
//         success: function (data) {
//
//             if (data.status) { //에러
//
//                 $("#progress-small-side").text(data.message);
//                 $("#side-progressBar").val(0);
//                 $("#categorySelect").val("");
//                 $(".sideMenuInputDiv input").val("");
//                 $("#side-fileUrl").text("");
//                 $("#admin-main-side-select-img").hide();
//
//             } else { //정상
//                 $("#progress-small-side").text($("#menu-side-name").val() + "를 추가하였습니다.");
//                 $("#menu-fileUrl").text("이미지 변경을 원하시면 선택하세요.");
//                 $("#changeStatus").val(true);
//             }
//         },
//     });
// }
//
//
// //side modal 창 닫기
// function sideMenuModalDetailClose() {
//
//     if ($("#changeStatus").val()) {
//         location.href = "/admin/menu?status=sideAll";
//     }
//
//     $("#sideMenuDetailModal").hide();
//     $("#menuSideSq").val("");
//     $("#menu-side-name").val("");
//     $("#menuSidePrice").val("");
//     $("#sideSelectByAddSide").val("");
//     $("#sideSelectByAddSide").attr("name", "");
//     $("#sideCategorySelect").val("");
//     $("#sideCategorySelect").attr("name", "");
//     $("#admin-main-side-select-img").attr("src", "");
//     $("#admin-main-side-select-img").hide();
//     $("#progress-small-side").text("");
// }
//
// var sendData;
//
// // 사이드 상세보기
// function sideDetailModal(sideSq, sideName) {
//     $("#sideDetailModal").show();
//     $("#side-top p").text(sideName + " (사이드)");
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/category/get/side",
//         dataType: "JSON",
//         data: {
//             "sideSq": sideSq,
//         },
//         success: function (data) {
//
//             $.ajax({
//                 type: "POST",
//                 url: "/admin/category/find/sideCategorySq",
//                 dataType: "JSON",
//                 data: {
//                     "sideCategorySq": data.sideCategoryDTOList[0].sideCategorySq,
//                 }, success: function (sideData) {
//                     $(data.sideCategoryDTOList).each(function (index, item) {
//                         sendData = data;
//                         if (index == 0) {
//                             $("#side-modal-top").append('<div class="O-category-part">\n' +
//                                 '                    <div class="M-font O-font-mini-size O-category-box" style="background-color: #838383;"' +
//                                 '                           onclick="sideCategoryChange(\'' + this.sideCategorySq + '\',\'' + this.sideCategoryName + '\')">\n' +
//                                 '                        <p>' + this.sideCategoryName + '</p>\n' +
//                                 '                    </div>\n' +
//                                 '                </div>');
//                         } else {
//                             $("#side-modal-top").append('<div class="O-category-part">\n' +
//                                 '                    <div class="M-font O-font-mini-size O-category-box" ' +
//                                 '                           onclick="sideCategoryChange(\'' + this.sideCategorySq + '\',\'' + this.sideCategoryName + '\')">\n' +
//                                 '                        <p>' + this.sideCategoryName + '</p>\n' +
//                                 '                    </div>\n' +
//                                 '                </div>');
//                         }
//
//                     });
//
//                     $(sideData.menuSideDTOList).each(function () {
//                         $("#side-card-body").append(' <div class="O-side-order-card a-side-order-card">\n' +
//                             '                            <div class="O-menu-side-img">\n' +
//                             '                                <img src="' + this.menuSideImgDTOList[0].menuSideImgPath + '/' + this.menuSideImgDTOList[0].menuSideImgName + '" class="O-side-img">\n' +
//                             '                            </div>\n' +
//                             '                            <div class="O-menu-side-name M-font O-font-mini-size M-text-center">\n' +
//                             '                                <p class="O-menu-side-name-p">' + this.menuSideName + '</p>\n' +
//                             '                            </div>\n' +
//                             '                        </div>');
//                     });
//                 }
//             });
//         }
//     });
//
// }
//
// // 사이드 상세보기 닫기
// function sideModalDetailClose() {
//     $("#sideDetailModal").hide();
//     $("#side-modal-top").empty();
//     $("#side-card-body").empty();
//     sendData = null;
// }
//
// function sideModalDetailRedset() {
//     $("#side-card-body").empty();
//     $("#side-modal-top").empty();
// }
//
//
// //사이드 카테고리 상세보기 변경
// function sideCategoryChange(sideCategorySq, sideCategoryName) {
//
//     sideModalDetailRedset();
//
//     $(sendData.sideCategoryDTOList).each(function () {
//         if (this.sideCategoryName == sideCategoryName) {
//             $("#side-modal-top").append('<div class="O-category-part">\n' +
//                 '                    <div class="M-font O-font-mini-size O-category-box" style="background-color: #838383;"' +
//                 '                           onclick="sideCategoryChange(\'' + this.sideCategorySq + '\',\'' + this.sideCategoryName + '\')">\n' +
//                 '                        <p>' + this.sideCategoryName + '</p>\n' +
//                 '                    </div>\n' +
//                 '                </div>');
//         } else {
//             $("#side-modal-top").append('<div class="O-category-part">\n' +
//                 '                    <div class="M-font O-font-mini-size O-category-box" ' +
//                 '                           onclick="sideCategoryChange(\'' + this.sideCategorySq + '\',\'' + this.sideCategoryName + '\')">\n' +
//                 '                        <p>' + this.sideCategoryName + '</p>\n' +
//                 '                    </div>\n' +
//                 '                </div>');
//         }
//     });
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/category/find/sideCategorySq",
//         dataType: "JSON",
//         data: {
//             "sideCategorySq": sideCategorySq,
//         }, success: function (sideData) {
//             $(sideData.menuSideDTOList).each(function () {
//                 $("#side-card-body").append(' <div class="O-side-order-card a-side-order-card">\n' +
//                     '                            <div class="O-menu-side-img">\n' +
//                     '                                <img src="' + this.menuSideImgDTOList[0].menuSideImgPath + '/' + this.menuSideImgDTOList[0].menuSideImgName + '" class="O-side-img">\n' +
//                     '                            </div>\n' +
//                     '                            <div class="O-menu-side-name M-font O-font-mini-size M-text-center">\n' +
//                     '                                <p class="O-menu-side-name-p">' + this.menuSideName + '</p>\n' +
//                     '                            </div>\n' +
//                     '                        </div>');
//             });
//         }
//     });
// }