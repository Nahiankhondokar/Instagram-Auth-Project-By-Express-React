import AuthContext from "../context/AuthContext";
import cookie from 'js-cookie';
import { useReducer } from "react";
import AuthReducer from "../reducers/AuthReducer";


// initial state
const INITIAL_STATE = {
    isUserLoggedIn : false,
    user : { }
}

// create provier 
const AuthContextProvider = ({ children }) => {

    // reducer
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            isUserLoggedIn : state.isUserLoggedIn,
            user : state.user,
            dispatch
        }}>
            { children }
        </AuthContext.Provider>
    );

}



// exprot 
export default AuthContextProvider;