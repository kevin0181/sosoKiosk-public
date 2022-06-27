import {useNavigate} from "react-router-dom";
import $ from 'jquery';

const CategoryList = ({categoryList}) => {

    const navigate = useNavigate();

    const changeSelectCss = (categorySq) => {

        $('.O-category-select').removeClass('O-click-color');

        $('#categorySelectCss' + categorySq).children('.O-category-select').addClass('O-click-color');

    }

    return (
        <>
            <div className="text D-font O-category-font O-category-Side"
                 style={{fontSize: '25px'}}
                 onClick={() => {
                     changeSelectCss(0);
                     navigate('/menuOrder?categorySq=0')
                 }} id={'categorySelectCss0'}>
                <div className="O-category-name O-category-select O-click-color">
                    <a>전체</a>
                </div>
            </div>
            {categoryList && categoryList.map((it) => (
                <div className="text O-category-font O-category-Side" key={it.categorySq}
                     id={'categorySelectCss' + it.categorySq}
                     onClick={() => {
                         changeSelectCss(it.categorySq);
                         navigate('/menuOrder?categorySq=' + it.categorySq)
                     }}>
                    <div className="O-category-name D-font O-category-select" style={{fontSize: '25px'}}>
                        <p>{it.categoryName}</p>
                    </div>
                </div>
            ))}
        </>
    );

}

export default CategoryList;