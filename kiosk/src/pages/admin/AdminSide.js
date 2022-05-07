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


const AdminSide = () => {

    const {adminCategory} = useParams();

    useEffect(() => {

        if (adminCategory === 'menu') {
            console.log(adminCategory);
            $('#MenuList').addClass('O-click-color');
        }

    });

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
                                        <div className="O-category-name" id="MenuList"
                                             onClick="menu()">
                                            <p className="O-category-a">메뉴 관리</p>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name"
                                             onClick="salesPage()">
                                            <p className="O-category-a">매출 계산</p>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name"
                                             onClick="orderListPage()">
                                            <p className="O-category-a">주문내역</p>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name"
                                             onClick="settingIndexPage()">
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