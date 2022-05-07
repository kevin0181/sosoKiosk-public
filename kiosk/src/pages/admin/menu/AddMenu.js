const AddMenu = () => {
    return (
        <div className="admin-main">
            <div className="admin-main-div">
                <div className="admin-main-backCard M-flex-row">
                    <div className="M-flex-column admin-main-left-flex" style={{marginTop: '25px'}}>
                        <form id="addMenuForm" method="post" encType="multipart/form-data">
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    메뉴 이름
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                    <input type="text" value="" className="M-input-text M-font M-mini-size"
                                           id="menuName"
                                           name="menuName"/>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사진 업로드
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                    <input type="file" value="" className="M-none-design" id="menu-file" name="menuImg"
                                           accept="image/*"/>
                                    <label className="M-input-text" id="menu-fileUrl" htmlFor="menu-file"
                                           style={{fontSize: '20px', overflow: 'hidden'}}>
                                    </label>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    가격
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center menuInputDiv">
                                    <input type="text" value="" className="M-input-text M-font M-mini-size"
                                           id="menuPrice"
                                           name="menuPrice"/>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    카테고리
                                </div>
                                <div className="M-flex-1 M-flex-column M-flex-center" style={{position: 'relative'}}>
                                    <input type="text" value="" className="M-input-text M-font M-mini-size menuInputDiv"
                                           id="categorySelect"
                                           readOnly
                                           onFocus="this.blur()"/>
                                    <div className="M-input-select-div" id="categorySelectOption"
                                         style={{display: 'none'}}>
                                        <input type="text" value="1"
                                               class="M-input-select M-font M-mini-size M-input-select-middle"
                                               onclick="selectCategory(this)"
                                               onfocus="this.blur()"/>
                                    </div>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사이드
                                </div>
                                <div className="M-flex-1 M-flex-column M-flex-center menuInputDiv"
                                     style={{position: 'relative'}}>
                                    <input type="text" value="" className="M-input-text M-font M-mini-size"
                                           id="sideSelect"
                                           readOnly
                                           onFocus="this.blur()"/>
                                    <div className="M-input-select-div" id="sideSelectOption"
                                         style={{display: 'none'}}>
                                        <input type="text" value="side 1"
                                               class="M-input-select M-font M-mini-size M-input-select-middle"
                                               onclick="selectSide(this)" readonly
                                               onfocus="this.blur()"/>
                                    </div>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">

                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}
                                         onClick="addMenu()">
                                        <p className="M-font">메뉴 업로드</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="M-flex-column admin-main-right-flex">
                        <div className="admin-main-img">
                            <div className="img-part M-flex-column M-flex-center">
                                <p className="M-font M-mini-size">미리보기</p>
                                <img id="admin-main-menu-select-img" className="admin-main-select-img"
                                     style={{display: 'none'}}/>
                            </div>
                        </div>
                        <div className="admin-progress-bar">
                            <div className="admin-progress-bar-div" style={{textAlign: 'center'}}>
                                <small className="M-font" style={{fontSize: '25px'}} id="progress-small-menu"></small>
                                <progress id="menu-progressBar" style={{marginTop: '30px'}} className="M-progress-bar"
                                          value="0"
                                          max="100"></progress>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMenu;