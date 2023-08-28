import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Role } from "../models/role";

export const AdminLoginGuard = ({ children, roles }) => {
    const currentUser = useSelector((state) => state.user)

    function proceed() {
        // alert(JSON.stringify(currentUser.value))
        if ((currentUser.value !== {}) && currentUser.value.role === Role.ADMIN) {
            return (<Navigate to={{ pathname: '/admin-dashboard' }} />)
        }
        /*
        alert("In AUTH-GUARD Current user role: " + currentUser.value.role)
        if (roles?.indexOf(currentUser.value.role) === -1) {
            return (<Navigate to={{ pathname: '/401' }} />)
        }
        */
        return (children)
    }

    return (proceed())
}