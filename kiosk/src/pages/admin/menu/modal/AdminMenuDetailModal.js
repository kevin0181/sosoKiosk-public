import serverUrl from "../../../config/server.json";
import {useEffect, useState} from "react";
import {getCategoryList, getSideList} from "../../../../js/admin/menu/addMenu";
import axios from "axios";
import $ from "jquery";
import CategorySelectList from "../addMenu/CategorySelectList";
import SideSelectList from "../addMenu/SideSelectList";
import {getMenuList} from "../../../../js/admin/menu/AllMenu";

const AdminMenuDetailModal = ({modalStatus, modalContentChange, changeMenuData, setDataFun, data}) => {


    useEffect(() => {
        if (changeMenuData.side.length !== 0) {
            setAddMenu({
                menuSq: changeMenuData.menuSq,
                menuName: changeMenuData.menuName,
                menuPrice: changeMenuData.menuPrice,
                categorySelect: {
                    categorySq: changeMenuData.categorySq,
                    categoryName: changeMenuData.categoryDTO.categoryName
                },
                sideSelect: {
                    sideSq: changeMenuData.side[0].sideSq,
                    sideName: changeMenuData.side[0].sideName
                },
                menuSoldOut: changeMenuData.menuSoldOut,
                menuEnable: changeMenuData.menuEnable
            });
        } else {
            setAddMenu({
                menuSq: changeMenuData.menuSq,
                menuName: changeMenuData.menuName,
                menuPrice: changeMenuData.menuPrice,
                categorySelect: {
                    categorySq: changeMenuData.categorySq,
                    categoryName: changeMenuData.categoryDTO.categoryName
                },
                sideSelect: {
                    sideSq: '',
                    sideName: ''
                },
                menuSoldOut: changeMenuData.menuSoldOut,
                menuEnable: changeMenuData.menuEnable
            });
        }
    }, []);

    const closeBtn = () => {
        modalContentChange({
            status: false,
            param: '',
            modalType: '',
            modalTitle: '',
            modalContent: '',
            sendId: '',
            sendName: ''
        });
    }


    //카테고리
    const [category, setCategory] = useState([]);
    const [categoryStatus, setCategoryStatus] = useState(false);

    //이미지
    const [menuImg, setMenuImg] = useState({
        img: null,
        imgUrl: null
    });
    const [imgStatus, setImgStatus] = useState(false);

    //사이드
    const [side, setSide] = useState([]);
    const [sideStatus, setSideStatus] = useState(false);

    //스피너
    const [spinner, setSpinner] = useState(true);

    const imgCheck = (imgDTOList) => {

        if (imgStatus === false) {
            if (imgDTOList.length === 0) {

                return <img id="admin-main-menu-select-img" className="admin-main-select-img"
                            alt={'수정 메뉴 사진'}/>

            } else {
                return <img className="admin-main-select-img" alt={'메뉴'} id="admin-main-menu-select-img"
                            src={'http://' + serverUrl.server + imgDTOList[0].imgPath + '/' + imgDTOList[0].imgName}/>
            }
        } else {
            return <img id="admin-main-menu-select-img" className="admin-main-select-img" src={menuImg.imgUrl}
                        alt={'수정 메뉴 사진'}/>
        }

    }

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
        menuSq: '',
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
        menuSoldOut: false,
        menuEnable: false,
        setStatus: false
    });

    const changeMenuForm = () => {

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
        formData.append('menuSq', addMenu.menuSq);
        formData.append('categorySq', addMenu.categorySelect.categorySq);
        formData.append('menuName', addMenu.menuName);
        formData.append('menuPrice', addMenu.menuPrice);
        formData.append('sideSq', addMenu.sideSelect.sideSq);
        formData.append('menuSoldOut', addMenu.menuSoldOut);
        formData.append('menuEnable', addMenu.menuEnable);

        if (imgStatus) {
            if (menuImg.img === '') {
                setAddMenuSmallText('이미지를 지정해주세요.');
                return false;
            } else {
                formData.append('menuImg', menuImg.img);
            }
        }

        const response = axios.post('http://' + serverUrl.server + '/admin/menu/change/menu', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            maxRedirects: 0
        });

        response.then(function (res) {

            setAddMenu({
                menuSq: '',
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
                menuSoldOut: false,
                menuEnable: false
            });

            setMenuImg({
                img: '',
                imgUrl: ''
            });

            getMenuList().then(function (all) {
                setDataFun({
                    ...data,
                    all
                });
                setSpinner(false);
            });

            $('#menu.js-fileUrl').text('');

            modalContentChange({
                status: true,
                modalType: 'adminTotalModal',
                modalTitle: '알림 메시지',
                modalContent: '수정이 완료되었습니다.'
            });

        });

    }

    const changeMenuChange = (e) => {

        setCategoryStatus(false);
        setSideStatus(false);

        if (e.target.name === 'menuImg') {
            const uploadFile = e.target.files[0]
            $("#menu.js-fileUrl").text(uploadFile.name);
            setImgStatus(true);
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
        <div className="O-modal-back menu-detail-modal">
            {
                spinner ? (
                    <div className='spinner' style={{zIndex: '21', top: '50%'}}>
                        <div className='block'>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
            <div className="O-modal">
                <div className="O-modal-content">
                    <div className="O-modal-header">
                        <div className="O-modal-close-Btn">
                            <div className="O-close O-close3" id="modalCloseBtn" onClick={closeBtn}></div>
                        </div>
                        <div className="O-modal-top">
                            <div className="O-modal-top-title M-font">
                                <p className="M-font-30-size">{modalStatus.modalTitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                        <div className="O-category-part" id="menuPart">
                            <div className="M-font M-font-20-size O-category-box O-category-box-menu">
                                <p>메뉴</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-order" id="menuDetailPartParent" style={{padding: '5px 20px'}}>
                        <div className="O-side-order-part O-side-order-part-menu" id="menuDetailPart"
                             style={{padding: '10px'}}>
                            <form id="addMenuForm" className="M-flex-column admin-main-left-flex" method="post"
                                  encType="multipart/form-data">
                                <input type="hidden" id="menuSq" name="menuSq"/>
                                <div className="M-flex-row M-font M-font-25-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                        메뉴 이름
                                    </div>
                                    <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                        <input type="text" className="M-input-text M-font M-font-15-size" id="menuName"
                                               value={addMenu.menuName}
                                               onChange={changeMenuChange}
                                               name="menuName"/>
                                    </div>
                                </div>
                                <div className="M-flex-row M-font M-font-25-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                        사진 업로드
                                    </div>
                                    <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                        <input type="file" className="M-none-design M-font-15-size" id="menu-file"
                                               onChange={changeMenuChange}
                                               name="menuImg"
                                               accept="image/*"/>
                                        <label className="M-input-text M-font-15-size" id="menu-fileUrl" htmlFor="menu-file"
                                               style={{overflow: 'hidden'}}>이미지 변경을 원하시면 선택하세요.
                                        </label>
                                    </div>
                                </div>
                                <div className="M-flex-row M-font M-font-25-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                        가격
                                    </div>
                                    <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                        <input type="text" className="M-input-text M-font M-font-15-size"
                                               id="menuPrice"
                                               name="menuPrice"
                                               value={addMenu.menuPrice}
                                               onChange={changeMenuChange}/>
                                    </div>
                                </div>
                                <div className="M-flex-row M-font M-font-25-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                        카테고리
                                    </div>
                                    <div className="M-flex-1 M-flex-column M-flex-center"
                                         style={{position: 'relative'}}>
                                        <input type="text"
                                               className="M-input-text M-font M-font-15-size menuInputDiv"
                                               value={addMenu.categorySelect.categoryName}
                                               onChange={changeMenuChange}
                                               onClick={function () {
                                                   setSideStatus(false);
                                                   setCategoryStatus(!categoryStatus);
                                               }}
                                               id="categorySelect"
                                               readOnly/>
                                        {
                                            categoryStatus ? (
                                                <CategorySelectList category={category}
                                                                    changeCategory={changeMenuChange}/>) : (<></>)
                                        }
                                    </div>
                                </div>
                                <div className="M-flex-row M-font M-font-25-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                        사이드
                                    </div>
                                    <div className="M-flex-1 M-flex-column M-flex-center menuInputDiv"
                                         style={{position: 'relative'}}>
                                        {
                                            changeMenuData.side.length !== 0 ? (
                                                <input type="text" className="M-input-text M-font M-font-15-size"
                                                       id="sideSelect" value={addMenu.sideSelect.sideName}
                                                       readOnly onClick={function () {
                                                    setCategoryStatus(false);
                                                    setSideStatus(!sideStatus);
                                                }}/>) : (
                                                <input type="text" className="M-input-text M-font M-font-15-size"
                                                       id="sideSelect" value={addMenu.sideSelect.sideName}
                                                       readOnly onClick={function () {
                                                    setCategoryStatus(false);
                                                    setSideStatus(!sideStatus);
                                                }}/>)
                                        }
                                        {
                                            sideStatus ? (
                                                <SideSelectList side={side} changeSide={changeMenuChange}/>) : (<></>)
                                        }
                                        <div className="M-input-select-div" id="sideSelectOption"
                                             style={{display: 'none'}}>
                                            <input type="text" value="사이드 선택 안함" name="0"
                                                   className="M-input-select M-font M-mini-size M-input-select-middle"
                                                   readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">

                                    </div>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                    </div>
                                </div>
                            </form>
                            <div className="M-flex-column admin-main-right-flex" id="menuDetailImg">
                                <div className="admin-main-img">
                                    <div className="img-part M-flex-column M-flex-center">
                                        <p className="M-font M-font-20-size" id="admin-main-menu-select-img-top-p">메뉴
                                            이미지</p>
                                        {
                                            imgCheck(changeMenuData.imgDTOList)
                                        }
                                    </div>
                                </div>
                                <div className="admin-progress-bar" style={{padding: '10px 60px'}}>
                                    <div className="admin-progress-bar-div" style={{textAlign: 'center'}}>
                                        <small className="M-font" style={{fontSize: '25px'}}
                                               id="progress-small-menu">{addMenuSmallText}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-footer">
                        <div className="O-side-select-part" id="menuDetailFooter">
                            <div className="M-container M-flex-row M-flex-center">
                                <div className="M-container M-flex-row M-flex-center" style={{width: '50%'}}>
                                    <p className="M-font M-font-25-size">품절</p>
                                    <input type="checkbox" className="M-input-checkBox"
                                           checked={addMenu.menuSoldOut}
                                           onChange={() => {
                                               setAddMenu({
                                                   ...addMenu,
                                                   menuSoldOut: !addMenu.menuSoldOut
                                               })
                                           }}
                                           id="menuSoldOut-checkBox"/>
                                    <label htmlFor="menuSoldOut-checkBox"></label>
                                </div>
                                <div className="M-container M-flex-row M-flex-center" style={{width: '50%'}}>
                                    <p className="M-font M-font-25-size">메뉴 숨기기</p>
                                    <input type="checkbox" className="M-input-checkBox"
                                           checked={addMenu.menuEnable}
                                           onChange={() => {
                                               setAddMenu({
                                                   ...addMenu,
                                                   menuEnable: !addMenu.menuEnable
                                               })
                                           }}
                                           id="menuEnable-checkBox"/>
                                    <label htmlFor="menuEnable-checkBox"></label>
                                </div>
                                <div className="M-container M-flex-row M-flex-center" style={{width: '50%'}}>
                                    <p className="M-font M-font-25-size">세트</p>
                                    <input type="checkbox" className="M-input-checkBox"
                                           checked={addMenu.setStatus}
                                           onChange={() => {
                                               setAddMenu({
                                                   ...addMenu,
                                                   setStatus: !addMenu.setStatus
                                               })
                                           }}
                                           id="setStatus-checkBox"/>
                                    <label htmlFor="setStatus-checkBox"></label>
                                </div>
                            </div>
                        </div>
                        <div className="O-side-select-ok-part"
                             style={{width: '35%', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="O-side-select-ok M-flex-row M-flex-center" id="menuChangeBtn"
                                 style={{margin: '0px 5px 0px 0px', height: '50%', backgroundColor: 'white'}}>
                                <div className="O-side-select-ok M-flex-row M-flex-center" id="menuChangeBtn"
                                     onClick={changeMenuForm}
                                     style={{margin: '0px 5px 0px 0px'}}>
                                    <p className="M-font M-font-30-size">수정 완료</p>
                                </div>
                            </div>
                            <input type="hidden" id="changeStatus"/>
                            <div className="O-side-select-close M-flex-row M-flex-center" id="menuDetailCloseBtn"
                                 onClick={closeBtn}
                                 style={{margin: '0px 0px 0px 5px'}}>
                                <p className="M-font M-font-30-size">닫기</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default AdminMenuDetailModal;