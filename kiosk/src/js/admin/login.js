// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import {
    getFirestore,
    getDocs,
    collection
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import {useNavigate} from "react-router-dom";
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
const analytics = getAnalytics(app);
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
            return true;
        } else {
            return console.log("패스워드 일치하지않음");
        }
    } else {
        return console.log("아이디 일치하지 않음");
    }
}

async function login(loginForm, navigate) {
    // let result = await fireBaseLogin(loginForm.id, loginForm.password);
    // if (result.successStatus) {
    //     sessionStorage.setItem("id", result.id); // 저장
    //     navigate('/');
    // } else {
    // }

    if (loginForm.id === 'soso') {
        if (loginForm.password === '1234') {
            console.log("로그인 성공");
            navigate('/admin/menu');
        } else {
            console.log("패스워드 틀림");
        }
    } else {
        console.log("아이디 틀림");
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