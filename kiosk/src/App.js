import {Routes, Route, HashRouter} from "react-router-dom";
import KioskMain from "./pages/kiosk/KioskMain";
import AdminLogin from "./pages/admin/AdminLogin";
import OrderMenu from "./pages/kiosk/orderMenu";

function App() {
    return (
        <HashRouter>
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<KioskMain></KioskMain>}/>
                    <Route path={'/menuOrder'} element={<OrderMenu></OrderMenu>}/>
                    <Route path={'/admin'} element={<AdminLogin></AdminLogin>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
