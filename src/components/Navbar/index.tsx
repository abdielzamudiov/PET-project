import { SyntheticEvent } from 'react';
import { useRef } from 'react';
import { ReactNode } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useHistory } from 'react-router-dom';
import { useSearch } from '../../contexts/SearchContext';

interface Props {
  handleTheme: () => void;
  themeState: '' | 'dark-mode';
  children?: ReactNode
}
interface Track {
  id?: string;
  album?: { name?: string };
  artists?: Array<{name?: string}>;
  name?: string;
}

export const Navbar: React.FC<Props> = ({ handleTheme, themeState}) => {

  const history = useHistory()
  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const search = input?.current?.value || "";

    history.push(`/search/${search}`);
  };
  
  return (
    <div>
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
