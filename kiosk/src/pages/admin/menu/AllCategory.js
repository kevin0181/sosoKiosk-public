const AllCategory = () => {
    return (
        <div className="admin-main">
            <div className="admin-main-div">
                <div className="admin-main-backCard M-flex-row">
                    <div className="M-flex-column admin-main-left-flex" style={{marginTop: '25px', width: '50%'}}>
                        <div className="admin-all-menu-top" style={{padding: '0px 20px'}}>
                            <div className="admin-top-search">
                                <div className="M-flex-1 M-flex-row">
                                    <input type="text" value="" className="M-input-search" id="all-category-search"/>
                                </div>
                            </div>
                        </div>
                        <div className="admin-menu-all-list M-font M-mini-size" style={{padding: '0px 20px'}}>
                            <div className="admin-menu-all-list-div M-overlay">
                                <table className="admin-menu-all-table M-text-center">
                                    <thead className="">
                                    <tr className="admin-menu-all-table-tr" style={{textAlign: 'center'}}>
                                        <th style={{width: '40%'}}>
                                            카테고리
                                        </th>
                                        <th style={{width: '30%'}}>
                                            수정
                                        </th>
                                        <th style={{width: '30%'}}>
                                            삭제
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="admin-tbody M-overlay">
                                    <tr className="M-text-center admin-tbody-tr admin-tbody-tr-category">
                                        <td className="search">
                                            <p style={{display: 'inline-block', marginRight: '5px'}}>이름</p>
                                            <small className="M-font menu-detail-btn">
                                                상세보기
                                            </small>
                                        </td>
                                        <td className="search">
                                            <small className="M-font menu-detail-btn"
                                                   style={{backgroundColor: '#f5ffbf'}}>
                                                수정
                                            </small>
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
                    <div className="M-flex-column admin-main-right-flex" style={{marginTop: '25px', width: '50%'}}>
                        <div className="admin-all-menu-top" style={{padding: '0px 20px'}}>
                            <div className="admin-top-search">
                                <div className="M-flex-1 M-flex-row">
                                    <input type="text" value="" className="M-input-search" id="all-side-search"/>
                                </div>
                            </div>
                        </div>
                        <div className="admin-menu-all-list M-font M-mini-size" style={{padding: '0px 20px'}}>
                            <div className="admin-menu-all-list-div M-overlay">
                                <table className="admin-menu-all-table M-text-center">
                                    <thead className="">
                                    <tr className="admin-menu-all-table-tr" style={{textAlign: 'center'}}>
                                        <th style={{width: '40%'}}>
                                            사이드
                                        </th>
                                        <th style={{width: '30%'}}>
                                            수정
                                        </th>
                                        <th style={{width: '30%'}}>
                                            삭제
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="admin-tbody">
                                    <tr className="M-text-center admin-tbody-tr admin-tbody-tr-side">
                                        <td className="search">
                                            <p style={{display: 'inline-block', marginRight: '5px'}}>이름</p>
                                            <small className="M-font menu-detail-btn">
                                                상세보기
                                            </small>
                                        </td>
                                        <td className="search">
                                            <small className="M-font menu-detail-btn"
                                                   style={{backgroundColor: '#f5ffbf'}}>
                                                수정
                                            </small>
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
        </div>
    );
}

export default AllCategory;