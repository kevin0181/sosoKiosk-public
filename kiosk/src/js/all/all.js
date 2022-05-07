var notouchCount = 90000; // = 3분 //정확히 3분이 아니네...^^..흠
var upCount = 1;
var beforeCount = 0;
// 500 = 0.5초 5000 = 5초 50000 = 50초


$(document).click(function () {
    upCount++;
});

function noTouch() {
    if (upCount == beforeCount) {
        location.href = "./../../kiosk/kiosk/index.html";
    } else {
        beforeCount = upCount;
    }
}

setInterval(noTouch, notouchCount);


var adminClick = 1;

function goAdmin() {
    if (adminClick == 4) {
        location.href = "./../../kiosk/admin/login.html";
    } else {
        adminClick++;
    }
}


$(document).ready(function () {
});

$(document).on("click", function () {
    var audio = new Audio('../voice/clickSound.wav');
    audio.play();
});


function voice(title) {
    var audio = new Audio('../voice/' + title + '.wav');
    audio.play();
}


function getParameterByName(name) { //파라미터 가져옴
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
