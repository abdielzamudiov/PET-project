import React, { useContext,  useState, ReactNode, createContext } from 'react'
import { useEffect } from 'react';
import { fetchToken } from '../services/SpotifyAPI'
interface State {
  token: string;
}
interface Context {
  token: State;
  setToken: () => Promise<void>
}
interface Props {
  children: ReactNode;
}

const SpotifyTokenContext = createContext<Context>({
  token: {token : ""},
  setToken: () => Promise.resolve()
});

/**
 * 
 * @returns An object, with token and a function to set that token, both from SpotifyTokenContext
 * { token, fetchToken }
 */
export const useSpotifyToken = () => {
  return useContext(SpotifyTokenContext);
}

/**
 * 
 * Allows wrapped components to access SpotifyTokenContext values, through useSpotifyToken custom hook
 * 
 */
export const SpotifyTokenProvider: React.FC<Props> = ({ children }) => {
  
  const [token, setTokenState] = useState<State>({token: ""});
  const [loading, setLoading] = useState<boolean>(true); //loading state 

  /**
   * Async function that fetches and sets the token.
   * To access token, get the { token } from useSpotifyToken()
   * @returns Promise<void>
   */
  const setToken = async () => {
    await fetchToken()
    .then(response => setTokenState({token: response.access_token}));
    
    setLoading(false);  //finishing loading, now will render children
  }

  useEffect(() => {
    setToken();
  },[])

  const value: Context = {
    token,
    setToken
  };

  return (
    <SpotifyTokenContext.Provider value={value}>
      { !loading && children }
    </SpotifyTokenContext.Provider>
  )
}
