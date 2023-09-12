import { BASE_API_URL } from '../common/constants'
import axios from 'axios'
import { authHeader } from './base.service'

const BASE_URL = BASE_API_URL + '/category'

class CategoryService {

    getAll(){
        return axios.get(BASE_URL + '/all', {headers: authHeader()})
    }

    getById(categoryId){
        return axios.get(BASE_URL + '/' + categoryId, {headers: authHeader()})
    }

    add(categoryData){
        return axios.post(BASE_URL + '/add', categoryData, {headers: authHeader()})
    }

    delete(categoryId){
        return axios.delete(BASE_URL + '/delete/' + categoryId, {headers: authHeader()})
    }

    update(categoryData){
        return axios.patch(BASE_URL + '/update', categoryData, {headers: authHeader()})
    }

    getSkillsByCategory(categoryId){
        return axios.get(BASE_URL + '/' + categoryId + '/skills', {headers: authHeader()})
    }
}

export default new CategoryService();