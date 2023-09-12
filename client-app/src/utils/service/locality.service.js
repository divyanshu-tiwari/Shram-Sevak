import { BASE_API_URL } from '../common/constants'
import axios from 'axios'
import { authHeader } from './base.service'

const BASE_URL = BASE_API_URL + '/locality'

class LocalityService {

    getAll(){
        return axios.get(BASE_URL + '/all', {headers: authHeader()})
    }

    getById(localityId){
        return axios.get(BASE_URL + '/' + localityId, {headers: authHeader()})
    }

    add(localityData){
        return axios.post(BASE_URL + '/add', localityData, {headers: authHeader()})
    }

    delete(localityId){
        return axios.delete(BASE_URL + '/delete/' + localityId, {headers: authHeader()})
    }

    update(localityData){
        return axios.put(BASE_URL + '/update', localityData, {headers: authHeader()})
    }
}

export default new LocalityService();