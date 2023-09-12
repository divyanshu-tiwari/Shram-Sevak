import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const AdminAuthGuard = ({ children, roles }) => {
    
    const currentUser = useSelector((state) => state.user)
    // alert("retrived user from store" + JSON.stringify(currentUser))
    function authorize() {
        
        if (!currentUser.value) {
            return (<Navigate to={{ pathname: '/admin' }} />)
        }
        // alert("In AUTH-GUARD Current user role: " + currentUser.value.role)
        if (roles?.indexOf(currentUser.value.roles) === -1) {
            return (<Navigate to={{ pathname: '/401' }} />)
        }
        return (children)
    }

    return (authorize())
}