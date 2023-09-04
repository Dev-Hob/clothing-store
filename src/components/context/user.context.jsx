import { createContext, useEffect, useState } from "react";
import { create_user_document_from_auth, onAuthStateChangedListener } from "../../utils/firebase/firebase.utils";


export const UserContext = createContext({user: '', setUser: () => ''})

export const UserContextProvider = ({children}) => {
    const [user, setUser ] = useState('');
    const value = {user, setUser} 

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener( user => {
            if(user)  create_user_document_from_auth(user);
            setUser(user)
        });

        return unsubscribe()
    }, [])

    return (
        <UserContext.Provider value={value} >
        {children}
        </UserContext.Provider>
    )
}