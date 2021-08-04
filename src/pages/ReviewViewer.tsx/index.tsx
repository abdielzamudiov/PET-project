import React, { SyntheticEvent, useState } from 'react'
import { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
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

  const input = useRef<HTMLTextAreaElement>(null);

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
      <div className={style.reviewContainer}>
        { review && <Review
          id = {review._id}
          user = {review.user}
          review = {review.review}
          date = {review.date}
          track = {review.track}
        />}
      </div>
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
    </div>
  )
}
