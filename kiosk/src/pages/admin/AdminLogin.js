import './../../css/admin/admin-all.css';
import './../../css/admin/admin-main.css';
import './../../css/admin/adminTop.css';
import './../../css/admin/adminLogin.css';
import backButtunImg from './../../img/backImg.png';

const AdminLogin = () => {

    return (
        <div className="container">
            <div id=""
                 className="container M-flex-row">
                <div className="O-order-side-all">
                    <div className="O-order-Side">
                        <div className="side-up-container">
                            <div className="storeName">
                                <p className="M-font"
                                   style={{fontSize: '80px'}}>&pastel</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="admin-right-side"
                     style={{justifyContent: "center"}}>
                    <div className="admin-right-side-top">
                        <div>
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
                               style={{fontSize: '15px', fontWeight: 'bold'}}></p>
                        </div>
                        <div className="adminFormBody">
                            <form id="adminForm" className="adminForm">
                                <input type="text"
                                       id="admin-id"
                                       name="username"
                                       className="adminId"
                                       placeholder="아이디"/><br/>
                                <input type="password"
                                       name="password"
                                       id="admin-password"
                                       className="adminPassword"
                                       placeholder="비밀번호"/><br/>
                                <input type="button" id="adminLogin"
                                       value="로그인"
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