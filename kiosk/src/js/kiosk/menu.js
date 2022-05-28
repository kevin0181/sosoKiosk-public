import axios from "axios";
import serverUrl from "../../pages/config/server.json";

export const getCategoryList = async () => {
    const getData = await axios.post('http://' + serverUrl.server + '/kiosk/CategoryList');
    return getData.data;
};

export const getMenuList = async () => {
    const response = await axios.post('http://' + serverUrl.server + '/kiosk/category/get/categorySq', null, {
        params: {
            categorySq: '0'
        },
        maxRedirects: 0
    });
    return response.data;
}