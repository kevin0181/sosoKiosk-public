import {useEffect, useState} from "react";
import {getSideCategory} from "../../../../../js/admin/menu/category";
import serverUrl from "../../../../config/server.json";
import $ from 'jquery';
import {getSideList} from "../../../../../js/admin/menu/addMenu";
import {getSideMenuList} from "../../../../../js/admin/menu/side";

const SideDetailModal = ({modalStatus, modalContentChange, data, setDataFun}) => {

    const [menuList, setMenuList] = useState([]);
    const [noMessage, setNoMessage] = useState(false);

    //스피너
    const [spinner, setSpinner] = useState(true);
    const [sideCategory, setSideCategory] = useState({
        sideCategory: []
    });

    useEffect(() => {
        getSideCategory(modalStatus.sendId).then(function (side) {
            setSideCategory({
                sideCategory: side.sideCategoryDTOList
            });
            setSpinner(false);
            setNoMessage(true);
            setMenuList(side.sideCategoryDTOList[0].menuSideDTOList);
        });
    }, []);

    useEffect(() => {
        console.log(sideCategory);
    }, [sideCategory]);

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


    const DetailMenu = (categoryData) => {
        setMenuList(categoryData.menuSideDTOList);
    }
    const NoMessageFun = () => {

        if (noMessage) {
            return <div><p className="O-menu-side-name-p M-font" style={{fontSize: '50px'}}>메뉴가
                없습니다.</p>
            </div>
        } else {
            return <></>
        }

    }

    const changeButtonCss = (sideCategorySq) => {
        $('.sideCategoryNone').removeClass('O-category-click-color');
        $('#sideTopCategory' + sideCategorySq).addClass('O-category-click-color');
    }


    return (
        <div className="O-modal-back menu-detail-modal" id="categoryDetailModal">
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
                            <div className="O-modal-top-title M-font" id="category-top">
                                <p className="M-font-30-size">{modalStatus.modalTitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                        {
                            sideCategory.sideCategory.map((it, index) => (
                                <div className="O-category-part" key={it.sideCategorySq}>
                                    <div
                                        className={"M-font M-font-20-size O-category-box sideCategoryNone" + (index === 0 ? ' O-category-click-color' : '')}
                                        id={'sideTopCategory' + it.sideCategorySq}
                                        data-id={it.sideCategorySq}
                                        onClick={(e) => {
                                            DetailMenu(it);
                                            changeButtonCss(it.sideCategorySq);
                                        }}>
                                        <p>{it.sideCategoryName}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="O-modal-side-order M-flex-row"
                         style={{padding: '5px 20px', justifyContent: 'space-between'}}>
                        <div className="O-side-order-part"
                             style={{width: '100%', height: '100%'}}>
                            <div className="O-side-order-part M-overlay" id="category-card-body"
                                 style={{width: '100%', height: '100%', flexWrap: 'wrap', justifyContent: 'center'}}>
                                {
                                    menuList.length === 0 ? (
                                        <NoMessageFun/>
                                    ) : (
                                        menuList.map((it) => (
                                            <div className="O-side-order-card a-side-order-card"
                                                 onClick={() => {

                                                     if (data.sideAll.length === 0) {
                                                         getSideMenuList().then(function (sideAll) {
                                                             setDataFun({
                                                                 ...data,
                                                                 sideAll
                                                             });
                                                             modalContentChange({
                                                                 status: true,
                                                                 param: 'sideAll',
                                                                 modalType: 'adminSideDetailModal',
                                                                 modalTitle: it.sideName + ' 상세 페이지',
                                                                 modalContent: '',
                                                                 sendId: it.menuSideSq,
                                                                 sendName: it.sideName
                                                             })
                                                         });
                                                     } else {
                                                         modalContentChange({
                                                             status: true,
                                                             param: 'sideAll',
                                                             modalType: 'adminSideDetailModal',
                                                             modalTitle: it.sideName + ' 상세 페이지',
                                                             modalContent: '',
                                                             sendId: it.menuSideSq,
                                                             sendName: it.sideName
                                                         })
                                                     }

                                                 }}
                                                 key={it.menuSideSq}>
                                                <div className="O-menu-side-img">
                                                    <img className="O-side-img" alt={'side 메뉴 이미지'}
                                                         src={'http://' + serverUrl.server + it.menuSideImgDTOList[0].menuSideImgPath + '/' + it.menuSideImgDTOList[0].menuSideImgName}/>
                                                </div>
                                                <div className="O-menu-side-name M-font M-font-20-size M-text-center">
                                                    <p className="O-menu-side-name-p">{it.menuSideName}</p>
                                                </div>
                                            </div>
                                        ))
                                    )

                                }
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-footer"
                         style={{padding: '30px 0px', justifyContent: 'center'}}>
                        <div className="O-side-select-part">
                        </div>
                        <div className="O-side-select-ok-part">
                            <div className="O-side-select-close">
                                <p className="M-font M-font-30-size" onClick={closeBtn}>닫기</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SideDetailModal;