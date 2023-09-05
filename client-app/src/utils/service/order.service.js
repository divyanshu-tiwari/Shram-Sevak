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

    markAsFulFilled(orderId){
        return axios.patch(BASE_URL+'/fulfill/'+orderId) //axios.patch(`http://localhost:8080/order/fulfill/${orderId}`)
    }
 
}

export default new OrderService();