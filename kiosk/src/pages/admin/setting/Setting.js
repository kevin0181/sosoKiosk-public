import {useEffect, useState} from "react";
import {getAdminSetting} from "../../../js/admin/setting/setting";
import SpinnerAdmin from "../part/SpinnerAdmin";
import axios from "axios";
import serverUrl from "../../config/server.json";

const Setting = () => {

    const [spinner, setSpinner] = useState(true);

    const [settingContent, setSettingContent] = useState({
        tax: '',
        readerNo: '',
        leaderName: '',
        businessNumber: '',
        printerName: ''
    });

    const getDefaultSetting = () => {
        getAdminSetting().then(function (res) {
            setSettingContent({
                tax: res.tax,
                readerNo: res.readerNo,
                leaderName: res.leaderName,
                businessNumber: res.businessNumber,
                printerName: res.printerName
            });
            setSpinner(false);
        });
    }

    useEffect(() => {
        getDefaultSetting();
    }, []);

    const changeSettingContent = (e) => {
        setSettingContent({
            ...settingContent,
            [e.target.name]: e.target.value
        })
    }

    const settingSaveByDB = async (name, data) => {
        const response = await axios.get('http://' + serverUrl.server + '/admin/save/setting/' + name, {
            params: {
                [name]: data
            }
        });
    }

    const saveSetting = (name) => {
        setSpinner(true);
        switch (name) {
            case 'tax':
                settingSaveByDB('tax', settingContent.tax).then(function () {
                    setSpinner(false);
                });
                break;
            case 'readerNo':
                settingSaveByDB('readerNo', settingContent.readerNo).then(function () {
                    setSpinner(false);
                });
                break;
            case 'leaderName':
                settingSaveByDB('leaderName', settingContent.leaderName).then(function () {
                    setSpinner(false);
                });
                break;
            case 'businessNumber':
                settingSaveByDB('businessNumber', settingContent.businessNumber).then(function () {
                    setSpinner(false);
                });
                break;
            case 'printerName':
                settingSaveByDB('printerName', settingContent.printerName).then(function () {
                    setSpinner(false);
                });
                break;
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
                <div className="admin-main-backCard M-flex-row">
                    <div className="M-flex-column admin-main-left-flex" style={{padding: '20px 0px'}}>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                세금
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="taxInput" value={settingContent.tax}
                                       className="M-input-text M-font M-mini-size"
                                       name={'tax'} onChange={changeSettingContent}
                                       style={{width: '100px'}}/><span style={{marginLeft: '3px'}}>%</span>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}>
                                    <p className="M-font O-font-middle-size" onClick={() => {
                                        saveSetting('tax');
                                    }} style={{fontSize: '25px'}}>세금 변경</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                카드 리더기 모델 번호
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="readerNoInput" style={{width: '200px'}}
                                       value={settingContent.readerNo}
                                       name={'readerNo'}
                                       onChange={changeSettingContent}
                                       className="M-input-text M-font M-mini-size"/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}>
                                    <p className="M-font O-font-middle-size" onClick={() => {
                                        saveSetting('readerNo');
                                    }} style={{fontSize: '25px'}}>변경</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                대표자
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="leaderName"
                                       value={settingContent.leaderName}
                                       name={'leaderName'}
                                       onChange={changeSettingContent}
                                       className="M-input-text M-font M-mini-size"
                                       style={{width: '200px'}}/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}>
                                    <p className="M-font O-font-middle-size" onClick={() => {
                                        saveSetting('leaderName');
                                    }} style={{fontSize: '25px'}}>이름 변경</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                사업자 번호
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="businessNumber"
                                       value={settingContent.businessNumber}
                                       name={'businessNumber'}
                                       className="M-input-text M-font M-mini-size"
                                       onChange={changeSettingContent}
                                       style={{width: '200px'}}/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}>
                                    <p className="M-font O-font-middle-size" onClick={() => {
                                        saveSetting('businessNumber');
                                    }} style={{fontSize: '25px'}}>이름 변경</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                프린터 이름
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="printerName"
                                       value={settingContent.printerName}
                                       onChange={changeSettingContent}
                                       name={'printerName'}
                                       className="M-input-text M-font M-mini-size"
                                       style={{width: '200px'}}/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}>
                                    <p className="M-font O-font-middle-size" onClick={() => {
                                        saveSetting('printerName');
                                    }} style={{fontSize: '25px'}}>프린터 변경</p>
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