import React, { ReactNode, SyntheticEvent } from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUserAlt } from 'react-icons/fa'

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
    <div className={style.loginContainer}>
      <Form className={style.formContainer}>
        <div className={style.userIcon}>
          <FaUserAlt />
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" ref={user} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={password}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <div className={style.buttonsContainer}>
          <Button 
            variant="outline-primary" 
            type="submit"
            onClick={(e) => handleSignIn(e)}
            >
            Sign In
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            onClick={(e) => handleLogin(e)}
            >
            Log In
          </Button>
        </div>
      </Form>
      <div>{error}</div>
    </div>
  )
}
