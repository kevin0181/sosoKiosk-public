import serverUrl from "../../config/server.json";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {moneyPayStart} from './../../../js/kiosk/money'

const ReceiptModal = ({menuModalContentChange, allOrderData, totalPrice, orderStatus, setOrderStatusFun}) => {

    const navigate = useNavigate();

    useEffect(() => {
        console.log(orderStatus);
    }, []);

    const close = () => {
        menuModalContentChange({
            status: false,
            param: '',
            modalType: '',
            modalTitle: '',
            modalContent: '',
            menu: ''
        })
    }

    const MainMenu = ({menu}) => {

        return <div className="O-pay-order-part M-flex-row" style={{margin: '10px 0px'}} id="O-pay-first"
                    key={menu.menuSq}>
            <div className="O-pay-order-card O-pay-order-card-left">
                <div className="O-pay-img">
                    <img className="O-side-img" alt={'주문 이미지'}
                         src={'http://' + serverUrl.server + menu.imgDTOList[0].imgPath + '/' + menu.imgDTOList[0].imgName}/>
                </div>
                <div className="O-pay-name M-font O-font-middle-size M-flex-column M-flex-center">
                    <p className="">{menu.menuName}</p>
                </div>
                <div className="O-pay-number M-flex-column M-flex-center">
                    <div className="M-font O-font-middle-size M-flex-column M-flex-center">
                        <p>{menu.size + '개'}</p>
                    </div>
                </div>
                <div className="O-pay-price M-flex-column M-flex-center">
                    <div className="M-font O-font-middle-size M-flex-column M-flex-center">
                        <p>{menu.menuPrice + '원'}</p>
                    </div>
                </div>
            </div>
            {
                menu.addSide.length !== 0 ? (
                    <div className="O-pay-order-card O-pay-order-card-right M-flex-column"
                         id="O-pay-right">
                        {
                            menu.addSide.map((it) => (
                                <SideMenu side={it} key={it.sideSq}/>
                            ))
                        }
                    </div>
                ) : (<></>)
            }
        </div>

    }

    const SideMenu = ({side}) => {
        return <div className="O-pay-order-card-div M-flex-row" key={side.sideSq}>
            <div className="O-pay-name M-font M-flex-column M-flex-center"
                 style={{fontSize: '30px', width: '30%'}}>
                <p className="">{side.sideName}</p>
            </div>
            <div className="O-pay-name M-font M-flex-column M-flex-center"
                 style={{fontSize: '30px', width: '10%'}}>
                <p className="">{side.sideSize + '개'}</p>
            </div>
            <div className="O-pay-number M-flex-column M-flex-center"
                 style={{width: '20%'}}>
                <div className="M-font M-flex-column M-flex-center"
                     style={{fontSize: '30px'}}>
                    <p>{side.sidePrice + '원'}</p>
                </div>
            </div>
        </div>
    }

    return (
        <div className="O-modal-back" id="checkMenuModal" style={{display: 'block'}}>
            <div className="O-modal" style={{width: '85%'}}>
                <div className="O-modal-content">
                    <div className="O-modal-header">
                        <div className="O-modal-close-Btn">
                            <div className="O-close O-close3" id="payModalCloseBtn" onClick={close}></div>
                        </div>
                        <div className="O-modal-top">
                            <div className="O-pay-modal-top-title M-font">
                                <p>주문 목록</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-pay-modal-side-order M-overlay">
                        <div
                            style={{
                                width: '100%',
                                height: '10%',
                                borderBottom: '1px solid #e5e5e5',
                                marginBottom: '10px'
                            }}
                            className="M-flex-row">
                            <div className="M-flex-row M-flex-center M-font O-font-number-size" style={{width: '50%'}}>
                                <p>메뉴</p>
                            </div>
                            <div className="M-flex-row M-flex-center M-font O-font-number-size" style={{width: '50%'}}>
                                <p>사이드</p>
                            </div>
                        </div>
                        <div className="O-side-order-part O-pay-order-part-up">
                            {
                                allOrderData.map((it) => (
                                    <MainMenu menu={it} key={it.menuSq}/>
                                ))
                            }
                        </div>
                        <div style={{width: '100%', height: '35%'}}
                             className="O-pay-totalPrice M-flex-center M-flex-row M-font O-font-middle-size">
                            <p>총 금액 : {totalPrice}원</p>
                        </div>
                    </div>
                    <div className="O-pay-modal-side-footer">
                        <div className="O-side-select-menu-part-left M-flex-row M-flex-center"></div>
                        <div className="O-side-select-part w-M-overlay">
                            <div className="O-pay-menu-part M-flex-column M-flex-center">
                                {
                                    orderStatus.payStatus === 'card' ? (
                                        <div className="O-pay-select-close M-flex-column M-flex-center"
                                             onClick={() => {
                                                 navigate("/card/pay")
                                             }}
                                             style={{
                                                 width: '50%',
                                                 height: '50%',
                                                 backgroundColor: '#eb8282'
                                             }}>
                                            <p className="M-font O-font-middle-size">결제 하기</p>
                                        </div>
                                    ) : (
                                        <div className="O-pay-select-close M-flex-column M-flex-center"
                                             onClick={() => {
                                                 moneyPayStart(orderStatus)
                                             }}
                                             style={{
                                                 width: '50%',
                                                 height: '50%',
                                                 backgroundColor: '#eb8282'
                                             }}>
                                            <p className="M-font O-font-middle-size">주문 하기</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="O-side-select-ok-part">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReceiptModal;