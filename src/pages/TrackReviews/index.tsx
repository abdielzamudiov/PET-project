import { useState, useRef, useEffect, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Track } from '../../components/Track';
import { useSpotifyToken } from '../../contexts/SpotifyTokenContext';
import { fetchTrack } from '../../services/SpotifyAPI';
import { postReview } from '../../services/ReviewsAPI';
import { ReviewList } from '../../components/ReviewList.tsx';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Form } from 'react-bootstrap';
import style from './TrackReviews.module.css';

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
  const input = useRef<HTMLTextAreaElement>(null);

  const [track,setTrack] = useState<TrackType>();
  const [addedReview, setAddedReview] = useState<boolean[]>([false]);

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
      setAddedReview([true]);
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
    
  },[trackId, token, addedReview])

  return (
    <>
      {track && <Track
        name = {track.name}
        artists = {track.artists}
        album = {track.album}
      />}
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="my-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control 
            as="textarea" 
            placeholder="Say what you think..." 
            rows={3} 
            ref={input}
            />
        </Form.Group>
        <div className={style.buttonContainer}>
          <Button variant='outline-light' type="submit">Send Review</Button>
        </div>
      </Form>
      <ReviewList trackId={trackId} update={addedReview}/>
    </>
  )
}
