import {useEffect} from "react";
import MenuDetailModal from "./modal/MenuDetailModal";
import MenuDetailNoSideModal from "./modal/MenuDetailNoSideModal";
import ReceiptModal from "./modal/ReceiptModal";

const KioskMainModal = ({
                            menuModalStatus,
                            menuModalContentChange,
                            changeAllOrderData,
                            allOrderData,
                            totalPrice,
                            orderStatus,
                            setOrderStatusFun
                        }) => {

    useEffect(() => {
        console.log(menuModalStatus);
    }, [menuModalStatus]);

    const ModalFun = () => {

        if (menuModalStatus.status) {

            console.log(menuModalStatus);

            switch (menuModalStatus.modalType) {
                case 'orderMenuDetail':
                    if (menuModalStatus.menu.side.length === 0) {
                        return <MenuDetailNoSideModal menuModalStatus={menuModalStatus}
                                                      changeAllOrderData={changeAllOrderData}
                                                      allOrderData={allOrderData}
                                                      menuModalContentChange={menuModalContentChange}/>
                    } else {
                        return <MenuDetailModal menuModalStatus={menuModalStatus}
                                                changeAllOrderData={changeAllOrderData}
                                                allOrderData={allOrderData}
                                                menuModalContentChange={menuModalContentChange}/>
                    }
                    break;

                case 'orderReceipt':

                    return <ReceiptModal menuModalContentChange={menuModalContentChange} allOrderData={allOrderData}
                                         orderStatus={orderStatus} setOrderStatusFun={setOrderStatusFun}
                                         totalPrice={totalPrice}/>
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