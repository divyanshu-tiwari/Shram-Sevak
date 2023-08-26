import axios from "axios";
import store from "../store/store";
import { clearCurrentUser } from "../store/user/userSlice";

export const authHeader = () => {
    const currentUser = store.getState().user

    return {
        'Content-Type': 'application/json',
        authorization: 'Bearer' + currentUser?.token,
    }
}

export const authImageHeader = () => {
    const currentUser = store.getState.user
    return {
        'Content-Type': 'multipart/form-data',
    authorization: 'Bearer ' + currentUser?.token,
    }
}

export const handleResponseWithLoginCheck = () => {
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            const currentUser = store.getState.user
            const isLoggedIn = currentUser?.token
            const status = error?.response?.status

            if(isLoggedIn && [401, 403].includes(status)) {
                store.dispatch(clearCurrentUser)
                //history.push('/login')
            }
        }
    )
}

export const getUserRole = () => {
    const currentUser = store.getState().user
    console.log("Current user in store : "+JSON.stringify(currentUser))
    return currentUser.value.role;
} 