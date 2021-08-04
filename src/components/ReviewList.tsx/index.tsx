import { useState, useEffect } from 'react'
import { useSpotifyToken } from '../../contexts/SpotifyTokenContext';
import { fetchReviewsOfTrack, fetchReviews, fetchUserReviews } from '../../services/ReviewsAPI';
import { Review } from '../Review.tsx';

interface ReviewType {
  _id: string;
  user: string;
  review: string;
  track: string;
  date: Date;
}
interface Props {
  trackId?: string;
  userId?: string;
  update?: Array<boolean>;
}
export const ReviewList: React.FC<Props> = ({ trackId = "", update, userId}) => {
  const { token } = useSpotifyToken();
  const [reviews, setReviews] = useState<ReviewType[]>();

  useEffect(() => {
    const fetchData = async () => { 
      try{
        let resultReviews;
        if (trackId){
          resultReviews = await fetchReviewsOfTrack(trackId);
          return  setReviews(resultReviews);
        }

        if (userId){
          resultReviews = await fetchUserReviews(userId);
          return  setReviews(resultReviews);
        }

        resultReviews = await fetchReviews();
        setReviews(resultReviews);
      } catch(e){
        console.log(e)
      }
    };
    token.token && fetchData();
  },[trackId, token, update, userId]);


  return (
    <>
      { reviews && reviews.map( review => {
        return (
          <Review
            key = {review._id}
            id = {review._id}
            user = {review.user}
            review = {review.review}
            track = {review.track}
            date = {review.date}
          />
        )
      })}
    </>
  )
}
