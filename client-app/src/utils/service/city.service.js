import { BASE_API_URL } from '../common/constants'
import axios from 'axios'
import { authHeader } from './base.service'

const BASE_URL = BASE_API_URL + '/city'

class CityService {

    getAll(){
        return axios.get(BASE_URL + '/all', {headers: authHeader()})
    }

    getById(cityId){
        return axios.get(BASE_URL + '/' + cityId, {headers: authHeader()})
    }

    add(cityData){
        return axios.post(BASE_URL + '/add', cityData, {headers: authHeader()})
    }

    delete(cityId){
        return axios.delete(BASE_URL + '/delete/' + cityId, {headers: authHeader()})
    }

    update(cityData){
        return axios.put(BASE_URL + '/update', cityData, {headers: authHeader()})
    }
}

export default new CityService();