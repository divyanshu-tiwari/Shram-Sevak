
// import { useDispatcher, useSelector } from "react-redux";
// import { setCurrentUser, clearCurrentUser, selectUser } from "../store/user/userSlice";

import store from "../store/store";

export const getUserRole = () => {
    const currentUser = store.getState().user
    console.log("Current user in store : "+JSON.stringify(currentUser))
    return currentUser.value.role;
}