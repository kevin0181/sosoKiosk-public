const AdminDeleteModal = ({modalStatus, modalContentChange}) => {

    const closeBtn = () => {
        modalContentChange({
            status: false,
            modalType: '',
            modalTitle: '',
            modalContent: ''
        });
    }

    return (<div className="O-modal-back" id="delete-modal">
        <div className="O-modal" style={{width: '40%', height: '35%'}}>
            <div className="O-modal-content">
                <div className="O-modal-header">
                    <div className="O-modal-close-Btn" onClick={closeBtn}>
                        <div className="O-close O-close3" id="modalCloseBtn"></div>
                    </div>
                    <div className="O-modal-top">
                        <div className="O-modal-top-title M-font" id="deleteTop">
                            <p>{modalStatus.modalTitle}</p>
                        </div>
                    </div>
                </div>
                <div className="O-modal-category-bar">
                </div>
                <div className="O-modal-side-order" style={{height: '40%', textAlign: 'center'}} id="delete-modal-Body">
                    <small style={{color: 'red', fontSize: '20px'}}>{modalStatus.modalContent}</small>
                </div>
                <div className="O-modal-side-footer M-flex-j-center" id="delete-modal-footer">
                    <div className="O-side-select-close"
                         style={{width: '50%', backgroundColor: '#eb8282'}}>
                        <p className="M-font O-font-middle-size">네</p>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
export default AdminDeleteModal;