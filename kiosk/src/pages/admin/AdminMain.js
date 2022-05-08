import MenuTop from "./menu/MenuTop";
import SalesTop from "./saels/SalesTop";
import OrderTop from "./order/OrderTop";
import SettingTop from "./setting/SettingTop";
import {useSearchParams} from "react-router-dom";
import AllMenu from "./menu/AllMenu";
import AddMenu from "./menu/AddMenu";
import SideAllMenu from "./menu/SideAllMenu";
import AddSide from "./menu/AddSide";
import AllCategory from "./menu/AllCategory";
import AddCategory from "./menu/AddCategory";
import KioskClose from "./saels/KioskClose";
import Sales from "./saels/Sales";
import $ from "jquery";
import AllOrder from "./order/AllOrder";
import CardOrder from "./order/CardOrder";
import MoneyOrder from "./order/MoneyOrder";

const AdminMain = ({adminCategory}) => {

    const [mainParams] = useSearchParams();

    const status = mainParams.get('status');

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
    const AdminMainView = () => {
        switch (status) {
            case 'all':
                return <AllMenu/>
            case 'addMenu':
                return <AddMenu/>
            case 'sideAll':
                return <SideAllMenu/>
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