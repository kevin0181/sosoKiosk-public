import backImg from './../../img/backImg.png'
import {useNavigate} from "react-router-dom";
import CategoryList from "./side/CategoryList";
import MainMenu from "./menu/MainMenu";

const OrderMenu = ({menu, categoryList}) => {

    const navigate = useNavigate();

    const goMain = () => {
        navigate('/');
    }

    return (
        <div className="container"
             id="addMenuContainer">
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
                                        <div className="text M-font O-category-font O-category-Side">
                                            <div className="O-category-name O-click-color">
                                                <p className="O-category-a">전체</p>
                                            </div>
                                        </div>
                                        <CategoryList categoryList={categoryList}/>
                                    </div>
                                </div>
                                <div className="totalPrice-div M-flex-column M-flex-center"
                                     style={{width: '100%'}}>
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
                                <MainMenu menu={menu}/>
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