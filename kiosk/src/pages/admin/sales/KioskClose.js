import {useEffect, useState} from "react";
import * as AllMenuSearch from "../../../js/admin/menu/AllMenu";
import axios from "axios";
import serverUrl from "../../config/server.json";
import {getTax} from "../../../js/kiosk/receipt";
import $ from "jquery";
import {checkPrinterStatus, cutPaper, getPosData, printText, setPosId} from "../../../js/all/printer/bxlpos";
import {requestPrint} from "../../../js/all/printer/bxlcommon";
import SpinnerAdmin from "../part/SpinnerAdmin";

const KioskClose = ({modalContentChange, data, setDataFun, startDate}) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        AllMenuSearch.search();
        console.log(startDate);
    });

    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        getSalesData();
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

    const dateSearch = async () => {
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
    }

    let getSettingTax;
    let leaderName;
    let readerNo;
    let businessNumber;
    let printerName = "Printer1";

    const getSettingData = async () => {
        const response = await axios.get('http://' + serverUrl.server + '/kiosk/get/setting', {
            params: {
                "setting": "all"
            }
        });
        response.data.map((it) => {
            switch (it.settingName) {
                case 'tax':
                    getSettingTax = Number(it.settingValue);
                    break;
                case 'readerNo':
                    readerNo = it.settingValue
                    break;
                case 'leaderName':
                    leaderName = it.settingValue
                    break;
                case 'businessNumber':
                    businessNumber = it.settingValue
                    break;
                case 'printerName':
                    printerName = it.settingValue
                    break;
            }
        });

        return response.data;
    }


    const searchSalesReceipt = () => {

        let today = new Date();
        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1;  // 월
        let date = today.getDate();  // 날짜
        let hours = today.getHours(); // 시
        let minutes = today.getMinutes();  // 분
        let seconds = today.getSeconds();  // 초
        let endDate = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;

        getSettingData().then(() => {

            getTax(parseInt(getSettingTax), Number(totalPrice)).then(function (taxByTotal) {
                console.log(taxByTotal);

                let Tax = Number(totalPrice) - taxByTotal;

                let total = taxByTotal + Tax;

                let cardTotal = 0;
                let cardNum = 0;
                let moneyTotal = 0;
                let moneyNum = 0;

                let innerTotal = 0;
                let innerNum = 0;
                let outerTotal = 0;
                let outerNum = 0;

                $(data.sales).each(function () {

                    if (this.orderPayStatus === "money") {
                        moneyTotal = moneyTotal + parseInt(this.orderTotalPrice);
                        moneyNum++;
                    } else {
                        cardTotal = cardTotal + parseInt(this.orderTotalPrice);
                        cardNum++;
                    }

                    if (this.orderPlace === "inner") {
                        innerTotal = innerTotal + parseInt(this.orderTotalPrice);
                        innerNum++;
                    } else {
                        outerTotal = outerTotal + parseInt(this.orderTotalPrice);
                        outerNum++;
                    }

                    let issueID = 1;
                    let _inch = 2;

                    setPosId(issueID);
                    checkPrinterStatus();

                    printText("\n\n&pastel\n\n\n", 0, 1, false, false, false, 0, 1);
                    printText("\n\n경기도 안산시 \n단원구 예술대학로 171,\n15263, 한국\n\n\n", 0, 0, false, false, false, 0, 1);

                    if (_inch == 2) {
                        printText("개점 일시 : " + startDate + "\n", 0, 0, false, false, false, 0, 0);
                        printText("정산 일시 : " + endDate + "\n", 0, 0, false, false, false, 0, 0);
                        printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                        printText("매출 합계\n\n", 0, 0, false, false, false, 0, 1);
                        printText("총 판매액 :              " + totalPrice + "\n", 0, 0, false, false, false, 0, 0);
                        printText("과세매출액 :             " + Tax + "\n", 0, 0, false, false, false, 0, 0);
                        printText("부과세액 :               " + taxByTotal + "\n\n", 0, 0, false, false, false, 0, 0);
                        printText("매출 합계 :              " + total + "\n", 0, 0, false, false, false, 0, 0);
                        printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                        printText("결제수단별 매출\n\n", 0, 0, false, false, false, 0, 1);
                        printText("카드 매출 :       " + cardNum + "        " + cardTotal + "\n", 0, 0, false, false, false, 0, 0);
                        printText("현금 매출 :       " + moneyNum + "        " + moneyTotal + "\n", 0, 0, false, false, false, 0, 0);
                        printText("--------------------------------\n", 0, 0, false, false, false, 0, 0);
                        printText("장소별 매출\n\n", 0, 0, false, false, false, 0, 1);
                        printText("포장 매출 :        " + outerNum + "      " + outerTotal + "\n", 0, 0, false, false, false, 0, 0);
                        printText("매장 매출 :        " + innerNum + "      " + innerTotal + "\n", 0, 0, false, false, false, 0, 0);
                        printText("--------------------------------\n\n\n\n", 0, 0, false, false, false, 0, 0);


                    } else {
                        // error
                        return;
                    }

                    printText("Tel : 010 - 8650 - 9052\n", 0, 0, true, false, false, 0, 0);
                    printText("문의 주소 : https://kevin0181.github.io/\n\n\n\n\n\n\n\n", 0, 0, false, false, false, 0, 0);

                    cutPaper(1);

                    let strSubmit = getPosData();
                    console.log(strSubmit);
                    issueID++;

                    requestPrint(printerName, strSubmit, viewResult);

                });
            });

        });
    }

    function viewResult(result) {
        console.log(result);
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
                    <div className="admin-all-menu-top" style={{height: '4%'}}>
                        <div className="admin-top-search">
                        </div>
                    </div>
                    <div className="admin-menu-all-list M-font M-mini-size">
                        <div className="admin-menu-all-list-div M-overlay" style={{height: '80%'}}>
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
                        <div className="M-container M-font O-font-middle-size"
                             style={{height: '2admin-menu-all-list-div M-overlay0%'}}>
                            <div style={{textAlign: 'right', padding: '10px 20px'}}>
                                <span style={{display: 'inline-block'}}>총 금액 : </span>
                                <p style={{display: 'inline-block'}} id="totalPrice">{totalPrice}</p><span
                                style={{display: 'inline-block'}}>원</span>
                            </div>
                            <div className="M-flex-row" style={{marginTop: '10px'}}>
                                <div className="M-flex-column M-flex-center" style={{marginTop: '10px'}}>
                                    <small className="M-font menu-detail-btn" onClick={() => {
                                        searchSalesReceipt();
                                    }}>마감하기
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

export default KioskClose;