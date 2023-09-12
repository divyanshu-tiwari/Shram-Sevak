import { BASE_API_URL } from '../common/constants'
import axios from 'axios'
import { authHeader } from './base.service'

const BASE_URL = BASE_API_URL + '/skill'

class skillService {

    getAll(){
        return axios.get(BASE_URL + '/all', {headers: authHeader()})
    }

    getById(skillId){
        return axios.get(BASE_URL + '/' + skillId, {headers: authHeader()})
    }

    update(skillData){
        return axios.put(BASE_URL + '/update', skillData, {headers: authHeader()})
    }
    add(skillData){
        return axios.post(BASE_URL + '/add', skillData, {headers: authHeader()})
    }

    delete(skillId){
        return axios.delete(BASE_URL + '/delete/' + skillId, {headers: authHeader()})
    }
}

export default new skillService();