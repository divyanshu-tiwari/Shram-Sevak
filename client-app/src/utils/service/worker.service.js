import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/worker'

class WorkerService {

    signin(workerCredentials){
        return axios.post(BASE_URL + '/signin', adminCredentials);
    }

    register(workerData){
        return axios.post(BASE_URL + '/register', adminData)
    }
}

export default new WorkerService();