import { SyntheticEvent } from 'react';
import { useRef } from 'react';
import { ReactNode, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSpotifyToken } from '../../contexts/SpotifyTokenContext';
import { fetchTracks } from '../../services/SpotifyAPI'

interface Props {
  handleTheme: () => void;
  themeState: '' | 'dark-mode';
  children: ReactNode
}
interface Track {
  id?: string;
  album?: { name?: string };
  artists?: Array<{name?: string}>;
  name?: string;
}

export const Navbar: React.FC<Props> = ({ handleTheme, themeState}) => {
  const input = useRef<HTMLInputElement>(null);

  const [tracks, setTracks] = useState<Array<Track>>([]);

  const { token } = useSpotifyToken()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const search = input?.current?.value || "";
    console.log(token);
    let response = await fetchTracks(token, search);
    setTracks(response?.tracks?.items);
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
    
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {
          tracks && tracks?.map( track => {
            return (
              <div> 
                <p>Atrists: {track.artists?.map(artist => artist.name)}</p>
                <p>Name: {track.name}</p>
                <p>Album: {track.album?.name}</p>
              </div>
            )
          }
          )
        }
      </div>
        
    </div>
  )
}
