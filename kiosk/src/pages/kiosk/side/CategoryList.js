import {useNavigate} from "react-router-dom";

const CategoryList = ({categoryList}) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="text M-font O-category-font O-category-Side" onClick={() => {
                navigate('/menuOrder')
            }}>
                <div className="O-category-name O-click-color">
                    <a className="O-category-a">전체</a>
                </div>
            </div>
            {categoryList && categoryList.map((it) => (
                <div className="text M-font O-category-font O-category-Side" key={it.categorySq} onClick={() => {
                    navigate('/menuOrder?categorySq=' + it.categorySq)
                }}>
                    <div className="O-category-name">
                        <p className="O-category-a">{it.categoryName}</p>
                    </div>
                </div>
            ))}
        </>
    );

}

export default CategoryList;