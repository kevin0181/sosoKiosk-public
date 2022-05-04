import backImg from './../../img/backImg.png'
import {useNavigate} from "react-router-dom";
import CategoryList from "./side/CategoryList";

const OrderMenu = () => {

    const navigate = useNavigate();

    const goMain = () => {
        navigate('/');
    }

    return (
        <div class="container"
             id="addMenuContainer">
            <div class="container M-flex-row">
                <div class="O-order-side-all">
                    <div class="O-order-Side">
                        <div class="side-up-container">
                            <div class="storeName">
                                <p class="M-font"
                                   style={{fontSize: '70px'}}>
                                    category</p>
                            </div>
                        </div>
                        <div class="O-category">
                            <div class="O-category-list">
                                <div
                                    style={{height: '68%'}}
                                    class="M-overlay">
                                    <div id="categoryPart"
                                         class="O-category-list2"
                                         style={{height: '100%', display: 'block'}}>
                                        <div className="text M-font O-category-font O-category-Side">
                                            <div className="O-category-name O-click-color">
                                                <p className="O-category-a">전체</p>
                                            </div>
                                        </div>
                                        <CategoryList/>
                                    </div>
                                </div>
                                <div class="totalPrice-div M-flex-column M-flex-center"
                                     style={{width: '100%'}}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="O-main">
                    <div class="O-top">
                        <div>
                            <div class="O-top-left">
                                <div style={{width: '18%'}} onClick={goMain}>
                                    <img src={backImg}
                                         alt={'뒤로가기'}
                                         id="indexBackBtn"
                                         style={{width: '100%'}}/>
                                </div>
                            </div>
                            <div class="O-top-center">
                                <div>
                                    <p class="O-font-menu-size M-font">
                                        menu</p>
                                </div>
                            </div>
                            <div class="O-top-right">
                            </div>
                        </div>
                    </div>
                    <div class="O-center O-font-center M-font">
                        <div class="O-center-menu">
                            <div
                                style={{width: '100%', height: '96%'}}
                                class="M-overlay">
                                <div class="O-flex-menu">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="O-footer">
                        <div class="O-footer-div">
                            <div class="O-footer-select-menu">
                                <div class="O-footer-select-menu-all">
                                    <div class="O-mini-select-bar w-M-overlay"
                                         style={{paddingTop: '3%'}}>
                                    </div>
                                </div>
                            </div>
                            <div class="O-footer-buy-Btn M-font O-select-font">
                                <div class="O-footer-buy-Btn-all">
                                    <div class="O-card-Btn M-width-80 M-flex-row M-flex-center"
                                         onclick="showCheckModal('card')">
                                        <p>카드결제</p>
                                    </div>
                                    <div class="O-money-Btn M-width-80 M-flex-row M-flex-center"
                                         onclick="showCheckModal('money')">
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