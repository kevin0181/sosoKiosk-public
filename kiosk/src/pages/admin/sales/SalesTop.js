import {useNavigate} from "react-router-dom";
import $ from "jquery";
import {useEffect} from "react";

const SalesTop = ({status, resetData}) => {

    const navigate = useNavigate();

    const statusCss = () => {
        $('.admin-top-p-part').removeClass('BtnClickColor');
        switch (status) {
            case 'kioskClose':
                return $('#kioskClose').addClass('BtnClickColor');
            case 'sales':
                return $('#salesTotal').addClass('BtnClickColor');
            default:
                return $('#salesTotal').addClass('BtnClickColor');
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
                        <p className="" style={{fontSize: '40px'}}>홈으로</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-nomal">
                    <div className="admin-top-p-part" id='kioskClose' onClick={() => {
                        navigate('/admin/sales?status=kioskClose')
                    }}>
                        <p className="" style={{fontSize: '40px'}}>마감 하기</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-nomal">
                    <div className="admin-top-p-part" id="salesTotal" onClick={() => {
                        navigate('/admin/sales?status=sales');
                    }}>
                        <p className="" style={{fontSize: '40px'}}>매출 계산</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-right">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '40px'}}></p>
                    </div>
                </div>
            </div>
            <div className="admin-top-bottom btnSound">
                <div className="admin-top-part admin-bottom-part-left">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '40px'}}></p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-nomal">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '40px'}}></p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-nomal">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '40px'}}></p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-right">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '40px'}}></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesTop;