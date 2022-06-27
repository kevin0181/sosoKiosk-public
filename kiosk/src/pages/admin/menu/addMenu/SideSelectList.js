const SideSelectList = ({side, changeSide, changeSideData}) => {
    console.log(changeSideData)
    return (
        <>
            <div className="M-allSelect-size M-input-select-div M-overlay" id="sideSelectOption">
                {
                    changeSideData === undefined ? (<input type="text" data-id={0} defaultValue={'없음'}
                                                           name={'sideSelect'} onClick={changeSide}
                                                           className="M-input-select M-side-input-select M-font M-input-select-middle"
                                                           style={{fontSize: '20px'}}
                                                           readOnly/>) : (<></>)
                }
                {
                    side.map((it) => (
                        <input type="text" defaultValue={it.sideName} key={it.sideSq}
                               data-id={it.sideSq}
                               name={'sideSelect'} onClick={changeSide}
                               className="M-input-select M-side-input-select M-font M-input-select-middle"
                               style={{fontSize: '20px'}}
                               readOnly/>
                    ))
                }
            </div>
        </>
    );
}

export default SideSelectList;