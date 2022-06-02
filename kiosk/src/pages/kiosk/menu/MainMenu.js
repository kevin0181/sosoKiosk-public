import serverUrl from "../../config/server.json";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

const MainMenu = ({menu, menuModalContentChange}) => {

    const [mainParams] = useSearchParams();
    const status = mainParams.get('categorySq');

    const [viewMenu, setViewMenu] = useState({
        menu: []
    });

    useEffect(() => {
        setViewMenu({
            menu: menu
        });
    }, []);

    useEffect(() => {
        if (Number(status) !== 0) {
            changeMenu();
        } else {
            setViewMenu({
                menu: menu
            });
        }
    }, [status]);

    const changeMenu = () => {
        let data = [];
        menu.map((it) => {
            if (Number(it.categorySq) === Number(status)) {
                data.push(it);
            }
        });
        setViewMenu({
            'menu': data
        })
    }

    const imgCheck = (imgDTOList) => {

        if (imgDTOList.length === 0) {

            return <img className="O-card-header-img-img" alt={'메뉴'}/>

        } else {
            return <img className="O-card-header-img-img" alt={'메뉴'}
                        src={'http://' + serverUrl.server + imgDTOList[0].imgPath + '/' + imgDTOList[0].imgName}/>
        }

    }

    return (
        <div className="O-flex-menu">

            {
                viewMenu.menu.map((it) => (
                    it.menuEnable ? (<></>) : (
                        <div className="O-card" key={it.menuSq}>
                            <div className="O-card-all" onClick={() => {
                                if (it.menuSoldOut) {
                                    return false;
                                } else {
                                    menuModalContentChange({
                                        status: true,
                                        param: status,
                                        modalType: 'orderMenuDetail',
                                        modalTitle: it.menuName + ' 상세 보기',
                                        modalContent: '',
                                        menu: it
                                    });
                                }
                            }}>
                                <div className="O-card-header">
                                    <div className="O-card-header-img">
                                        {
                                            imgCheck(it.imgDTOList)
                                        }
                                    </div>
                                </div>
                                <div className="O-card-body">
                                    <div className="O-card-body-top">
                                        <p className="O-menu-name">{it.menuName}</p>
                                    </div>
                                    <div className="O-card-body-body">
                                        <div style={{textAlign: 'center'}}>
                                            <p className="O-menu-name" style={{display: 'inline-block'}}>가격 : </p>
                                            <p className="O-menu-name"
                                               style={{display: 'inline-block'}}>{it.menuPrice}</p><br/>
                                            {
                                                it.menuSoldOut ? (<small className="O-menu-name"
                                                                         style={{
                                                                             display: 'inline-block',
                                                                             fontSize: '30px',
                                                                             color: 'red'
                                                                         }}>(품절)</small>) : (<></>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))
            }

        </div>
    );

}

export default MainMenu;