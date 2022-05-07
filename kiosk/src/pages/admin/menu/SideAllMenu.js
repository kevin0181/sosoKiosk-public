const SideAllMenu = () => {
    return (
        <div className="admin-main">
            <div className="admin-main-div">
                <div className="admin-main-backCard M-flex-column">
                    <div className="admin-all-menu-top">
                        <div className="admin-top-search">
                            <div className="M-flex-1 M-flex-row">
                                <input type="text" value="" className="M-input-search" id="all-menu-search"/>
                            </div>
                        </div>
                    </div>
                    <div className="admin-menu-all-list M-font M-mini-size">
                        <div className="admin-menu-all-list-div M-overlay">
                            <table className="admin-menu-all-table M-text-center">
                                <thead className="">
                                <tr className="admin-menu-all-table-tr" style={{textAlign: "center"}}>
                                    <th style={{width: '15%'}}>
                                        사이드
                                    </th>
                                    <th style={{width: '15%'}}>
                                        사이드 카테고리
                                    </th>
                                    <th style={{width: '25%'}}>
                                        사이드 메뉴
                                    </th>
                                    <th style={{width: '15%'}}>
                                        가격
                                    </th>
                                    <th style={{width: '15%'}}>
                                        상태
                                    </th>
                                    <th style={{width: '7%'}}>
                                        삭제
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="admin-tbody">
                                <tr className="M-text-center admin-tbody-tr">
                                    <td className="search" style={{width: '15%'}}>
                                        사이드 이름
                                    </td>
                                    <td className="search">
                                        사이드 카테고리
                                    </td>
                                    <td className="search">
                                        <p style={{display: 'inline-block', marginRight: '5px'}}>
                                            사이드 메뉴 이름
                                        </p>
                                        <small className="M-font menu-detail-btn">상세보기
                                        </small>
                                    </td>
                                    <td className="search">
                                        사이드 메뉴 가격
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

export default SideAllMenu;