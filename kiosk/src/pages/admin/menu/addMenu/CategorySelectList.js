const CategorySelectList = ({category}) => {
    return (
        <>
            <div className="M-input-select-div" id="categorySelectOption">
                {
                    category.map((it, index) => (
                        <input type="text" defaultValue={it.categoryName} key={it.categorySq}
                               className="M-input-select M-menu-input-select M-font M-mini-size M-input-select-middle"/>
                    ))
                }
            </div>
        </>
    );
}
export default CategorySelectList;