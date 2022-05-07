import MenuTop from "./menu/MenuTop";
import SalesTop from "./saels/SalesTop";
import OrderTop from "./order/OrderTop";
import SettingTop from "./setting/SettingTop";

const AdminMain = ({adminCategory}) => {

    const AdminMainView = () => {
        switch (adminCategory) {
            case 'menu':
                return <MenuTop/>
            case 'sales':
                return <SalesTop/>
            case 'order':
                return <OrderTop/>
            case 'setting':
                return <SettingTop/>
            default:
        }
    }
    return (
        <AdminMainView/>
    );
}

export default AdminMain;