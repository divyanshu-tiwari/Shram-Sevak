import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/skill'

class skillService {

    getAll(){
        return axios.get(BASE_URL + '/all')
    }

    getById(skillId){
        return axios.get(BASE_URL + '/' + skillId)
    }

    update(skillData){
        return axios.put(BASE_URL + '/update', skillData)
    }
    add(skillData){
        return axios.post(BASE_URL + '/add', skillData)
    }

    delete(skillId){
        return axios.delete(BASE_URL + '/' + skillId)
    }
}

export default new skillService();