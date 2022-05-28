import $ from "jquery";
import axios from "axios";
import serverUrl from "../../../pages/config/server.json";

export function searchCategory() {
    $("#all-category-search").on("change keyup paste", function () { //search menu.js
        var result = $(this).val();
        $(".admin-tbody-tr-category").hide();
        var temp = $(".admin-tbody-tr-category:contains('" + result + "')");
        $(temp).show();
    });
}


export function searchSide() {
    $("#all-side-search").on("change keyup paste", function () { //search menu.js
        var result = $(this).val();
        $(".admin-tbody-tr-side").hide();
        var temp = $(".admin-tbody-tr-side:contains('" + result + "')");
        $(temp).show();
    });
}

export async function getCategoryMenu(categorySq) { //get category Sq List
    const response = await axios.post('http://' + serverUrl.server + '/admin/category/get/category', null, {
        params: {
            'categorySq': categorySq
        }
    });
    return response.data;
}

export async function getSideCategory(sideSq) { //get side category List
    const response = await axios.post('http://' + serverUrl.server + '/admin/category/get/sideAndCategoryMenu', null, {
        params: {
            'sideSq': sideSq
        }
    });
    return response.data;
}

export async function getCategoryList() { //get category List
    const response = await axios.get('http://' + serverUrl.server + '/admin/menu/get/list', {
        params: {
            'status': 'category'
        }
    });
    return response.data;
}

export async function renameCategory(categorySq, categoryName) { //category 수정
    const response = await axios.post('http://' + serverUrl.server + '/admin/category/change/category', null, {
        params: {
            'sq': categorySq,
            'changeName': categoryName
        }
    });
    return response.data;
}

export async function renameSide(sideSq, sideName) { //Side 수정
    const response = await axios.post('http://' + serverUrl.server + '/admin/category/change/side', null, {
        params: {
            'sq': sideSq,
            'changeName': sideName
        }
    });
    return response.data;
}


