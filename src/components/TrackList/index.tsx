import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearch } from '../../contexts/SearchContext';
import { useSpotifyToken } from '../../contexts/SpotifyTokenContext';
import { fetchTracks } from '../../services/SpotifyAPI';
import { Track } from '../Track';
interface Props {

}
interface Params{
  search:string;
}
interface Track {
  id?: string;
  album?: { name?: string };
  artists?: Array<{name?: string}>;
  name?: string;
}
export const TrackList: React.FC<Props> = () => {
  const { search } = useParams<Params>();
  const { token } = useSpotifyToken();

  const [tracks, setTracks] = useState<Array<Track>>([]);

  useEffect(() => {
    const getTracks = async () => {
      console.log("fetching track")
      console.log(token,"trakclist")
      let response = await fetchTracks(token.token,search);
      token.token && setTracks(response?.tracks?.items);
      console.log(token)
    }
    search && getTracks();
    console.log("useEffect del tacklist")
  },[search, token]);
  console.log(search,"tracklist")
  return (
    <div style={{display:'flex', flexDirection: 'column'}}>
      {
        tracks && tracks.map( track => {
          return (
            <Track
              key = {track.id}
              name = {track.name}
              artists = {track.artists}
              album = {track.album}
            />
          )
        })
      }
    </div>
  )
}
