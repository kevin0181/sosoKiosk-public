import MenuTop from "./menu/MenuTop";
import SalesTop from "./saels/SalesTop";
import OrderTop from "./order/OrderTop";
import SettingTop from "./setting/SettingTop";

const AdminMain = ({adminCategory}) => {

    const AdminMainView = () => {
        switch (adminCategory) {
            case 'menu':
                return <MenuTop/>
                break;
            case 'sales':
                return <SalesTop/>
                break;
            case 'order':
                return <OrderTop/>
                break;
            case 'setting':
                return <SettingTop/>
                break;
        }
    }
    return (
        <AdminMainView/>
    );
}

export default AdminMain;