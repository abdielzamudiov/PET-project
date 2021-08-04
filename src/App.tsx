import './App.css';
import { NavbarCustom } from './components/Navbar';
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
import { useTheme } from './contexts/ThemeContext';


const App = () => {
  
  const { theme } = useTheme();
  const { token } = useSpotifyToken();

  return (
    <Router>
      <AuthProvider>
        <div className={"App " + theme} >
          <SearchProvider>
            <NavbarCustom />  
          </SearchProvider>
          {/* <button onClick={()=> setToken()}>token</button> */}
          <div className={'contentContainer'}>
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
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
