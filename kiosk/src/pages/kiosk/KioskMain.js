import innerImg from './../../img/innerImg.png';
import outerImg from './../../img/outerImg.png';
import {useNavigate} from 'react-router-dom';
import './../../css/all/all.css';
import './../../css/all/font.css';
import './../../css/all/orderMenu.css';
import {useEffect} from "react";
import {getCategoryList, getMenuList} from "../../js/kiosk/menu";


const KioskMain = ({setOrderStatusFun}) => {

    const navigate = useNavigate();
    let adminClickCount = 0;

    const goAdmin = () => {
        if (adminClickCount === 4) {
            adminClickCount = 0;
            navigate('/admin');
        } else {
            adminClickCount++;
        }
    }

    const goOrderMenuPage = (status) => {
        setOrderStatusFun(status);
        navigate('/menuOrder');
    }

    return (
        <div className="container">
            <div id="" className="container M-flex-row">
                <div className="O-order-side-all">
                    <div id="adminSideDiv" className="M-width-5 M-height-5 M-dis-inline-block adminSideDiv"
                         onClick={goAdmin}>
                    </div>
                    <div className="O-order-Side">
                        <div className="side-up-container">
                            <div className="storeName">
                                <p className="M-font" style={{fontSize: '80px'}}>&pastel</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="side-img" className="top-index-img">
                    <div className="div-L-index">
                        <div className="inner" onClick={(e) => {
                            goOrderMenuPage('inner')
                        }}>
                            <div className="img-inner-outer M-flex-column M-flex-center">
                                <img src={innerImg} alt={'매장 이미지'} className="M-width-80 M-height-80"/>
                            </div>
                            <div>
                                <p className="text-inner-outer M-font">매장에서 먹기</p>
                            </div>
                        </div>
                    </div>
                    <div className="div-R-index">
                        <div className="outer" onClick={(e) => {
                            goOrderMenuPage('outer')
                        }}>
                            <div className="img-inner-outer M-flex-column M-flex-center">
                                <img src={outerImg} alt={'포장 이미지'} className="M-width-80 M-height-80"/>
                            </div>
                            <div>
                                <p className="text-inner-outer M-font">포장하기</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KioskMain;