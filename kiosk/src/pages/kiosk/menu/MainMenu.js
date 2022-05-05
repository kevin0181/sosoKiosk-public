import {useState, useEffect} from "react";
import axios from "axios";
import serverUrl from "../../config/server.json";

const MainMenu = () => {


    const [menu, setMenu] = useState([]);

    const getMenuList = () => {
        const response = axios.post('http://' + serverUrl.server + '/kiosk/category/get/categorySq', null, {
            params: {
                categorySq: '0'
            }
        });
        response.then(function (res) {
            setMenu(res.data);
        });
    }

    useEffect(() => {
        getMenuList();
    }, [setMenu]);

    console.log(menu);

    return (
        <div className="O-flex-menu">
            {menu.map((it) => (
                <div className="O-card">
                    <div className="O-card-all">
                        <div className="O-card-header">
                            <div className="O-card-header-img">
                                <img className="O-card-header-img-img" alt={'메뉴'}
                                     src={'http://' + serverUrl.server + it.imgDTOList[0].imgPath + '/' + it.imgDTOList[0].imgName}/>
                            </div>
                        </div>
                        <div className="O-card-body">
                            <div className="O-card-body-top">
                                <p className="O-menu-name">{it.menuName}</p>
                            </div>
                            <div className="O-card-body-body">
                                <div style={{textAlign: 'center'}}>
                                    <p className="O-menu-name" style={{display: 'inline-block'}}>가격 : </p>
                                    <p className="O-menu-name" style={{display: 'inline-block'}}>{it.menuPrice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default MainMenu;