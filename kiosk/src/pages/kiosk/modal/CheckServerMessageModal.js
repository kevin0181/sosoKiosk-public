const CheckServerMessageModal = () => {

    return (
        <div className="O-modal-back" id="adminTotalModal" style={{zIndex: 10}}>
            <div className="O-modal" style={{width: '40%', height: '50%'}}>
                <div className="O-modal-content">
                    <div className="O-modal-header" style={{height: '20%'}}>
                        <div className="O-modal-close-Btn">
                        </div>
                        <div className="O-modal-top">
                            <div className="O-modal-top-title M-font" id="deleteTop">
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-order" style={{height: '40%', textAlign: 'center'}}
                         id="adminTotalModalBody">
                        <p className={'M-font O-font-middle-size'}>서버를 킨 후,<br/> 키오스크 재실행을 해주세요.</p>
                    </div>
                    <div className="O-modal-side-footer M-flex-j-center" style={{marginTop: '30px', height: '15%'}}>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CheckServerMessageModal;