import './App.css';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { useEffect } from 'react';
import { useSpotifyToken } from './contexts/SpotifyTokenContext';

const App = () => {
  const [theme, setTheme] = useState< '' | 'dark-mode' >('');
  
  const { token, setToken } = useSpotifyToken();

  const handletheme = () => {
    theme ? setTheme("") : setTheme("dark-mode");
  };

  useEffect(() => {
    const intializeSpotifyToken = async () => {
      !token && await setToken?.();
      console.log(token);
    };
    intializeSpotifyToken();
    //eslint-disable-next-line
  },[]);

  return (
    <div className={"App " + theme} >
      <Navbar handleTheme={handletheme} themeState={theme}>
        
      </Navbar>
    </div>
  );
}

export default App;
