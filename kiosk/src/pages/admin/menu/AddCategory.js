import {useEffect, useState} from "react";
import {getSideList} from "../../../js/admin/menu/addMenu";
import AddCategorySideSelectList from "./addCategory/AddCategorySideSelectList";

const AddCategory = ({modalContentChange, data, setDataFun}) => {

    //스피너
    const [spinner, setSpinner] = useState(true);

    //사이드
    const [side, setSide] = useState([]);
    const [sideStatus, setSideStatus] = useState(false);

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

    const categoryFun = () => {
        if (addDataForm.category === '') {
            setAddMenuSmallText('카테고리를 입력하세요.');
            return false;
        }
    }

    const sideFun = () => {
        if (addDataForm.side === '') {
            setAddMenuSmallText('사이드를 입력하세요.');
            return false;
        }
    }

    const sideCategoryFun = () => {
        if (addDataForm.sideSelect.sideSq === '' || addDataForm.sideSelect.sideSq === null || addDataForm.sideSelect.sideSq === undefined) {
            setAddMenuSmallText('사이드를 선택하세요.');
            return false;
        }
    }


    useEffect(() => {
        console.log(addDataForm);
    }, [addDataForm]);

    useEffect(() => {
        getSideList().then(function (res) {
            setSide(res);
            setSpinner(false);
        });
    }, []);

    return (
        <div className="admin-main">
            <div className="admin-main-div">
                <div className="admin-main-backCard M-flex-row">
                    <div className="M-flex-column admin-main-left-flex" style={{marginTop: '25px', width: '55%'}}>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                카테고리
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" id="categoryName" value={addDataForm.category} onChange={(e) => {
                                    setAddDataForm({
                                        ...addDataForm,
                                        ['category']: e.target.value
                                    })
                                }}

                                       className="M-input-text M-font M-mini-size"/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" onClick={categoryFun}
                                     style={{marginTop: '0px', marginRight: '10px'}}>
                                    <p className="M-font O-font-middle-size" style={{fontSize: '25px'}}>카테고리 추가</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                사이드
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" value={addDataForm.side}
                                       className="M-input-text M-font M-mini-size"
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
                                    <p className="M-font O-font-middle-size" style={{fontSize: '25px'}}>사이드 추가</p>
                                </div>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{
                            marginBottom: '25px',
                            marginTop: '10%',
                            paddingTop: '20px',
                            borderTop: '3px solid black'
                        }}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '25px', width: '20%'}}>
                                사이드 선택
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '50%'}}>
                                <div className="M-flex-1 M-flex-column M-flex-center"
                                     style={{position: 'relative'}}>
                                    <input type="text" className="M-input-text M-font M-mini-size"
                                           value={addDataForm.sideSelect.sideName}
                                           id="sideSelectByCategory" onClick={() => {
                                        setSideStatus(!sideStatus);
                                    }} readOnly/>
                                    {
                                        sideStatus ? (<AddCategorySideSelectList side={side}
                                                                                 addDataFormFun={addDataFormFun}/>) : (<></>)
                                    }
                                </div>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                            </div>
                        </div>
                        <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center" style={{fontSize: '23px', width: '20%'}}>
                                사이드 카테고리
                            </div>
                            <div className="M-flex-row M-flex-center M-input" style={{width: '50%'}}>
                                <input type="text" className="M-input-text M-font M-mini-size"
                                       id="sideCategoryName"/>
                            </div>
                            <div className="M-flex-row M-flex-center" style={{width: '30%', padding: '0px 10px'}}>
                                <div className="O-side-select-close" onClick={sideCategoryFun}
                                     style={{marginTop: '0px', marginRight: '10px'}}>
                                    <p className="M-font O-font-middle-size" style={{fontSize: '21px'}}>사이드 카테고리
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
                                       className="M-input-text M-font M-mini-size"
                                       id="listSelect"
                                       readOnly style={{width: '80%'}}/>
                                <div className="M-input-select-div" id="listSelectOption"
                                     style={{display: 'none', width: '80%'}}>
                                    <input type="text" value={"카테고리"} name="category"
                                           style={{width: '100%'}}
                                           className="M-input-select M-font M-mini-size M-input-select-middle"
                                           readOnly/>
                                    <input type="text" value={"사이드"} name="side" style={{width: '100%'}}
                                           className="M-input-select M-font M-mini-size M-input-select-middle"
                                           readOnly/>
                                    <input type="text" value={"사이드 카테고리"} name="sideCategory"
                                           style={{width: '100%'}}
                                           className="M-input-select M-font M-mini-size M-input-select-middle"
                                           readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="admin-main-img" style={{padding: '20px', height: '470px'}}>
                            <div className="img-part M-flex-column M-overlay" id="listSelectCategory"
                                 style={{padding: '10px', position: 'relative'}}>
                                <input type="text" value={"카테고리 1"}
                                       style={{
                                           width: '100%',
                                           backgroundColor: '#628762',
                                           fontSize: '25px',
                                           marginBottom: '6px'
                                       }}
                                       className="M-input-text M-font" readOnly/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AddCategory;