import { BASE_API_URL } from '../common/constants'
import axios from 'axios'

const BASE_URL = BASE_API_URL + '/worker'

class WorkerService {

    signin(workerCredentials){
        return axios.post(BASE_URL + '/signin', workerCredentials);
    }

    register(workerData){
        return axios.post(BASE_URL + '/register', workerData)
    }

    getAll(){
        return axios.get(BASE_URL)
    }

    suspendAccount(workerId){
        return axios.patch(BASE_URL + '/suspend/' + workerId)
    }

    activateAccount(workerId){
        return axios.patch(BASE_URL + '/activate/' + workerId)
    }
}

export default new WorkerService();