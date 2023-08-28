import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: JSON.parse(localStorage.getItem('currentUser'))
    },
    reducers: {
        // pass the user object as the payload in action
        setCurrentUser: (state, action) => {
            console.log("set current user : " + JSON.stringify(action?.payload))
            localStorage.setItem('currentUser', JSON.stringify(action?.payload))
            state.value = action?.payload;
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