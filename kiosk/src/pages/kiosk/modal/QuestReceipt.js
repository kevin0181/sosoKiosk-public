import {NoReceiptMoneyPayStart, YesReceiptMoneyPayStart} from "../../../js/kiosk/money";
import {useNavigate} from "react-router-dom";

const QuestReceipt = ({menuModalContentChange, orderStatus, orderNumber, PlusOrderNumber}) => {

    return (
        <div className="O-modal-back" id="receiptModal">
            <div className="O-modal" style={{width: '40%', height: '35%'}}>
                <div className="O-modal-content">
                    <div className="O-modal-header">
                        <div className="O-modal-close-Btn">
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
                                PlusOrderNumber(); //주문 번호
                                YesReceiptMoneyPayStart(orderStatus, orderNumber, PlusOrderNumber);
                            }}>네</p>
                        </div>
                        <div className="O-receipt-modal-btn"
                             style={{width: '35%', marginLeft: '30px', backgroundColor: '#e9e9e9'}}>
                            <p className="M-font O-font-middle-size" onClick={() => {
                                PlusOrderNumber(); //주문 번호
                                NoReceiptMoneyPayStart(orderStatus, orderNumber, PlusOrderNumber);
                            }}>아니요</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default QuestReceipt;