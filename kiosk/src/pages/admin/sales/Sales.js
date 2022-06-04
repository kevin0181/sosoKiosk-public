import {useEffect, useState} from "react";
import * as AllMenuSearch from "../../../js/admin/menu/AllMenu";
import axios from "axios";
import serverUrl from "../../config/server.json";
import SpinnerAdmin from "../part/SpinnerAdmin";

const Sales = ({modalContentChange, data, setDataFun}) => {


    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        AllMenuSearch.search();
    });

    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        getSalesData().then(function () {
        });
    }, []);

    const getSalesData = async () => {
        dateSearch().then((getSales) => {
            let sales = getSales.filter((it) => it.orderStatus === true);
            setDataFun({
                ...data,
                sales
            });
            setSpinner(false);
        });
    }

    useEffect(() => {
        totalPriceFun();
    }, [data]);

    const totalPriceFun = () => {
        let plusData = 0;
        data.sales.map((it) => {
            plusData = plusData + Number(it.orderTotalPrice);
        });
        setTotalPrice(plusData);
    }


    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜

    const [searchDate, setSearchDate] = useState({
        startDate: year + '-' + month + '-' + date,
        endDate: year + '-' + month + '-' + date,
        payStatus: 'all'
    });

    const changeDateFun = (e) => {
        setSearchDate({
            ...searchDate,
            [e.target.name]: e.target.value
        });
    }

    const dateSearch = async () => {
        if (searchDate.startDate === '' && searchDate.endDate === '' || searchDate.startDate !== '' && searchDate.endDate !== '') {
            setSpinner(true);
            const response = await axios.post('http://' + serverUrl.server + '/admin/order/date', null, {
                params: {
                    'payStatus': searchDate.payStatus,
                    'startDate': searchDate.startDate,
                    'endDate': searchDate.endDate
                },
                maxRedirects: 0
            });
            return response.data;
        } else {
            return false;
        }

    }


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
                            <form className="M-flex-1 M-flex-row" id="dateForm" method="post">
                                <input type="date" className="M-input-search" name="startDate" id="startDate"
                                       onChange={changeDateFun}/>
                                <span style={{fontSize: '18px', margin: '0px 20px'}}> ~ </span>
                                <input type="date" className="M-input-search" name="endDate"
                                       onChange={changeDateFun}
                                       id="endDate"/>
                                <input type="button" value="검색" onClick={() => {
                                    dateSearch().then(function (getSales) {
                                        if (getSales) {
                                            let sales = getSales.filter((it) => it.orderStatus === true);
                                            setDataFun({
                                                ...data,
                                                sales
                                            });
                                        } else {
                                            modalContentChange({
                                                status: true,
                                                param: '',
                                                modalType: 'adminTotalModal',
                                                modalTitle: '오류 메시지',
                                                modalContent: '정확한 날짜를 입력해주세요.',
                                            });
                                        }
                                        setSpinner(false);
                                    });
                                }}
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
                                {/*<tr className="admin-tbody-sales-tr admin-tbody-tr">*/}
                                {/*    <td className="search dateSearch" style={{fontSize: '21px'}}>*/}
                                {/*        주문 날짜*/}
                                {/*    </td>*/}
                                {/*    <td className="search" style={{textAlign: 'center'}}>*/}
                                {/*        <p style={{display: 'inline-block', marginRight: '5px'}}*/}
                                {/*        >주문 번호?</p>*/}
                                {/*    </td>*/}
                                {/*    <td className="search">*/}
                                {/*        10원*/}
                                {/*    </td>*/}
                                {/*    <td className="search paySearch">*/}
                                {/*        <p>성공</p>*/}
                                {/*        <p>실패</p>*/}
                                {/*    </td>*/}
                                {/*    <td className="search">*/}
                                {/*        <p>주문 상태</p>*/}
                                {/*    </td>*/}
                                {/*    <td className="search">*/}
                                {/*        <p>매장</p>*/}
                                {/*        <p>포장</p>*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                {
                                    data.sales.map((it, index) => (
                                        <tr className="admin-tbody-tr" key={index}>
                                            <td className="search dateSearch" style={{fontSize: '21px'}}>
                                                {it.orderDate + ' ' + it.orderDateTime}
                                            </td>
                                            <td className="search" style={{textAlign: "center"}}>
                                                <p style={{
                                                    display: 'inline-block',
                                                    marginRight: '5px'
                                                }}>{it.orderTelegramNo}</p>
                                            </td>
                                            <td className="search">
                                                {it.orderTotalPrice + '원'}
                                            </td>
                                            <td className="search paySearch">
                                                {
                                                    it.orderStatus ? (
                                                        <p>성공</p>
                                                    ) : (
                                                        <p>실패</p>
                                                    )
                                                }
                                            </td>
                                            <td className="search">
                                                <p>
                                                    {
                                                        it.orderPayStatus
                                                    }
                                                </p>
                                            </td>
                                            <td className="search">
                                                {
                                                    it.orderPlace === 'inner' ? (<p>매장</p>) : (<p>포장</p>)
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="M-container M-font O-font-middle-size" style={{height: '30%'}}>
                            <div style={{textAlign: 'right', padding: '10px 20px'}}>
                                <span style={{display: 'inline-block'}}>총 금액 : </span>
                                <p style={{display: 'inline-block'}} id="totalPrice">{totalPrice}</p><span
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