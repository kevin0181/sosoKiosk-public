import MenuTop from "./menu/MenuTop";
import SalesTop from "./saels/SalesTop";
import OrderTop from "./order/OrderTop";
import SettingTop from "./setting/SettingTop";
import {useSearchParams, useNavigate} from "react-router-dom";
import AllMenu from "./menu/AllMenu";
import AddMenu from "./menu/AddMenu";
import SideAllMenu from "./menu/SideAllMenu";
import AddSide from "./menu/AddSide";
import AllCategory from "./menu/AllCategory";
import AddCategory from "./menu/AddCategory";
import KioskClose from "./saels/KioskClose";
import Sales from "./saels/Sales";
import AllOrder from "./order/AllOrder";
import CardOrder from "./order/CardOrder";
import MoneyOrder from "./order/MoneyOrder";
import Setting from "./setting/Setting";
import AdminLoginSession from '../../js/admin/AdminLoginSession';
import {useEffect} from "react";
import {getMenuList} from "../../js/admin/menu/AllMenu";
import {useState} from "react";
import {getSideList} from "../../js/admin/menu/side";

const AdminMain = ({adminCategory, modalContentChange, data, setDataFun}) => {

    const navigate = useNavigate();

    const [mainParams] = useSearchParams();

    const status = mainParams.get('status');

    const result = AdminLoginSession();

    const [spinner, setSpinner] = useState(true);

    const stopSpinner = () => {
        setSpinner(false);
    }


    useEffect(() => {
        if (!result)
            navigate('/');
    });

    const AdminTopView = {
        menu: <MenuTop status={status}/>,
        sales: <SalesTop status={status}/>,
        order: <OrderTop status={status}/>,
        setting: <SettingTop status={status}/>
    }

    const AdminMainView = {
        all: <AllMenu modalContentChange={modalContentChange} spinner={spinner} setDataFun={setDataFun}
                      stopSpinner={stopSpinner}
                      data={data}/>,
        addMenu: <AddMenu modalContentChange={modalContentChange} setDataFun={setDataFun}/>,
        sideAll: <SideAllMenu modalContentChange={modalContentChange} data={data} spinner={spinner}
                              stopSpinner={stopSpinner}
                              setDataFun={setDataFun}/>,
        sideAdd: <AddSide/>,
        category: <AllCategory/>,
        addCategory: <AddCategory/>,
        kioskClose: <KioskClose/>,
        sales: <Sales/>,
        allOrder: <AllOrder/>,
        cardOrder: <CardOrder/>,
        moneyOrder: <MoneyOrder/>,
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