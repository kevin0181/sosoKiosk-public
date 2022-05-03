import {BrowserRouter, Routes, Route} from "react-router-dom";
import KioskMain from "./pages/kiosk/KioskMain";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<KioskMain></KioskMain>}/>
                    <Route path={'/admin'} element={<AdminLogin></AdminLogin>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
