import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: localStorage.getItem('currentUser') !== null ? jwtDecode(localStorage.getItem('currentUser')) : null
    },
    reducers: {
        // pass the user object as the payload in action
        setCurrentUser: (state, action) => {
            console.log("set current user : " + JSON.stringify(action?.payload.message))
            localStorage.setItem('currentUser', JSON.stringify(action?.payload.message))
            const decodedToken = jwtDecode(action?.payload.message)
           
            // alert(JSON.stringify())
            state.value = decodedToken;
        },

        clearCurrentUser: (state) => {
            console.log("clear current user : " + localStorage.getItem('currentUser'))
            localStorage.removeItem('currentUser')
            state.value = null;
        },
    },
})

export const selectUser = (state) => state.user.value

export const { setCurrentUser, clearCurrentUser } = userSlice.actions

export default userSlice.reducer