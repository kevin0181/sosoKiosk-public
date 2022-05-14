import {useEffect, useState} from "react";
import {getMenuList} from "../../../../js/admin/menu/AllMenu";

const MenuListPart = ({spinnerStatus}) => {

    const [menu, setMenu] = useState([]);

    const getMenu = async () => {
        try {

            spinnerStatus(true);
            console.log("spinner on");

            await getMenuList().then(function (res) {
                console.log(res);
                setMenu(res);
            });

        } catch (e) {
            console.log("에러 : " + e);
        }

    }

    useEffect(() => {
        getMenu();
    }, []);

    const sideCheck = (side) => {
        if (side.length === 0) {
            return <p></p>;
        } else {
            return <p>{side[0].sideName}</p>;
        }
    }

    const menuSoldOutCheck = (menuSoldOut) => {
        if (menuSoldOut)
            return <p className="soldOut-font">(품절)</p>
        else
            return <p className="soldOut-font"></p>
    }

    const menuEnableCheck = (menuEnable) => {
        if (menuEnable)
            return <p className="enableMenu-font">(메뉴 숨김)</p>
        else
            return <p></p>
    }


    return (
        <>
            {
                menu.map((it) => (
                    <tr className="admin-tbody-tr" key={it.menuSq}>
                        <td className="search">
                            {it.categoryDTO.categoryName}
                        </td>
                        <td className="search">
                            <p style={{
                                display: 'inline-block',
                                marginRight: '5px'
                            }}>{it.menuName}</p>
                            <small className="M-font menu-detail-btn">상세보기</small>
                        </td>
                        <td className="search">
                            {it.menuPrice}
                        </td>
                        <td className="search">
                            {
                                sideCheck(it.side)
                            }
                        </td>
                        <td className="search">
                            {
                                menuSoldOutCheck(it.menuSoldOut)
                            }
                            {
                                menuEnableCheck(it.menuEnable)
                            }
                        </td>
                        <td className="search">
                            <small className="menu-delete-btn">
                                삭제
                            </small>
                        </td>
                    </tr>
                ))
            }
        </>
    );
}

export default MenuListPart;