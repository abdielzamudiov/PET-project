import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Track } from '../../components/Track';
import { useSpotifyToken } from '../../contexts/SpotifyTokenContext';
import { fetchTrack } from '../../services/SpotifyAPI';

interface Params {
  id: string;
}
interface TrackType {
  id?: string;
  album?: { name?: string, images?: Array<{url: string}> };
  artists?: Array<{name?: string}>;
  name?: string;
}

export const TrackReviews: React.FC = () => {
  const { id } = useParams<Params>();
  const { token } = useSpotifyToken();

  const [track,setTrack] = useState<TrackType>();

  useEffect(() => {
    const fetchData = async () => { 
      let results = await fetchTrack(token.token,id);
      setTrack(results);

    };
  })

  return (
    <div >
      {track && <Track
        name = {track.name}
        artists = {track.artists}
        album = {track.album}
      />}
      
    </div>
  )
}
