import '../../css/admin/admin-all.css';
import '../../css/admin/admin-main.css';
import '../../css/admin/adminTop.css';
import '../../css/admin/adminLogin.css';
import '../../css/all/all.css';
import '../../css/all/orderMenu.css';
import {useParams} from "react-router-dom";
import AdminMain from "./AdminMain";
import $ from "jquery";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const AdminSide = () => {

    const navigate = useNavigate();

    const {adminCategory} = useParams();

    useEffect(() => {

        $('.O-category-name').removeClass('O-click-color');

        switch (adminCategory) {
            case 'menu':
                $('#menuList').addClass('O-click-color');
                break;
            case 'sales':
                $('#salesList').addClass('O-click-color');
                break;
            case 'order':
                $('#orderList').addClass('O-click-color');
                break;
            case 'setting':
                $('#settingList').addClass('O-click-color');
                break;
            default:
        }
    }, [adminCategory]);

    return (
        <div className="container">
            <div className="container M-flex-row">
                <div className="O-order-side-all">
                    <div className="O-order-Side">
                        <div className="side-up-container">
                            <div className="storeName">
                                <p className="M-font" style={{fontSize: '80px'}}>&pastel</p>
                            </div>
                        </div>
                        <div className="O-category">
                            <div className="O-category-list">
                                <div className="O-category-list2">
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name" id="menuList"
                                             onClick={() => {
                                                 navigate("/admin/menu");
                                             }}>
                                            <p className="O-category-a">메뉴 관리</p>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name" id="salesList"
                                             onClick={() => {
                                                 navigate("/admin/sales");
                                             }}>
                                            <p className="O-category-a">매출 계산</p>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name" id="orderList"
                                             onClick={() => {
                                                 navigate("/admin/order");
                                             }}>
                                            <p className="O-category-a">주문내역</p>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name" id="settingList"
                                             onClick={() => {
                                                 navigate("/admin/setting");
                                             }}>
                                            <p className="O-category-a">일반 설정</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="admin-right-side admin-right-side-Preferences">
                    <AdminMain adminCategory={adminCategory}/>
                </div>
            </div>
        </div>
    );

}

export default AdminSide;