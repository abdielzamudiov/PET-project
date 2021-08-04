import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSpotifyToken } from '../../contexts/SpotifyTokenContext';
import { fetchTracks } from '../../services/SpotifyAPI';
import { Track } from '../Track';
import style from './TrackList.module.css';

interface Props {

}
interface Params{
  search:string;
}
interface TrackType {
  id?: string;
  album?: { name?: string, images?: Array<{url: string}> };
  artists?: Array<{name?: string}>;
  name?: string;
}
export const TrackList: React.FC<Props> = () => {
  const { search } = useParams<Params>();
  const { token } = useSpotifyToken();

  const [tracks, setTracks] = useState<Array<TrackType>>([]);

  useEffect(() => {
    const getTracks = async () => {
      let response = await fetchTracks(token.token,search);
      token.token && setTracks(response?.tracks?.items);
    }
    search && getTracks();
  },[search, token]);
 
  return (
    <div className={style.trackListContainer}>
      {
        tracks && tracks.map( track => {
          return (
            <Track
              key = {track.id}
              id = {track.id}
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
