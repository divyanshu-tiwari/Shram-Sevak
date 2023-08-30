import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/state'

class StateService {

    getAll(){
        return axios.get(BASE_URL + '/all')
    }

    getById(stateId){
        return axios.get(BASE_URL + '/' + stateId)
    }

    add(stateData){
        return axios.post(BASE_URL + '/add', stateData)
    }

    delete(stateId){
        return axios.delete(BASE_URL + '/delete/' + stateId)
    }

    update(stateData){
        return axios.put(BASE_URL + '/update', stateData)
    }
}

export default new StateService();