import httpsRes from '../plugin/axios'

const get_LoginUserInfo = (params) => httpsRes.get('/userInfo', {params})

export default {
    get_LoginUserInfo
}