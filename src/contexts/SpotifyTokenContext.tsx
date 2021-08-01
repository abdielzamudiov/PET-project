import React, { useContext,  useState, ReactNode, createContext } from 'react'
import { fetchToken } from '../services/SpotifyAPI'

interface Context {
  token: string;
  setToken: () => Promise<void>
}
interface Props {
  children: ReactNode;
}

const SpotifyTokenContext = createContext<Context>({
  token: "",
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
  
  const [token, setTokenState] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); //loading state 

  /**
   * Async function that fetches and sets the token.
   * To access token, get the { token } from useSpotifyToken()
   * @returns Promise<void>
   */
  const setToken = async () => {
    setLoading(true); // starts loading

    await fetchToken()
    .then(response => setTokenState(response.access_token));
    
    setLoading(false);  //finishing loading, now will render children
    console.log("Token Fetched");
  }

  const values = {
    token,
    setToken
  };

  return (
    <SpotifyTokenContext.Provider value={values}>
      { !loading && children }
    </SpotifyTokenContext.Provider>
  )
}
