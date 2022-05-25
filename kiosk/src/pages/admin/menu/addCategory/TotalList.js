export function CategoryTotalList({data}) {
    return (
        <>
            {
                data.category.map((it) => (
                    <input type="text" value={it.categoryName} key={it.categorySq}
                           style={{
                               width: '100%',
                               backgroundColor: '#628762',
                               fontSize: '25px',
                               marginBottom: '6px'
                           }}
                           className="M-input-text M-font" readOnly/>
                ))
            }
        </>
    );
}

export function SideTotalList({data}) {

    return (
        <>
            {
                data.side.map((it) => (
                    <input type="text" value={it.sideName} key={it.sideSq}
                           style={{
                               width: '100%',
                               backgroundColor: '#628762',
                               fontSize: '25px',
                               marginBottom: '6px'
                           }}
                           className="M-input-text M-font" readOnly/>
                ))
            }
        </>
    );

}

export function SideCategoryTotalList({data}) {

    return (
        <>
            {
                data.sideCategory.map((it) => (
                    <input type="text" value={it.sideCategoryName + ' (' + it.sideDTO.sideName + ')'}
                           key={it.sideCategorySq}
                           style={{
                               width: '100%',
                               backgroundColor: '#628762',
                               fontSize: '25px',
                               marginBottom: '6px'
                           }}
                           className="M-input-text M-font" readOnly/>
                ))
            }
        </>
    );

}