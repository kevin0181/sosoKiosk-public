const AdminTotalModal = ({modalStatus, modalContentChange}) => {

    const closeBtn = () => {
        modalContentChange({
            status: false,
            modalType: '',
            modalTitle: '',
            modalContent: '',
            sendId: '',
            sendName: ''
        });
    }

    return (
        <div className="O-modal-back" id="adminTotalModal" style={{zIndex: 10}}>
            <div className="O-modal" style={{width: '40%', height: '50%'}}>
                <div className="O-modal-content">
                    <div className="O-modal-header" style={{height: '20%'}}>
                        <div className="O-modal-close-Btn" onClick={closeBtn}>
                            <div className="O-close O-close3" id="adminTotalCloseBtn"></div>
                        </div>
                        <div className="O-modal-top">
                            <div className="O-modal-top-title M-font" id="deleteTop">
                                <p className={"M-font-30-size"}>{modalStatus.modalTitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-order M-flex-center M-flex-row" style={{height: '40%', textAlign: 'center'}}
                         id="adminTotalModalBody">
                        <p className={'M-font M-font-25-size'}>{modalStatus.modalContent}</p>
                    </div>
                    <div className="O-modal-side-footer M-flex-j-center" style={{marginTop: '30px', height: '15%'}}>
                        <div className="O-receipt-modal-btn M-flex-center M-flex-row" onClick={closeBtn}
                             style={{width: '35%', backgroundColor: '#d56161'}}>
                            <p className="M-font M-font-25-size">닫기</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminTotalModal;