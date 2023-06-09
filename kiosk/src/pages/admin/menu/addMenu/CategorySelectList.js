const CategorySelectList = ({category, changeCategory}) => {


    return (
        <>
            <div className="M-allSelect-size M-input-select-div M-overlay" id="categorySelectOption">
                {
                    category.map((it, index) => (
                        <input type="text" defaultValue={it.categoryName} key={it.categorySq} readOnly
                               data-id={it.categorySq}
                               name={'categorySelect'} onClick={changeCategory}
                               className="M-input-select M-menu-input-select M-font M-input-select-middle" style={{fontSize:'20px'}}/>
                    ))
                }
            </div>
        </>
    );
}
export default CategorySelectList;