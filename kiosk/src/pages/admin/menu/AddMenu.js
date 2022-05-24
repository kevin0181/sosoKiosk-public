import {useEffect, useState} from "react";
import {getCategoryList, getSideList} from "./../../../js/admin/menu/addMenu";
import SpinnerAdmin from "../part/SpinnerAdmin";
import CategorySelectList from "./addMenu/CategorySelectList";
import $ from 'jquery';
import SideSelectList from "./addMenu/SideSelectList";
import axios from "axios";
import serverUrl from "../../config/server.json";

const AddMenu = ({modalContentChange}) => {

    //카테고리
    const [category, setCategory] = useState([]);
    const [categoryStatus, setCategoryStatus] = useState(false);

    //이미지
    const [menuImg, setMenuImg] = useState({
        img: '',
        imgUrl: ''
    });

    //사이드
    const [side, setSide] = useState([]);
    const [sideStatus, setSideStatus] = useState(false);

    //스피너
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

    const [addMenuSmallText, setAddMenuSmallText] = useState('');

    const [addMenu, setAddMenu] = useState({
        menuName: '',
        menuPrice: '',
        categorySelect: {
            categorySq: '',
            categoryName: ''
        },
        sideSelect: {
            sideSq: '',
            sideName: ''
        },
    });

    const saveMenu = () => {

        if (addMenu.menuName === '') {
            setAddMenuSmallText('메뉴 이름을 적어주세요.');
            return false;
        }

        if (addMenu.menuPrice === '') {
            setAddMenuSmallText('가격을 적어주세요.');
            return false;
        }

        if (addMenu.categorySelect.categorySq === '') {
            setAddMenuSmallText('카테고리를 지정해주세요.');
            return false;
        }

        setSpinner(true);
        const formData = new FormData();
        formData.append('categorySq', addMenu.categorySelect.categorySq);
        formData.append('menuName', addMenu.menuName);
        formData.append('menuPrice', addMenu.menuPrice);
        formData.append('sideSq', addMenu.sideSelect.sideSq);
        formData.append('menuImg', menuImg.img);

        const response = axios.post('http://' + serverUrl.server + '/admin/menu/add/menu', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            maxRedirects: 0
        });

        response.then(function (res) {
            setSpinner(false);


            setAddMenu({
                menuName: '',
                menuPrice: '',
                categorySelect: {
                    categorySq: '',
                    categoryName: ''
                },
                sideSelect: {
                    sideSq: '',
                    sideName: ''
                }
            });

            setMenuImg({
                img: '',
                imgUrl: ''
            });

            $('#menu-fileUrl').text('');

            modalContentChange({
                status: true,
                modalType: 'adminTotalModal',
                modalTitle: '알림 메시지',
                modalContent: '저장이 완료되었습니다.'
            });

        });

    }

    const addMenuChange = (e) => {

        setCategoryStatus(false);
        setSideStatus(false);

        if (e.target.name === 'menuImg') {
            const uploadFile = e.target.files[0]
            $("#menu-fileUrl").text(uploadFile.name);
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

        if (e.target.name === 'categorySelect') {

            setAddMenu({
                ...addMenu,
                [e.target.name]: {
                    categorySq: e.target.getAttribute('data-id'),
                    categoryName: e.target.value
                }
            });
            return false;
        }

        if (e.target.name === 'sideSelect') {
            setAddMenu({
                ...addMenu,
                [e.target.name]: {
                    sideSq: e.target.getAttribute('data-id'),
                    sideName: e.target.value
                }
            });
            return false;
        }

        if (e.target.name === 'menuPrice') {
            const check = /^[0-9 ]*$/;
            if (check.test(e.target.value)) {
                setAddMenu({
                    ...addMenu,
                    [e.target.name]: e.target.value
                });
                return false;
            } else {
                return false;
            }
        }
        setAddMenu({
            ...addMenu,
            [e.target.name]: e.target.value
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
                                               addMenuChange(e);
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
                                    <input type="text" value={addMenu.categorySelect.categoryName || ""}
                                           className="M-input-text M-font M-mini-size menuInputDiv"
                                           id="categorySelect" readOnly onClick={function () {
                                        setCategoryStatus(!categoryStatus);
                                    }}
                                    />
                                    {
                                        categoryStatus ? (
                                            <CategorySelectList category={category}
                                                                changeCategory={addMenuChange}/>) : (<></>)
                                    }
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사이드
                                </div>
                                <div className="M-flex-1 M-flex-column M-flex-center menuInputDiv"
                                     style={{position: 'relative'}}>
                                    <input type="text" className="M-input-text M-font M-mini-size"
                                           value={addMenu.sideSelect.sideName}
                                           id="sideSelect" readOnly onClick={function () {
                                        setSideStatus(!sideStatus);
                                    }}/>
                                    {
                                        sideStatus ? (
                                            <SideSelectList side={side} changeSide={addMenuChange}/>) : (<></>)
                                    }
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">

                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    <div className="O-side-select-close" onClick={saveMenu}
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
                                       id="progress-small-menu">{addMenuSmallText}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMenu;