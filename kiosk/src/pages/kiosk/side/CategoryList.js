import axios from "axios";
import {useEffect, useState} from "react";
import serverUrl from './../../config/server.json';

const CategoryList = () => {

    const [categoryList, setCategoryList] = useState([]);

    const getCategoryList = () => {
        const getData = axios.post('http://' + serverUrl.server + '/kiosk/CategoryList');
        getData.then((function (res) {
            setCategoryList(res.data);
        }));
    };

    useEffect(() => {
        getCategoryList();
    },[setCategoryList]);

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