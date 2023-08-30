import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/city'

class CityService {

    getAll(){
        return axios.get(BASE_URL + '/all')
    }

    getById(cityId){
        return axios.get(BASE_URL + '/' + cityId)
    }

    add(cityData){
        return axios.post(BASE_URL + '/add', cityData)
    }

    delete(cityId){
        return axios.delete(BASE_URL + '/delete/' + cityId)
    }

    update(cityData){
        return axios.put(BASE_URL + '/update', cityData)
    }
}

export default new CityService();