import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


// authenticate user middlewaare
const AuthenticateUser = ({ children }) => {

    const { isUserLoggedIn } = useContext(AuthContext);

    return isUserLoggedIn ? children : <Navigate to="/login" />


}

// export 
export default AuthenticateUser;