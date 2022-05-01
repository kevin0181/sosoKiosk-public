var notouchCount = 90000; // = 3분 //정확히 3분이 아니네...^^..흠
var upCount = 1;
var beforeCount = 0;
// 500 = 0.5초 5000 = 5초 50000 = 50초


$(document).click(function () {
    upCount++;
});

function noTouch() {
    if (upCount == beforeCount) {
        location.href = "/";
    } else {
        beforeCount = upCount;
    }
}

setInterval(noTouch, notouchCount);


var adminClick = 1;

function goAdmin() {
    if (adminClick == 4) {
        location.href = "/admin/login";
    } else {
        adminClick++;
    }
}


$(document).ready(function () {
});

$(document).on("click", function () {
    var audio = new Audio('/voice/clickSound.wav');
    audio.play();
});


function voice(title) {
    var audio = new Audio('/voice/' + title + '.wav');
    audio.play();
}