import {useEffect, useState} from "react";
import * as addMenuJS from './../../../js/admin/menu/addMenu';
import {getCategoryList, getSideList} from "./../../../js/admin/menu/addMenu";
import SpinnerAdmin from "../part/SpinnerAdmin";
import CategorySelectList from "./addMenu/CategorySelectList";
import $ from 'jquery';

const AddMenu = () => {

    const [category, setCategory] = useState([]);

    const [menuImg, setMenuImg] = useState();

    const [categoryStatus, setCategoryStatus] = useState(false);

    const [side, setSide] = useState([]);

    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        getCategoryList().then(function (res) {
            setCategory(res);
            getSideList().then(function (res) {
                setSide(res);
                setSpinner(false);
            });
        });

    }, []);

    const [addMenu, setAddMenu] = useState({
        menuName: '',
        menuPrice: '',
        CategorySelect: '',
        sideSelect: '',
    });

    const encodeFileToBase64 = (fileBlob) => {
        $("#menu-fileUrl").text(fileBlob.name);
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setMenuImg(reader.result);
                resolve();
            };
        });
    };

    const addMenuChange = (e) => {
        setAddMenu({
            ...addMenu,
            [e.target.name]: e.target.value
        });
        console.log(addMenu);
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
                    <div className="M-flex-column admin-main-left-flex" style={{marginTop: '25px'}}>
                        <form id="addMenuForm" method="post" encType="multipart/form-data">
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    메뉴 이름
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                    <input type="text" value={addMenu.menuName}
                                           className="M-input-text M-font M-mini-size"
                                           id="menuName"
                                           onChange={addMenuChange}
                                           name="menuName"/>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사진 업로드
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                    <input type="file" className="M-none-design" id="menu-file"
                                           onChange={(e) => {
                                               encodeFileToBase64(e.target.files[0]);
                                           }}
                                           name="menuImg"
                                           accept="image/*"/>
                                    <label className="M-input-text" id="menu-fileUrl" htmlFor="menu-file"
                                           style={{fontSize: '20px', overflow: 'hidden'}}>
                                    </label>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    가격
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                    <input type="text" value={addMenu.menuPrice}
                                           className="M-input-text M-font M-mini-size"
                                           onChange={addMenuChange}
                                           id="menuPrice"
                                           name="menuPrice"/>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    카테고리
                                </div>
                                <div className="M-flex-1 M-flex-column M-flex-center" style={{position: 'relative'}}>
                                    <input type="text" value="" className="M-input-text M-font M-mini-size menuInputDiv"
                                           id="categorySelect" readOnly onClick={function () {
                                        setCategoryStatus(!categoryStatus);
                                    }}
                                    />
                                    {
                                        categoryStatus ? (<CategorySelectList category={category}/>) : (<></>)
                                    }
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사이드
                                </div>
                                <div className="M-flex-1 M-flex-column M-flex-center menuInputDiv"
                                     style={{position: 'relative'}}>
                                    <input type="text" value="" className="M-input-text M-font M-mini-size"
                                           id="sideSelect"
                                           readOnly/>
                                    <div className="M-input-select-div" id="sideSelectOption"
                                         style={{display: 'none'}}>
                                        <input type="text" value="side 1"
                                               className="M-input-select M-font M-mini-size M-input-select-middle"
                                               readOnly/>
                                    </div>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">

                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    <div className="O-side-select-close"
                                         style={{marginTop: '0px', marginRight: '10px'}}>
                                        <p className="M-font">메뉴 업로드</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="M-flex-column admin-main-right-flex">
                        <div className="admin-main-img">
                            <div className="img-part M-flex-column M-flex-center">
                                {
                                    menuImg ? (
                                        <img id="admin-main-menu-select-img" alt={'미리보기 이미지'}
                                             className="admin-main-select-img"
                                             src={menuImg}/>

                                    ) : (
                                        <p className="M-font M-mini-size">미리보기</p>
                                    )
                                }
                            </div>
                        </div>
                        <div className="admin-progress-bar">
                            <div className="admin-progress-bar-div" style={{textAlign: 'center'}}>
                                <small className="M-font" style={{fontSize: '25px'}} id="progress-small-menu"></small>
                                <progress id="menu-progressBar" style={{marginTop: '30px'}} className="M-progress-bar"
                                          value="0"
                                          max="100"></progress>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMenu;