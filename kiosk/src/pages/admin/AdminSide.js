import '../../css/admin/admin-all.css';
import '../../css/admin/admin-main.css';
import '../../css/admin/adminTop.css';
import '../../css/admin/adminLogin.css';
import '../../css/all/all.css';
import '../../css/all/orderMenu.css';
import {useParams} from "react-router-dom";
import AdminMain from "./AdminMain";
import $ from "jquery";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Modal from "./Modal";

const AdminSide = ({resetData, startDate}) => {


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


    //-------------------------------------------------------------------------------------------------

    const [modalStatus, setModalStatus] = useState({
        status: false,
        param: '',
        modalType: '',
        modalTitle: '',
        modalContent: '',
        sendId: '',
        sendName: ''
    });

    const modalContentChange = (data) => {
        setModalStatus(data);
    }

    //-----------------------------------       data           ---------------------------------
    const [data, setData] = useState({
        all: [],
        sideAll: [],
        category: {
            category: [],
            side: [],
            sideCategory: []
        },
        order: [],
        sales: []
    });

    const setDataFun = async (data) => {
        console.log(data);
        setData(data);
    }

    return (
        <div className="container">
            <Modal modalStatus={modalStatus} modalContentChange={modalContentChange} data={data}
                   setDataFun={setDataFun}/>
            <div className="container M-flex-row">
                <div className="O-order-side-all">
                    <div className="O-order-Side">
                        <div className="side-up-container">
                            <div className="storeName">
                                <p className="s-font" style={{fontSize: '80px'}}>&pastel</p>
                            </div>
                        </div>
                        <div className="O-category">
                            <div className="O-category-list">
                                <div className="O-category-list2">
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name" id="menuList"
                                             onClick={() => {
                                                 navigate("/admin/menu?status=all");
                                             }}>
                                            <p className="O-category-a">메뉴 관리</p>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name" id="salesList"
                                             onClick={() => {
                                                 navigate("/admin/sales?status=sales");
                                             }}>
                                            <p className="O-category-a">매출 계산</p>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name" id="orderList"
                                             onClick={() => {
                                                 navigate("/admin/order?status=allOrder");
                                             }}>
                                            <p className="O-category-a">주문내역</p>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name" id="settingList"
                                             onClick={() => {
                                                 navigate("/admin/setting?status=setting");
                                             }}>
                                            <p className="O-category-a">일반 설정</p>
                                        </div>
                                    </div>
                                    <div className="text M-font O-category-font">
                                        <div className="O-category-name" id={'closeKiosk'}
                                             onClick={() => {
                                                 window.close();
                                             }}>
                                            <p className="O-category-a">키오스크 종료</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="admin-right-side admin-right-side-Preferences">
                    <AdminMain adminCategory={adminCategory} resetData={resetData}
                               modalContentChange={modalContentChange} data={data} startDate={startDate}
                               setDataFun={setDataFun}/>
                </div>
            </div>
        </div>
    );

}

export default AdminSide;