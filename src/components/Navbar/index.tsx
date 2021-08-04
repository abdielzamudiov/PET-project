import { SyntheticEvent } from 'react';
import { useRef } from 'react';
import { ReactNode } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  handleTheme: () => void;
  themeState: '' | 'dark-mode';
  children?: ReactNode
}

export const Navbar: React.FC<Props> = ({ handleTheme, themeState}) => {
  const { logout } = useAuth();

  const history = useHistory()
  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const search = input?.current?.value || "";

    history.push(`/search/${search}`);
  };
  
  return (
    <div>
      <button onClick={() => logout()}>logout</button>
      { 
        themeState === '' 
          ? <FaMoon onClick={() => handleTheme()} />
          : <FaSun onClick={() => handleTheme()}/>
      }
      <form onSubmit={(e) => handleSubmit(e)}>
        <input ref={input} type="text"/>
        <button type="submit">fetch data</button>
      </form>
    </div>
  )
}
