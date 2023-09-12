import axios from "axios";
import store from "../store/store";
import { clearCurrentUser } from "../store/user/userSlice";

export const authHeader = () => {
    return {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + getToken(),
    }
}

export const authImageHeader = () => {
    const currentUser = store.getState.user
    return {
        'Content-Type': 'multipart/form-data',
        "Authorization": 'Bearer ' + getToken(),
    }
}

export const handleResponseWithLoginCheck = () => {
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            const currentUser = store.getState.user
            const isLoggedIn = getToken()
            const status = error?.response?.status

            if (isLoggedIn && [401, 403].includes(status)) {
                store.dispatch(clearCurrentUser)
                //history.push('/login')
            }
        }
    )
}

export const getUserRole = () => {
    const currentUser = store.getState().user
    console.log("Current user in store : " + JSON.stringify(currentUser))
    return currentUser.value.roles;
}

export const getToken = () => {
    return localStorage.getItem('currentUser')
}