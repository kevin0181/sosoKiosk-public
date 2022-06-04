import {useEffect, useState} from "react";
import $ from 'jquery';
import serverUrl from "../../../config/server.json";
import {afterLongReceipt} from "../../../../js/admin/order/order";

const OrderDetailModal = ({modalStatus, modalContentChange}) => {

    const close = () => {
        modalContentChange({
            status: false,
            param: '',
            modalType: '',
            modalTitle: '',
            modalContent: '',
        })
    }

    const removeCss = (id) => {
        $('.O-category-box-side').removeClass('O-orderDetail-select-color');
        $('.' + id).addClass('O-orderDetail-select-color');
    }

    const [orderDetail, setOrderDetail] = useState({
        status: 'info',
        data: []
    });

    useEffect(() => {
        setOrderDetail({
            ...orderDetail,
            ['data']: modalStatus.data
        })
    }, []);

    useEffect(() => {
        console.log(orderDetail);
    }, [orderDetail]);

    const changeSelect = (data) => {
        setOrderDetail({
            ...orderDetail,
            ['status']: data,
        })
    }

    const MainMenu = ({menu}) => {
        console.log(menu);
        // let menu = menuEntity.menuEntity;
        // console.log(menu);
        return <div className="O-pay-order-part M-flex-row" style={{margin: '10px 0px'}} id="O-pay-first"
                    key={menu.menuEntity.menuSq}>
            <div className="O-pay-order-card O-pay-order-card-left">
                <div className="O-pay-img">
                    <img className="O-side-img" alt={'주문 이미지'}
                         src={'http://' + serverUrl.server + menu.menuEntity.imgDTOList[0].imgPath + '/' + menu.menuEntity.imgDTOList[0].imgName}/>
                </div>
                <div className="O-pay-name M-font O-font-middle-size M-flex-column M-flex-center">
                    <p className="">{menu.menuEntity.menuName}</p>
                </div>
                <div className="O-pay-number M-flex-column M-flex-center">
                    <div className="M-font O-font-middle-size M-flex-column M-flex-center">
                        <p>{menu.menuEntity.size + '개'}</p>
                    </div>
                </div>
                <div className="O-pay-price M-flex-column M-flex-center">
                    <div className="M-font O-font-middle-size M-flex-column M-flex-center">
                        <p>{menu.menuEntity.menuPrice + '원'}</p>
                    </div>
                </div>
            </div>
            {
                menu.orderDetailSideEntityList.length !== 0 ? (
                    <div className="O-pay-order-card O-pay-order-card-right M-flex-column"
                         id="O-pay-right">
                        {
                            menu.orderDetailSideEntityList.map((it) => (
                                <SideMenu side={it} key={it.sideSq}/>
                            ))
                        }
                    </div>
                ) : (<></>)
            }
        </div>
    }

    const SideMenu = ({side}) => {
        console.log(side);
        return <div className="O-pay-order-card-div M-flex-row" key={side.sideSq}>
            <div className="O-pay-name M-font M-flex-column M-flex-center"
                 style={{fontSize: '30px', width: '30%'}}>
                <p className="">{side.orderSideName}</p>
            </div>
            <div className="O-pay-name M-font M-flex-column M-flex-center"
                 style={{fontSize: '30px', width: '10%'}}>
                <p className="">{side.orderSideSize + '개'}</p>
            </div>
            <div className="O-pay-number M-flex-column M-flex-center"
                 style={{width: '20%'}}>
                <div className="M-font M-flex-column M-flex-center"
                     style={{fontSize: '30px'}}>
                    <p>{side.orderSidePrice + '원'}</p>
                </div>
            </div>
        </div>
    }

    return (
        <div className="O-modal-back menu-detail-modal" id="orderInfoModal">
            <div className="O-modal">
                <div className="O-modal-content">
                    <div className="O-modal-header">
                        <div className="O-modal-close-Btn">
                            <div className="O-close O-close3" id="orderInfoModalCloseBtn" onClick={close}></div>
                        </div>
                        <div className="O-modal-top">
                            <div className="O-modal-top-title M-font">
                                <p>주문 상세</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-category-bar" id="orderInfoCategoryBar">
                        <div className="O-category-part" id="orderPart">
                            <div
                                className="M-font O-font-mini-size O-category-box O-category-box-side orderDetailInfo O-orderDetail-select-color"
                                onClick={() => {
                                    removeCss('orderDetailInfo');
                                    changeSelect('info');
                                }}>
                                <p>주문 정보</p>
                            </div>
                        </div>
                        <div className="O-category-part" id="menuPart">
                            <div className="M-font O-font-mini-size O-category-box orderDetailMenu O-category-box-side"
                                 onClick={() => {
                                     removeCss('orderDetailMenu');
                                     changeSelect('menu');
                                 }}>
                                <p>주문 메뉴</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-order M-overlay" id="orderInfoBody" style={{padding: '5px 20px'}}>
                        {
                            orderDetail.status === 'info' ? (<div className="M-container" style={{padding: '5px 50px'}}>
                                <div className="M-font O-font-middle-size M-flex-column M-flex-center"
                                     style={{width: '100%', height: '100%'}}>
                                    <div className="M-flex-row" style={{height: '15%', width: '100%'}}>
                                        <div className="M-container" style={{flex: '1', textAlign: 'center'}}>
                                            <p>주문 번호 : </p>
                                        </div>
                                        <div className="M-container" style={{flex: '1'}}>
                                            <p>{orderDetail.data.orderTelegramNo}</p>
                                        </div>
                                    </div>
                                    <div className="M-flex-row" style={{height: '15%', width: '100%'}}>
                                        <div className="M-container" style={{flex: '1', textAlign: 'center'}}>
                                            <p>주문 날짜 : </p>
                                        </div>
                                        <div className="M-container" style={{flex: '1'}}>
                                            <p>{orderDetail.data.orderDate + '  ' + orderDetail.data.orderDateTime}</p>
                                        </div>
                                    </div>
                                    <div className="M-flex-row" style={{height: '15%', width: '100%'}}>
                                        <div className="M-container" style={{flex: '1', textAlign: 'center'}}>
                                            <p>총 금액 : </p>
                                        </div>
                                        <div className="M-container" style={{flex: '1'}}>
                                            <p>{orderDetail.data.orderTotalPrice + '원'}</p>
                                        </div>
                                    </div>
                                    <div className="M-flex-row" style={{height: '15%', width: '100%'}}>
                                        <div className="M-container" style={{flex: '1', textAlign: 'center'}}>
                                            <p>장소 : </p>
                                        </div>
                                        <div className="M-container" style={{flex: '1'}}>
                                            {
                                                orderDetail.data.orderPlace === 'inner' ? (<p>매장</p>) : (<p>포장</p>)
                                            }
                                        </div>
                                    </div>
                                    <div className="M-flex-row" style={{height: '15%', width: '100%'}}>
                                        <div className="M-container" style={{flex: '1', textAlign: 'center'}}>
                                            <p>결제 방식 : </p>
                                        </div>
                                        <div className="M-container" style={{flex: '1'}}>
                                            <p>{orderDetail.data.orderPayStatus}</p>
                                        </div>
                                    </div>
                                    <div className="M-flex-row" style={{height: '15%', width: '100%'}}>
                                        <div className="M-container" style={{flex: '1', textAlign: 'center'}}>
                                            <p>승인번호(카드결제) : </p>
                                        </div>
                                        <div className="M-container" style={{flex: '1'}}>
                                            <p>{orderDetail.data.orderApprovalNo}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>) : (
                                <div className="O-pay-modal-side-order M-overlay" style={{height: 'auto'}}>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '10%',
                                            borderBottom: '1px solid #e5e5e5',
                                            marginBottom: '10px'
                                        }}
                                        className="M-flex-row">
                                        <div className="M-flex-row M-flex-center M-font O-font-number-size"
                                             style={{width: '50%'}}>
                                            <p>메뉴</p>
                                        </div>
                                        <div className="M-flex-row M-flex-center M-font O-font-number-size"
                                             style={{width: '50%'}}>
                                            <p>사이드</p>
                                        </div>
                                    </div>
                                    <div className="O-side-order-part O-pay-order-part-up">
                                        {
                                            orderDetail.data.orderDetailEntityList.map((it) => (
                                                <MainMenu menu={it} key={it.menuSq}/>
                                            ))
                                        }
                                    </div>
                                    <div style={{width: '100%', height: '35%'}}
                                         className="O-pay-totalPrice M-flex-center M-flex-row M-font O-font-middle-size">
                                        <p>총 금액 : {orderDetail.data.orderTotalPrice}원</p>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                    <div className="O-modal-side-footer" style={{justifyContent: 'flex-end'}}>
                        <div className="O-side-select-ok-part" id="orderDetailModalButton">
                            <div className="O-side-select-close" style={{backgroundColor: '#f79d9d'}} onClick={() => {
                                afterLongReceipt(orderDetail.data);
                            }}>
                                <p className="M-font O-font-middle-size">영수증 출력하기</p>
                            </div>
                            <div className="O-side-select-close">
                                <p className="M-font O-font-middle-size" onClick={close}>닫기</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default OrderDetailModal;