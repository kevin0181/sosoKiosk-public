const SidePartList = ({data, modalContentChange}) => {
    return (
        <>
            {
                data.category.side.map((it) => (
                    <tr id={'admin-tbody-tr-side'} key={it.sideSq}
                        className="M-text-center admin-tbody-tr admin-tbody-tr-side">
                        <td className="search">
                            <p style={{display: 'inline-block', marginRight: '5px'}}>{it.sideName}</p>
                            <small className="M-font menu-detail-btn">
                                상세보기
                            </small>
                        </td>
                        <td className="search">
                            <small className="M-font menu-detail-btn"
                                   style={{backgroundColor: '#f5ffbf'}}>
                                수정
                            </small>
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

export default SidePartList;