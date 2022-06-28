import httpsRes from '../plugin/axios'


const get_LoginUserInfo = (params) => httpsRes.get('/userInfo', { params })  // 获取用户信息
const get_menuList = (params) => httpsRes.get("/menuData", { params })  //获取menu
// todolist
const get_tableData = (params) => httpsRes.get("/todoData", { params }) //获取代办事项的数据
const post_tableData = (params) => httpsRes.post("/todoData", params) //添加todolist数据
const patch_tableData = (id, params) => httpsRes.patch(`/todoData/${id}`, params) //更新todolist数据
const get_like_tableData = (val) => httpsRes.get(`/todoData?task_like=${val}`)  //获取搜索数据
const delect_tableData = (id) => httpsRes.delete(`/todoData/${id}`)  //删除todolist数据

const get_UserData = (params) => httpsRes.get('/userData', { params })  //获取用户数据

const get_teacher = (params) => httpsRes.get('/teacher', { params })  //获取班级各科老师数据
const patch_teacher = (params) => httpsRes.patch(`/teacher/${id}`, params)  //修改班级各科老师数据

export default {
    get_LoginUserInfo,
    get_menuList,
    get_tableData,
    post_tableData,
    patch_tableData,
    get_UserData,
    get_like_tableData,
    delect_tableData,
    get_teacher,
    patch_teacher
}