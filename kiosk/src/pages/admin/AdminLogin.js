import './../../css/admin/admin-all.css';
import './../../css/admin/admin-main.css';
import './../../css/admin/adminTop.css';
import './../../css/admin/adminLogin.css';
import backButtunImg from './../../img/backImg.png';
import {useNavigate} from "react-router-dom";
import adminLogin from './../../js/admin/login';
import {useEffect, useState} from "react";
import welcomeAdmin from "../../voice/관리자님 환영합니다.wav";

const AdminLogin = () => {

    useEffect(() => {
        welcomeAdminVoice();
    }, []);

    const welcomeAdminVoice = () => {
        let audio = new Audio(welcomeAdmin);
        audio.play();
    }

    const navigate = useNavigate();

    const [LoginFormState, setLoginFormState] = useState({
        id: "",
        password: ""
    });

    const login = () => {
        adminLogin(LoginFormState, navigate);
    }

    return (
        <div className="container">
            <div id=""
                 className="container M-flex-row">
                <div className="O-order-side-all">
                    <div className="O-order-Side">
                        <div className="side-up-container">
                            <div className="storeName">
                                <p className="s-font"
                                   style={{fontSize: '80px'}}>&pastel</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="admin-right-side"
                     style={{justifyContent: "center"}}>
                    <div className="admin-right-side-top">
                        <div onClick={() => {
                            navigate('/');
                        }}>
                            <img src={backButtunImg}
                                 id="indexBackBtn"
                                 alt={'123'}
                                 style={{width: '100%'}}/>
                        </div>
                    </div>
                    <div className="adminLoginDiv">
                        <div className="adminFormTop">
                            <p>관리자 로그인</p>
                        </div>
                        <div className="adminLoginResult">
                            <p className="admin-login-status" id="loginStatus"
                               style={{fontSize: '15px', fontWeight: 'bold', color: 'red'}}></p>
                        </div>
                        <div className="adminFormBody">
                            <form id="adminForm" className="adminForm">
                                <input type="text"
                                       id="admin-id"
                                       onChange={(e) => {
                                           setLoginFormState({...LoginFormState, id: e.target.value})
                                       }}
                                       name="username"
                                       className="adminId"
                                       placeholder="아이디"/><br/>
                                <input type="password"
                                       name="password"
                                       id="admin-password"
                                       onChange={(e) => {
                                           setLoginFormState({...LoginFormState, password: e.target.value})
                                       }}
                                       className="adminPassword"
                                       placeholder="비밀번호"/><br/>
                                <input type="button" id="adminLogin"
                                       value="로그인" onClick={login}
                                       className="adminSubmit"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AdminLogin;