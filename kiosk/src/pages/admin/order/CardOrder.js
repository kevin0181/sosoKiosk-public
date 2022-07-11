import {useEffect, useState} from "react";
import SpinnerAdmin from "../part/SpinnerAdmin";
import * as AllMenuSearch from "../../../js/admin/menu/AllMenu";
import axios from "axios";
import serverUrl from "../../config/server.json";

const CardOrder = ({modalContentChange, data, setDataFun}) => {

    const [search, setSearch] = useState('');

    const setSearchChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        AllMenuSearch.search();
    });


    const [subData, setSubData] = useState({
        successTotalPrice: 0,
        failTotalPrice: 0,
        successOrderCount: 0,
        failOrderCount: 0,
        orderCardStatus: "" //나중에 카드사 추가할 것.
    });


    useEffect(() => {

        console.log(subData);

    }, [subData]);


    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        dateSearch().then((order) => {

            setDataFun({
                ...data,
                order
            });
            setSpinner(false);

        });

        console.log(data);

        data.order.filter((data) => data.orderStatus === true && data.orderPayStatus === "card").map((it) => {
            //총 금액 계산.

            console.log(it);

            setSubData({
                successTotalPrice: subData.successTotalPrice += Number(it.orderTotalPrice)
            });

        });

    }, []);

    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜

    const [searchDate, setSearchDate] = useState({
        startDate: year + '-' + month + '-' + date,
        endDate: year + '-' + month + '-' + date,
        payStatus: 'card'
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
                            <div className="M-flex-1 M-flex-row">
                                <input type="text" value={search} className="M-input-search" onChange={setSearchChange}
                                       id="all-menu-search"/>
                                <div className="admin-top-search" style={{width: '500px', marginLeft: '10%'}}>
                                    <form className="M-flex-1 M-flex-row" id="dateForm" method="post">
                                        <input type="date" className="M-input-search" name="startDate" id="startDate"
                                               onChange={changeDateFun}/>
                                        <span style={{fontSize: '18px', margin: '0px 20px'}}> ~ </span>
                                        <input type="date" className="M-input-search" name="endDate"
                                               onChange={changeDateFun}
                                               id="endDate"/>
                                        <input type="button" value="검색" onClick={() => {
                                            dateSearch().then(function (order) {
                                                if (order) {
                                                    setDataFun({
                                                        ...data,
                                                        order
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
                        </div>
                    </div>
                    <div className="admin-menu-all-list M-font M-mini-size" style={{height: '80%'}}>
                        <div className="admin-menu-all-list-div M-overlay">
                            <table className="admin-menu-all-table">
                                <thead>
                                <tr className="admin-menu-all-table-tr" style={{textAlign: 'center'}}>
                                    <th style={{width: '15%', fontSize: '20px'}}>
                                        주문 날짜
                                    </th>
                                    <th style={{width: '30%', textAlign: "center", fontSize: '20px'}}>
                                        주문 번호
                                    </th>
                                    <th style={{width: '15%', fontSize: '20px'}}>
                                        총 금액
                                    </th>
                                    <th style={{width: '15%', fontSize: '20px'}}>
                                        주문 상태
                                    </th>
                                    <th style={{width: '15%', fontSize: '20px'}}>
                                        결제 방식
                                    </th>
                                    <th style={{width: '15%', fontSize: '20px'}}>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="admin-tbody M-overlay">
                                {
                                    data.order.map((it, index) => (
                                        <tr className="admin-tbody-tr" key={index} style={{textAlign: 'center'}}>
                                            <td className="search dateSearch M-font-15-size">
                                                {it.orderDate + ' ' + it.orderDateTime}
                                            </td>
                                            <td className="search M-font-15-size" style={{textAlign: "center"}}>
                                                <p style={{
                                                    display: 'inline-block',
                                                    marginRight: '5px'
                                                }}>{it.orderTelegramNo}</p>
                                                <small
                                                    onClick={() => {
                                                        modalContentChange({
                                                            status: true,
                                                            param: '',
                                                            modalType: 'orderDetailModal',
                                                            modalTitle: '',
                                                            modalContent: '',
                                                            data: it
                                                        })
                                                    }} className="M-font menu-detail-btn M-font-15-size">상세보기
                                                </small>
                                            </td>
                                            <td className="search M-font-15-size">
                                                {it.orderTotalPrice + '원'}
                                            </td>
                                            <td className="search paySearch M-font-15-size">
                                                {
                                                    it.orderStatus ? (
                                                        <p>성공</p>
                                                    ) : (
                                                        <p>실패</p>
                                                    )
                                                }
                                            </td>
                                            <td className="search M-font-15-size">
                                                <p>
                                                    {
                                                        it.orderPayStatus
                                                    }
                                                </p>
                                            </td>
                                            <td className="search M-font-15-size">
                                                <small className="menu-delete-btn" onClick={() => {
                                                    modalContentChange({
                                                        status: true,
                                                        param: '',
                                                        modalType: 'cancelPayModal',
                                                        modalTitle: '',
                                                        modalContent: '',
                                                        data: it
                                                    });
                                                }}>
                                                    결제 취소
                                                </small>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={"M-flex-column"}>
                        <p className={"M-font-20-size"}>ㅎㅇ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CardOrder;