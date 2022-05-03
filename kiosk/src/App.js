import {Routes, Route, HashRouter} from "react-router-dom";
import KioskMain from "./pages/kiosk/KioskMain";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
    return (
        <HashRouter>
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<KioskMain></KioskMain>}/>
                    <Route path={'/admin'} element={<AdminLogin></AdminLogin>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
