import {useEffect, useState} from "react";
import {getSideCategoryList, getSideMenuList} from "../../../../js/admin/menu/side";
import serverUrl from "../../../config/server.json";
import $ from "jquery";
import SideSelectList from "../addMenu/SideSelectList";
import SideCategorySelectList from "../sideMenu/SideCategorySelectList";
import axios from "axios";
import {getSideList} from "../../../../js/admin/menu/addMenu";

const AdminSideDetailModal = ({modalStatus, modalContentChange, changeSideData, setDataFun, data}) => {


    useEffect(() => {

        setAddSideMenu({
            menuSideSq: changeSideData.menuSideSq,
            menuSideName: changeSideData.menuSideName,
            menuSidePrice: changeSideData.menuSidePrice,
            sideSelect: {
                sideSq: changeSideData.sideCategoryDTO.sideDTO.sideSq,
                sideName: changeSideData.sideCategoryDTO.sideDTO.sideName
            },
            sideCategorySelect: {
                sideCategorySq: changeSideData.sideCategoryDTO.sideCategorySq,
                sideCategoryName: changeSideData.sideCategoryDTO.sideCategoryName
            },
            menuSideSoldOut: changeSideData.menuSideSoldOut,
            menuSideEnable: changeSideData.menuSideEnable
        });

    }, []);


    //사이드
    const [side, setSide] = useState([]);
    const [sideStatus, setSideStatus] = useState(false);

    //스피너
    const [spinner, setSpinner] = useState(true);

    //사이드 카테고리
    const [sideCategory, setSideCategory] = useState([]);
    const [sideCategoryStatus, setSideCategoryStatus] = useState(false);

    const [addMenuSmallText, setAddMenuSmallText] = useState('');

    //이미지
    const [menuImg, setMenuImg] = useState({
        img: null,
        imgUrl: null
    });
    const [imgStatus, setImgStatus] = useState(false);


    const [addSideMenu, setAddSideMenu] = useState({
        menuSideSq: '',
        menuSideName: '',
        menuSidePrice: '',
        sideSelect: {
            sideSq: '',
            sideName: ''
        },
        sideCategorySelect: {
            sideCategorySq: '',
            sideCategoryName: ''
        },
        menuSideSoldOut: false,
        menuSideEnable: false
    });

    const getSideCategorySelectData = () => {
        setSpinner(true);
        setSideStatus(false);
        setSideCategoryStatus(!sideCategoryStatus);
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

    const imgCheck = (imgDTOList) => {

        if (imgStatus === false) {
            if (imgDTOList.length === 0) {
                return <img id="admin-main-side-select-img" className="admin-main-select-img"
                            alt={'수정 메뉴 사진'}/>

            } else {
                return <img className="admin-main-select-img" alt={'메뉴'} id="admin-main-side-select-img"
                            src={'http://' + serverUrl.server + imgDTOList[0].menuSideImgPath + '/' + imgDTOList[0].menuSideImgName}/>
            }
        } else {
            return <img id="admin-main-side-select-img" className="admin-main-select-img" src={menuImg.imgUrl}
                        alt={'수정 메뉴 사진'}/>
        }

    }

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

    useEffect(() => {
        getSideList().then(function (res) {
            setSide(res);
            setSpinner(false);
            console.log(res);
        });
    }, []);

    const saveSideMenu = () => {

        if (addSideMenu.menuSideName === '') {
            setAddMenuSmallText('사이드 메뉴 이름을 적어주세요.');
            return false;
        }

        if (addSideMenu.menuSidePrice === '') {
            setAddMenuSmallText('가격을 적어주세요.');
            return false;
        }

        if (addSideMenu.sideSelect.sideSq === '') {
            setAddMenuSmallText('사이드를 지정해주세요.');
            return false;
        }

        if (addSideMenu.sideCategorySelect.sideCategorySq === '') {
            setAddMenuSmallText('사이드 카테고리를 지정해주세요.');
            return false;
        }

        setSpinner(true);
        const formData = new FormData();
        formData.append('menuSideSq', addSideMenu.menuSideSq)
        formData.append('sideSq', addSideMenu.sideSelect.sideSq);
        formData.append('sideCategorySq', addSideMenu.sideCategorySelect.sideCategorySq);
        formData.append('menuSideName', addSideMenu.menuSideName);
        formData.append('menuSidePrice', addSideMenu.menuSidePrice);
        formData.append('menuSideSoldOut', addSideMenu.menuSideSoldOut);
        formData.append('menuSideEnable', addSideMenu.menuSideEnable);

        if (imgStatus) {
            if (menuImg.img === '') {
                setAddMenuSmallText('이미지를 지정해주세요.');
                return false;
            } else {
                formData.append('menuSideImg', menuImg.img);
            }
        }

        const response = axios.post('http://' + serverUrl.server + '/admin/menu/change/sideMenu', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            maxRedirects: 0
        });

        response.then(function (res) {

            setAddSideMenu({
                menuSideSq: '',
                menuSideName: '',
                menuSidePrice: '',
                sideSelect: {
                    sideSq: '',
                    sideName: ''
                },
                sideCategorySelect: {
                    sideCategorySq: '',
                    sideCategoryName: ''
                },
                menuSideSoldOut: false,
                menuSideEnable: false
            });

            setMenuImg({
                img: '',
                imgUrl: ''
            });

            $('#side-fileUrl').text('');

            getSideMenuList().then(function (sideAll) {
                setDataFun({
                    ...data,
                    sideAll
                });
                setSpinner(false);
            });

            modalContentChange({
                status: true,
                modalType: 'adminTotalModal',
                modalTitle: '알림 메시지',
                modalContent: '저장이 완료되었습니다.'
            });

        });

    }


    const changeAddSideMenu = (e) => {

        setSideStatus(false);
        setSideCategoryStatus(false);

        if (e.target.name === 'menuSideImg') {
            const uploadFile = e.target.files[0]
            setImgStatus(true);
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

    return (
        <div className="O-modal-back menu-detail-modal" id="sideMenuDetailModal">
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
                                <p className="M-font-30-size">{changeSideData.menuSideName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                        <div className="O-category-part">
                            <div className="M-font M-font-20-size O-category-box"
                                 style={{backgroundColor: '#838383'}}>
                                <p>사이드 메뉴</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-order" style={{padding: '5px 20px'}}>
                        <div className="O-side-order-part" style={{padding: '10px'}}>
                            <div className="M-flex-column admin-main-left-flex" style={{marginTop: '25px'}}>
                                <form id="changeSideMenuForm" method="post" encType="multipart/form-data">
                                    <input type="hidden" name="menuSideSq" id="menuSideSq"/>
                                    <div className="M-flex-row M-font M-font-25-size" style={{marginBottom: '25px'}}>
                                        <div className="M-flex-1 M-flex-row M-flex-center">
                                            사이드 메뉴 이름
                                        </div>
                                        <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                            <input type="text" className="M-input-text M-font M-font-15-size"
                                                   id="menu-side-name" value={addSideMenu.menuSideName}
                                                   onChange={changeAddSideMenu}
                                                   name="menuSideName"/>
                                        </div>
                                    </div>
                                    <div className="M-flex-row M-font M-font-25-size" style={{marginBottom: '25px'}}>
                                        <div className="M-flex-1 M-flex-row M-flex-center">
                                            사진 업로드
                                        </div>
                                        <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                            <input type="file" className="M-none-design M-font-15-size" id="side-file"
                                                   name="menuSideImg" onChange={changeAddSideMenu}
                                                   accept="image/*"/>
                                            <label className="M-input-text M-font-15-size" id="side-fileUrl"
                                                   htmlFor="side-file"
                                                   style={{overflow: 'hidden'}}>이미지 변경을 원하시면 선택하세요.
                                            </label>
                                        </div>
                                    </div>
                                    <div className="M-flex-row M-font M-font-25-size" style={{marginBottom: '25px'}}>
                                        <div className="M-flex-1 M-flex-row M-flex-center">
                                            가격
                                        </div>
                                        <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                            <input type="text" className="M-input-text M-font M-font-15-size"
                                                   id="menuSidePrice" value={addSideMenu.menuSidePrice}
                                                   onChange={changeAddSideMenu}
                                                   name="menuSidePrice"/>
                                        </div>
                                    </div>
                                    <div className="M-flex-row M-font M-font-25-size" style={{marginBottom: '25px'}}>
                                        <div className="M-flex-1 M-flex-row M-flex-center">
                                            사이드
                                        </div>
                                        <div className="M-flex-1 M-flex-column M-flex-center sideMenuInputDiv"
                                             style={{position: 'relative'}}>
                                            <input type="text" className="M-input-text M-font M-font-15-size"
                                                   id="sideSelectByAddSide" value={addSideMenu.sideSelect.sideName}
                                                   onClick={function () {
                                                       setSideCategoryStatus(false);
                                                       setSideStatus(!sideStatus);
                                                   }}
                                                   readOnly/>
                                            {
                                                sideStatus ? (
                                                    <SideSelectList side={side} changeSideData={changeSideData}
                                                                    changeSide={changeAddSideMenu}/>) : (<></>)
                                            }
                                        </div>
                                    </div>
                                    <div className="M-flex-row M-font M-font-25-size" style={{marginBottom: '25px'}}>
                                        <div className="M-flex-1 M-flex-row M-flex-center">
                                            사이드 카테고리
                                        </div>
                                        <div className="M-flex-1 M-flex-column M-flex-center sideMenuInputDiv"
                                             style={{position: 'relative'}}>
                                            <input type="text" className="M-input-text M-font M-font-15-size"
                                                   id="sideCategorySelect" onClick={getSideCategorySelectData}
                                                   value={addSideMenu.sideCategorySelect.sideCategoryName}
                                                   readOnly/>
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
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="M-flex-column admin-main-right-flex">
                                <div className="admin-main-img">
                                    <div className="img-part M-flex-column M-flex-center">
                                        <p className="M-font M-font-20-size">미리보기</p>
                                        {
                                            imgCheck(changeSideData.menuSideImgDTOList)
                                        }
                                    </div>
                                </div>
                                <div className="admin-progress-bar" style={{padding: '10px 60px'}}>
                                    <div className="admin-progress-bar-div" style={{textAlign: 'center'}}>
                                        <small className="M-font" style={{fontSize: '25px'}}
                                               id="progress-small-side">{addMenuSmallText}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-footer" style={{padding: '30px 0px'}}>
                        <div className="O-side-select-part">
                            <div className="M-container M-flex-row M-flex-center">
                                <div className="M-container M-flex-row M-flex-center" style={{width: '50%'}}>
                                    <p className="M-font M-font-25-size">품절</p>
                                    <input type="checkbox" className="M-input-checkBox"
                                           checked={addSideMenu.menuSideSoldOut}
                                           onChange={() => {
                                               setAddSideMenu({
                                                   ...addSideMenu,
                                                   menuSideSoldOut: !addSideMenu.menuSideSoldOut
                                               })
                                           }}
                                           id="menuSideSoldOut-checkBox"/>
                                    <label htmlFor="menuSideSoldOut-checkBox"></label>
                                </div>
                                <div className="M-container M-flex-row M-flex-center" style={{width: '50%'}}>
                                    <p className="M-font M-font-25-size">메뉴 숨기기</p>
                                    <input type="checkbox" className="M-input-checkBox"
                                           checked={addSideMenu.menuSideEnable}
                                           onChange={() => {
                                               setAddSideMenu({
                                                   ...addSideMenu,
                                                   menuSideEnable: !addSideMenu.menuSideEnable
                                               })
                                           }}
                                           id="menuSideEnable-checkBox"/>
                                    <label htmlFor="menuSideEnable-checkBox"></label>
                                </div>
                            </div>
                        </div>
                        <div className="O-side-select-ok-part"
                             style={{width: '35%', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="O-side-select-ok M-flex-row M-flex-center"
                                 style={{margin: '0px 5px 0px 0px', height: '70%', backgroundColor: 'white'}}>
                                <div className="O-side-select-ok M-flex-row M-flex-center" id="menuChangeBtn"
                                     onClick={saveSideMenu}
                                     style={{margin: '0px 5px 0px 0px'}}>
                                    <p className="M-font M-font-25-size">수정 완료</p>
                                </div>
                            </div>
                            <div className="O-side-select-close M-flex-row M-flex-center"
                                 onClick={closeBtn}
                                 style={{margin: '0px 0px 0px 5px'}}>
                                <p className="M-font M-font-25-size">닫기</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default AdminSideDetailModal;