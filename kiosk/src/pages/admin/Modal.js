import {useEffect} from "react";
import AdminTotalModal from "./menu/modal/AdminTotalModal";
import AdminDeleteModal from "./menu/modal/AdminDeleteModal";

const Modal = ({modalStatus, modalContentChange, data, deleteSetData}) => {

    const ModalFun = () => {
        if (modalStatus.status == true) {
            switch (modalStatus.modalType) {
                case 'adminTotalModal':
                    return <AdminTotalModal modalStatus={modalStatus}
                                            modalContentChange={modalContentChange}/>
                    break;
                case 'adminMenuDelete':
                    return <AdminDeleteModal modalStatus={modalStatus} data={data} deleteSetData={deleteSetData}
                                             modalContentChange={modalContentChange}/>
                    break;
            }
        } else {
            return <></>
        }
    }

    useEffect(() => {
        ModalFun();
    }, [modalStatus.status]);

    return (
        <>
            <ModalFun/>
        </>
    );
}

export default Modal;