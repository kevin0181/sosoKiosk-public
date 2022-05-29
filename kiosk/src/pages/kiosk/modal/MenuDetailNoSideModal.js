import serverUrl from "../../config/server.json";
import {useEffect, useState} from "react";

const MenuDetailNoSideModal = ({menuModalStatus, menuModalContentChange}) => {

    const [detailMenu, setDetailMenu] = useState([]);
    const [detailMenuImg, setDetailMenuImg] = useState([]);

    useEffect(() => {
        setDetailMenu(menuModalStatus.menu);
        setDetailMenuImg(menuModalStatus.menu.imgDTOList);
    }, []);

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

    return (
        <div className="O-modal-back" id="menuOrSideModal" style={{display: 'block'}}>
            <div className="O-modal O-menu-modal">
                <div className="O-modal-content">
                    <div className="O-modal-header">
                        <div className="O-modal-close-Btn">
                            <div className="O-close O-close3" id="modalCloseBtn" onClick={close}></div>
                        </div>
                        <div className="O-modal-top">
                            <div className="O-modal-top-title M-font">
                                <p>메뉴 수량 선택</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                    </div>
                    <div className="O-modal-side-order M-overlay">
                        <div className="O-side-order-part">
                            <div className="M-container M-flex-row M-flex-center">
                                <div className="O-select-mini-card" style={{width: '60%'}}>
                                    <div className="O-mini-card-header"
                                         style={{width: '70%', height: '200px'}}>
                                        <div className="O-mini-card-header-img">
                                            {
                                                detailMenuImg.map((it) => (
                                                    <img className="O-mini-img"
                                                         src={'http://' + serverUrl.server + it.imgPath +
                                                             '/' + it.imgName}
                                                         alt={'메뉴 이미지'}/>
                                                ))
                                            }

                                        </div>
                                    </div>
                                    <div className="O-mini-card-body">
                                        <div className="O-mini-card-body-content">
                                            <p className="M-font O-font-mini-size">{detailMenu.menuName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="O-menu-side-number M-flex-column M-flex-center">
                                    <div className="side-number-top M-font O-font-middle-size">+
                                    </div>
                                    <div className="M-font O-font-middle-size">
                                        <p>1</p>
                                    </div>
                                    <div className="side-number-bottom M-font O-font-middle-size">-
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-footer">
                        <div className="O-side-select-menu-part-left M-flex-row M-flex-center">
                        </div>
                        <div className="O-side-select-part w-M-overlay">
                            <div className="O-side-select-menu-part">
                                <div className="O-side-select-close M-flex-column M-flex-center"
                                     style={{width: '100%', height: '80%', backgroundColor: '#eb8282'}}>
                                    <p className="M-font O-font-middle-size">메뉴 추가</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;

}
export default MenuDetailNoSideModal;