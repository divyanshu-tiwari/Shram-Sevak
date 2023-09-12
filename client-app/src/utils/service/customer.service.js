import { BASE_API_URL } from '../common/constants'
import axios from 'axios'
import { authHeader } from './base.service'

const BASE_URL = BASE_API_URL + '/customer'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('currentUser')}`;

class CustomerService {

    signin(customerCredentials){
        return axios.post(BASE_URL + '/signin', customerCredentials)
    }

    register(customerData){
        return axios.post(BASE_URL + '/register', customerData)

    }

    getCustomerById(customerId){
        return axios.get(BASE_URL + '/getCustomer/' + customerId)
    }

    suspendAccount(customerId){
        return axios.patch(BASE_URL + '/suspend/' + customerId)
    }

    activateAccount(customerId){
        return axios.patch(BASE_URL + '/activate/' + customerId)
    }

    getAll(){
        return axios.get(BASE_URL + '/all')
    }
}

export default new CustomerService();