import React, { ReactNode, SyntheticEvent } from 'react';
import { useRef, useState } from 'react';
import { signin, login } from '../../services/AuthService';
import style from './Login.module.css';

interface User {
  _id: string;
  password: string;
}

export const Login: React.FC = () => {

  const user = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<ReactNode>();

  const handleSignIn = async(e: SyntheticEvent) => {
    e.preventDefault();
    try{
      if ( user?.current?.value && password?.current?.value) {
        const userObj: User = {
          _id: user?.current?.value,
          password: password?.current?.value,
        };
        let response = await signin(userObj);
        if (response.status !== 201 )
          throw response;
        return setError(<></>);
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
        let response = await login(userObj);
        console.log("finished")
        if (response.status !== 201 && response.status !== 200)
          throw response;
        let credentials = await response.json();
        console.log("succesfull", credentials)
        return setError(<></>);
      }
      return setError(<>Error algunos campos no se han llenado</>)
    } catch(error){
      setError(<>{error?.statusText}</>)
    }
  };

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
