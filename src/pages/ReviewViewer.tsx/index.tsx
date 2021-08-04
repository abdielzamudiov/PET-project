import React, { SyntheticEvent, useState } from 'react'
import { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import { Track } from '../../components/Track';
import { Review } from '../../components/Review.tsx';
import { useAuth } from '../../contexts/AuthContext';
import { fetchTrack } from '../../services/SpotifyAPI';
import { fetchReview, updateReview, deleteReview } from '../../services/ReviewsAPI';
import style from './ReviewViewer.module.css';
import { useSpotifyToken } from '../../contexts/SpotifyTokenContext';

interface Params {
  reviewId: string;
}
interface ReviewType {
  _id?: string;
  user?: string;
  review?: string;
  track?: string;
  date?: Date;
}
interface TrackType {
  id?: string;
  album?: { name?: string, images?: Array<{url: string}> };
  artists?: Array<{name?: string}>;
  name?: string;
}

export const ReviewViewer: React.FC = () => {
  const history = useHistory();
  const { reviewId } = useParams<Params>();
  const { token } = useSpotifyToken();
  const { userToken, username } = useAuth();
  const input = useRef<HTMLTextAreaElement>(null);

  const [track,setTrack] = useState<TrackType>();
  const [review, setReview] = useState<ReviewType>();


  const handleSubmit = async (e: SyntheticEvent) => {
    try{
      e.preventDefault();
      
      const newReview = input?.current?.value || "";
      const reviewObj = {
        _id: reviewId,
        user: username,
        track: review?.track || "",
        review: newReview,
        date: new Date()
      };

      const reviewUpdated = await updateReview(userToken,reviewObj);

      setReview(reviewUpdated);
    }catch(e){
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteReview(userToken, reviewId);
      if (response.status !== 200)
        throw response.statusText;
      history.goBack();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      try{
        let resultReviews = await fetchReview(reviewId);
        let resultTracks = await fetchTrack(token.token,resultReviews.track);
        setTrack(resultTracks);
        isSubscribed && setReview(resultReviews);
      } catch(e){
        console.log(e);
      }
    };
    fetchData();
    
    return () => {
      isSubscribed = false
    };
  },[reviewId, token.token]);

  return (
    <div className={style.mainContainer}>
      {track && <Track
        name = {track.name}
        artists = {track.artists}
        album = {track.album}
      />}
      <div className={style.reviewContainer}>
        { review && <Review
          id = {review._id}
          user = {review.user}
          review = {review.review}
          date = {review.date}
          track = {review.track}
        />}
      </div>
      { username === review?.user && (
        <>
          <div className={style.deleteBtnContainer}>
              <Button 
              onClick={() => handleDelete()}
              variant='outline-danger'
              >Delete</Button>
          </div>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="my-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control 
                as="textarea" 
                placeholder="Say what you think..." 
                rows={3} 
                ref={input}
                />
            </Form.Group>
            <div className={style.updateBtnContainer}>
              <Button variant='outline-light' type="submit">Update Review</Button>
            </div>
          </Form>
        </>
        )
      }
    </div>
  )
}
