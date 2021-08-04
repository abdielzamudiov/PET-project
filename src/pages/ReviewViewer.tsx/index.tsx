import React, { SyntheticEvent, useState } from 'react'
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import { Review } from '../../components/Review.tsx';
import { useAuth } from '../../contexts/AuthContext';
import { fetchReview, updateReview, deleteReview } from '../../services/ReviewsAPI';
import style from './ReviewViewer.module.css';

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

export const ReviewViewer: React.FC = () => {

  const { reviewId } = useParams<Params>();

  const { userToken } = useAuth()

  const [review, setReview] = useState<ReviewType>();

  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    try{
      e.preventDefault();
      
      const newReview = input?.current?.value || "";
      const reviewObj = {
        _id: reviewId,
        user: "test user",
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
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      try{
        let resultReviews = await fetchReview(reviewId);
        isSubscribed && setReview(resultReviews);
      } catch(e){
        console.log(e)
      }
    };
    fetchData();
    
    return () => {
      isSubscribed = false
    };
  },[reviewId]);

  return (
    <div className={style.mainContainer}>
      { review && <Review
        id = {review._id}
        user = {review.user}
        review = {review.review}
        date = {review.date}
        track = {review.track}
      />}
      <button onClick={() => handleDelete()}>delete</button>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" ref={input}/> 
        <button type="submit">update review</button>
      </form>
    </div>
  )
}
