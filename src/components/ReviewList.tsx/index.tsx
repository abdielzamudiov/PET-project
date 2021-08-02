import { useState, useEffect } from 'react'
import { useSpotifyToken } from '../../contexts/SpotifyTokenContext';
import { fetchReviews } from '../../services/ReviewsAPI';
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
}
export const ReviewList: React.FC<Props> = ({ trackId = ""}) => {
  const { token } = useSpotifyToken();
  const [reviews, setReviews] = useState<ReviewType[]>();

  useEffect(() => {
    const fetchData = async () => { 
      try{
        let resultReviews = await fetchReviews(trackId);
        setReviews(resultReviews);
      } catch(e){
        console.log(e)
      }
    };
    token.token && fetchData();
  },[trackId, token])
  return (
    <div>
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
    </div>
  )
}
