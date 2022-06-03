import {useEffect} from "react";
import AdminTotalModal from "./menu/modal/AdminTotalModal";
import AdminMenuDeleteModal from "./menu/modal/AdminMenuDeleteModal";
import AdminSideMenuDeleteModal from "./menu/modal/AdminSideMenuDeleteModal";
import AdminCategoryDeleteModal from "./menu/modal/AdminCategoryDeleteModal";
import AdminSideDeleteModal from "./menu/modal/AdminSideDeleteModal";
import AdminSideCategoryDeleteModal from "./menu/modal/AdminSideCategoryDeleteModal";
import AdminMenuDetailModal from "./menu/modal/AdminMenuDetailModal";
import AdminSideDetailModal from "./menu/modal/AdminSideDetailModal";
import CategoryRenameModal from "./menu/modal/categoryModal/CategoryRenameModal";
import SideRenameModal from "./menu/modal/categoryModal/SideRenameModal";
import CategoryDetailModal from "./menu/modal/categoryModal/CategoryDetailModal";
import SideDetailModal from "./menu/modal/categoryModal/SideDetailModal";
import CancelPayModal from "./order/modal/CancelPayModal";

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
                    let changeMenuData;
                    data.all.map((it, index) => {
                        if (it.menuSq === modalStatus.sendId) {
                            changeMenuData = it;
                        }
                    });
                    return <AdminMenuDetailModal modalStatus={modalStatus} changeMenuData={changeMenuData}
                                                 setDataFun={setDataFun} data={data}
                                                 modalContentChange={modalContentChange}/>
                    break;

                case 'adminSideDetailModal':
                    let changeSideData;
                    data.sideAll.map((it, index) => {
                        if (it.menuSideSq === modalStatus.sendId) {
                            changeSideData = it;
                            console.log(changeSideData)
                        }
                    });
                    return <AdminSideDetailModal modalStatus={modalStatus} changeSideData={changeSideData}
                                                 setDataFun={setDataFun} data={data}
                                                 modalContentChange={modalContentChange}/>
                    break;

                case 'adminCategoryRenameModal':
                    return <CategoryRenameModal modalStatus={modalStatus}
                                                setDataFun={setDataFun} data={data}
                                                modalContentChange={modalContentChange}/>
                    break;
                case 'adminSideRenameModal':
                    return <SideRenameModal modalStatus={modalStatus}
                                            setDataFun={setDataFun} data={data}
                                            modalContentChange={modalContentChange}/>
                    break;
                case 'adminCategoryDetailModal':

                    return <CategoryDetailModal modalStatus={modalStatus}
                                                setDataFun={setDataFun} data={data}
                                                modalContentChange={modalContentChange}/>
                    break;

                case 'adminSideCategoryDetailModal':

                    return <SideDetailModal modalStatus={modalStatus}
                                            setDataFun={setDataFun} data={data}
                                            modalContentChange={modalContentChange}/>
                    break;
                case 'cancelPayModal':
                    return <CancelPayModal modalStatus={modalStatus} setDataFun={setDataFun} data={data}
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