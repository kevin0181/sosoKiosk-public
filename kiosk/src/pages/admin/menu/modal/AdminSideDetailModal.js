import {useEffect, useState} from "react";
import {getSideList} from "../../../../js/admin/menu/addMenu";
import {getSideCategoryList} from "../../../../js/admin/menu/side";

const AdminSideDetailModal = ({modalStatus, modalContentChange, changeSideData, setDataFun, data}) => {


    useEffect(() => {

        setAddSideMenu({
            menuSideSq: changeSideData.menuSideSq,
            menuSideName: changeSideData.menuSideName,
            menuSidePrice: changeSideData.menuSidePrice,
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
        });
    }, []);


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
                                <p>사이드 메뉴 수정</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                        <div className="O-category-part">
                            <div className="M-font O-font-mini-size O-category-box"
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
                                    <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                        <div className="M-flex-1 M-flex-row M-flex-center">
                                            사이드 메뉴 이름
                                        </div>
                                        <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                            <input type="text" className="M-input-text M-font M-mini-size"
                                                   id="menu-side-name"
                                                   name="menuSideName"/>
                                        </div>
                                    </div>
                                    <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                        <div className="M-flex-1 M-flex-row M-flex-center">
                                            사진 업로드
                                        </div>
                                        <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                            <input type="file" className="M-none-design" id="side-file"
                                                   name="menuSideImg"
                                                   accept="image/*"/>
                                            <label className="M-input-text" id="side-fileUrl"
                                                   htmlFor="side-file"
                                                   style={{fontSize: '20px', overflow: 'hidden'}}>이미지 변경을 원하시면 선택하세요.
                                            </label>
                                        </div>
                                    </div>
                                    <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                        <div className="M-flex-1 M-flex-row M-flex-center">
                                            가격
                                        </div>
                                        <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                            <input type="text" className="M-input-text M-font M-mini-size"
                                                   id="menuSidePrice"
                                                   name="menuSidePrice"/>
                                        </div>
                                    </div>
                                    <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                        <div className="M-flex-1 M-flex-row M-flex-center">
                                            사이드
                                        </div>
                                        <div className="M-flex-1 M-flex-column M-flex-center sideMenuInputDiv"
                                             style={{position: 'relative'}}>
                                            <input type="text" value="" className="M-input-text M-font M-mini-size"
                                                   id="sideSelectByAddSide"
                                                   readOnly/>
                                            <div className="M-input-select-div" id="sideSelectByAddSideOption"
                                                 style={{display: 'none'}}>
                                                <input type="text" value="side 1"
                                                       className="M-input-select M-font M-mini-size M-input-select-middle"
                                                       readOnly/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                        <div className="M-flex-1 M-flex-row M-flex-center">
                                            사이드 카테고리
                                        </div>
                                        <div className="M-flex-1 M-flex-column M-flex-center sideMenuInputDiv"
                                             style={{position: 'relative'}}>
                                            <input type="text" className="M-input-text M-font M-mini-size"
                                                   id="sideCategorySelect"
                                                   readOnly/>
                                            <div className="M-input-select-div" id="sideCategorySelectOption"
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
                                                <p className="M-font O-font-middle-size" style={{fontSize: '40px'}}>사이드
                                                    메뉴
                                                    업로드</p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="M-flex-column admin-main-right-flex">
                                <div className="admin-main-img">
                                    <div className="img-part M-flex-column M-flex-center">
                                        <p className="M-font M-mini-size">미리보기</p>
                                        <img id="admin-main-side-select-img" className="admin-main-select-img"
                                             style={{display: 'none'}}/>
                                    </div>
                                </div>
                                <div className="admin-progress-bar" style={{padding: '10px 60px'}}>
                                    <div className="admin-progress-bar-div" style={{textAlign: 'center'}}>
                                        <small className="M-font" style={{fontSize: '25px'}}
                                               id="progress-small-side"></small>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="O-modal-side-footer" style={{padding: '30px 0px'}}>
                        <div className="O-side-select-part">
                            <div className="M-container M-flex-row M-flex-center">
                                <div className="M-container M-flex-row M-flex-center" style={{width: '50%'}}>
                                    <p className="M-font O-font-middle-size">품절</p>
                                    <input type="checkbox" className="M-input-checkBox" id="menuSideSoldOut-checkBox"/>
                                    <label htmlFor="menuSideSoldOut-checkBox"></label>
                                </div>
                                <div className="M-container M-flex-row M-flex-center" style={{width: '50%'}}>
                                    <p className="M-font O-font-middle-size">메뉴 숨기기</p>
                                    <input type="checkbox" className="M-input-checkBox" id="menuSideEnable-checkBox"/>
                                    <label htmlFor="menuSideEnable-checkBox"></label>
                                </div>
                            </div>
                        </div>
                        <div className="O-side-select-ok-part"
                             style={{width: '35%', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="O-side-select-ok M-flex-row M-flex-center"
                                 style={{margin: '0px 5px 0px 0px', height: '70%', backgroundColor: 'white'}}>
                            </div>
                            <div className="O-side-select-close M-flex-row M-flex-center"
                                 onClick={closeBtn}
                                 style={{margin: '0px 0px 0px 5px'}}>
                                <p className="M-font O-font-middle-size">닫기</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default AdminSideDetailModal;