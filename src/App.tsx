import './App.css';
import { NavbarCustom } from './components/Navbar';
import { useSpotifyToken } from './contexts/SpotifyTokenContext';
import { TrackList } from './components/TrackList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Home } from './pages/Home';
import { TrackReviews } from './pages/TrackReviews';
import { ReviewViewer } from './pages/ReviewViewer.tsx';
import { Login } from './pages/Login.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import { Container } from 'react-bootstrap';
import { UserProfile } from './pages/UserProfile';
import { NotFound } from './pages/NotFound';


const App = () => {
  
  const { theme } = useTheme();
  const { token } = useSpotifyToken();

  return (
    <Router>
      <AuthProvider>
        <div className={"App " + theme} >
          <NavbarCustom />  
          <Container className='extendContainer'>
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
              <Route path="/user/:user">
                <UserProfile/>
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Container>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
