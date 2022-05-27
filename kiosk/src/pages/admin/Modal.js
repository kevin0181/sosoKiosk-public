import {useEffect} from "react";
import AdminTotalModal from "./menu/modal/AdminTotalModal";
import AdminMenuDeleteModal from "./menu/modal/AdminMenuDeleteModal";
import AdminSideMenuDeleteModal from "./menu/modal/AdminSideMenuDeleteModal";
import AdminCategoryDeleteModal from "./menu/modal/AdminCategoryDeleteModal";
import AdminSideDeleteModal from "./menu/modal/AdminSideDeleteModal";
import AdminSideCategoryDeleteModal from "./menu/modal/AdminSideCategoryDeleteModal";
import AdminMenuDetailModal from "./menu/modal/AdminMenuDetailModal";

const Modal = ({modalStatus, modalContentChange, data, setDataFun}) => {

    const ModalFun = () => {
        if (modalStatus.status == true) {
            switch (modalStatus.modalType) {
                case 'adminTotalModal':
                    return <AdminTotalModal modalStatus={modalStatus}
                                            modalContentChange={modalContentChange}/>
                    break;
                case 'adminMenuDelete':
                    return <AdminMenuDeleteModal modalStatus={modalStatus} data={data} setDataFun={setDataFun}
                                                 modalContentChange={modalContentChange}/>
                    break;

                case 'adminSideMenuDelete':
                    return <AdminSideMenuDeleteModal modalStatus={modalStatus} data={data} setDataFun={setDataFun}
                                                     modalContentChange={modalContentChange}/>
                    break;
                case 'adminCategoryDelete':
                    return <AdminCategoryDeleteModal modalStatus={modalStatus} data={data} setDataFun={setDataFun}
                                                     modalContentChange={modalContentChange}/>
                    break;
                case 'adminSideDelete':
                    return <AdminSideDeleteModal modalStatus={modalStatus} data={data} setDataFun={setDataFun}
                                                 modalContentChange={modalContentChange}/>
                    break;
                case 'adminSideCategoryDelete':
                    return <AdminSideCategoryDeleteModal modalStatus={modalStatus} data={data} setDataFun={setDataFun}
                                                         modalContentChange={modalContentChange}/>
                    break;
                case 'adminMenuDetailModal':
                    let changeData;
                    data.all.map((it, index) => {
                        if (it.menuSq === modalStatus.sendId) {
                            changeData = it;
                        }
                    });
                    return <AdminMenuDetailModal modalStatus={modalStatus} changeData={changeData}
                                                 setDataFun={setDataFun} data={data}
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