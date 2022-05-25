const AddCategoryTotalList = () => {
    return (
        <div className="M-input-select-div" id="listSelectOption"
             style={{width: '80%'}}>
            <input type="text" value={"카테고리"} name="category"
                   style={{width: '100%'}}
                   className="M-input-select M-font M-mini-size M-input-select-middle"
                   readOnly/>
            <input type="text" value={"사이드"} name="side" style={{width: '100%'}}
                   className="M-input-select M-font M-mini-size M-input-select-middle"
                   readOnly/>
            <input type="text" value={"사이드 카테고리"} name="sideCategory"
                   style={{width: '100%'}}
                   className="M-input-select M-font M-mini-size M-input-select-middle"
                   readOnly/>
        </div>
    );
}
export default AddCategoryTotalList;