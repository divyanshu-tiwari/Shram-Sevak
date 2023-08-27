import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/customer'

class CustomerService {

    signin(customerCredentials){
        return axios.post(BASE_URL + '/signin', adminCredentials);
    }

    register(customerData){
        return axios.post(BASE_URL + '/register', adminData)
    }
}

export default new CustomerService();