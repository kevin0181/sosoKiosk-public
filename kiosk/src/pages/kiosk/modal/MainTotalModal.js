import {useNavigate} from "react-router-dom";

const MainTotalModal = ({menuModalStatus, setAllOrderData, menuModalContentChange}) => {


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

    return (
        <div className="O-modal-back"
             id="failPay"
             style={{zIndex: '10'}}>
            <div className="O-modal"
                 style={{width: '40%', height: '50%'}}>
                <div className="O-modal-content">
                    <div className="O-modal-header"
                         style={{height: '20%'}}>
                        <div className="O-modal-close-Btn">
                            <div className="O-close O-close3" onClick={goStart}
                                 id="successPayModal"></div>
                        </div>
                        <div className="O-modal-top">
                            <div className="O-modal-top-title M-font" id="deleteTop">
                                <p>{menuModalStatus.modalTitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-order"
                         style={{height: '40%', textAlign: 'center'}}
                         id="fail-pay-modal-Body">
                        <small style={{fontSize: '30px'}}>{menuModalStatus.modalContent}</small>
                    </div>
                    <div className="O-modal-side-footer M-flex-j-center"
                         style={{marginTop: '30px', height: '15%'}}>
                        <div className="O-receipt-modal-btn"
                             onClick={goStart}
                             style={{width: '35%', backgroundColor: '#d56161'}}>
                            <p className="M-font O-font-middle-size">
                                닫기</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MainTotalModal;