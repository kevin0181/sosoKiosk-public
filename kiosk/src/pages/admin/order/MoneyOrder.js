const MoneyOrder = () => {
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
                            <table className="admin-menu-all-table">
                                <thead>
                                <tr className="admin-menu-all-table-tr">
                                    <th style={{width: '15%'}}>
                                        주문 날짜
                                    </th>
                                    <th style={{width: '30%', textAlign: "center"}}>
                                        주문 번호
                                    </th>
                                    <th style={{width: '15%'}}>
                                        총 금액
                                    </th>
                                    <th style={{width: '15%'}}>
                                        주문 상태
                                    </th>
                                    <th style={{width: '15%'}}>
                                        결제 방식
                                    </th>
                                    <th style={{width: '15%'}}>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="admin-tbody M-overlay">
                                <tr className="admin-tbody-tr">
                                    <td className="search dateSearch" style={{fontSize: '21px'}}>
                                        주문 날짜
                                    </td>
                                    <td className="search" style={{textAlign: "center"}}>
                                        <p style={{display: 'inline-block', marginRight: '5px'}}>주문 번호?</p>
                                        <small className="M-font menu-detail-btn">상세보기
                                        </small>
                                    </td>
                                    <td className="search">
                                        10원
                                    </td>
                                    <td className="search paySearch">
                                        <p>성공</p>
                                        <p>실패</p>
                                    </td>
                                    <td className="search">
                                        <p></p>
                                    </td>
                                    <td className="search">
                                        <small className="menu-delete-btn">
                                            결제 취소
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
export default MoneyOrder;