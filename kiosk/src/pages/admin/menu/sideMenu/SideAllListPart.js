const SideAllListPart = ({data, modalContentChange}) => {

    return (
        data.sideAll.map((it) => (
            <tr className="M-text-center admin-tbody-tr" style={{fontSize:'20px'}} key={it.menuSideSq}>
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
                    <small className="M-font menu-detail-btn"
                           onClick={() => {
                               modalContentChange({
                                   status: true,
                                   param: 'sideAll',
                                   modalType: 'adminSideDetailModal',
                                   modalTitle: it.sideName + ' 상세 페이지',
                                   modalContent: '',
                                   sendId: it.menuSideSq,
                                   sendName: it.sideName
                               })
                           }}
                    >상세보기
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
                    <small className="menu-delete-btn" onClick={() => {
                        modalContentChange({
                            status: true,
                            modalType: 'adminSideMenuDelete',
                            modalTitle: '삭제 메시지',
                            modalContent: it.menuSideName + '를 삭제하시겠습니까?',
                            sendId: it.menuSideSq,
                            sendName: it.menuSideName
                        })
                    }}>
                        삭제
                    </small>
                </td>
            </tr>
        ))
    );
}

export default SideAllListPart;