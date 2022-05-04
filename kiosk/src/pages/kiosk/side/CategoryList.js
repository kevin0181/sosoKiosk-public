const CategoryList = () => {

    const list = [
        {categoryName: '카테고리 1'},
        {categoryName: '카테고리 2'},
        {categoryName: '카테고리 3'}
    ]

    return (
        <div>
            {list.map((it) => (
                <div className="text M-font O-category-font O-category-Side">
                    <div className="O-category-name">
                        <p className="O-category-a">{it.categoryName}</p>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default CategoryList;