const Sales = () => {
    return (
        <div className="admin-main">
            <div className="admin-main-div">
                <div className="admin-main-backCard M-flex-column">
                    <div className="admin-all-menu-top">
                        <div className="admin-top-search">
                            <form className="M-flex-1 M-flex-row" id="dateForm" method="post">
                                <input type="date" className="M-input-search" name="startDate" id="startDate"/>
                                <span style={{fontSize: '18px', margin: '0px 20px'}}> ~ </span>
                                <input type="date" className="M-input-search" name="endDate" id="endDate"/>
                                <input type="button" value="검색"
                                       className="M-input-search"
                                       style={{width: '70px', margin: '0px 20px'}}/>
                                <input type="button" value="전체"
                                       className="M-input-search"
                                       style={{width: '70px', margin: '0px 20px'}}/>
                            </form>
                        </div>
                    </div>
                    <div className="admin-menu-all-list M-font M-mini-size">
                        <div className="admin-menu-all-list-div M-overlay" style={{height: '70%'}}>
                            <table className="admin-menu-all-table">
                                <thead>
                                <tr className="admin-menu-all-table-tr">
                                    <th style={{width: '15%'}}>
                                        주문 시각
                                    </th>
                                    <th style={{width: '30%', textAlign: 'center'}}>
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
                                        장소
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="admin-sales-tbody admin-tbody M-overlay">
                                <tr className="admin-tbody-sales-tr admin-tbody-tr">
                                    <td className="search dateSearch" style={{fontSize: '21px'}}>
                                        주문 날짜
                                    </td>
                                    <td className="search" style={{textAlign: 'center'}}>
                                        <p style={{display: 'inline-block', marginRight: '5px'}}
                                        >주문 번호?</p>
                                    </td>
                                    <td className="search">
                                        10원
                                    </td>
                                    <td className="search paySearch">
                                        <p>성공</p>
                                        <p>실패</p>
                                    </td>
                                    <td className="search">
                                        <p>주문 상태</p>
                                    </td>
                                    <td className="search">
                                        <p>매장</p>
                                        <p>포장</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="M-container M-font O-font-middle-size" style={{height: '30%'}}>
                            <div style={{textAlign: 'right', padding: '10px 20px'}}>
                                <span style={{display: 'inline-block'}}>총 금액 : </span>
                                <p style={{display: 'inline-block'}} id="totalPrice">10000</p><span
                                style={{display: 'inline-block'}}>원</span>
                            </div>
                            <div className="M-flex-row" style={{marginTop: '10px'}}>
                                <div className="M-flex-column M-flex-center" style={{marginTop: '10px'}}>
                                    <small className="M-font menu-detail-btn">검색 매출표 출력
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Sales;