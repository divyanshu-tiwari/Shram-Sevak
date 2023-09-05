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

    getWorkerById(workerId){
        return axios.get(BASE_URL+'/getWorker/'+workerId);
    }

    getAllActiveOrdersByWorkerId(workerId){
        return axios.get(BASE_URL+'/active/'+workerId) 
    }

    updateWorkerSkillset(workerAndSkillData){
        return axios.patch(BASE_URL+'/skills',workerAndSkillData) //axios.patch('http://localhost:8080/worker/skills', reqData)
    }

    updateWorkingLocation(workerAndLocationInfo){
        return axios.patch(BASE_URL+'/locality', workerAndLocationInfo)
    }

    updateWorkerData(workerData){
        return axios.put(BASE_URL+'/'+workerData.id, workerData); //axios.put(`http://localhost:8080/worker/${updatedWorker.id}`, updatedWorker);
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

    deleteWorkerAccount(workerId){
        return axios.delete(BASE_URL+'/deletePermanent/'+workerId)
    }


}

export default new WorkerService();