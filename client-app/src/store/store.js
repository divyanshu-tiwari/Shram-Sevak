import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"

export default configureStore({
    reducers:{
        user: userReducer,
    },
})