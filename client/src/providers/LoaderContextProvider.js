import LoaderContext from "../context/LoaderContext";
import { useReducer } from "react";
import LoaderReducer from "../reducers/LoaderReducer";


// initial state
const INITIAL_STATE = 0;

// create provier 
const LoaderContextProvider = ({ children }) => {

    // reducer
    const [loaderState, loaderDispatch] = useReducer(LoaderReducer, INITIAL_STATE);

    return (
        <LoaderContext.Provider value={{
            loaderState,
            loaderDispatch
        }}>
            { children }
        </LoaderContext.Provider>
    );

}



// exprot 
export default LoaderContextProvider;