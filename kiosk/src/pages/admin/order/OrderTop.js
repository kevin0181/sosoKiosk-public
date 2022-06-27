import {useEffect} from "react";
import $ from "jquery";
import {useNavigate} from "react-router-dom";

const OrderTop = ({status, resetData}) => {

    const navigate = useNavigate();

    const allRemoveClass = () => {
        $('#allOrder').removeClass('BtnClickColor');
        $('#cardOrder').removeClass('BtnClickColor');
        $('#moneyOrder').removeClass('BtnClickColor');
    }

    const statusCss = () => {
        switch (status) {
            case 'allOrder':
                return $('#allOrder').addClass('BtnClickColor');
            case 'cardOrder':
                return $('#cardOrder').addClass('BtnClickColor');
            case 'moneyOrder':
                return $('#moneyOrder').addClass('BtnClickColor');
            default:
                return $('#AllOrder').addClass('BtnClickColor');
        }
    }

    useEffect(() => {
        allRemoveClass();
        statusCss();
    }, [status]);

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
                    <div className="admin-top-p-part" id="allOrder" onClick={() => {
                        navigate('/admin/order?status=allOrder')
                    }}>
                        <p className="" style={{fontSize: '25px'}}>전체 주문</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-nomal">
                    <div className="admin-top-p-part" id="cardOrder" onClick={() => {
                        navigate('/admin/order?status=cardOrder')
                    }}>
                        <p className="" style={{fontSize: '25px'}}>카드 주문</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-right">
                    <div className="admin-top-p-part" id="moneyOrder" onClick={() => {
                        navigate('/admin/order?status=moneyOrder')
                    }}>
                        <p className="" style={{fontSize: '25px'}}>현금 주문</p>
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

export default OrderTop;