import './App.css';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { useEffect } from 'react';
import { useSpotifyToken } from './contexts/SpotifyTokenContext';
import { TrackList } from './components/TrackList';
import { SearchProvider } from './contexts/SearchContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom';
import { Home } from './pages/Home';


const App = () => {
  const [theme, setTheme] = useState< '' | 'dark-mode' >('');
  
  const { token, setToken } = useSpotifyToken();

  const handletheme = () => {
    theme ? setTheme("") : setTheme("dark-mode");
  };

  useEffect(() => {
    const intializeSpotifyToken = async () => {
      !token.token && await setToken?.();
    };
    intializeSpotifyToken();
    //eslint-disable-next-line
  },[]);

  return (
    <Router>
      <div className={"App " + theme} >
        <SearchProvider>
          <Navbar handleTheme={handletheme} themeState={theme}/>  
        </SearchProvider>
        {/* <button onClick={()=> setToken()}>token</button> */}
      
      <Switch>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/search/:search">
          {token.token && <TrackList/>}
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
