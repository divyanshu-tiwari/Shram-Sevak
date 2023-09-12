import { BASE_API_URL } from '../common/constants'
import axios from 'axios'
import { authHeader } from './base.service'

const BASE_URL = BASE_API_URL + '/state'

class StateService {

    getAll(){
        return axios.get(BASE_URL + '/all', {headers: authHeader()})
    }

    getById(stateId){
        return axios.get(BASE_URL + '/' + stateId, {headers: authHeader()})
    }

    add(stateData){
        return axios.post(BASE_URL + '/add', stateData, {headers: authHeader()})
    }

    delete(stateId){
        return axios.delete(BASE_URL + '/delete/' + stateId, {headers: authHeader()})
    }

    update(stateData){
        return axios.put(BASE_URL + '/update', stateData, {headers: authHeader()})
    }
}

export default new StateService();