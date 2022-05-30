import serverUrl from "../../config/server.json";
import {useEffect, useState} from "react";

const MenuDetailNoSideModal = ({menuModalStatus, menuModalContentChange, changeAllOrderData}) => {

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

    const saveDetailMenuOrder = () => {

        changeAllOrderData(orderMenuASideDetail);

        close();

    }

    const [orderMenuASideDetail, setOrderMenuASideDetail] = useState({
        menuSq: '',
        categorySq: '',
        menuName: '',
        menuPrice: 0,
        categoryDTO: {
            categorySq: '',
            categoryName: '',
        },
        imgDTOList: [{
            imgSq: '',
            menuSq: '',
            imgName: '',
            imgPath: '',
            imgDate: '',
            imgExtension: ''
        }],
        addSide: [
            // sideSq: '',
            // sideName: '',
            // sidePrice: 0,
            // sideSize: 0
        ],
        size: 0
    });

    useEffect(() => {
        if (menuModalStatus.menu.addSide.length === 0) {
            setOrderMenuASideDetail({
                ...orderMenuASideDetail,
                menuSq: menuModalStatus.menu.menuSq,
                categorySq: menuModalStatus.menu.categorySq,
                menuName: menuModalStatus.menu.menuName,
                menuPrice: Number(menuModalStatus.menu.menuPrice),
                categoryDTO: menuModalStatus.menu.categoryDTO,
                imgDTOList: menuModalStatus.menu.imgDTOList,
                size: 1
            });
        } else {
            setOrderMenuASideDetail({
                ...orderMenuASideDetail,
                menuSq: menuModalStatus.menu.menuSq,
                categorySq: menuModalStatus.menu.categorySq,
                menuName: menuModalStatus.menu.menuName,
                menuPrice: Number(menuModalStatus.menu.menuPrice),
                categoryDTO: menuModalStatus.menu.categoryDTO,
                imgDTOList: menuModalStatus.menu.imgDTOList,
                size: 1,
                addSide: menuModalStatus.menu.addSide
            });
        }
    }, []);

    const changeOrderMenu = (e) => {

        switch (e.target.id) {
            case 'mainMenuSizePlus': //메인 메뉴 사이즈 업
                let upSize = orderMenuASideDetail.size + 1

                setOrderMenuASideDetail({
                    ...orderMenuASideDetail,
                    size: upSize
                })
                break;
            case 'mainMenuSizeMinus': //메인 메뉴 사이즈 다운
                let downSize = orderMenuASideDetail.size - 1;

                if (downSize < 0) {
                    break;
                }

                setOrderMenuASideDetail({
                    ...orderMenuASideDetail,
                    size: downSize
                });
                break;
        }

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
                                    <div className="side-number-top M-font O-font-middle-size" onClick={changeOrderMenu}
                                         id={'mainMenuSizePlus'}>+
                                    </div>
                                    <div className="M-font O-font-middle-size">
                                        <p>{orderMenuASideDetail.size}</p>
                                    </div>
                                    <div className="side-number-bottom M-font O-font-middle-size"
                                         onClick={changeOrderMenu}
                                         id={'mainMenuSizeMinus'}>-
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
                                     onClick={saveDetailMenuOrder}
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