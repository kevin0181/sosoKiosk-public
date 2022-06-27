import {useEffect, useState} from "react";
import {getCategoryList, getSideCategoryList, getSideList} from "../../../js/admin/menu/addMenu";
import AddCategorySideSelectList from "./addCategory/AddCategorySideSelectList";
import axios from "axios";
import serverUrl from "../../config/server.json";
import SpinnerAdmin from "../part/SpinnerAdmin";
import {CategoryTotalList, SideCategoryTotalList, SideTotalList} from "./addCategory/TotalList";

const AddCategory = ({modalContentChange, data, setDataFun}) => {

    //스피너
    const [spinner, setSpinner] = useState(true);

    //사이드
    const [sideStatus, setSideStatus] = useState(false);

    const [totalSelectKind, setTotalSelectKind] = useState('');

    useEffect(() => {
        console.log(data);
    }, []);

    //total List
    const [totalListStatus, setTotalListStatus] = useState(false);

    const TotalListView = {
        category: <CategoryTotalList totalListData={data} modalContentChange={modalContentChange}/>,
        side: <SideTotalList totalListData={data} modalContentChange={modalContentChange}/>,
        sideCategory: <SideCategoryTotalList totalListData={data} modalContentChange={modalContentChange}/>
    }

    const [addMenuSmallText, setAddMenuSmallText] = useState('');

    const [addDataForm, setAddDataForm] = useState({
        category: '',
        side: '',
        sideSelect: {
            sideSq: '',
            sideName: ''
        },
        sideCategory: ''
    });

    useEffect(() => {
        getSideList().then(function (side) {
            getCategoryList().then(function (category) {
                getSideCategoryList().then(function (sideCategory) {
                    setDataFun({
                        ...data,
                        ['category']: {
                            category,
                            side,
                            sideCategory
                        }
                    })
                    setSpinner(false);
                });
            });
        });
    }, [addDataForm]);


    const addDataFormFun = (e) => {

        setSideStatus(false);

        if (e.target.name === 'addCategorySideSelect') {
            setAddDataForm({
                ...addDataForm,
                sideSelect: {
                    sideSq: e.target.getAttribute('data-id'),
                    sideName: e.target.value
                }
            });
            return false;
        }

    }

    const categoryFun = async () => {
        setSpinner(true);
        if (addDataForm.category === '') {
            setAddMenuSmallText('카테고리를 입력하세요.');
            setSpinner(false);
            return false;
        }

        const response = axios.post('http://' + serverUrl.server + '/admin/menu/add/category', null, {
            params: {
                'categoryName': addDataForm.category
            },
            maxRedirects: 0
        });
        response.then(function (res) {
            if (res.data) {
                setAddDataForm({
                    ...addDataForm,
                    category: ''
                })
                setAddMenuSmallText('카테고리가 추가되었습니다.');
                setSpinner(false);
            }
        });

    }

    const sideFun = () => {
        setSpinner(true);
        if (addDataForm.side === '') {
            setAddMenuSmallText('사이드를 입력하세요.');
            setSpinner(false);
            return false;
        }

        const response = axios.post('http://' + serverUrl.server + '/admin/menu/add/side', null, {
            params: {
                'sideName': addDataForm.side
            },
            maxRedirects: 0
        });
        response.then(function (res) {
            if (res.data) {
                setAddDataForm({
                    ...addDataForm,
                    side: ''
                })
                setAddMenuSmallText('사이드가 추가되었습니다.');
                setSpinner(false);
            }
        });


    }

    const sideCategoryFun = () => {
        setSpinner(true);
        if (addDataForm.sideCategory === '' || addDataForm.sideCategory === null || addDataForm.sideCategory === undefined) {
            setAddMenuSmallText('사이드를 선택하세요.');
            setSpinner(false);
            return false;
        }

        const response = axios.post('http://' + serverUrl.server + '/admin/menu/add/sideCategory', null, {
            params: {
                'sideSq': addDataForm.sideSelect.sideSq,
                'sideCategoryName': addDataForm.sideCategory,
            },
            maxRedirects: 0
        });

        response.then(function (res) {
            if (res.data) {
                setAddDataForm({
                    ...addDataForm,
                    sideSelect: {
                        sideSq: '',
                        sideName: ''
                    },
                    sideCategory: ''
                })
                setAddMenuSmallText('사이드 카테고리가 추가되었습니다.');
                setSpinner(false);
            }
        });

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
                    <div className="M-flex-column admin-main-left-flex" style={{marginTop: '25px', width: '55%'}}>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center M-font-20-size" style={{width: '20%'}}>
                                카테고리
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="categoryName" value={addDataForm.category} onChange={(e) => {
                                    setAddDataForm({
                                        ...addDataForm,
                                        ['category']: e.target.value
                                    })
                                }}

                                       className="M-input-text M-font M-font-20-size"/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" onClick={categoryFun}
                                     style={{marginTop: '0px', marginRight: '10px'}}>
                                    <p className="M-font M-font-15-size">카테고리 추가</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center M-font-20-size" style={{width: '20%'}}>
                                사이드
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" value={addDataForm.side}
                                       className="M-input-text M-font M-font-20-size"
                                       onChange={(e) => {
                                           setAddDataForm({
                                               ...addDataForm,
                                               ['side']: e.target.value
                                           })
                                       }}
                                       id="sideName"/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" onClick={sideFun}
                                     style={{marginTop: '0px', marginRight: '10px'}}>
                                    <p className="M-font M-font-15-size">사이드 추가</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{
                            marginBottom: '25px',
                            marginTop: '10%',
                            paddingTop: '20px',
                            borderTop: '3px solid black'
                        }}>
                            <div className="M-flex-row M-flex-center M-font-15-size" style={{width: '20%'}}>
                                사이드 선택
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '50%'}}>
                                <div className="M-flex-1 M-flex-column M-flex-center"
                                     style={{position: 'relative'}}>
                                    <input type="text" className="M-input-text M-font M-font-20-size"
                                           value={addDataForm.sideSelect.sideName}
                                           id="sideSelectByCategory" onClick={() => {
                                        setSideStatus(!sideStatus);
                                    }} readOnly/>
                                    {
                                        sideStatus ? (<AddCategorySideSelectList side={data}
                                                                                 addDataFormFun={addDataFormFun}/>) : (<></>)
                                    }
                                </div>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center M-font-15-size"
                                 style={{width: '20%', textAlign: 'center'}}>
                                사이드<br/> 카테고리
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" className="M-input-text M-font M-font-20-size"
                                       value={addDataForm.sideCategory}
                                       onChange={(e) => {
                                           setAddDataForm({
                                               ...addDataForm,
                                               sideCategory: e.target.value
                                           })
                                       }}
                                       id="sideCategoryName"/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" onClick={sideCategoryFun}
                                     style={{marginTop: '0px', marginRight: '10px'}}>
                                    <p className="M-font M-font-15-size">사이드 카테고리
                                        추가</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size">
                            <div className="admin-progress-bar" style={{height: 'auto'}}>
                                <div className="admin-progress-bar-div" style={{textAlign: 'center'}}>
                                    <small style={{fontSize: '60%'}}
                                           id="progress-small-category">{addMenuSmallText}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="M-flex-column admin-main-right-flex" style={{marginTop: '25px', width: '45%'}}>
                        <div className="M-flex-row M-font admin-font-size M-flex-center">
                            <div className="M-flex-1 M-flex-column M-flex-center" style={{position: 'relative'}}>
                                <input type="text" value={"리스트를 보려면 클릭하세요."}
                                       className="M-input-text M-font M-font-20-size"
                                       onClick={() => {
                                           setTotalListStatus(!totalListStatus)
                                       }}
                                       id="listSelect"
                                       readOnly style={{width: '80%'}}/>
                                {
                                    totalListStatus ? (
                                        <div className="M-input-select-div" id="listSelectOption"
                                             style={{width: '80%'}}>
                                            <input type="text" value={"카테고리"} name="category"
                                                   style={{width: '100%'}} onClick={() => {
                                                setTotalSelectKind('category')
                                                setTotalListStatus(false)
                                            }}
                                                   className="M-input-select M-font M-font-15-size M-input-select-middle"
                                                   readOnly/>
                                            <input type="text" value={"사이드"} name="side" style={{width: '100%'}}
                                                   className="M-input-select M-font M-font-15-size M-input-select-middle"
                                                   onClick={() => {
                                                       setTotalSelectKind('side')
                                                       setTotalListStatus(false)
                                                   }}
                                                   readOnly/>
                                            <input type="text" value={"사이드 카테고리"} name="sideCategory"
                                                   style={{width: '100%'}}
                                                   onClick={() => {
                                                       setTotalSelectKind('sideCategory')
                                                       setTotalListStatus(false)
                                                   }}
                                                   className="M-input-select M-font M-font-15-size M-input-select-middle"
                                                   readOnly/>
                                        </div>
                                    ) : (<></>)
                                }
                            </div>
                        </div>
                        <div className="admin-main-img" style={{padding: '20px', height: '470px'}}>
                            <div className="img-part M-flex-column M-overlay" id="listSelectCategory"
                                 style={{padding: '10px', position: 'relative'}}>
                                {TotalListView[totalSelectKind]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AddCategory;