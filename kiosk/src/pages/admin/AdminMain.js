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

    useEffect(() => {
        if (!result)
            navigate('/');
    });

    const AdminTopView = () => {
        switch (adminCategory) {
            case 'menu':
                return <MenuTop status={status}/>
            case 'sales':
                return <SalesTop status={status}/>
            case 'order':
                return <OrderTop status={status}/>
            case 'setting':
                return <SettingTop status={status}/>
            default:
        }
    }

    useEffect(() => {
        setSpinner(true);
        switch (status) {
            case 'all':
                getMenuList().then(function (res) {
                    setDataFun(res);
                    setSpinner(false);
                });
                break;
            case 'sideAll':
                getSideList().then(function (res) {
                    setDataFun(res);
                    setSpinner(false);
                });
                break;
        }
    }, [status]);

    const AdminMainView = () => {
        switch (status) {
            case 'all':
                return <AllMenu modalContentChange={modalContentChange} spinner={spinner} data={data}/>
            case 'addMenu':
                return <AddMenu modalContentChange={modalContentChange} setDataFun={setDataFun}/>
            case 'sideAll':
                return <SideAllMenu modalContentChange={modalContentChange} data={data} spinner={spinner}/>
            case 'sideAdd':
                return <AddSide/>
            case 'category':
                return <AllCategory/>
            case 'addCategory':
                return <AddCategory/>
            case 'kioskClose':
                return <KioskClose/>
            case 'sales':
                return <Sales/>
            case 'allOrder':
                return <AllOrder/>
            case 'cardOrder':
                return <CardOrder/>
            case 'moneyOrder':
                return <MoneyOrder/>
            case 'setting':
                return <Setting/>
            default:
        }
    }
    return (
        <>
            <AdminTopView/>
            <AdminMainView/>
        </>
    );
}

export default AdminMain;