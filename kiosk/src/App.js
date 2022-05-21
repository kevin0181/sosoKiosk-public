import {Routes, Route, HashRouter} from "react-router-dom";
import KioskMain from "./pages/kiosk/KioskMain";
import AdminLogin from "./pages/admin/AdminLogin";
import OrderMenu from "./pages/kiosk/orderMenu";
import AdminSide from "./pages/admin/AdminSide";
import {useState} from "react";

function App() {

    const [menu, setMenu] = useState([]);

    const [categoryList, setCategoryList] = useState([]);

    const setMenuFun = (data) => {
        setMenu(data);
    }

    const setCategoryListFun = (data) => {
        setCategoryList(data);
    }

    return (
        <HashRouter>
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<KioskMain setMenuFun={setMenuFun}
                                                          setCategoryListFun={setCategoryListFun}></KioskMain>}/>
                    <Route path={'/menuOrder'}
                           element={<OrderMenu menu={menu} categoryList={categoryList}></OrderMenu>}/>
                    <Route path={'/admin'} element={<AdminLogin></AdminLogin>}/>
                    <Route path={'/admin/:adminCategory'} element={<AdminSide></AdminSide>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
