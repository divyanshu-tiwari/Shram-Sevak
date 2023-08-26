import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/admin'

class AdminService {

    signin(adminCredentials){
        return axios.post(BASE_URL + '/signin', adminCredentials);
    }

    register(adminData){
        return axios.post(BASE_URL + '/register', adminData)
    }
}

export default new AdminService();