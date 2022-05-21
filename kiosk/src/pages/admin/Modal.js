import {useEffect} from "react";
import AdminTotalModal from "./menu/modal/AdminTotalModal";

const Modal = ({modalStatus, modalContentChange}) => {

    const ModalFun = () => {
        if (modalStatus.status == true) {
            switch (modalStatus.modalType) {
                case 'adminTotalModal':
                    return <AdminTotalModal modalStatus={modalStatus} modalContentChange={modalContentChange}/>
                    break;
                case 'adminMenuDelete':
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