import {useEffect, useState} from "react";
import * as AllMenuSearch from './../../../js/admin/menu/AllMenu';
import MenuListPart from "./allMenu/MenuListPart";
import SpinnerAdmin from "../part/SpinnerAdmin";
import {getMenuList} from "./../../../js/admin/menu/AllMenu";

const AllMenu = () => {

    const [search, setSearch] = useState();

    const [spinner, setSpinner] = useState(true);

    const [menu, setMenu] = useState([]);


    const setSearchChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        getMenuList().then(function (res) {
            console.log(res);
            setMenu(res);
            setSpinner(false);
        });
    }, []);

    useEffect(() => {
        AllMenuSearch.search();
    });

    return (
        <div className="admin-main">
            {
                spinner ? (
                    <SpinnerAdmin/>
                ) : (
                    <></>
                )
            }
            <div className="admin-main-div">
                <div className="admin-main-backCard M-flex-column">
                    <div className="admin-all-menu-top">
                        <div className="admin-top-search">
                            <div className="M-flex-1 M-flex-row">
                                <input type="text" value={search} onChange={setSearchChange} className="M-input-search"
                                       id="all-menu-search"/>
                            </div>
                        </div>
                    </div>
                    <div className="admin-menu-all-list M-font M-mini-size">
                        <div className="admin-menu-all-list-div M-overlay">
                            <table className="admin-menu-all-table">
                                <thead>
                                <tr className="admin-menu-all-table-tr">
                                    <th style={{width: '15%'}}>
                                        카테고리
                                    </th>
                                    <th style={{width: '30%'}}>
                                        메뉴이름
                                    </th>
                                    <th style={{width: '15%'}}>
                                        가격
                                    </th>
                                    <th style={{width: '15%'}}>
                                        사이드
                                    </th>
                                    <th style={{width: '15%'}}>
                                        상태
                                    </th>
                                    <th style={{width: '10%'}}>
                                        삭제
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="admin-tbody M-overlay">
                                <MenuListPart menu={menu}/>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllMenu;