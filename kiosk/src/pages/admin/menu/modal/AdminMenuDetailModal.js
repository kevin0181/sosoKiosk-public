import serverUrl from "../../../config/server.json";

const AdminMenuDetailModal = ({modalStatus, modalContentChange, changeData, setDataFun}) => {

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

    const imgCheck = (imgDTOList) => {

        if (imgDTOList.length === 0) {

            return <img id="admin-main-menu-select-img" className="admin-main-select-img" alt={'수정 메뉴 사진'}/>

        } else {
            return <img className="admin-main-select-img" alt={'메뉴'} id="admin-main-menu-select-img"
                        src={'http://' + serverUrl.server + imgDTOList[0].imgPath + '/' + imgDTOList[0].imgName}/>
        }

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
                                               defaultValue={changeData.menuName}
                                               name="menuName"/>
                                    </div>
                                </div>
                                <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                    <div className="M-flex-1 M-flex-row M-flex-center">
                                        사진 업로드
                                    </div>
                                    <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                        <input type="file" className="M-none-design" id="menu-file"
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
                                               defaultValue={changeData.menuPrice}
                                               name="menuPrice"/>
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
                                               defaultValue={changeData.categoryDTO.categoryName}
                                               id="categorySelect"
                                               readOnly/>
                                        <div className="M-input-select-div" id="categorySelectOption"
                                             style={{display: 'none'}}>
                                            <input type="text" value="1"
                                                   className="M-input-select M-font M-mini-size M-input-select-middle"
                                                   readOnly/>
                                        </div>
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
                                                       id="sideSelect" defaultValue={changeData.side[0].sideName}
                                                       readOnly/>) : (
                                                <input type="text" className="M-input-text M-font M-mini-size"
                                                       id="sideSelect" defaultValue={''}
                                                       readOnly/>)
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
                                               id="progress-small-menu"></small>
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
                                           defaultChecked={changeData.menuSoldOut}
                                           id="menuSoldOut-checkBox"/>
                                    <label htmlFor="menuSoldOut-checkBox"></label>
                                </div>
                                <div className="M-container M-flex-row M-flex-center" style={{width: '50%'}}>
                                    <p className="M-font O-font-middle-size">메뉴 숨기기</p>
                                    <input type="checkbox" className="M-input-checkBox"
                                           defaultChecked={changeData.menuEnable}
                                           id="menuEnable-checkBox"/>
                                    <label htmlFor="menuEnable-checkBox"></label>
                                </div>
                            </div>
                        </div>
                        <div className="O-side-select-ok-part"
                             style={{width: '35%', flexDirection: 'row', alignItems: 'center'}}>
                            <div className="O-side-select-ok M-flex-row M-flex-center" id="menuChangeBtn"
                                 style={{margin: '0px 5px 0px 0px', height: '50%'}}>
                                <p className="M-font O-font-middle-size">수정 완료</p>
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