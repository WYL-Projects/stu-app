//把所有ajax需要访问的地址封装成一个类
import Axios from 'axios'
import urls  from './URLs.js'
//定义api接口
const api = {};
const appkey = {
    appkey:'_411771204WYL_1555650312097'
}
api.findPage = function (page, size){
    //相当于$.ajax
    return Axios.get(urls.baseURL + urls.findByPage, {
        params:{
            page,
            size,
            ...appkey
        }
    })
}
api.updateStu = function (newUser){
   return Axios.get(urls.baseURL + urls.updateStu, {
        params:{
            ...appkey,
            ...newUser
        }
    })
}
api.delBySno = function (sNo){
    return Axios.get(urls.baseURL + urls.delBySno, {
        params:{
            ...appkey,
            sNo
        }
    })
}
api.searchStu = function (search, page=1){
    return Axios.get(urls.baseURL + urls.stuSearch, {
        params:{
            ...appkey,
            search,
            page,
            sex:-1,//男女通选
            size:2       
        }
    })
}
export default api