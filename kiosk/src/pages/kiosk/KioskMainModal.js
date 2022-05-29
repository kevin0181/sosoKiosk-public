import {useEffect} from "react";
import MenuDetailModal from "./modal/MenuDetailModal";
import MenuDetailNoSideModal from "./modal/MenuDetailNoSideModal";

const KioskMainModal = ({
                            menuModalStatus,
                            menuModalContentChange,
                            menu,
                            categoryList,
                            orderAllOrderData,
                            allOrderData
                        }) => {

    useEffect(() => {
        console.log(menuModalStatus);
    }, [menuModalStatus]);

    const ModalFun = () => {

        if (menuModalStatus.status) {

            switch (menuModalStatus.modalType) {
                case 'orderMenuDetail':
                    if (menuModalStatus.menu.side.length === 0) {

                        return <MenuDetailNoSideModal menuModalStatus={menuModalStatus}
                                                      orderAllOrderData={orderAllOrderData} allOrderData={allOrderData}
                                                      menuModalContentChange={menuModalContentChange}/>

                    } else {
                        return <MenuDetailModal menuModalStatus={menuModalStatus} orderAllOrderData={orderAllOrderData}
                                                allOrderData={allOrderData}
                                                menuModalContentChange={menuModalContentChange}/>
                    }
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