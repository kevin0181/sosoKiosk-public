const Setting = () => {
    return (
        <div className="admin-main">
            <div className="admin-main-div">
                <div className="admin-main-backCard M-flex-row">
                    <div className="M-flex-column admin-main-left-flex" style={{padding: '20px 0px'}}>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                세금
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="taxInput"
                                       className="M-input-text M-font M-mini-size"
                                       style={{width: '100px'}}/><span style={{marginLeft: '3px'}}>%</span>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}
                                     onClick="changeTax()">
                                    <p className="M-font O-font-middle-size" style={{fontSize: '25px'}}>세금 변경</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                카드 리더기 모델 번호
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="readerNoInput" style={{width: '200px'}}
                                       className="M-input-text M-font M-mini-size"/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}
                                     onClick="changeReaderNo()">
                                    <p className="M-font O-font-middle-size" style={{fontSize: '25px'}}>변경</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                대표자
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="leaderName"
                                       className="M-input-text M-font M-mini-size"
                                       style={{width: '200px'}}/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}
                                     onClick="changeLeaderName()">
                                    <p className="M-font O-font-middle-size" style={{fontSize: '25px'}}>이름 변경</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                사업자 번호
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="businessNumber"
                                       className="M-input-text M-font M-mini-size"
                                       style={{width: '200px'}}/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}
                                     onClick="changeBusinessNumber()">
                                    <p className="M-font O-font-middle-size" style={{fontSize: '25px'}}>이름 변경</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                프린터 이름
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="printerName"
                                       className="M-input-text M-font M-mini-size"
                                       style={{width: '200px'}}/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}
                                     onClick="changePrinterName()">
                                    <p className="M-font O-font-middle-size" style={{fontSize: '25px'}}>프린터 변경</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="M-flex-column admin-main-right-flex">
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Setting;