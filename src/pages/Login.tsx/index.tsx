import React, { ReactNode, SyntheticEvent } from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import style from './Login.module.css';

interface User {
  _id: string;
  password: string;
}

export const Login: React.FC = () => {
  const { login, signin, userToken } = useAuth()

  const user = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<ReactNode>();

  const history = useHistory();

  const handleSignIn = async(e: SyntheticEvent) => {
    e.preventDefault();
    try{
      if ( user?.current?.value && password?.current?.value) {
        const userObj: User = {
          _id: user?.current?.value,
          password: password?.current?.value,
        };

        await signin(userObj);

        return history.push('/home');
      }
      return setError(<>Error algunos campos no se han llenado</>)
    } catch(error){
      setError(<>{error?.statusText}</>)
    }
  };

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("inside handle function login");
    try{
      if ( user?.current?.value && password?.current?.value) {
        console.log("fields are not empty");
        
        const userObj: User = {
          _id: user?.current?.value,
          password: password?.current?.value,
        };
       
        await login(userObj);

        return history.push('/home');
      }
      return setError(<>Error algunos campos no se han llenado</>)
    } catch(error){
      setError(<>{error?.statusText}</>)
    }
  };
  
  useEffect(() => {
    userToken && history.push('/home');
  });
  
  return (
    <div >
      <form className={style.loginContainer}>
        <label>
        User
          <input type="text" ref={user}/>
        </label>
        <label>
        Password
          <input type="text" ref={password}/>
        </label>
        <button onClick={(e) => handleLogin(e)} type="submit">Login</button>
        <button onClick={(e) => handleSignIn(e)} type="submit">SignIn</button>
      </form>
      {error}
    </div>
  )
}
