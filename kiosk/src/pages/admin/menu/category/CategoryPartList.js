const CategoryPartList = ({data, modalContentChange}) => {
    return (
        <>
            {
                data.category.category.map((it) => (
                    <tr id={'admin-tbody-tr-category'} key={it.categorySq}
                        className="M-text-center admin-tbody-tr admin-tbody-tr-category">
                        <td className="search">
                            <p style={{display: 'inline-block', marginRight: '5px'}}>{it.categoryName}</p>
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
export default CategoryPartList;