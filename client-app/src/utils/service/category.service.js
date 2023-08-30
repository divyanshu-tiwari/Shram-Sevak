import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/category'

class CategoryService {

    getAll(){
        return axios.get(BASE_URL + '/all')
    }

    getById(categoryId){
        return axios.get(BASE_URL + '/' + categoryId)
    }

    add(categoryData){
        return axios.post(BASE_URL + '/add', categoryData)
    }

    delete(categoryId){
        return axios.delete(BASE_URL + '/delete/' + categoryId)
    }

    update(categoryData){
        return axios.patch(BASE_URL + '/update', categoryData)
    }

    getSkillsByCategory(categoryId){
        return axios.get(BASE_URL + '/' + categoryId + '/skills')
    }
}

export default new CategoryService();