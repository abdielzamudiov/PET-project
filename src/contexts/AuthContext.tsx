import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react'
import { signin, login } from '../services/AuthService';

interface User {
  _id: string;
  password: string;
}

interface UserData {
  username: string;
  userToken: string;
}

interface Context {
  username: string;
  userToken: string;
  login: (user: User) => Promise<void>;
  signin: (user: User) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<Context>({
  username: '',
  userToken: '',
  login: (user: User) => Promise.resolve(),
  signin: (user: User) => Promise.resolve(),
  logout: () => undefined
})

/**
 * 
 * @returns an object with username, useraToken aka JWT, a function to login, another to signin and another to logout
 */
export const useAuth = () => {
  return useContext(AuthContext);
}

/**
 * 
 * Allows wrapped components to access AuthContext values, through useAuth custom hook
 * 
 */
export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>();
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * function to login an user by authenticating and saving it in the local storage
   * @param user an user Object
   */
  const loginUser = async (user: User) => {
    let response = await login(user);
    
    if (response.status !== 201 && response.status !== 200)
      throw response;

    let credentials = await response.json();

    credentials && localStorage.setItem('user', JSON.stringify(credentials));
    let currentLocalStorage = localStorage.getItem('user') || '';
    setCurrentUser(JSON.parse(currentLocalStorage));
  };

  /**
   * function to sign in an user, it also logs them in
   * @param user An user Object
   */
  const signinUser = async (user: User) => {
    let response = await signin(user);
    if (response.status !== 201 )
      throw response;
    await loginUser(user);
  };

  /**
   * function to logout an user
   */
  const logout = () => {
    localStorage.setItem('user','');
    setCurrentUser(null);
  }

  useEffect(() => {
    let user = localStorage.getItem('user') || "";
    user && setCurrentUser(JSON.parse(user));
    setLoading(false);
  },[]);

  const value: Context = {
    username: currentUser?.username || '',
    userToken: currentUser?.userToken || '',
    login: loginUser,
    signin: signinUser,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )
}
