import {useEffect} from "react";
import MenuDetailModal from "./modal/MenuDetailModal";
import MenuDetailNoSideModal from "./modal/MenuDetailNoSideModal";
import ReceiptModal from "./modal/ReceiptModal";
import QuestReceipt from "./modal/QuestReceipt";
import OrderSuccessAfterTimeOutModal from "./modal/OrderSuccessAfterTimeOutModal";
import MainTotalModal from "./modal/MainTotalModal";
import CardPayModal from "./modal/CardPayModal";
import LoadingModal from "./modal/LoadingModal";

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
                            PlusOrderNumber,
                            setAllOrderData
                        }) => {

    const ModalFun = () => {

        if (menuModalStatus.status) {

            switch (menuModalStatus.modalType) {
                case 'orderMenuDetail':
                    // if (menuModalStatus.menu.side.length === 0) {
                    return <MenuDetailNoSideModal menuModalStatus={menuModalStatus}
                                                  changeAllOrderData={changeAllOrderData}
                                                  allOrderData={allOrderData}
                                                  menuModalContentChange={menuModalContentChange}/>
                    // } else {
                    //     return <MenuDetailModal menuModalStatus={menuModalStatus}
                    //                             changeAllOrderData={changeAllOrderData}
                    //                             allOrderData={allOrderData}
                    //                             menuModalContentChange={menuModalContentChange}/>
                    // }
                    break;

                case 'orderReceipt':
                    return <ReceiptModal menuModalContentChange={menuModalContentChange} allOrderData={allOrderData}
                                         orderStatus={orderStatus} setOrderStatusFun={setOrderStatusFun}
                                         connectWebSocket={connectWebSocket}
                                         totalPrice={totalPrice}/>
                    break;

                case 'checkReceipt':
                    return <QuestReceipt menuModalContentChange={menuModalContentChange} orderStatus={orderStatus}
                                         PlusOrderNumber={PlusOrderNumber} menuModalStatus={menuModalStatus}
                                         orderNumber={orderNumber}/>
                    break;
                case 'orderSuccessAndGoMainPage':
                    return <OrderSuccessAfterTimeOutModal menuModalContentChange={menuModalContentChange}
                                                          setAllOrderData={setAllOrderData}/>
                    break;
                case 'kioskTotalMessage':
                    return <MainTotalModal menuModalContentChange={menuModalContentChange}
                                           menuModalStatus={menuModalStatus} setAllOrderData={setAllOrderData}/>
                    break;

                case 'showCardGif':
                    return <CardPayModal orderStatus={orderStatus} totalPrice={totalPrice}
                                         menuModalContentChange={menuModalContentChange}/>
                    break;
                case 'viewLoading':
                    return <LoadingModal/>
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