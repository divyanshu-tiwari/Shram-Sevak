
// import { useDispatcher, useSelector } from "react-redux";
// import { setCurrentUser, clearCurrentUser, selectUser } from "../store/user/userSlice";

export const getUser = (currentUser) => {
    alert(currentUser?.userName+" "+currentUser?.role);
}