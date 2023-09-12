import { BASE_API_URL } from '../common/constants'
import axios from 'axios'
import { authHeader } from './base.service';

const BASE_URL = BASE_API_URL + '/worker'

class WorkerService {

    signin(workerCredentials){
        return axios.post(BASE_URL + '/signin', workerCredentials, {headers: authHeader()});
    }

    register(workerData){
        return axios.post(BASE_URL + '/register', workerData, {headers: authHeader()})
    }

    getAll(){
        return axios.get(BASE_URL, {headers: authHeader()})
    }

    suspendAccount(workerId){
        return axios.patch(BASE_URL + '/suspend/' + workerId, {headers: authHeader()})
    }

    activateAccount(workerId){
        return axios.patch(BASE_URL + '/activate/' + workerId, {headers: authHeader()})
    }
}

export default new WorkerService();