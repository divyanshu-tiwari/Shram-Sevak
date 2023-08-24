export default class AdminUser{
    constructor(userName, password, id, role, token){
        this.id = id
        this.userName = userName
        this.role = role
        this.token = token
    }
}