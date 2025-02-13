import {createContext, useEffect, useState} from 'react'

export const UserContext=createContext();

export const UserProvider = ({children}) => {
    const [user,setUser]=useState(()=>{
      return JSON.parse(localStorage.getItem('user')) || null;
    });
    useEffect(()=>{
      localStorage.setItem('user',JSON.stringify(user));
    },[user]);

    const login=(userData)=>{
      setUser(userData);
      localStorage.setItem('accessToken',userData.accessToken);
      localStorage.setItem('user',JSON.stringify(userData));
    }

    const logout=()=>{
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }

  return (
    <UserContext.Provider value={{user,login,logout}}>
        {children}
    </UserContext.Provider>
  )
}

