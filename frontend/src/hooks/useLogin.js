import { useState} from "react";    
import {useAuthContext} from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const {dispatch} = useAuthContext();

    const login = async (email, password,username) => {
        setLoading(true);
        setError(null);

        const res = await fetch('api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password,username})
        });

        const json = await res.json();
        if(!res.ok) {
            setLoading(false);
            setError(json.error);
       
        }
        if (res.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //update the auth context
            dispatch({type: 'LOGIN', payload: json});

            setLoading(false);
            
        }
    }
    return {error, loading, login}
}