import {useEffect, useState} from "react";
import {getCategoryMenu} from "../../../../../js/admin/menu/category";
import serverUrl from "../../../../config/server.json";

const CategoryDetailModal = ({modalStatus, modalContentChange, data, setDataFun}) => {


    //스피너
    const [spinner, setSpinner] = useState(true);
    const [categoryByMenu, setCategoryByMenu] = useState({
        all: [],
    });

    useEffect(() => {
        getCategoryMenu(modalStatus.sendId).then(function (res) {
            setCategoryByMenu({
                all: res.menuDTOList
            });
            setSpinner(false);
        });
    }, []);

    useEffect(() => {
        console.log(categoryByMenu);
    }, [categoryByMenu]);

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
                                <p>카테고리 상세</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                        <div className="O-category-part">
                            <div className="M-font O-font-mini-size O-category-box"
                                 style={{backgroundColor: '#838383'}}>
                                <p>{modalStatus.sendName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-order M-flex-row"
                         style={{padding: '5px 20px', justifyContent: 'space-between'}}>
                        <div className="O-side-order-part"
                             style={{padding: '10px 40px', width: '100%', height: '100%'}}>
                            <div className="O-side-order-part M-overlay" id="category-card-body"
                                 style={{width: '100%', height: '100%', flexWrap: 'wrap', justifyContent: 'center'}}>
                                {
                                    categoryByMenu.all.map((it) => (
                                        <div className="O-side-order-card a-side-order-card" key={it.menuSq}>
                                            <div className="O-menu-side-img">
                                                <img className="O-side-img" alt={'카테고리 메뉴 이미지'}
                                                     src={'http://' + serverUrl.server + it.imgDTOList[0].imgPath + '/' + it.imgDTOList[0].imgName}/>
                                            </div>
                                            <div className="O-menu-side-name M-font O-font-mini-size M-text-center">
                                                <p className="O-menu-side-name-p">{it.menuName}</p>
                                            </div>
                                        </div>
                                    ))
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
                                <p className="M-font O-font-middle-size" onClick={closeBtn}>닫기</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CategoryDetailModal;