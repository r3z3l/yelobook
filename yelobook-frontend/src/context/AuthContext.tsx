import React, { createContext, useContext, useEffect, useState } from 'react'
import { IAuthContext, IUser } from '@/types'
import { getCurrentAccount } from '@/lib/api'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const INITIAL_USER: IUser = {
  id: '',
  username: '',
  email: ''
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  token: '',
  isPending: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  setToken: () => {},
}

const AuthContext = createContext<IAuthContext>(INITIAL_STATE)

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  const [token, setToken] = useState<string>('')
  const [isPending, setIsPending] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const checkAuthUser = async () => {
    setIsPending(true);
    try{
      const currentAccount = await getCurrentAccount();
      if(currentAccount){
        setUser(currentAccount);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error: any){
      console.log(error.message);
      return false;
    } finally {
      setIsPending(false);
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token")==='[]' || localStorage.getItem("token")===null){
      navigate('/signin')
    }
    if(localStorage.getItem("token")!==null){
      checkAuthUser();
    }
  },[])
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);
  

  const value = {
    user,
    token,
    isPending,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
    setToken,
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)