const SideCategorySelectList = ({sideCategory, changeSideCategory}) => {

    return (
        <>
            <div className="M-allSelect-size M-input-select-div M-overlay" id="sideCategorySelectOption">
                {
                    sideCategory.map((it) => (
                        <input type="text" value={it.sideCategoryName} key={it.sideCategorySq}
                               data-id={it.sideCategorySq}
                               name={'sideCategorySelect'} onClick={changeSideCategory}
                               className="M-input-select M-font M-mini-size M-input-select-middle"
                               readOnly/>
                    ))
                }
            </div>
        </>
    );

}
export default SideCategorySelectList;