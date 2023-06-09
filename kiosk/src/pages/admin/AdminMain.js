import MenuTop from "./menu/MenuTop";
import SalesTop from "./sales/SalesTop";
import OrderTop from "./order/OrderTop";
import SettingTop from "./setting/SettingTop";
import {useSearchParams, useNavigate} from "react-router-dom";
import AllMenu from "./menu/AllMenu";
import AddMenu from "./menu/AddMenu";
import SideAllMenu from "./menu/SideAllMenu";
import AddSide from "./menu/AddSide";
import AllCategory from "./menu/AllCategory";
import AddCategory from "./menu/AddCategory";
import KioskClose from "./sales/KioskClose";
import Sales from "./sales/Sales";
import AllOrder from "./order/AllOrder";
import CardOrder from "./order/CardOrder";
import MoneyOrder from "./order/MoneyOrder";
import Setting from "./setting/Setting";
import AdminLoginSession from '../../js/admin/AdminLoginSession';
import {useEffect} from "react";

const AdminMain = ({adminCategory, modalContentChange, data, setDataFun, resetData, startDate}) => {

    const navigate = useNavigate();

    const [mainParams] = useSearchParams();

    const status = mainParams.get('status');

    const result = AdminLoginSession();

    useEffect(() => {
        if (!result)
            navigate('/');
    });

    const AdminTopView = {
        menu: <MenuTop status={status} resetData={resetData}/>,
        sales: <SalesTop status={status} resetData={resetData}/>,
        order: <OrderTop status={status} resetData={resetData}/>,
        setting: <SettingTop status={status} resetData={resetData}/>
    }

    const AdminMainView = {
        all: <AllMenu modalContentChange={modalContentChange} setDataFun={setDataFun}
                      data={data}/>,
        addMenu: <AddMenu modalContentChange={modalContentChange}/>,
        sideAll: <SideAllMenu modalContentChange={modalContentChange} data={data}
                              setDataFun={setDataFun}/>,
        sideAdd: <AddSide modalContentChange={modalContentChange}/>,
        category: <AllCategory modalContentChange={modalContentChange} data={data}
                               setDataFun={setDataFun}/>,
        addCategory: <AddCategory modalContentChange={modalContentChange} data={data}
                                  setDataFun={setDataFun}/>,
        kioskClose: <KioskClose modalContentChange={modalContentChange} data={data} setDataFun={setDataFun}
                                startDate={startDate}/>,
        sales: <Sales modalContentChange={modalContentChange} data={data} setDataFun={setDataFun}/>,
        allOrder: <AllOrder modalContentChange={modalContentChange} data={data} setDataFun={setDataFun}/>,
        cardOrder: <CardOrder modalContentChange={modalContentChange} data={data} setDataFun={setDataFun}/>,
        moneyOrder: <MoneyOrder modalContentChange={modalContentChange} data={data} setDataFun={setDataFun}/>,
        setting: <Setting/>
    }

    return (
        <>
            <>
                {AdminTopView[adminCategory]}
            </>
            <>
                {AdminMainView[status]}
            </>
        </>
    );
}

export default AdminMain;