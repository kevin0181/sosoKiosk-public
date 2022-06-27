import {useEffect} from "react";
import {cancelPay} from "../../../../js/admin/order/order";

const CancelPayModal = ({modalContentChange, modalStatus, setDataFun, data}) => {

    const close = () => {
        modalContentChange({
            status: false,
            param: '',
            modalType: '',
            modalTitle: '',
            modalContent: '',
            menu: ''
        })
    }

    return (
        <div className="O-modal-back" id="adminTotalModalYesOrNo" style={{zIndex: '10', display: 'block'}}>
            <div className="O-modal" style={{width: '40%', height: '50%'}}>
                <div className="O-modal-content">
                    <div className="O-modal-header">
                        <div className="O-modal-close-Btn">
                            <div className="O-close O-close3" id="adminTotalModalYesOrNoCloseBtn" onClick={close}></div>
                        </div>
                        <div className="O-modal-top">
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                    </div>
                    <div className="O-modal-side-order" style={{height: '40%', textAlign: 'center'}}
                         id="adminTotalModalYesOrNoBody">
                        <small style={{fontSize: '20px'}}>취소 하시겠습니까?</small></div>
                    <div className="O-modal-side-footer M-flex-j-center" id="">
                        <div className="O-receipt-modal-btn M-flex-row M-flex-center" onClick={() => {
                            cancelPay(modalStatus.data, modalContentChange, setDataFun, data);
                        }}
                             style={{width: '35%', backgroundColor: '#eb8282'}}>
                            <p className="M-font M-font-30-size">네</p>
                        </div>
                        <div className="O-receipt-modal-btn M-flex-row M-flex-center" onClick={close}
                             style={{width: '35%', marginLeft: '30px', backgroundColor: ' #e9e9e9'}}>
                            <p className="M-font M-font-30-size">아니요</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default CancelPayModal;