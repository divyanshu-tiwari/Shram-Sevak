export default class User {
    constructor(id, firstName, lastName, contact, password, role, token) { 
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.contact = contact
        this.password = password
        this.role = role
        this.token = token
    }
}