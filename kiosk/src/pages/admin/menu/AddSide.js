import {useState, useEffect} from "react";
import SideSelectList from "./addMenu/SideSelectList";
import {getSideList} from "../../../js/admin/menu/addMenu";
import SpinnerAdmin from "../part/SpinnerAdmin";
import SideCategorySelectList from "./sideMenu/SideCategorySelectList";
import {getSideCategoryList} from "../../../js/admin/menu/side";
import $ from "jquery";

const AddSide = () => {


    //사이드
    const [side, setSide] = useState([]);
    const [sideStatus, setSideStatus] = useState(false);

    //이미지
    const [menuImg, setMenuImg] = useState({
        img: '',
        imgUrl: ''
    });

    //사이드 카테고리
    const [sideCategory, setSideCategory] = useState([]);
    const [sideCategoryStatus, setSideCategoryStatus] = useState(false);

    //스피너
    const [spinner, setSpinner] = useState(true);

    const [addMenuSmallText, setAddMenuSmallText] = useState('');

    useEffect(() => {
        getSideList().then(function (res) {
            setSide(res);
            setSpinner(false);
        });
    }, []);

    const [addSideMenu, setAddSideMenu] = useState({
        menuSideName: '',
        menuSidePrice: '',
        sideSelect: {
            sideSq: '',
            sideName: ''
        },
        sideCategorySelect: {
            sideCategorySq: '',
            sideCategoryName: ''
        }
    });

    useEffect(() => {
        console.log(addSideMenu);
        console.log(menuImg)
    }, [addSideMenu, menuImg]);

    const changeAddSideMenu = (e) => {

        setSideStatus(false);
        setSideCategoryStatus(false);

        if (e.target.name === 'menuSideImg') {
            const uploadFile = e.target.files[0]
            $("#side-fileUrl").text(uploadFile.name);
            const reader = new FileReader();
            reader.readAsDataURL(uploadFile);
            return new Promise((resolve) => {
                reader.onload = () => {
                    setMenuImg({
                        img: uploadFile,
                        imgUrl: reader.result
                    });
                    resolve();
                };
            });
        }


        if (e.target.name === 'sideSelect') {
            setAddSideMenu({
                ...addSideMenu,
                [e.target.name]: {
                    sideSq: e.target.getAttribute('data-id'),
                    sideName: e.target.value
                },
                sideCategorySelect: {
                    sideCategorySq: '',
                    sideCategoryName: ''
                }
            });


            return false;
        }

        if (e.target.name === 'sideCategorySelect') {
            setAddSideMenu({
                ...addSideMenu,
                [e.target.name]: {
                    sideCategorySq: e.target.getAttribute('data-id'),
                    sideCategoryName: e.target.value
                }
            });
            return false;
        }

        if (e.target.name === 'menuSidePrice') {
            const check = /^[0-9 ]*$/;
            if (check.test(e.target.value)) {
                setAddSideMenu({
                    ...addSideMenu,
                    [e.target.name]: e.target.value
                });
                return false;
            } else {
                return false;
            }
        }

        setAddSideMenu({
            ...addSideMenu,
            [e.target.name]: e.target.value
        });

    }

    const getSideCategorySelectData = () => {
        setSpinner(true);
        setSideStatus(false);
        setSideCategoryStatus(!sideStatus);
        if (addSideMenu.sideSelect.sideSq === '' || addSideMenu.sideSelect.sideSq === null || addSideMenu.sideSelect.sideSq === undefined) {
            setAddMenuSmallText('사이드를 선택해주세요.');
            return false;
        } else {
            getSideCategoryList(addSideMenu.sideSelect.sideSq).then(function (res) {
                setSideCategory(res);
                setSpinner(false);
            });
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
                    <div className="M-flex-column admin-main-left-flex" style={{marginTop: '25px'}}>
                        <form id="addSideMenuForm" method="post" encType="multipart/form-data">
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사이드 메뉴 이름
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                    <input type="text" value={addSideMenu.menuSideName}
                                           className="M-input-text M-font M-mini-size"
                                           id="menu-side-name"
                                           onChange={changeAddSideMenu}
                                           name="menuSideName"/>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사진 업로드
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                    <input type="file" className="M-none-design" id="side-file"
                                           name="menuSideImg" onChange={changeAddSideMenu}
                                           accept="image/*"/>
                                    <label className="M-input-text" id="side-fileUrl" htmlFor="side-file"
                                           style={{fontSize: '20px', overflow: 'hidden'}}>
                                    </label>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    가격
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                    <input type="text" className="M-input-text M-font M-mini-size"
                                           value={addSideMenu.menuSidePrice}
                                           id="menuSidePrice" onChange={changeAddSideMenu}
                                           name="menuSidePrice"/>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사이드
                                </div>
                                <div className="M-flex-1 M-flex-column M-flex-center sideMenuInputDiv"
                                     style={{position: 'relative'}}>
                                    <input type="text" className="M-input-text M-font M-mini-size"
                                           value={addSideMenu.sideSelect.sideName}
                                           id="sideSelectByAddSide" readOnly onClick={function () {
                                        setSideCategoryStatus(false);
                                        setSideStatus(!sideStatus);
                                    }}/>
                                    {
                                        sideStatus ? (
                                            <SideSelectList side={side} changeSide={changeAddSideMenu}/>) : (<></>)
                                    }
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사이드 카테고리
                                </div>
                                <div className="M-flex-1 M-flex-column M-flex-center sideMenuInputDiv"
                                     style={{position: 'relative'}}>
                                    <input type="text" className="M-input-text M-font M-mini-size"
                                           id="sideCategorySelect" readOnly
                                           value={addSideMenu.sideCategorySelect.sideCategoryName}
                                           onClick={getSideCategorySelectData}/>
                                    {
                                        sideCategoryStatus ? (
                                            <SideCategorySelectList sideCategory={sideCategory}
                                                                    changeSideCategory={changeAddSideMenu}/>) : (<></>)
                                    }
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">

                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    <div className="O-side-select-close"
                                         style={{marginTop: '0px', marginRight: '10px'}}>
                                        <p className="M-font O-font-middle-size" style={{fontSize: '40px'}}>사이드 메뉴
                                            업로드</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="M-flex-column admin-main-right-flex">
                        <div className="admin-main-img">
                            <div className="img-part M-flex-column M-flex-center">
                                {
                                    menuImg.imgUrl ? (
                                        <img id="admin-main-menu-select-img" alt={'미리보기 이미지'}
                                             className="admin-main-select-img"
                                             src={menuImg.imgUrl}/>

                                    ) : (
                                        <p className="M-font M-mini-size">미리보기</p>
                                    )
                                }
                            </div>
                        </div>
                        <div className="admin-progress-bar">
                            <div className="admin-progress-bar-div" style={{textAlign: 'center'}}>
                                <small className="M-font" style={{fontSize: '25px'}}
                                       id="progress-small-side">{addMenuSmallText}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSide;