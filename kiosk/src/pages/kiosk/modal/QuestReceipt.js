import {NoReceiptMoneyPayStart, YesReceiptMoneyPayStart} from "../../../js/kiosk/money";

const QuestReceipt = ({menuModalContentChange, orderStatus}) => {

    const close = () => {
        menuModalContentChange({
            status: false,
            param: '',
            modalType: '',
            modalTitle: '',
            modalContent: '',
            menu: ''
        })
    }

    return (
        <div className="O-modal-back" id="receiptModal">
            <div className="O-modal" style={{width: '40%', height: '35%'}}>
                <div className="O-modal-content">
                    <div className="O-modal-header">
                        <div className="O-modal-close-Btn">
                            <div className="O-close O-close3" id="receiptModalCloseBtn" onClick={close}></div>
                        </div>
                        <div className="O-modal-top">
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                    </div>
                    <div className="O-modal-side-order"
                         style={{height: '40%', textAlign: 'center'}} id="delete-modal-Body">
                        <small style={{fontSize: '20px'}}>영수증을 출력하시겠습니까?</small>
                    </div>
                    <div className="O-modal-side-footer M-flex-j-center" id="">
                        <div className="O-receipt-modal-btn"
                             style={{width: '35%', backgroundColor: '#e9e9e9'}}>
                            <p className="M-font O-font-middle-size" onClick={() => {
                                YesReceiptMoneyPayStart(orderStatus);
                            }}>네</p>
                        </div>
                        <div className="O-receipt-modal-btn"
                             style={{width: '35%', marginLeft: '30px', backgroundColor: '#e9e9e9'}}>
                            <p className="M-font O-font-middle-size" onClick={() => {
                                NoReceiptMoneyPayStart(orderStatus);
                            }}>아니요</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default QuestReceipt;