import {renameCategory} from "../../../../../js/admin/menu/category";
import {useState} from "react";
import {getCategoryList} from "../../../../../js/admin/menu/addMenu";

const CategoryRenameModal = ({modalStatus, modalContentChange, data, setDataFun}) => {

    const closeBtn = () => {
        modalContentChange({
            status: false,
            param: '',
            modalType: '',
            modalTitle: '',
            modalContent: '',
            sendId: '',
            sendName: ''
        });
    }

    //스피너
    const [spinner, setSpinner] = useState(false);

    const [renameCategoryState, setRenameCategoryState] = useState({
        categorySq: parseFloat(modalStatus.sendId),
        categoryName: modalStatus.sendName,
    });

    const changeCategoryName = () => {
        setSpinner(true);
        renameCategory(renameCategoryState.categorySq, renameCategoryState.categoryName).then(function (res) {
            closeBtn();
            getCategoryList().then(function (category) {
                setDataFun({
                    ...data,
                    ['category']: {
                        side: data.category.side,
                        category
                    }
                });
                setSpinner(true);
            });
        });
    }

    return (
        <div className="O-modal-back" id="category-change-modal">
            {
                spinner ? (
                    <div className='spinner' style={{zIndex: '21', top: '50%'}}>
                        <div className='block'>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
            <div className="O-modal" style={{width: '40%', height: '35%'}}>
                <div className="O-modal-content">
                    <div className="O-modal-header">
                        <div className="O-modal-close-Btn">
                            <div className="O-close O-close3" onClick={closeBtn} id="modalCloseBtn"></div>
                        </div>
                        <div className="O-modal-top">
                            <div className="O-modal-top-title M-font" id="changeTop">
                                <p className="M-font-30-size">{modalStatus.modalTitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-category-bar">
                    </div>
                    <div className="O-modal-side-order" style={{height: '40%', marginTop: '15px', textAlign: 'center'}}
                         id="change-modal-Body">
                        <div className="M-flex-row M-flex-center M-font admin-font-size" style={{marginBottom: '25px'}}>
                            <div className="M-flex-row M-flex-center M-font-20-size" style={{width: '20%'}}>
                                카테고리
                            </div>
                            <div className="M-flex-row M-flex-center M-input">
                                <input type="text" value={renameCategoryState.categoryName} id="categoryName"
                                       onChange={(e) => {
                                           setRenameCategoryState({
                                               ...renameCategoryState,
                                               ['categoryName']: e.target.value
                                           })
                                       }}
                                       className="M-input-text M-font M-font-20-size"/>
                            </div>
                        </div>
                    </div>
                    <div className="O-modal-side-footer M-flex-j-center" id="change-modal-footer">
                        <div className="O-side-select-close M-flex-row M-flex-center" onClick={changeCategoryName}
                             style={{width: '50%', backgroundColor: '#eb8282'}}>
                            <p className="M-font M-font-25-size">변경</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default CategoryRenameModal;