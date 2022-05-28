import {useEffect} from "react";
import MenuDetailModal from "./modal/MenuDetailModal";

const KioskMainModal = ({menuModalStatus, menuModalContentChange, menu, categoryList}) => {

    useEffect(() => {
        console.log(menuModalStatus);
    }, [menuModalStatus]);

    const ModalFun = () => {

        if (menuModalStatus.status) {

            switch (menuModalStatus.modalType) {
                case 'orderMenuDetail':
                    return <MenuDetailModal menuModalStatus={menuModalStatus}
                                            menuModalContentChange={menuModalContentChange}/>
                    break;
            }

        }

    }
    return (
        <>
            <ModalFun/>
        </>
    );
}
export default KioskMainModal;