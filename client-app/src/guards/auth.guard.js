import { useSelector } from "react-redux/es/hooks/useSelector";
import { Navigate } from "react-router";

export const AuthGuard = ({ children, roles }) => {
    const currentUser = useSelector(selectUser)

    const authorize = () => {
        if(!currentUser){
            return (<Navigate to={{pathname: '/admin'}} />)
        }

        if(roles?.indexOf(currentUser.role === -1)){
            return (<Navigate to={{pathname: '/401'}} />)
        }

        return(children)
    }

    return(authorize())
}