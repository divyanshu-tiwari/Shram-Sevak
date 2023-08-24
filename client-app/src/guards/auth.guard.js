import { useSelector } from "react-redux/es/hooks/useSelector";
import { Navigate } from "react-router";

export const AuthGuard = ({ children, roles }) => {
    const currentUser = useSelector((state) => state.user)

    const authorize = () => {
        if(!currentUser.value){
            return (<Navigate to={{pathname: '/admin'}} />)
        }
        alert("In AUTH-GUARD Current user role: " + currentUser.value.role)
        if(roles?.indexOf(currentUser.value.role) === -1){
            return (<Navigate to={{pathname: '/401'}} />)
        }

        return(children)
    }

    return(authorize())
}