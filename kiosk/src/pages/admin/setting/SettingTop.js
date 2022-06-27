import {useEffect} from "react";
import $ from "jquery";
import {useNavigate} from "react-router-dom";

const SettingTop = ({status, resetData}) => {

    const navigate = useNavigate();

    const statusCss = () => {
        switch (status) {
            case 'setting':
                return $('#setting').addClass('BtnClickColor');
            default:
                return $('#setting').addClass('BtnClickColor');
        }
    }

    useEffect(() => {
        statusCss();
    });

    return (
        <div className="adminTop M-font">
            <div className="admin-top-top">
                <div className="admin-top-part admin-top-part-left">
                    <div className="admin-top-p-part" onClick={() => {
                        resetData().then(function () {
                            sessionStorage.clear();
                            navigate('/');
                        });
                    }}>
                        <p className="" style={{fontSize: '25px'}}>홈으로</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-nomal">
                    <div className="admin-top-p-part" id="setting" onClick={() => {
                        navigate('/admin/setting?status=setting')
                    }}>
                        <p className="" style={{fontSize: '25px'}}>결제 설정</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-nomal">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '25px'}}></p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-right">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '25px'}}></p>
                    </div>
                </div>
            </div>
            <div className="admin-top-bottom btnSound">
                <div className="admin-top-part admin-bottom-part-left">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '25px'}}></p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-nomal">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '25px'}}></p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-nomal">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '25px'}}></p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-right">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '25px'}}></p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SettingTop;