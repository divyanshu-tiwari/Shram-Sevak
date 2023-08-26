export default class User {
    constructor(firstName, lastName, contact, password, role, id) { // add token
        this.firstName = firstName
        this.lastName = lastName
        this.contact = contact
        this.password = password
        this.role = role
        this.id = id
    }
}