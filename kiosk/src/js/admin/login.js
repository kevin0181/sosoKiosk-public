import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
import $ from "jquery";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqVwwfKkiGVU8NDyRgkzxCT4n5yMV_vVE",
    authDomain: "sosokiosk-97642.firebaseapp.com",
    projectId: "sosokiosk-97642",
    storageBucket: "sosokiosk-97642.appspot.com",
    messagingSenderId: "47029861073",
    appId: "1:47029861073:web:4ef108dee168342bf763f0",
    measurementId: "G-BVGR57FRNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var db = getFirestore(app);

async function fireBaseLogin(id, password) {

    let fireId;
    let firePassword;
    const querySnapshot = await getDocs(collection(db, "admin"));
    querySnapshot.forEach((doc) => {
        fireId = doc.data().id;
        firePassword = doc.data().password;
    });

    if (fireId == id) {
        if (firePassword == password) {
            return loginStatus(true, "로그인 성공", fireId);
        } else {
            return loginStatus(false, "비밀번호가 일치하지 않습니다.", null);
        }
    } else {
        return loginStatus(false, "아이디가 일치하지 않습니다.", null);
    }
}

async function login(loginForm, navigate) {

    let result = await fireBaseLogin(loginForm.id, loginForm.password);
    if (result.successStatus) {
        sessionStorage.setItem("id", result.id); // 저장
        navigate('/admin/menu.js?status=all');
    } else {
        $("#loginStatus").text(result.statusMessage);
    }
}

function loginStatus(getStatus, getMessage, getId) {
    let message = {
            successStatus: getStatus,
            statusMessage: getMessage,
            id: getId
        }
    ;
    return message;
}

export default login;