// $(document).ready(function () {
//
//     $("#listSelect").on("click", function () { //select select
//         selectA("listSelectOption");
//     });
//
//     $("#sideSelectByCategory").on("click", function () { //select select
//
//
//         $("#sideSelectByCategoryOption").empty();
//
//         $.ajax({
//             type: "get",
//             url: "/admin/menu.js/get/side",
//             dataType: "JSON",
//             success: function (data) {
//
//                 if (data.length == 0) {
//                     resetProgressBar("category");
//                     $("#Category-progressBar").hide();
//                     $("#progress-small-category").text("사이드가 없습니다.");
//                 }
//
//                 $(data).each(function () {
//                     $("#sideSelectByCategoryOption").append('<input type="text" value="' + this.sideName + '" name="' + this.sideSq + '" style="width: 100%"\n' +
//                         '                    onclick="sideSelectByCategory(this)"\n' +
//                         '                class="M-input-select M-font M-mini-size M-input-select-middle" readonly\n' +
//                         '                    onfocus="this.blur()">');
//                 });
//                 selectA("sideSelectByCategoryOption");
//             }
//         });
//
//     });
//
//
//     $("#all-category-search").on("change keyup paste", function () { //search
//
//         var result = $(this).val();
//         $(".admin-tbody-tr-category").hide();
//
//         var temp = $(".admin-tbody-tr-category:contains('" + result + "')");
//         $(temp).show();
//
//     });
//
//     $("#all-side-search").on("change keyup paste", function () { //search
//
//         var result = $(this).val();
//         $(".admin-tbody-tr-side").hide();
//
//         var temp = $(".admin-tbody-tr-side:contains('" + result + "')");
//         $(temp).show();
//
//     });
//
//
// });
//
//
// function listSelect(result) { //select category option
//
//     $("#listSelectCategory").empty();
//
//     var status = $(result).attr("name");
//
//     $.ajax({
//         type: "get",
//         url: "/admin/menu.js/get/list",
//         dataType: "JSON",
//         data: {
//             "status": status
//         },
//         success: function (data) {
//             if (data == null) {
//                 location.href = "/admin/menu.js?status=category";
//             }
//
//             if (data.length == 0) {
//
//                 resetProgressBar("category");
//                 $("#Category-progressBar").hide();
//
//                 var noName = null;
//                 if (status == 'category') {
//                     noName = '카테고리'
//                 } else if (status == 'side') {
//                     noName = '사이드'
//                 } else if (status == 'sideCategory') {
//                     noName = '사이드 카테고리'
//                 }
//                 $("#progress-small-category").text(noName + "가 없습니다.");
//             }
//             console.log(data);
//             $(data).each(function () {
//                 if (status == 'category') {
//                     $("#listSelectCategory").append('<input type="text" value="' + this.categoryName + '" ' +
//                         '                                       onclick="showDeleteModal(' + this.categorySq + ',\'' + this.categoryName + '\',\'' + status + '\')" \n' +
//                         '                                       style="width: 100%; background-color: #628762; font-size: 25px;margin-bottom: 6px;"\n' +
//                         '                                       class="M-input-text M-font" readonly\n' +
//                         '                                       onfocus="this.blur()">\n' +
//                         '                            </div>');
//
//                 } else if (status == 'side') {
//                     $("#listSelectCategory").append('<input type="text" value="' + this.sideName + '"' +
//                         '                                       onclick="showDeleteModal(' + this.sideSq + ',\'' + this.sideName + '\',\'' + status + '\')"\n' +
//                         '                                       style="width: 100%; background-color: #628762; font-size: 25px;margin-bottom: 6px;"\n' +
//                         '                                       class="M-input-text M-font" readonly\n' +
//                         '                                       onfocus="this.blur()">\n' +
//                         '                            </div>');
//                 } else if (status == 'sideCategory') {
//                     $("#listSelectCategory").append('<input type="text" value="' + this.sideCategoryName + '    (' + this.sideDTO.sideName + ')"' +
//                         '                                       onclick="showDeleteModal(' + this.sideCategorySq + ',\'' + this.sideCategoryName + '\',\'' + status + '\')"\n' +
//                         '                                       style="width: 100%; background-color: #628762; font-size: 25px;margin-bottom: 6px;"\n' +
//                         '                                       class="M-input-text M-font" readonly\n' +
//                         '                                       onfocus="this.blur()">\n' +
//                         '                            </div>');
//                 }
//             });
//         }
//     });
//
//     selectB("listSelect", "listSelectOption", result);
// }
//
//
// function sideSelectByCategory(result) { //사이드 선택 카테고리
//     selectB("sideSelectByCategory", "sideSelectByCategoryOption", result);
// }
//
//
// function addCategory() { //카테고리 추가
//     var category = $("#categoryName").val();
//
//     if (category == "") {
//         resetProgressBar("category");
//         $("#progress-small-category").hide();
//         $("#progress-small-category").text("값을 입력해주세요.");
//         return false;
//     }
//     if (category.length > 8) {
//         adminTotalModalShow("8자리수 이하로 입력해주세요.");
//         return false;
//     }
//
//     resetProgressBar("category");
//     $("#progress-small-category").show();
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/menu.js/add/category",
//         dataType: "JSON",
//         data: {
//             "categoryName": category
//         },
//         xhr: function () {
//             var xhr = $.ajaxSettings.xhr();
//             xhr.upload.onprogress = function (e) {
//                 var per = e.loaded * 100 / e.total;
//                 progressBar(per, "category-progressBar");
//             };
//             return xhr;
//         },
//         success: function (data) {
//             if (data) {
//                 $("#progress-small-category").text("(" + category + ") 카테고리 업로드 완료");
//                 $("#listSelectCategory").empty(); //list 비워줌
//                 $(".M-input input[type=text]").val("");
//             }
//         }
//     });
//
//
// }
//
// function addSide() { // side 추가
//     var sideName = $("#sideName").val();
//
//     if (sideName == "") {
//         resetProgressBar("category");
//         $("#progress-small-category").hide();
//         $("#progress-small-category").text("값을 입력해주세요.");
//         return false;
//     }
//
//     if (sideName.length > 8){
//         adminTotalModalShow("8자리수 이하로 입력해주세요.");
//         return false;
//     }
//
//     resetProgressBar("category");
//     $("#progress-small-category").show();
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/menu.js/add/side",
//         dataType: "JSON",
//         data: {
//             "sideName": sideName
//         },
//         xhr: function () {
//             var xhr = $.ajaxSettings.xhr();
//             xhr.upload.onprogress = function (e) {
//                 var per = e.loaded * 100 / e.total;
//                 progressBar(per, "category-progressBar");
//             };
//             return xhr;
//         },
//         success: function (data) {
//             if (data) {
//                 $("#progress-small-category").text("(" + sideName + ") 사이드 업로드 완료");
//                 $("#listSelectCategory").empty(); //list 비워줌
//                 $(".M-input input[type=text]").val("");
//             }
//         }
//     });
// }
//
// function addSideCategory() {    // side 카테고리 추가
//     var sideCategoryName = $("#sideCategoryName").val();
//     var sideSq = $("#sideSelectByCategory").attr("name");
//
//     if (sideCategoryName == "" || sideSq == null) {
//         resetProgressBar("category");
//         $("#progress-small-category").hide();
//         $("#progress-small-category").text("값을 입력해주세요.");
//         return false;
//     }
//
//     if (sideCategoryName.length > 8){
//         adminTotalModalShow("8자리수 이하로 입력해주세요.");
//         return false;
//     }
//
//     resetProgressBar("category");
//     $("#progress-small-category").show();
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/menu.js/add/sideCategory",
//         dataType: "JSON",
//         data: {
//             "sideSq": sideSq,
//             "sideCategoryName": sideCategoryName
//         },
//         xhr: function () {
//             var xhr = $.ajaxSettings.xhr();
//             xhr.upload.onprogress = function (e) {
//                 var per = e.loaded * 100 / e.total;
//                 progressBar(per, "category-progressBar");
//             };
//             return xhr;
//         },
//         success: function (data) {
//             if (data) {
//                 $("#progress-small-category").text("(" + sideCategoryName + ") 사이드 업로드 완료");
//                 $("#listSelectCategory").empty(); //list 비워줌
//                 $(".M-input input[type=text]").val("");
//             }
//         }
//     });
// }
//
// function resetProgressBar(result) {
//     $("#progress-small-" + result).text("");
//     $("#" + result + "-progressBar").val(0);
// }
//
// function progressBar(per, id) {
//     $("#" + id).val(per);
// }
//
//
// function deleteCategory(sq, name, status) { //카테고리 삭제
//
//     deleteFail(name);
//
//     resetProgressBar("category");
//     $("#progress-small-category").show();
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/menu.js/delete/" + status,
//         dataType: "JSON",
//         data: {
//             "status": sq,
//         },
//         xhr: function () {
//             var xhr = $.ajaxSettings.xhr();
//             xhr.upload.onprogress = function (e) {
//                 var per = e.loaded * 100 / e.total;
//                 progressBar(per, "category-progressBar");
//             };
//             return xhr;
//         },
//         success: function (data) {
//             if (data) {
//                 $("#progress-small-category").text("(" + name + ") 카테고리 삭제 완료");
//                 $("#listSelectCategory").empty(); //list 비워줌
//                 $("#listSelect").val("리스트를 보려면 클릭하세요.")
//             }
//         },
//         error: function () {
//             $("#progress-small-category").text('메뉴를 삭제 후 사이드를 삭제해주세요.');
//
//         }
//     });
//
//     deleteModalClose();
// }
//
// function deleteFail(result) {
//     if (result == "" || result == null) {
//         resetProgressBar("category");
//         $("#progress-small-category").hide();
//         $("#progress-small-category").text("삭제를 실패하였습니다. (관리자에게 문의주세요)");
//         return false;
//     }
// }
//
// function showDeleteModal(sq, name, status) {
//     $("#delete-modal").show();
//     $("#deleteTop").append('<p>카테고리 삭제</p>');
//     $("#delete-modal-Body").append('<small style="color: red;font-size: 20px;">' + name + '를 삭제하시겠습니까?</small>');
//     $("#delete-modal-footer").append('<div class="O-side-select-close" onclick="deleteCategory(' + sq + ',\'' + name + '\',\'' + status + '\')" style="width: 50%; background-color: #eb8282;">\n' +
//         '                    <p class="M-font O-font-middle-size">네</p>\n' +
//         '                </div>');
// }
//
// function deleteCategorySideModal(sq, name, status) {
//     $("#delete-modal").show();
//     $("#deleteTop").append('<p>카테고리 삭제</p>');
//     $("#delete-modal-Body").append('<small style="color: red;font-size: 20px;">' + name + '를 삭제하시겠습니까?</small>');
//     $("#delete-modal-footer").append('<div class="O-side-select-close" onclick="deleteCategoryOrSide(' + sq + ',\'' + name + '\',\'' + status + '\')" style="width: 50%; background-color: #eb8282;">\n' +
//         '                    <p class="M-font O-font-middle-size">네</p>\n' +
//         '                </div>');
// }
//
// function deleteCategoryOrSide(sq, name, status) {
//     deleteFail(name);
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/menu.js/delete/" + status,
//         dataType: "JSON",
//         data: {
//             "status": sq,
//         },
//         success: function (data) {
//             location.href = "/admin/menu.js?status=category";
//         },
//         error: function () {
//             location.href = "/admin/menu.js?status=category";
//         }
//     });
// }
//
// function deleteModalClose() {
//     $("#delete-modal").hide();
//     deleteModalReset();
// }
//
// function deleteModalReset() {
//     $("#deleteTop").empty();
//     $("#delete-modal-Body").empty();
//     $("#delete-modal-footer").empty();
// }
//
//
// function changeModalClose() {
//     $("#category-change-modal").hide();
//     changeModalReset();
// }
//
// function changeModalReset() {
//     $("#change-modal-Body").empty();
// }
//
//
// //수정 모달창 오픈
// function openChangeModal(sq, name, CSName) {
//
//     var status;
//     if (CSName == "사이드") {
//         status = "side";
//     } else if (CSName == "카테고리") {
//         status = "category";
//     }
//
//     $("#category-change-modal").show();
//     $("#changeTop p").text(CSName + " 수정");
//     $("#change-modal-Body").append('\n' +
//         '                <div class="M-flex-row M-flex-center M-font admin-font-size" style="margin-bottom: 25px;">\n' +
//         '                    <div class="M-flex-row M-flex-center" style="font-size: 25px;width: 20%">\n' +
//         '                       ' + CSName + '\n' +
//         '                    </div>\n' +
//         '                    <div class="M-flex-row M-flex-center M-input" style="width: 50%">\n' +
//         '                           <input type="hidden" id="status" value="' + status + '">' +
//         '                           <input type="hidden" id="firstStatusInformation" value="' + sq + '">' +
//         '                        <input type="text" value="' + name + '" name="' + sq + '" id="categoryOrSideName" class="M-input-text M-font M-mini-size">\n' +
//         '                    </div>\n' +
//         '                </div>');
// }
//
//
// // 카테고리, 사이드 수정
// function changeCategory() {
//
//     var status = $("#status").val();
//     var firstInfoSq = $("#firstStatusInformation").val();
//     var changeName = $("#categoryOrSideName").val();
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/category/change/" + status,
//         dataType: "JSON",
//         data: {
//             "sq": firstInfoSq,
//             "changeName": changeName
//         },
//         success: function (data) {
//             location.href = "/admin/menu.js?status=category";
//         }
//         ,
//         error: function () {
//             location.href = "/admin/menu.js?status=category";
//         }
//     });
//
//
// }
//
// // 카테고리 상세보기
// function categoryDetailModal(categorySq, categoryName) {
//     $("#categoryDetailModal").show();
//     $("#category-top p").text(categoryName + " (카테고리)");
//
//     $.ajax({
//         type: "POST",
//         url: "/admin/category/get/category",
//         dataType: "JSON",
//         data: {
//             "categorySq": categorySq,
//         },
//         success: function (data) {
//             $(data.menuDTOList).each(function () {
//                 $("#category-card-body").append('<div class="O-side-order-card a-side-order-card">\n' +
//                     '                            <div class="O-menu.js-side-img">\n' +
//                     '                                <img src="' + this.imgDTOList[0].imgPath + '/' + this.imgDTOList[0].imgName + '" class="O-side-img">\n' +
//                     '                            </div>\n' +
//                     '                            <div class="O-menu.js-side-name M-font O-font-mini-size M-text-center">\n' +
//                     '                                <p class="O-menu.js-side-name-p">' + this.menuName + '</p>\n' +
//                     '                            </div>\n' +
//                     '                        </div>');
//             });
//         }
//     });
//
// }
//
// // 카테고리 상세보기 닫기
// function categoryModalDetailClose() {
//     $("#categoryDetailModal").hide();
//     $("#category-card-body").empty();
// }