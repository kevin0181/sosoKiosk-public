const SideSelectList = ({side, changeSide, changeSideData}) => {
    return (
        <>
            <div className="M-input-select-div" id="sideSelectOption">
                {
                    changeSideData === undefined ? (<input type="text" data-id={0} defaultValue={'없음'}
                                                           name={'sideSelect'} onClick={changeSide}
                                                           className="M-input-select M-side-input-select M-font M-mini-size M-input-select-middle"
                                                           readOnly/>) : (<></>)
                }
                {
                    side.map((it) => (
                        <input type="text" defaultValue={it.sideName} key={it.sideSq}
                               data-id={it.sideSq}
                               name={'sideSelect'} onClick={changeSide}
                               className="M-input-select M-side-input-select M-font M-mini-size M-input-select-middle"
                               readOnly/>
                    ))
                }
            </div>
        </>
    );
}

export default SideSelectList;