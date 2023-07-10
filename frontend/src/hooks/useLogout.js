import { useAuthContext } from "./useAuthContext";
import {useToDoContext} from "./useToDoContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const {dispatch:toDoDispatch} = useToDoContext();

    const logout = () => {
        //remove the user from local storage
        localStorage.removeItem('user');

        //dispatch the logout action
        dispatch({ type: 'LOGOUT' });
        toDoDispatch({type:'GET_TODOS',payload:null})
    }
    return { logout }
}