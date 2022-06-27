import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const OrderSuccessAfterTimeOutModal = ({setAllOrderData, menuModalContentChange}) => {

    const navigate = useNavigate();

    const goStart = () => {
        setAllOrderData([]).then(function () {
            menuModalContentChange({
                status: false,
                param: '',
                modalType: '',
                modalTitle: '',
                modalContent: '',
                menu: ''
            }).then(function () {
                navigate('/');
            })
        });
    }

    const [time, setTime] = useState(10);

    useEffect(() => {

        if (time === 0) {

            goStart();

        } else {
            setTimeout(() => {

                setTime(time - 1);

            }, 1000);
        }

    }, [time]);

    return (
        <div className="O-modal-back"
             id="successPay">
            <div className="O-modal"
                 style={{width: '40%', height: '60%'}}>
                <div className="O-modal-content">
                    <div className="O-modal-header">
                        <div className="O-modal-close-Btn">
                            <div className="O-close O-close3" onClick={goStart}
                                 id="successPayModal"></div>
                        </div>
                        <div className="O-modal-top">
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                    </div>
                    <div className="O-modal-side-order"
                         style={{height: '40%', textAlign: 'center'}}
                         id="success-pay-modal-Body">
                        <small style={{fontSize: '30px'}}>주문이
                            완료
                            되었습니다.</small><br/>
                        <small style={{fontSize: '30px'}}>번호표를
                            확인해주세요.</small><br/>
                        <small style={{fontSize: '30px'}}
                               id="successPayTime">{time}</small>
                    </div>
                    <div className="O-modal-side-footer M-flex-j-center"
                         style={{marginTop: '30px', height: '15%'}}>
                        <div className="O-receipt-modal-btn M-flex-row M-flex-center" onClick={goStart}
                             style={{width: '35%', height: '57px', backgroundColor: '#d56161'}}>
                            <p className="D-font" style={{fontSize:'30px'}}>
                                닫기</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default OrderSuccessAfterTimeOutModal;