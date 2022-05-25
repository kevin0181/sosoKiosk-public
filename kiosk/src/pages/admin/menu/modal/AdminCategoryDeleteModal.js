import axios from "axios";
import serverUrl from "../../../config/server.json";

const AdminCategoryDeleteModal = ({modalStatus, modalContentChange, data, setDataFun}) => {

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
        const response = axios.post('http://' + serverUrl.server + '/admin/menu/delete/category', null, {
            params: {
                'status': modalStatus.sendId
            }
        });

        const category = data.category.category.filter((it) => it.categorySq !== modalStatus.sendId);

        setDataFun({
            ...data,
            ['category']: {
                category: category,
                side: data.category.side
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
                    <div className="O-side-select-close" onClick={menuDelete}
                         style={{width: '50%', backgroundColor: '#eb8282'}}>
                        <p className="M-font O-font-middle-size">네</p>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
export default AdminCategoryDeleteModal;