const AddSide = () => {
    return (
        <div className="admin-main">
            <div className="admin-main-div">
                <div className="admin-main-backCard M-flex-row">
                    <div className="M-flex-column admin-main-left-flex" style={{marginTop: '25px'}}>
                        <form id="addSideMenuForm" method="post" encType="multipart/form-data">
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사이드 메뉴 이름
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                    <input type="text" value="" className="M-input-text M-font M-mini-size"
                                           id="menu-side-name"
                                           name="menuSideName"/>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사진 업로드
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                    <input type="file" value="" className="M-none-design" id="side-file"
                                           name="menuSideImg"
                                           accept="image/*"/>
                                    <label className="M-input-text" id="side-fileUrl" htmlFor="side-file"
                                           style={{fontSize: '20px', overflow: 'hidden'}}>
                                    </label>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    가격
                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center sideMenuInputDiv">
                                    <input type="text" value="" className="M-input-text M-font M-mini-size"
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
                                           readOnly
                                           onFocus="this.blur()"/>
                                    <div className="M-input-select-div" id="sideSelectByAddSideOption"
                                         style={{display: 'none'}}>
                                        <input type="text" value="side 1"
                                               class="M-input-select M-font M-mini-size M-input-select-middle"
                                               onclick="selectSideByAddMenu(this)" readonly
                                               onfocus="this.blur()"/>
                                    </div>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    사이드 카테고리
                                </div>
                                <div className="M-flex-1 M-flex-column M-flex-center sideMenuInputDiv"
                                     style={{position: 'relative'}}>
                                    <input type="text" value="" className="M-input-text M-font M-mini-size"
                                           id="sideCategorySelect"
                                           readOnly
                                           onFocus="this.blur()"/>
                                    <div className="M-input-select-div" id="sideCategorySelectOption"
                                         style={{display: 'none'}}>
                                        <input type="text" value="side 1"
                                               class="M-input-select M-font M-mini-size M-input-select-middle"
                                               onclick="selectSideCategory(this)" readonly
                                               onfocus="this.blur()"/>
                                    </div>
                                </div>
                            </div>
                            <div className="M-flex-row M-font admin-font-size" style={{marginBottom: '25px'}}>
                                <div className="M-flex-1 M-flex-row M-flex-center">

                                </div>
                                <div className="M-flex-1 M-flex-row M-flex-center">
                                    <div className="O-side-select-close" style={{marginTop: '0px', marginRight: '10px'}}
                                         onClick="AddSideMenu()">
                                        <p className="M-font O-font-middle-size" style={{fontSize: '40px'}}>사이드 메뉴
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
                        <div className="admin-progress-bar">
                            <div className="admin-progress-bar-div" style={{textAlign: 'center'}}>
                                <small className="M-font" style={{fontSize: '25px'}}
                                       id="progress-small-side"></small>
                                <progress id="side-progressBar" style={{marginTop: '30px'}}
                                          className="M-progress-bar"
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

export default AddSide;