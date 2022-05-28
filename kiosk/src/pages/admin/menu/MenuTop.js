import {useEffect} from "react";
import $ from "jquery";
import {useNavigate} from "react-router-dom";

const MenuTop = ({status}) => {

    const navigate = useNavigate();

    const allRemoveClass = () => {
        $('#allMenu').removeClass('BtnClickColor');
        $('#addMenu').removeClass('BtnClickColor');
        $('#sideAllMenu').removeClass('BtnClickColor');
        $('#addSide').removeClass('BtnClickColor');
        $('#allCategory').removeClass('BtnClickColor');
        $('#addCategory').removeClass('BtnClickColor');
        $('#allMenu').removeClass('BtnClickColor');
    }

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
        allRemoveClass();
        statusCss();
    }, [status]);

    return (
        <div className="adminTop M-font">
            <div className="admin-top-top">
                <div className="admin-top-part admin-top-part-left">
                    <div className="admin-top-p-part" onClick={() => {
                        sessionStorage.clear();
                        navigate('/');
                    }}>
                        <p className="" style={{fontSize: '40px'}}>홈으로</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-nomal">
                    <div className="admin-top-p-part" id="allMenu" onClick={() => {
                        navigate('/admin/menu.js?status=all');
                    }}>
                        <p className="" style={{fontSize: '40px'}}>메뉴</p>
                    </div>
                </div>
                <div className="admin-top-part admin-top-part-nomal">
                    <div className="admin-top-p-part" id="addMenu" onClick={() => {
                        navigate('/admin/menu.js?status=addMenu');
                    }}>
                        <p className="" style={{fontSize: '40px'}}>메뉴 추가</p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-left">
                    <div className="admin-top-p-part" id="sideAllMenu" onClick={() => {
                        navigate('/admin/menu.js?status=sideAll');
                    }}>
                        <p className="" style={{fontSize: '40px'}}>사이드 메뉴</p>
                    </div>
                </div>

            </div>
            <div className="admin-top-bottom btnSound">
                <div className="admin-top-part admin-bottom-part-nomal">
                    <div className="admin-top-p-part" id="addSide" onClick={() => {
                        navigate('/admin/menu.js?status=sideAdd');
                    }}>
                        <p className="" style={{fontSize: '40px'}}>사이드 메뉴 추가</p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-nomal">
                    <div className="admin-top-p-part" id="allCategory" onClick={() => {
                        navigate('/admin/menu.js?status=category');
                    }}>
                        <p className="" style={{fontSize: '40px'}}>카테고리</p>
                    </div>
                </div>
                <div className="admin-top-part admin-bottom-part-right">
                    <div className="admin-top-p-part" id="addCategory" onClick={() => {
                        navigate('/admin/menu.js?status=addCategory');
                    }}>
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