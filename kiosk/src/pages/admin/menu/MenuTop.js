import {useEffect} from "react";
import $ from "jquery";

const MenuTop = ({status}) => {


    const statusCss = () => {
        switch (status) {
            case 'all':
                return $('#allMenu').addClass('BtnClickColor');
            case 'addMenu':
                return $('#addMenu').addClass('BtnClickColor');
            case 'sideAll':
                return $('#sideAllMenu').addClass('BtnClickColor');
            case 'sideAdd':
                return $('#addSide').addClass('BtnClickColor');
            case 'category':
                return $('#allCategory').addClass('BtnClickColor');
            case 'addCategory':
                return $('#addCategory').addClass('BtnClickColor');
            default:
                return $('#allMenu').addClass('BtnClickColor');
        }
    }

    useEffect(() => {
        statusCss();
    });


    return (
        <div className="adminTop M-font">
            <div className="admin-top-top">
                <div className="admin-top-part admin-top-part-left">
                    <div className="admin-top-p-part" onClick="logoutBtn()">
                        <p className="" style={{fontSize: '40px'}}>홈으로</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-nomal">
                    <div className="admin-top-p-part" onClick="allMenu()" id="allMenu">
                        <p className="" style={{fontSize: '40px'}}>메뉴</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-nomal">
                    <div className="admin-top-p-part" onClick="addMenuPage()" id="addMenu">
                        <p className="" style={{fontSize: '40px'}}>메뉴 추가</p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-left">
                    <div className="admin-top-p-part" onClick="allSideMenu()" id="sideAllMenu">
                        <p className="" style={{fontSize: '40px'}}>사이드 메뉴</p>
                    </div>
                </div>

            </div>
            <div className="admin-top-bottom btnSound">
                <div className="admin-top-part admin-bottom-part-nomal">
                    <div className="admin-top-p-part" onClick="addSidePage()" id="addSide">
                        <p className="" style={{fontSize: '40px'}}>사이드 메뉴 추가</p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-nomal">
                    <div className="admin-top-p-part" onClick="categoryPage()" id="allCategory">
                        <p className="" style={{fontSize: '40px'}}>카테고리</p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-right">
                    <div className="admin-top-p-part" onClick="addCategoryPage()" id="addCategory">
                        <p className="" style={{fontSize: '40px'}}>카테고리 추가</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-right">
                    <div className="admin-top-p-part">
                        <p className="" style={{fontSize: '40px'}}></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuTop;