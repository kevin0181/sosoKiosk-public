import backImg from './../../img/backImg.png'
import {useNavigate} from "react-router-dom";
import CategoryList from "./side/CategoryList";
import MainMenu from "./menu/MainMenu";
import {useEffect, useState} from "react";
import KioskMainModal from "./KioskMainModal";
import serverUrl from "../config/server.json";
import selectMenuStartSound from "./../../voice/메뉴를 선택해주세요.wav";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import serverSocket from "../config/serverSocket.json";

const OrderMenu = ({
                       menu,
                       categoryList,
                       allOrderData,
                       setOrderData,
                       totalPrice,
                       orderStatus,
                       setOrderStatusFun,
                       connectWebSocket,
                       orderNumber,
                       PlusOrderNumber,
                       menuModalStatus,
                       menuModalContentChange
                   }) => {

    const navigate = useNavigate();

    useEffect(()=>{

        let moneyStompClient;

        moneyStompClient = Stomp.over(new SockJS(serverSocket.serverSocket));

        moneyStompClient.connect({}, function (frame) {
                moneyStompClient.send("/order/kiosk", {}, JSON.stringify({
                    "beforeCheck": "kiosk"
                }));
        });
    },[]);

    useEffect(() => {
        selectMenuVoice();
    }, []);

    const selectMenuVoice = () => {
        let audio = new Audio(selectMenuStartSound);
        audio.play();
    }

    const setAllOrderData = async (data) => {
        setOrderData(data);
    }

    const changeAllOrderData = (data) => {

        if (data.size === 0) {  //메인 메뉴 사이즈가 0인지 체크

            let checkZeroMenu = allOrderData.filter((it) => it.menuSq !== data.menuSq);

            setAllOrderData(
                checkZeroMenu
            );

        } else {

            let getSameMenuData = allOrderData.filter((it) => it.menuSq === data.menuSq);

            if (getSameMenuData.length !== 0) {
                getSameMenuData[0].size = data.size;
                getSameMenuData[0].addSide = data.addSide;
                setAllOrderData([
                    ...allOrderData,
                ]);
                return false;
            }

            setAllOrderData([
                ...allOrderData,
                data
            ]);

        }

    }

    const deleteSelectMainMenu = (menuSq) => {
        let deleteMenu = allOrderData.filter((it) => it.menuSq !== menuSq);
        setAllOrderData(
            deleteMenu
        );
    }

    const goMain = () => {
        setAllOrderData([]).then(function () {
            navigate('/');
        })
    }

    const reOrderDetailMenuClick = (menuSq) => {
        let thisData = menu.filter((it) => it.menuSq === menuSq);

        menuModalContentChange({
            status: true,
            param: '',
            modalType: 'orderMenuDetail',
            modalTitle: thisData[0].menuName + ' 상세 보기',
            modalContent: '',
            menu: thisData[0]
        });
    }

    return (
        <div className="container"
             id="addMenuContainer">
            <KioskMainModal menuModalStatus={menuModalStatus} menuModalContentChange={menuModalContentChange}
                            allOrderData={allOrderData} totalPrice={totalPrice} orderStatus={orderStatus}
                            setOrderStatusFun={setOrderStatusFun} connectWebSocket={connectWebSocket}
                            setAllOrderData={setAllOrderData}
                            orderNumber={orderNumber} PlusOrderNumber={PlusOrderNumber}
                            changeAllOrderData={changeAllOrderData}/>
            <div className="container M-flex-row">
                <div className="O-order-side-all">
                    <div className="O-order-Side">
                        <div className="side-up-container">
                            <div className="storeName">
                                <p className="D-font"
                                   style={{fontSize: '50px'}}>
                                    category</p>
                            </div>
                        </div>
                        <div className="O-category">
                            <div className="O-category-list">
                                <div
                                    style={{height: '68%'}}
                                    className="M-overlay">
                                    <div id="categoryPart"
                                         className="O-category-list2"
                                         style={{height: '100%', display: 'block', fontSize: '20px'}}>
                                        <CategoryList categoryList={categoryList}/>
                                    </div>
                                </div>
                                <div className="totalPrice-div M-flex-column M-flex-center"
                                     style={{width: '100%'}}>
                                    <p className={'D-font'} style={{fontSize:'29px'}}>총 금액 : {totalPrice}원</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="O-main">
                    <div className="O-top">
                        <div>
                            <div className="O-top-left">
                                <div style={{width: '18%'}} onClick={goMain}>
                                    <img src={backImg}
                                         alt={'뒤로가기'}
                                         id="indexBackBtn"
                                         style={{width: '100%'}}/>
                                </div>
                            </div>
                            <div className="O-top-center">
                                <div>
                                    <p className="D-font" style={{fontSize: '50px'}}>
                                        menu</p>
                                </div>
                            </div>
                            <div className="O-top-right">
                            </div>
                        </div>
                    </div>
                    <div className="O-center O-font-center M-font">
                        <div className="O-center-menu">
                            <div
                                style={{width: '100%', height: '100%'}}
                                className="M-overlay">
                                <MainMenu menu={menu}
                                          menuModalContentChange={menuModalContentChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="O-footer">
                        <div className="O-footer-div">
                            <div className="O-footer-select-menu">
                                <div className="O-footer-select-menu-all">
                                    <div className="O-mini-select-bar w-M-overlay">
                                        {
                                            allOrderData.map((it) => (
                                                <div className="O-select-mini-card" key={it.menuSq}>
                                                    <div className="O-select-mini-number">
                                                        <p className="D-font" style={{fontSize: '25px'}}>{it.size}</p>
                                                    </div>
                                                    <div className="O-select-mini-close-Btn">
                                                        <div className="O-close O-close2"
                                                             onClick={() => {
                                                                 deleteSelectMainMenu(it.menuSq)
                                                             }}></div>
                                                    </div>
                                                    <div className="O-mini-card-selector">
                                                        <div className="O-mini-card-header-img" onClick={() => {
                                                            reOrderDetailMenuClick(it.menuSq);
                                                        }}>
                                                            <img className="O-mini-img" alt={'선택한 이미지'}
                                                                 src={'http://' + serverUrl.server + it.imgDTOList[0].imgPath
                                                                     + '/' + it.imgDTOList[0].imgName}/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="O-mini-card-body-content">
                                                            <p className="D-font"
                                                               style={{fontSize: '15px'}}>{it.menuName}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="O-footer-buy-Btn D-font O-select-font">
                                <div className="O-footer-buy-Btn-all">
                                    <div className="O-card-Btn M-width-80 M-flex-row M-flex-center"
                                         style={{fontSize: '30px', height: '40%'}}
                                         onClick={() => {
                                             if (allOrderData.length === 0) {
                                                 //메뉴 선택을 안함
                                                 return false;
                                             }
                                             orderStatus.payStatus = 'card'
                                             orderStatus.totalPrice = totalPrice
                                             orderStatus.orderMenu = allOrderData
                                             setOrderStatusFun({
                                                 ...orderStatus
                                             }).then(function () {
                                                 menuModalContentChange({
                                                     status: true,
                                                     param: '',
                                                     modalType: 'orderReceipt',
                                                     modalTitle: '',
                                                     modalContent: '',
                                                     menu: '',
                                                 });
                                             })
                                         }}>
                                        <p>카드결제</p>
                                    </div>
                                    <div className="O-money-Btn M-width-80 M-flex-row M-flex-center"
                                         style={{fontSize: '30px', height: '40%'}}
                                         onClick={() => {
                                             if (allOrderData.length === 0) {
                                                 //메뉴 선택을 안함
                                                 return false;
                                             }
                                             orderStatus.payStatus = 'money'
                                             orderStatus.totalPrice = totalPrice
                                             orderStatus.orderMenu = allOrderData
                                             setOrderStatusFun({
                                                 ...orderStatus
                                             }).then(function () {
                                                 menuModalContentChange({
                                                     status: true,
                                                     param: '',
                                                     modalType: 'orderReceipt',
                                                     modalTitle: '',
                                                     modalContent: '',
                                                     menu: '',
                                                 });
                                             })
                                         }}>
                                        <p>현금결제</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderMenu;