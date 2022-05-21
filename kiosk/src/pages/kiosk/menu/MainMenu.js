import serverUrl from "../../config/server.json";

const MainMenu = ({menu}) => {

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
            {menu.map((it) => (
                <div className="O-card" key={it.menuSq}>
                    <div className="O-card-all">
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
                                    <p className="O-menu-name" style={{display: 'inline-block'}}>{it.menuPrice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default MainMenu;