import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/order'

class OrderService {

    getByCustomerId(customerId){
        return axios.get(BASE_URL + '/customer/' + customerId)
    }
    
    getByWorkerId(workerId){
        return axios.get(BASE_URL + '/worker/' + workerId)
    }
 
}

export default new OrderService();