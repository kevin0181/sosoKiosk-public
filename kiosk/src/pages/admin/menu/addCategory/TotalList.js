export function CategoryTotalList({totalListData, modalContentChange}) {
    return (
        <>
            {
                totalListData.category.category.map((it) => (
                    <input type="text" value={it.categoryName} key={it.categorySq}
                           style={{
                               width: '100%',
                               backgroundColor: '#628762',
                               fontSize: '15px',
                               marginBottom: '6px'
                           }}
                           onClick={() => {
                               modalContentChange({
                                   status: true,
                                   param: 'category',
                                   modalType: 'adminCategoryDelete',
                                   modalTitle: '카테고리 삭제 메시지',
                                   modalContent: it.categoryName + '를 삭제하시겠습니까?',
                                   sendId: it.categorySq,
                                   sendName: it.categoryName
                               })
                           }}
                           className="M-input-text M-font" readOnly/>
                ))
            }
        </>
    );
}

export function SideTotalList({totalListData, modalContentChange}) {

    return (
        <>
            {
                totalListData.category.side.map((it) => (
                    <input type="text" value={it.sideName} key={it.sideSq}
                           style={{
                               width: '100%',
                               backgroundColor: '#628762',
                               fontSize: '15px',
                               marginBottom: '6px'
                           }}
                           onClick={() => {
                               modalContentChange({
                                   status: true,
                                   param: 'category',
                                   modalType: 'adminSideDelete',
                                   modalTitle: '사이드 삭제 메시지',
                                   modalContent: it.sideName + '를 삭제하시겠습니까?',
                                   sendId: it.sideSq,
                                   sendName: it.sideName
                               })
                           }}
                           className="M-input-text M-font" readOnly/>
                ))
            }
        </>
    );

}

export function SideCategoryTotalList({totalListData, modalContentChange}) {

    return (
        <>
            {
                totalListData.category.sideCategory.map((it) => (
                    <input type="text" value={it.sideCategoryName + ' (' + it.sideDTO.sideName + ')'}
                           key={it.sideCategorySq}
                           style={{
                               width: '100%',
                               backgroundColor: '#628762',
                               fontSize: '15px',
                               marginBottom: '6px'
                           }}
                           onClick={() => {
                               modalContentChange({
                                   status: true,
                                   param: 'category',
                                   modalType: 'adminSideCategoryDelete',
                                   modalTitle: '사이드 카테고리 삭제 메시지',
                                   modalContent: it.sideCategoryName + '를 삭제하시겠습니까?',
                                   sendId: it.sideCategorySq,
                                   sendName: it.sideCategoryName
                               })
                           }}
                           className="M-input-text M-font" readOnly/>
                ))
            }
        </>
    );

}