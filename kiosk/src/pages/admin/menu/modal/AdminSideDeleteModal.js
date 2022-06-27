import axios from "axios";
import serverUrl from "../../../config/server.json";
import $ from "jquery";

const AdminSideDeleteModal = ({modalStatus, modalContentChange, data, setDataFun}) => {

    const closeBtn = () => {
        modalContentChange({
            status: false,
            param: '',
            modalType: '',
            modalTitle: '',
            modalContent: '',
            sendId: '',
            sendName: ''
        });
    }

    const menuDelete = () => {
        const response = axios.post('http://' + serverUrl.server + '/admin/menu/delete/side', null, {
            params: {
                'status': modalStatus.sendId
            }
        });

        const side = data.category.side.filter((it) => it.sideSq !== modalStatus.sendId);

        setDataFun({
            ...data,
            ['category']: {
                category: data.category.category,
                side: side,
                sideCategory: data.category.sideCategory
            }
        })

        response.then(function (res) {
            modalContentChange({
                status: false,
                param: '',
                modalType: '',
                modalTitle: '',
                modalContent: '',
                sendId: '',
                sendName: ''
            });
        });

        $('#progress-small-category').text('사이드를 삭제하였습니다.');

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
                            <p className="M-font-30-size">{modalStatus.modalTitle}</p>
                        </div>
                    </div>
                </div>
                <div className="O-modal-category-bar">
                </div>
                <div className="O-modal-side-order" style={{height: '40%', textAlign: 'center'}} id="delete-modal-Body">
                    <small style={{color: 'red', fontSize: '20px'}}>{modalStatus.modalContent}</small>
                </div>
                <div className="O-modal-side-footer M-flex-j-center" id="delete-modal-footer">
                    <div className="O-side-select-close M-flex-row M-flex-center" onClick={menuDelete}
                         style={{width: '50%', backgroundColor: '#eb8282'}}>
                        <p className="M-font M-font-25-size">네</p>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
export default AdminSideDeleteModal;