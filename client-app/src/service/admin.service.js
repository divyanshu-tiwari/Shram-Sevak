import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/admin'

class AdminService {

    login(adminCredentials){
        return axios.post(BASE_URL + '/login', adminCredentials);
    }

    register(adminData){
        return axios.post(BASE_URL + '/register', adminData)
    }
}

export default new AdminService();