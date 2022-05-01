// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import {
    getFirestore,
    getDocs,
    collection
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSIcxioJ725DeZRsSTHN03iH3xFMNez54",
    authDomain: "sosofcm-700ef.firebaseapp.com",
    projectId: "sosofcm-700ef",
    storageBucket: "sosofcm-700ef.appspot.com",
    messagingSenderId: "704008753036",
    appId: "1:704008753036:web:3a97d8a2a458990f4450a9",
    measurementId: "G-056G62GWG9"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var analytics = getAnalytics(app);
var db = getFirestore(app);

async function fireBaseLogin(id, password) {

    let fireId;
    let firePassword;
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
        fireId = doc.data().id;
        firePassword = doc.data().password;
    });

    if (fireId == id) {
        if (firePassword == password) {
            return loginStatus(true, "로그인 성공", fireId);
        } else {
            return loginStatus(false, "패스워드가 일치하지 않습니다.", null);
        }
    } else {
        return loginStatus(false, "아이디가 일치하지 않습니다.", null);
    }
}

$("#adminLogin").on("click", async function () {
    let result = await fireBaseLogin($("#admin-id").val(), $("#admin-password").val());
    if (result.successStatus) {

        sessionStorage.setItem("id", result.id); // 저장
        location.href = "./../../kiosk/admin/index.html";
    } else {
        $("#loginStatus").text(result.statusMessage);
    }
});

function loginStatus(getStatus, getMessage, getId) {
    let message = {
            successStatus: getStatus,
            statusMessage: getMessage,
            id: getId
        }
    ;
    return message;
}