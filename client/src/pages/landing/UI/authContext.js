'use client'

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext();

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [isloggedin, setIsloggedin] = useState(false);

    useEffect(() => {
        const checkLogin = async () =>{
        try{
          const response = await fetch('http://localhost:4000/api/v1/currentuser', {
            credentials: "include",
            mode: 'cors'
          })
          if (response.ok){
            console.log('User is logged in');
            setIsloggedin(true);
            const data = await response.json();
            setUser(data.user);
          }
        } catch(error){
          console.log('Error getting current user:', error)
        }
      }
      checkLogin();    
    }, []);

    return (
        <AuthContext.Provider value={{user,isloggedin}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);