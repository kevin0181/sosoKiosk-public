import {useEffect, useState} from "react";
import serverUrl from "../../config/server.json";

const MenuDetailModal = ({menuModalStatus, menuModalContentChange}) => {

    const close = () => {
        menuModalContentChange({
            status: false,
            param: '',
            modalType: '',
            modalTitle: '',
            modalContent: '',
            menu: ''
        })
    }

    const [sideCategory, setSideCategory] = useState([]);
    const [sideMenu, setSideMenu] = useState([]);

    useEffect(() => {

        console.log(sideCategory);
        console.log(sideMenu);

    }, [sideCategory, sideMenu]);

    useEffect(() => { //처음 시작할때.

        setSideCategory(menuModalStatus.menu.side[0].sideCategoryDTOList); //사이드 카테고리 넣음
        if (menuModalStatus.menu.side[0].sideCategoryDTOList[0].menuSideDTOList.length !== 0) {
            setSideMenu([menuModalStatus.menu.side[0].sideCategoryDTOList[0].menuSideDTOList[0]]);
        }

    }, [menuModalStatus]);

    return (
        <div className="O-modal-back"
             id="menuOrSideModal">
            <div className="O-modal">
                <div className="O-modal-content">
                    <div className="O-modal-header">
                        <div className="O-modal-close-Btn">
                            <div className="O-close O-close3" onClick={close}
                                 id="modalCloseBtn"></div>
                        </div>
                        <div className="O-modal-top">
                            <div className="O-modal-top-title M-font">
                                <p>사이드 메뉴 선택</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                        {
                            sideCategory.map((it) => (
                                <div className="O-category-part" key={it.sideCategorySq}>
                                    <div className="M-font O-font-mini-size O-category-box O-category-click-color">
                                        <p>{it.sideCategoryName}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="O-modal-side-order M-overlay">
                        <div className="O-side-order-part">

                            {
                                sideMenu.map((it) => (
                                    <div className="O-side-order-card" key={it.menuSideSq}>
                                        <div className="O-menu-side-img">
                                            <img className="O-side-img" alt={'사이드 이미지'}
                                                 src={'http://' + serverUrl.server + it.menuSideImgDTOList[0].menuSideImgPath +
                                                     '/' + it.menuSideImgDTOList[0].menuSideImgName}/>
                                        </div>
                                        <div
                                            className="O-menu-side-name M-font O-font-middle-size M-flex-column M-flex-center">
                                            <p style={{fontSize: '85%'}}>{it.menuSideName}</p>
                                            <small
                                                className="O-side-mini-size-font">{'가격 ' + it.menuSidePrice}</small>
                                        </div>
                                        <div className="O-menu-side-number M-flex-column M-flex-center">
                                            <div className="side-number-top M-font O-font-middle-size">+
                                            </div>
                                            <div className="M-font O-font-middle-size"><p>0</p></div>
                                            <div className="side-number-bottom M-font O-font-middle-size">-
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <div className="O-modal-side-footer">
                        <div
                            className="O-side-select-menu-part-left M-flex-row M-flex-center O-side-select-menu-part-left2">
                            <div className="O-select-mini-card" style={{width: '85%'}}>
                                <div className="O-mini-card-header">
                                    <div className="O-mini-card-header-img">
                                        <img className="O-mini-img" alt={'선택된 메뉴 이미지'}
                                             src={'http://' + serverUrl.server + menuModalStatus.menu.imgDTOList[0].imgPath
                                                 + '/' + menuModalStatus.menu.imgDTOList[0].imgName}/>
                                    </div>
                                </div>
                                <div className="O-mini-card-body">
                                    <div className="O-mini-card-body-content">
                                        <p className="M-font O-font-mini-size">{menuModalStatus.menu.menuName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="O-menu-side-number M-flex-column M-flex-center">
                                <div className="side-number-top M-font O-font-middle-size">+
                                </div>
                                <div className="M-font O-font-middle-size"><p>1</p></div>
                                <div className="side-number-bottom M-font O-font-middle-size">-
                                </div>
                            </div>
                        </div>
                        <div className="O-side-select-part w-M-overlay">
                            <div className="O-side-select-menu-part">
                                <div className="O-side-select-card O-side-select-card13" name="selectSideCardName">
                                    <div className="O-side-select-number">
                                        <p className="M-font O-font-number-size" name="sideSelectSize13">1</p>
                                    </div>
                                    <div className="O-side-mini-close-Btn">
                                        <div className="O-close O-close2"></div>
                                    </div>
                                    <div className="O-side-select-name M-flex-column M-flex-center">
                                        <p className="M-font O-font-mini-size">음료1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="O-side-select-ok-part">
                            <div className="O-side-select-ok">
                                <p className="M-font O-font-middle-size">선택 완료</p>
                            </div>
                            <div className="O-side-select-close">
                                <p className="M-font O-font-middle-size" onClick={close}>닫기</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );

}
export default MenuDetailModal;