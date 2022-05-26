import serverUrl from "../../../config/server.json";
import {useEffect, useState} from "react";
import {getCategoryList, getSideList} from "../../../../js/admin/menu/addMenu";
import axios from "axios";
import $ from "jquery";
import CategorySelectList from "../addMenu/CategorySelectList";
import SideSelectList from "../addMenu/SideSelectList";

const AdminMenuDetailModal = ({modalStatus, modalContentChange, changeData, setDataFun}) => {


    useEffect(() => {
        if (changeData.side.length !== 0) {
            setAddMenu({
                menuName: changeData.menuName,
                menuPrice: changeData.menuPrice,
                categorySelect: {
                    categorySq: changeData.categorySq,
                    categoryName: changeData.categoryDTO.categoryName
                },
                sideSelect: {
                    sideSq: changeData.side[0].sideSq,
                    sideName: changeData.side[0].sideName
                },
                menuSoldOut: changeData.menuSoldOut,
                menuEnable: changeData.menuEnable
            });
        } else {
            setAddMenu({
                menuName: changeData.menuName,
                menuPrice: changeData.menuPrice,
                categorySelect: {
                    categorySq: changeData.categorySq,
                    categoryName: changeData.categoryDTO.categoryName
                },
                sideSelect: {
                    sideSq: '',
                    sideName: ''
                },
                menuSoldOut: changeData.menuSoldOut,
                menuEnable: changeData.menuEnable
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
        img: '',
        imgUrl: ''
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

    useEffect(() => {
        console.log(addMenu);
    }, [addMenu]);

    const saveMenu = () => {

        if (addMenu.menuName === '') {
            setAddMenuSmallText('메뉴 이름을 적어주세요.');
            return false;
        }

        if (menuImg.img === '') {
            setAddMenuSmallText('이미지를 지정해주세요.');
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

    const changeMenuChange = (e) => {

        setCategoryStatus(false);
        setSideStatus(false);

        if (e.target.name === 'menuImg') {
            const uploadFile = e.target.files[0]
            $("#menu-fileUrl").text(uploadFile.name);
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

        console.log(123);
        setAddMenu({
            ...addMenu,
            [e.target.name]: e.target.value
        });
    }


    return (
        <div className="O-modal-back menu-detail-modal">
            <div className="O-modal">
                <div className="O-modal-content">
                    <div className="O-modal-header">
                        <div className="O-modal-close-Btn">
                            <div className="O-close O-close3" id="modalCloseBtn" onClick={closeBtn}></div>
                        </div>
                        <div className="O-modal-top">
                            <div className="O-modal-top-title M-font">
                                <p>{modalStatus.modalTitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                        <div className="O-category-part" id="menuPart">
                            <div className="M-font O-font-mini-size O-category-box O-category-box-menu">
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
                                <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                        메뉴 이름
                                    </div>
                                    <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                        <input type="text" className="M-input-text M-font M-mini-size" id="menuName"
                                               value={addMenu.menuName}
                                               onChange={changeMenuChange}
                                               name="menuName"/>
                                    </div>
                                </div>
                                <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                        사진 업로드
                                    </div>
                                    <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                        <input type="file" className="M-none-design" id="menu-file"
                                               onChange={changeMenuChange}
                                               name="menuImg"
                                               accept="image/*"/>
                                        <label className="M-input-text" id="menu-fileUrl" htmlFor="menu-file"
                                               style={{fontSize: '20px', overflow: 'hidden'}}>이미지 변경을 원하시면 선택하세요.
                                        </label>
                                    </div>
                                </div>
                                <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                        가격
                                    </div>
                                    <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                        <input type="text" className="M-input-text M-font M-mini-size"
                                               id="menuPrice"
                                               name="menuPrice"
                                               value={addMenu.menuPrice}
                                               onChange={changeMenuChange}/>
                                    </div>
                                </div>
                                <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                        카테고리
                                    </div>
                                    <div className="M-flex-1 M-flex-column M-flex-center"
                                         style={{position: 'relative'}}>
                                        <input type="text"
                                               className="M-input-text M-font M-mini-size menuInputDiv"
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
                                <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                        사이드
                                    </div>
                                    <div className="M-flex-1 M-flex-column M-flex-center menuInputDiv"
                                         style={{position: 'relative'}}>
                                        {
                                            changeData.side.length !== 0 ? (
                                                <input type="text" className="M-input-text M-font M-mini-size"
                                                       id="sideSelect" value={addMenu.sideSelect.sideName}
                                                       readOnly onClick={function () {
                                                    setCategoryStatus(false);
                                                    setSideStatus(!sideStatus);
                                                }}/>) : (
                                                <input type="text" className="M-input-text M-font M-mini-size"
                                                       id="sideSelect" value={''}
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
                                        <div className="O-side-select-close"
                                             style={{marginTop: '0px', marginRight: '10px'}}>
                                            <p className="M-font">메뉴 수정</p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="M-flex-column admin-main-right-flex" id="menuDetailImg">
                                <div className="admin-main-img">
                                    <div className="img-part M-flex-column M-flex-center">
                                        <p className="M-font M-mini-size" id="admin-main-menu-select-img-top-p">메뉴
                                            이미지</p>
                                        {
                                            imgCheck(changeData.imgDTOList)
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
                                    <p className="M-font O-font-middle-size">품절</p>
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
                                    <p className="M-font O-font-middle-size">메뉴 숨기기</p>
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
                            </div>
                        </div>
                        <div className="O-side-select-ok-part"
                             style={{width: '35%', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="O-side-select-ok M-flex-row M-flex-center" id="menuChangeBtn"
                                 style={{margin: '0px 5px 0px 0px', height: '50%', backgroundColor: 'white'}}>
                            </div>
                            <input type="hidden" id="changeStatus"/>
                            <div className="O-side-select-close M-flex-row M-flex-center" id="menuDetailCloseBtn"
                                 onClick={closeBtn}
                                 style={{margin: '0px 0px 0px 5px', height: '50%'}}>
                                <p className="M-font O-font-middle-size">닫기</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default AdminMenuDetailModal;