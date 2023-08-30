import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const WorkerAuthGuard = ({ children, roles }) => {
    const currentUser = useSelector((state) => state.user)

    function authorize() {

        if (!currentUser.value) {
            return (<Navigate to={{ pathname: '/login' }} />)
        }
         //alert("In AUTH-GUARD Current user role: " + currentUser.value.role)
        if (roles?.indexOf(currentUser.value.role) === -1) {
            return (<Navigate to={{ pathname: '/401' }} />)
        }
        return (children)
    }

    return (authorize())
}