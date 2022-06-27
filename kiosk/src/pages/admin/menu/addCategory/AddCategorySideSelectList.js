const AddCategorySideSelectList = ({side, addDataFormFun}) => {

    return (
        <>
            <div className="M-input-select-div M-overlay" id="sideSelectByCategoryOption"
                 style={{width: '239px'}}>
                {
                    side.category.side.map((it) => (
                        <input type="text" value={it.sideName} key={it.sideSq}
                               data-id={it.sideSq} onClick={addDataFormFun}
                               name={'addCategorySideSelect'}
                               style={{width: '100%'}}
                               className="M-input-select M-font M-font-20-size M-input-select-middle"
                               readOnly/>
                    ))
                }
            </div>
        </>
    );

}
export default AddCategorySideSelectList;