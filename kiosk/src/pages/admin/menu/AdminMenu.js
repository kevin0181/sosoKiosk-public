import './../../../css/admin/admin-all.css';
import './../../../css/admin/admin-main.css';
import './../../../css/admin/adminTop.css';
import './../../../css/admin/adminLogin.css';
import './../../../css/all/all.css';

const AdminMenu = () => {

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
                                        <div className="O-category-name"
                                             onClick="menu()">
                                            <a className="O-category-a">메뉴 관리</a>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name"
                                             onClick="salesPage()">
                                            <a className="O-category-a">매출 계산</a>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name"
                                             onClick="orderListPage()">
                                            <a className="O-category-a">주문내역</a>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name"
                                             onClick="settingIndexPage()">
                                            <a className="O-category-a">일반 설정</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="admin-right-side admin-right-side-Preferences">
                </div>
            </div>
        </div>
    );

}

export default AdminMenu;