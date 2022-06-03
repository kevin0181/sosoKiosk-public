import {useEffect, useState} from "react";
import $ from 'jquery';

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
                                <></>
                            )
                        }

                    </div>
                    <div className="O-modal-side-footer" style={{justifyContent: 'flex-end'}}>
                        <div className="O-side-select-ok-part" id="orderDetailModalButton">
                            <div className="O-side-select-close" style={{backgroundColor: '#f79d9d'}}>
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