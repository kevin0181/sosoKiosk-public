const MenuListPart = ({data, modalContentChange}) => {

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
                data.map((it) => (
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
                            <small className="menu-delete-btn" onClick={() => {
                                modalContentChange({
                                    status: true,
                                    modalType: 'adminMenuDelete',
                                    modalTitle: '삭제 메시지',
                                    modalContent: it.menuName + '를 삭제하시겠습니까?',
                                    sendId: it.menuSq,
                                    sendName: it.menuName
                                })
                            }}>
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