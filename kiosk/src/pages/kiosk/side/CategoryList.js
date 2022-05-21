const CategoryList = ({categoryList}) => {

    return (
        <div>
            {categoryList && categoryList.map((it) => (
                <div className="text M-font O-category-font O-category-Side" key={it.categorySq}>
                    <div className="O-category-name">
                        <p className="O-category-a">{it.categoryName}</p>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default CategoryList;