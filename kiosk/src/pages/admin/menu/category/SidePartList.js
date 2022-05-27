const SidePartList = ({data, modalContentChange}) => {

    const deleteSide = (data) => {
        modalContentChange({
            status: true,
            param: 'category',
            modalType: 'adminSideDelete',
            modalTitle: '사이드 삭제 메시지',
            modalContent: data.sideName + '를 삭제하시겠습니까?',
            sendId: data.sideSq,
            sendName: data.sideName
        })
    }

    return (
        <>
            {
                data.category.side.map((it) => (
                    <tr id={'admin-tbody-tr-side'} key={it.sideSq}
                        className="admin-tbody-tr-side M-text-center admin-tbody-tr admin-tbody-tr-side">
                        <td className="search">
                            <p style={{display: 'inline-block', marginRight: '5px'}}>{it.sideName}</p>
                            <small className="M-font menu-detail-btn">
                                상세보기
                            </small>
                        </td>
                        <td className="search">
                            <small className="M-font menu-detail-btn"
                                   onClick={() => {
                                       modalContentChange({
                                           status: true,
                                           param: 'category',
                                           modalType: 'adminSideRenameModal',
                                           modalTitle: '사이드 이름 변경',
                                           modalContent: '',
                                           sendId: it.sideSq,
                                           sendName: it.sideName
                                       })
                                   }}
                                   style={{backgroundColor: '#f5ffbf'}}>
                                수정
                            </small>
                        </td>
                        <td className="search">
                            <small className="menu-delete-btn" onClick={() => {
                                deleteSide(it);
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

export default SidePartList;