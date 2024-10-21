import { createContext, useContext, useState } from "react";

const authContext =createContext();

const contextProvider = ({children})=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user,setUser] = useState(null);
    const login =(user)=>{
        setUser(user)
    }
    return(
        <authContext.Provider value={{ user, login }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth =()=> useContext(authContext)
export default contextProvider