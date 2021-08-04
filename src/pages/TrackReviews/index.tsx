import { useState, useRef, useEffect, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Track } from '../../components/Track';
import { useSpotifyToken } from '../../contexts/SpotifyTokenContext';
import { fetchTrack } from '../../services/SpotifyAPI';
import { postReview } from '../../services/ReviewsAPI';
import { ReviewList } from '../../components/ReviewList.tsx';
import { useAuth } from '../../contexts/AuthContext';

interface Params {
  trackId: string;
}
interface TrackType {
  id?: string;
  album?: { name?: string, images?: Array<{url: string}> };
  artists?: Array<{name?: string}>;
  name?: string;
}
interface Review {
  user: string,
  review: string,
  track: string,
  date: Date,
}

export const TrackReviews: React.FC = () => {
  const { trackId } = useParams<Params>();
  const { token } = useSpotifyToken();
  const { userToken } = useAuth();
  const input = useRef<HTMLInputElement>(null);

  const [track,setTrack] = useState<TrackType>();

  const handleSubmit = async (e: SyntheticEvent) => {
    try{
      e.preventDefault();

      const review = input?.current?.value || "";
      const reviewObj: Review = {
        user: "test user",
        track: trackId,
        review,
        date: new Date()
      };

      const reviewAdded = await postReview(userToken, reviewObj);

      if (reviewAdded.status !== 200)
        throw reviewAdded.statusText;

    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    const fetchData = async () => { 
      try{
        let resultTracks = await fetchTrack(token.token,trackId);
        setTrack(resultTracks);
        
      } catch(e){
        console.log(e)
      }
    };
    token.token && fetchData();
    console.log("aquia ndamos en el trackReviews");
    
  },[trackId, token])

  return (
    <>
      {track && <Track
        name = {track.name}
        artists = {track.artists}
        album = {track.album}
      />}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" ref={input}/> 
        <button type="submit">Submit review</button>
      </form>
      <ReviewList trackId={ trackId} />
    </>
  )
}
