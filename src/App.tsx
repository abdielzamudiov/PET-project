import './App.css';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
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
import { TrackReviews } from './pages/TrackReviews';
import { ReviewViewer } from './pages/ReviewViewer.tsx';
import { Login } from './pages/Login.tsx';
import { AuthProvider } from './contexts/AuthContext';


const App = () => {
  const [theme, setTheme] = useState< '' | 'dark-mode' >('');
  
  const { token } = useSpotifyToken();

  const handletheme = () => {
    theme ? setTheme("") : setTheme("dark-mode");
  };

  return (
    <Router>
      <AuthProvider>
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
        <Route path="/track/:trackId">
          <TrackReviews/>
        </Route>
        <Route path="/review/:reviewId">
          <ReviewViewer/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
