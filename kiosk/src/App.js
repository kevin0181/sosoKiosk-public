import {Routes, Route, HashRouter} from "react-router-dom";
import KioskMain from "./pages/kiosk/KioskMain";
import AdminLogin from "./pages/admin/AdminLogin";
import OrderMenu from "./pages/kiosk/orderMenu";
import AdminSide from "./pages/admin/AdminSide";
import {useEffect, useState} from "react";
import {getCategoryList, getMenuList} from "./js/kiosk/menu";

function App() {

    const [menu, setMenu] = useState([]);

    const [categoryList, setCategoryList] = useState([]);

    const [getListStatus, setGetListStatus] = useState(false);

    const [orderStatus, setOrderStatus] = useState('');

    const [resetAllData, setResetAllData] = useState(false);


    const resetData = async () => {
        setResetAllData(true);
    }

    const setOrderStatusFun = (data) => {
        setOrderStatus(data);
    }

    useEffect(() => {
        if (menu.length != 0 && categoryList.length != 0) {
            setGetListStatus(true);
        } else if (menu.length == 0 && categoryList.length == 0) {
            setGetListStatus(false);
        } else {
            setGetListStatus(false);
        }

    }, []);

    useEffect(() => {
        if (!getListStatus) {
            getMenuList().then(function (menu) {
                setMenuFun(menu);
                getCategoryList().then(function (category) {
                    setCategoryListFun(category);
                });
            });
        }

        if (resetAllData) {
            getMenuList().then(function (menu) {
                setMenuFun(menu);
                getCategoryList().then(function (category) {
                    setCategoryListFun(category);
                });
            });
        }

        setResetAllData(false);
    }, [getListStatus, resetAllData]);

    useEffect(() => {
        console.log(menu);
        console.log(categoryList);
    }, [categoryList, menu]);

    const setMenuFun = (data) => {
        setMenu(data);
    }

    const setCategoryListFun = (data) => {
        setCategoryList(data);
    }

    const [totalPrice, setTotalPrice] = useState(0);
    const [allOrderData, setAllOrderData] = useState([
        // menuSq: '',
        // categorySq: '',
        // menuName: '',
        // menuPrice: 0,
        // categoryDTO: {
        //     categorySq: '',
        //     categoryName: '',
        // },
        // imgDTOList: [{
        //     imgSq: '',
        //     menuSq: '',
        //     imgName: '',
        //     imgPath: '',
        //     imgDate: '',
        //     imgExtension: ''
        // }],
        // side: {
        //     sideSq: '',
        //     sideName: '',
        //     sideCategoryDTOList: [{
        //         sideCategorySq: '',
        //         sideSq: '',
        //         sideCategoryName: '',
        //     }]
        // },
        // addSide: [{
        //     sideSq: '',
        //     sideName: '',
        //     sidePrice: 0,
        //     sideSize: 0
        // }],
        // size: 0
    ]);

    useEffect(() => {

        console.log(allOrderData);

    }, [allOrderData]);

    const setOrderData = (data) => {
        setAllOrderData(data);
    }

    return (
        <HashRouter>
            <div className="App">
                <Routes>
                    <Route path={'/'}
                           element={<KioskMain setMenuFun={setMenuFun} setOrderStatusFun={setOrderStatusFun}
                                               getListStatus={getListStatus}
                                               setCategoryListFun={setCategoryListFun}></KioskMain>}/>
                    <Route path={'/menuOrder'}
                           element={<OrderMenu menu={menu} categoryList={categoryList} setMenuFun={setMenuFun}
                                               allOrderData={allOrderData} setOrderData={setOrderData}
                                               orderStatus={orderStatus}></OrderMenu>}/>
                    <Route path={'/admin'} element={<AdminLogin></AdminLogin>}/>
                    <Route path={'/admin/:adminCategory'} element={<AdminSide resetData={resetData}></AdminSide>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
