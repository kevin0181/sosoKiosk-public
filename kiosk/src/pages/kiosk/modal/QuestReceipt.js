import {NoReceiptMoneyPayStart, YesReceiptMoneyPayStart} from "../../../js/kiosk/pay";
import selectReceipt from "./../../../voice/주문이 완료되었습니다 영수증을 선택해주세요.wav";
import {useEffect} from "react";

const QuestReceipt = ({menuModalContentChange, orderStatus, orderNumber, PlusOrderNumber, menuModalStatus}) => {


    useEffect(() => {
        selectReceiptVoice();
    }, []);

    const selectReceiptVoice = () => {
        let audio = new Audio(selectReceipt);
        audio.play();
    }

    return (
        // <div className="O-modal-back" id="receiptModal">
        //     <div className="O-modal" style={{width: '40%', height: '35%'}}>
        //         <div className="O-modal-content">
        //             <div className="O-modal-header">
        //                 <div className="O-modal-close-Btn">
        //                 </div>
        //                 <div className="O-modal-top">
        //                 </div>
        //             </div>
        //             <div className="O-modal-category-bar">
        //             </div>
        //             <div className="O-modal-side-order"
        //                  style={{height: '40%', textAlign: 'center'}} id="delete-modal-Body">
        //                 <small style={{fontSize: '20px'}}>영수증을 출력하시겠습니까?</small>
        //             </div>
        //             <div className="O-modal-side-footer M-flex-j-center" id="">
        //                 <div className="O-receipt-modal-btn M-flex-row M-flex-center"
        //                      onClick={() => {
        //                          PlusOrderNumber(); //주문 번호
        //                          menuModalContentChange({
        //                              status: true,
        //                              param: '',
        //                              modalType: 'viewLoading',
        //                              modalTitle: '',
        //                              modalContent: '',
        //                              menu: '',
        //                          }).then(function () {
        //                              YesReceiptMoneyPayStart(orderStatus, orderNumber, menuModalStatus);
        //                          })
        //                      }}
        //                      style={{width: '35%', height: '55px', backgroundColor: '#e9e9e9'}}>
        //                     <p className="D-font" style={{fontSize: '25px'}} >네</p>
        //                 </div>
        //                 <div className="O-receipt-modal-btn M-flex-row M-flex-center"
        //                      onClick={() => {
        //                          PlusOrderNumber(); //주문 번호
        //                          menuModalContentChange({
        //                              status: true,
        //                              param: '',
        //                              modalType: 'viewLoading',
        //                              modalTitle: '',
        //                              modalContent: '',
        //                              menu: '',
        //                          }).then(function () {
        //                              NoReceiptMoneyPayStart(orderStatus, orderNumber, menuModalStatus);
        //                          })
        //                      }}
        //                      style={{width: '35%', height: '55px', marginLeft: '30px', backgroundColor: '#e9e9e9'}}>
        //                     <p className="D-font" style={{fontSize: '25px'}} >아니요</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

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
                        <small style={{fontSize: '24px'}}>영수증을 출력하여 카운터에 가져다 주세요.</small><br/>
                        <small style={{fontSize: '18px', color: 'red'}}>하단 버튼 클릭 시, 영수증이 출력됩니다.</small>
                    </div>
                    <div className="O-modal-side-footer M-flex-j-center" id="">
                        <div className="O-receipt-modal-btn M-flex-row M-flex-center"
                             onClick={() => {
                                 PlusOrderNumber(); //주문 번호
                                 menuModalContentChange({
                                     status: true,
                                     param: '',
                                     modalType: 'viewLoading',
                                     modalTitle: '',
                                     modalContent: '',
                                     menu: '',
                                 }).then(function () {
                                     YesReceiptMoneyPayStart(orderStatus, orderNumber, menuModalStatus);
                                 }).finally(() => {
                                     menuModalContentChange({
                                         status: true,
                                         param: '',
                                         modalType: '',
                                         modalTitle: '',
                                         modalContent: '',
                                         menu: '',
                                     })
                                 })
                             }}
                             style={{width: '35%', height: '55px', backgroundColor: '#e9e9e9'}}>
                            <p className="D-font" style={{fontSize: '25px'}}>네</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default QuestReceipt;