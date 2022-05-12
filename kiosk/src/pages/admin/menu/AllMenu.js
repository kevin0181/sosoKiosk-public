import {useEffect, useState} from "react";
import * as AllMenuSearch from './../../../js/admin/menu/AllMenu';

const AllMenu = () => {

    const [search, setSearch] = useState();

    const setSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const [menu, setMenu] = useState();

    useEffect(() => {
        AllMenuSearch.search();
    });

    return (
        <div className="admin-main">
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
                                <tr className="admin-tbody-tr">
                                    <td className="search">
                                        카테고리 이름
                                    </td>
                                    <td className="search">
                                        <p style={{
                                            display: 'inline-block',
                                            marginRight: '5px'
                                        }}>메뉴 이름</p>
                                        <small className="M-font menu-detail-btn">상세보기</small>
                                    </td>
                                    <td className="search">
                                        메뉴 가격
                                    </td>
                                    <td className="search">
                                        <p>사이드??</p>
                                    </td>
                                    <td className="search">
                                        <p className="soldOut-font">(품절)</p>
                                        <p className="enableMenu-font">(메뉴 숨김)</p>
                                    </td>
                                    <td className="search">
                                        <small className="menu-delete-btn">
                                            삭제
                                        </small>
                                    </td>
                                </tr>
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