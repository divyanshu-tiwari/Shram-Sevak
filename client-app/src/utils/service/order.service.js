import { BASE_API_URL } from '../common/constants'
import axios from 'axios'
import { authHeader } from './base.service'

const BASE_URL = BASE_API_URL + '/order'

class OrderService {

    getByCustomerId(customerId){
        return axios.get(BASE_URL + '/customer/' + customerId, {headers: authHeader()})
    }
    
    getByWorkerId(workerId){
        return axios.get(BASE_URL + '/worker/' + workerId, {headers: authHeader()})
    }
 
}

export default new OrderService();