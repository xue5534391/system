import httpsRes from '../plugin/axios'


const get_LoginUserInfo = (params) => httpsRes.get('/userInfo', {params})  // 获取用户信息
const get_menuList = (params) => httpsRes.get("/menuData", {params})  //获取menu
// todolist
const get_tableData = (params) => httpsRes.get("/todoData", {params}) //获取代办事项的数据
const post_tableData = (params) => httpsRes.post("/todoData", params) //添加todolist数据
const patch_tableData = (id, params) => httpsRes.patch(`/todoData/${id}`, params) //添加todolist数据

export default {
    get_LoginUserInfo,
    get_menuList,
    get_tableData,
    post_tableData,
    patch_tableData
}