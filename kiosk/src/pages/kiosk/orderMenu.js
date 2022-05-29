import backImg from './../../img/backImg.png'
import {useNavigate} from "react-router-dom";
import CategoryList from "./side/CategoryList";
import MainMenu from "./menu/MainMenu";
import {useEffect, useState} from "react";
import KioskMainModal from "./KioskMainModal";

const OrderMenu = ({menu, categoryList, orderStatus, setMenuFun}) => {

    const [totalPrice, setTotalPrice] = useState(0);

    const [allOrderData, setAllOrderData] = useState([{
        menuSq: '',
        categorySq: '',
        menuName: '',
        menuPrice: 0,
        categoryDTO: {
            categorySq: '',
            categoryName: '',
        },
        imgDTOList: [{
            imgSq: '',
            menuSq: '',
            imgName: '',
            imgPath: '',
            imgDate: '',
            imgExtension: ''
        }],
        side: {
            sideSq: '',
            sideName: '',
            sideCategoryDTOList: [{
                sideCategorySq: '',
                sideSq: '',
                sideCategoryName: '',
            }]
        },
        addSide: [{
            sideSq: '',
            sideName: '',
            sidePrice: 0,
            sideSize: 0
        }],
        size: 0
    }]);

    const orderAllOrderData = (data) => {
        setAllOrderData(data);
    }

    useEffect(() => {

        allOrderData.map((it) => {
            setTotalPrice(totalPrice + (it.size * it.menuPrice));
            it.addSide.map((it) => {
                setTotalPrice(totalPrice + (it.sideSize * it.sidePrice));
            });
        });

    }, [allOrderData]);

    const navigate = useNavigate();

    const goMain = () => {
        navigate('/');
    }

    const [menuModalStatus, setMenuModalStatus] = useState({
        status: false,
        param: '',
        modalType: '',
        modalTitle: '',
        modalContent: '',
        menu: ''
    });

    const menuModalContentChange = (data) => {
        setMenuModalStatus(data);
    }

    return (
        <div className="container"
             id="addMenuContainer">
            <KioskMainModal menuModalStatus={menuModalStatus} menuModalContentChange={menuModalContentChange}
                            allOrderData={allOrderData}
                            orderAllOrderData={orderAllOrderData}
                            menu={menu} categoryList={categoryList}/>
            <div className="container M-flex-row">
                <div className="O-order-side-all">
                    <div className="O-order-Side">
                        <div className="side-up-container">
                            <div className="storeName">
                                <p className="M-font"
                                   style={{fontSize: '70px'}}>
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
                                         style={{height: '100%', display: 'block'}}>
                                        <CategoryList categoryList={categoryList}/>
                                    </div>
                                </div>
                                <div className="totalPrice-div M-flex-column M-flex-center"
                                     style={{width: '100%'}}>
                                    <p className={'M-font O-font-middle-size'}>총 금액 : {totalPrice}</p>
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
                                    <p className="O-font-menu-size M-font">
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
                                style={{width: '100%', height: '96%'}}
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
                                    <div className="O-mini-select-bar w-M-overlay"
                                         style={{paddingTop: '3%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="O-footer-buy-Btn M-font O-select-font">
                                <div className="O-footer-buy-Btn-all">
                                    <div className="O-card-Btn M-width-80 M-flex-row M-flex-center">
                                        <p>카드결제</p>
                                    </div>
                                    <div className="O-money-Btn M-width-80 M-flex-row M-flex-center">
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