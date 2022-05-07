import {Routes, Route, HashRouter} from "react-router-dom";
import KioskMain from "./pages/kiosk/KioskMain";
import AdminLogin from "./pages/admin/AdminLogin";
import OrderMenu from "./pages/kiosk/orderMenu";
import AdminMenu from "./pages/admin/menu/AdminMenu";

function App() {
    return (
        <HashRouter>
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<KioskMain></KioskMain>}/>
                    <Route path={'/menuOrder'} element={<OrderMenu></OrderMenu>}/>
                    <Route path={'/admin'} element={<AdminLogin></AdminLogin>}/>
                    <Route path={'/admin/:main'} element={<AdminMenu></AdminMenu>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
