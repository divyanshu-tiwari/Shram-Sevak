import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/customer'

class CustomerService {

    signin(customerCredentials){
        return axios.post(BASE_URL + '/signin', customerCredentials);
    }

    register(customerData){
        return axios.post(BASE_URL + '/register', customerData)
    }
}

export default new CustomerService();