import {useEffect} from "react";
import MenuDetailModal from "./modal/MenuDetailModal";
import MenuDetailNoSideModal from "./modal/MenuDetailNoSideModal";
import ReceiptModal from "./modal/ReceiptModal";
import QuestReceipt from "./modal/QuestReceipt";

const KioskMainModal = ({
                            menuModalStatus,
                            menuModalContentChange,
                            changeAllOrderData,
                            allOrderData,
                            totalPrice,
                            orderStatus,
                            setOrderStatusFun,
                            connectWebSocket,
                            orderNumber,
                            PlusOrderNumber
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
                                         connectWebSocket={connectWebSocket}
                                         totalPrice={totalPrice}/>
                    break;

                case 'checkReceipt':
                    return <QuestReceipt menuModalContentChange={menuModalContentChange} orderStatus={orderStatus}
                                         PlusOrderNumber={PlusOrderNumber}
                                         orderNumber={orderNumber}/>
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