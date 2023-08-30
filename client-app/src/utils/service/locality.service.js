import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/locality'

class LocalityService {

    getAll(){
        return axios.get(BASE_URL + '/all')
    }

    getById(localityId){
        return axios.get(BASE_URL + '/' + localityId)
    }

    add(localityData){
        return axios.post(BASE_URL + '/add', localityData)
    }

    delete(localityId){
        return axios.delete(BASE_URL + '/' + localityId)
    }

    update(localityData){
        return axios.put(BASE_URL + '/update', localityData)
    }
}

export default new LocalityService();