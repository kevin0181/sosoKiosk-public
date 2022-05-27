const CategoryPartList = ({data, modalContentChange}) => {

    const deleteCategory = (data) => {
        modalContentChange({
            status: true,
            param: 'category',
            modalType: 'adminCategoryDelete',
            modalTitle: '카테고리 삭제 메시지',
            modalContent: data.categoryName + '를 삭제하시겠습니까?',
            sendId: data.categorySq,
            sendName: data.categoryName
        })
    }

    return (
        <>
            {
                data.category.category.map((it) => (
                    <tr id={'admin-tbody-tr-category'} key={it.categorySq}
                        className="admin-tbody-tr-category M-text-center admin-tbody-tr admin-tbody-tr-category">
                        <td className="search">
                            <p style={{display: 'inline-block', marginRight: '5px'}}>{it.categoryName}</p>
                            <small className="M-font menu-detail-btn">
                                상세보기
                            </small>
                        </td>
                        <td className="search">
                            <small className="M-font menu-detail-btn" onClick={() => {
                                modalContentChange({
                                    status: true,
                                    param: 'category',
                                    modalType: 'adminCategoryRenameModal',
                                    modalTitle: '카테고리 이름 변경',
                                    modalContent: '',
                                    sendId: it.categorySq,
                                    sendName: it.categoryName
                                })
                            }}
                                   style={{backgroundColor: '#f5ffbf'}}>
                                수정
                            </small>
                        </td>
                        <td className="search">
                            <small className="menu-delete-btn" onClick={() => {
                                deleteCategory(it);
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
export default CategoryPartList;