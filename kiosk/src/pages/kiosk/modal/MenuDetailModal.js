import {useEffect, useState} from "react";
import serverUrl from "../../config/server.json";
import $ from 'jquery';

const MenuDetailModal = ({menuModalStatus, menuModalContentChange, changeAllOrderData, allOrderData}) => {

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

    useEffect(() => {
        console.log(menuModalStatus);
        setOrderMenuASideDetail(menuModalStatus.orderMenu);
    }, [menuModalStatus]);

    const saveDetailMenuOrder = () => {

        close();

        changeAllOrderData(orderMenuASideDetail);

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

    // useEffect(() => {
    //     console.log(orderMenuASideDetail);
    // }, [orderMenuASideDetail]);

    useEffect(() => {


        let getThisSelectData = allOrderData.filter((it) => it.menuSq === menuModalStatus.menu.menuSq)[0];

        setSideCategory(menuModalStatus.menu.side[0].sideCategoryDTOList); //사이드 카테고리 넣음
        if (menuModalStatus.menu.side[0].sideCategoryDTOList[0].menuSideDTOList.length !== 0) {
            setSideMenu(menuModalStatus.menu.side[0].sideCategoryDTOList[0].menuSideDTOList); //사이드 넣음
        }


        if (getThisSelectData === undefined || getThisSelectData === null) { //만약 선택된 메뉴가 없으면?

            if (menuModalStatus.menu.addSide.length === 0) {
                setOrderMenuASideDetail({
                    ...orderMenuASideDetail,
                    menuSq: menuModalStatus.menu.menuSq,
                    categorySq: menuModalStatus.menu.categorySq,
                    menuName: menuModalStatus.menu.menuName,
                    menuPrice: Number(menuModalStatus.menu.menuPrice),
                    categoryDTO: menuModalStatus.menu.categoryDTO,
                    imgDTOList: menuModalStatus.menu.imgDTOList,
                    size: menuModalStatus.orderMenu.size
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

        } else { //선택된 메뉴가 이미 있을때.
            setOrderMenuASideDetail(
                {
                    ...orderMenuASideDetail,
                    menuSq: menuModalStatus.menu.menuSq,
                    categorySq: menuModalStatus.menu.categorySq,
                    menuName: menuModalStatus.menu.menuName,
                    menuPrice: Number(menuModalStatus.menu.menuPrice),
                    categoryDTO: menuModalStatus.menu.categoryDTO,
                    imgDTOList: menuModalStatus.menu.imgDTOList,
                    size: menuModalStatus.orderMenu.size
                }
            );

        }

    }, [menuModalStatus]);

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
            case 'menuSideUp' + e.target.getAttribute('data-sq'):

                if (orderMenuASideDetail.addSide.length === 0) {
                    setOrderMenuASideDetail({
                        ...orderMenuASideDetail,
                        addSide: [{
                            sideSq: e.target.getAttribute('data-sq'),
                            sideName: e.target.getAttribute('data-name'),
                            sidePrice: Number(e.target.getAttribute('data-price')),
                            sideSize: 1
                        }]
                    });

                } else {

                    let getSqData = orderMenuASideDetail.addSide.filter((it) => it.sideSq === e.target.getAttribute('data-sq'));

                    if (getSqData.length !== 0) {
                        let upSize = getSqData[0].sideSize + 1;

                        getSqData[0].sideSize = upSize;

                        setOrderMenuASideDetail({
                            ...orderMenuASideDetail,
                        });

                    } else {
                        setOrderMenuASideDetail({
                            ...orderMenuASideDetail,
                            addSide: [
                                ...orderMenuASideDetail.addSide, {
                                    sideSq: e.target.getAttribute('data-sq'),
                                    sideName: e.target.getAttribute('data-name'),
                                    sidePrice: Number(e.target.getAttribute('data-price')),
                                    sideSize: 1
                                }]
                        });
                    }
                }
                break;
            case 'menuSideDown' + e.target.getAttribute('data-sq'):

                let getSqData = orderMenuASideDetail.addSide.filter((it) => it.sideSq === e.target.getAttribute('data-sq'));

                if (getSqData.length !== 0) {

                    let downSize = getSqData[0].sideSize - 1;

                    if (downSize < 1) {
                        let checkZeroSize = orderMenuASideDetail.addSide.filter((it) => it.sideSq !== e.target.getAttribute('data-sq'));
                        setOrderMenuASideDetail({
                            ...orderMenuASideDetail,
                            addSide: checkZeroSize
                        })
                        return false;
                    }

                    getSqData[0].sideSize = downSize;

                    setOrderMenuASideDetail({
                        ...orderMenuASideDetail,
                    });

                } else {
                    return false;
                }


                break;
        }

    }

    const deleteSelectSide = (sideSq) => {
        let checkZeroSize = orderMenuASideDetail.addSide.filter((it) => it.sideSq !== sideSq);
        setOrderMenuASideDetail({
            ...orderMenuASideDetail,
            addSide: checkZeroSize
        })
    }

    const SideMenuSize = ({menuSideSq}) => {
        if (orderMenuASideDetail.addSide.length === 0) {
            return <p id={'sideNumber' + menuSideSq}>0</p>
        } else {
            let size = 0;
            orderMenuASideDetail.addSide.map((it) => {
                if (Number(it.sideSq) === Number(menuSideSq)) {
                    size = it.sideSize;
                }
            });
            return <p id={'sideNumber' + menuSideSq}>{size}</p>
        }

    }

    const [sideCategory, setSideCategory] = useState([]);
    const [sideMenu, setSideMenu] = useState([]);
    const [sideCategorySq, setSideCategorySq] = useState('');

    // useEffect(() => {
    //     console.log(sideMenu);
    // }, [sideMenu]);


    useEffect(() => {

        menuModalStatus.menu.side[0].sideCategoryDTOList.map((it) => {
            if (sideCategorySq === it.sideCategorySq) {
                setSideMenu(it.menuSideDTOList);
            }
        });

    }, [sideCategorySq]);

    useEffect(() => { //처음 시작할때.

    }, [menuModalStatus]);

    const categoryChangeCss = (sideCategorySq) => {
        $('.O-category-part').removeClass('O-category-part-top');
        $('.menuDetailCategory').removeClass('O-category-click-color');
        $('#sideCategoryId' + sideCategorySq).addClass('O-category-click-color');

        setSideCategorySq(sideCategorySq);
    }

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
                            <div className="O-modal-top-title D-font" style={{fontSize: '30px'}}>
                                <p>사이드 메뉴 선택</p>
                            </div>
                        </div>
                    </div>
                    <div className={"M-flex-row"}>
                        <div style={{width: '60%', height: '100%'}} className={"M-flex-column"}>
                            <div className="O-modal-category-bar w-M-overlay" style={{height: 'auto'}}>
                                {
                                    sideCategory.map((it) => (
                                        <div className="O-category-part O-category-part-top" key={it.sideCategorySq}>
                                            <div onClick={() => {
                                                categoryChangeCss(it.sideCategorySq)
                                            }} id={'sideCategoryId' + it.sideCategorySq}
                                                 className="D-font menuDetailCategory O-category-box"
                                                 style={{fontSize: '17px'}}>
                                                <p>{it.sideCategoryName}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="O-modal-side-order M-overlay" style={{height: '479px'}}>
                                <div className="O-side-order-part" style={{width: '100%', height: '100%'}}>
                                    {
                                        sideMenu.length === 0 ? (
                                            <p className={'O-font-middle-size D-font'}
                                               style={{textAlign: 'center', width: '100%', marginTop: '10%'}}>사이드 메뉴
                                                없음</p>
                                        ) : (
                                            sideMenu.map((it) => (
                                                it.menuSideEnable ? (
                                                    <>
                                                    </>
                                                ) : (
                                                    <div className="O-side-order-card" style={{width: '50%'}}
                                                         key={it.menuSideSq}>
                                                        <div className="O-menu-side-img">
                                                            <img className="O-side-img" alt={'사이드 이미지'}
                                                                 src={'http://' + serverUrl.server + it.menuSideImgDTOList[0].menuSideImgPath +
                                                                     '/' + it.menuSideImgDTOList[0].menuSideImgName}/>
                                                        </div>
                                                        <div
                                                            className="O-menu-side-name D-font M-flex-column M-flex-center">
                                                            <p style={{
                                                                fontSize: '23px',
                                                                textAlign: 'center'
                                                            }}>{it.menuSideName}</p>
                                                            <small
                                                                style={{fontSize: '18px'}}>{'가격 : ' + it.menuSidePrice}</small>
                                                            {
                                                                it.menuSideSoldOut ? (<p className="D-font"
                                                                                         style={{
                                                                                             fontSize: '20px',
                                                                                             color: 'red'
                                                                                         }}>품절</p>) : (<></>)
                                                            }
                                                        </div>
                                                        <div className="O-menu-side-number M-flex-column M-flex-center"
                                                             style={{width: '10%', fontSize: '35px'}}>
                                                            {
                                                                it.menuSideSoldOut ? (
                                                                        <></>
                                                                    ) :
                                                                    (<>
                                                                        <div
                                                                            className="side-number-top D-font"
                                                                            id={'menuSideUp' + it.menuSideSq}
                                                                            data-sq={it.menuSideSq}
                                                                            data-name={it.menuSideName}
                                                                            data-price={it.menuSidePrice}
                                                                            onClick={changeOrderMenu}>+
                                                                        </div>
                                                                        <div className="D-font">
                                                                            <SideMenuSize menuSideSq={it.menuSideSq}/>
                                                                        </div>
                                                                        <div
                                                                            className="side-number-bottom D-font"
                                                                            id={'menuSideDown' + it.menuSideSq}
                                                                            data-sq={it.menuSideSq}
                                                                            data-name={it.menuSideName}
                                                                            data-price={it.menuSidePrice}
                                                                            onClick={changeOrderMenu}>-
                                                                        </div>
                                                                    </>)
                                                            }

                                                        </div>
                                                    </div>
                                                )
                                            ))
                                        )

                                    }

                                </div>
                            </div>
                        </div>
                        <div className="M-flex-column" style={{width: '40%'}}>
                            <div
                                className="M-flex-row M-flex-center">
                                <div className="O-select-mini-card" style={{width: '85%'}}>
                                    <div className="O-mini-card-header">
                                        <div className="O-mini-card-header-img">
                                            <img className="O-mini-img" alt={'선택된 메뉴 이미지'}
                                                 src={'http://' + serverUrl.server + orderMenuASideDetail.imgDTOList[0].imgPath
                                                     + '/' + orderMenuASideDetail.imgDTOList[0].imgName}/>
                                        </div>
                                    </div>
                                    <div className="O-mini-card-body">
                                        <div className="O-mini-card-body-content">
                                            <p className="D-font"
                                               style={{fontSize: '15px'}}>{menuModalStatus.menu.menuName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="O-menu-side-number M-flex-column M-flex-center"
                                     style={{fontSize: '30px'}}>
                                    {/*<div className="side-number-top D-font " id={'mainMenuSizePlus'}*/}
                                    {/*     onClick={changeOrderMenu}>+*/}
                                    {/*</div>*/}
                                    <div className="D-font "><p>{orderMenuASideDetail.size}개</p></div>
                                    {/*<div className="side-number-bottom D-font " onClick={changeOrderMenu}*/}
                                    {/*     id={'mainMenuSizeMinus'}>-*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            <div className="O-side-select-part M-overlay" style={{height: '377px', width: '100%'}}>
                                <div className="O-side-select-menu-part">
                                    {
                                        orderMenuASideDetail.addSide.map((it) => (
                                            <div className="O-side-select-card" key={it.sideSq}
                                                 style={{width: '33.333333333%', height: '40%'}}
                                                 name="selectSideCardName">
                                                <div className="O-side-select-number">
                                                    <p className="D-font" style={{fontSize: '20px'}}
                                                       name="sideSelectSize13">{it.sideSize}</p>
                                                </div>
                                                <div className="O-side-mini-close-Btn">
                                                    <div className="O-close O-close2" onClick={() => {
                                                        deleteSelectSide(it.sideSq)
                                                    }}></div>
                                                </div>
                                                <div
                                                    className="O-side-select-name M-flex-column M-flex-center M-overlay">
                                                    <p className="D-font" style={{fontSize: '16px'}}>{it.sideName}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="O-side-select-ok-part"
                                 style={{flexDirection: 'row', width: '100%', height: '14%'}}>
                                <div className="O-side-select-ok M-flex-center M-flex-row"
                                     style={{margin: '0 5px'}}
                                     onClick={saveDetailMenuOrder}>
                                    <p className="D-font " style={{fontSize: '30px'}}>선택
                                        완료</p>
                                </div>
                                <div className="O-side-select-close M-flex-center M-flex-row"
                                     style={{margin: '0 5px'}}
                                     onClick={close}>
                                    <p className="D-font " style={{fontSize: '30px'}} onClick={close}>닫기</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );

}
export default MenuDetailModal;