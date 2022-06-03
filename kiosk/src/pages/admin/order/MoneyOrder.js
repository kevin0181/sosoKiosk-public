import {useEffect, useState} from "react";
import {getAllOrderList, getMoneyOrderList} from "../../../js/admin/order/order";
import SpinnerAdmin from "../part/SpinnerAdmin";
import * as AllMenuSearch from "../../../js/admin/menu/AllMenu";
import axios from "axios";
import serverUrl from "../../config/server.json";

const MoneyOrder = ({modalContentChange, data, setDataFun}) => {


    const [search, setSearch] = useState('');

    const setSearchChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        AllMenuSearch.search();
    });


    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        getMoneyOrderList().then((order) => {

            setDataFun({
                ...data,
                order
            });
            setSpinner(false);

        });
    }, []);

    const [searchDate, setSearchDate] = useState({
        startDate: '',
        endDate: '',
        payStatus: 'money'
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
                                {
                                    data.order.map((it, index) => (
                                        <tr className="admin-tbody-tr" key={index}>
                                            <td className="search dateSearch" style={{fontSize: '21px'}}>
                                                {it.orderDate + ' ' + it.orderDateTime}
                                            </td>
                                            <td className="search" style={{textAlign: "center"}}>
                                                <p style={{
                                                    display: 'inline-block',
                                                    marginRight: '5px'
                                                }}>{it.orderTelegramNo}</p>
                                                <small className="M-font menu-detail-btn">상세보기
                                                </small>
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
                </div>
            </div>
        </div>
    );
}
export default MoneyOrder;