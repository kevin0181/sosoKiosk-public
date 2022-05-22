const SideAllListPart = ({data}) => {
    return (
        data.map((it) => (
            <tr className="M-text-center admin-tbody-tr" key={it.menuSideSq}>
                <td className="search" style={{width: '15%'}}>
                    {it.sideCategoryDTO.sideDTO.sideName}
                </td>
                <td className="search">
                    {it.sideCategoryDTO.sideCategoryName}
                </td>
                <td className="search">
                    <p style={{display: 'inline-block', marginRight: '5px'}}>
                        {it.menuSideName}
                    </p>
                    <small className="M-font menu-detail-btn">상세보기
                    </small>
                </td>
                <td className="search">
                    {it.menuSidePrice}
                </td>
                <td className="search">
                    {
                        it.menuSideSoldOut ? (<p className="soldOut-font">(품절)</p>) : (<></>)
                    }
                    {
                        it.menuSideEnable ? (<p className="enableMenu-font">(메뉴 숨김)</p>) : (<></>)
                    }
                </td>
                <td className="search">
                    <small className="menu-delete-btn">
                        삭제
                    </small>
                </td>
            </tr>
        ))
    );
}

export default SideAllListPart;