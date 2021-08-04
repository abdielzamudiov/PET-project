
interface Review {
  user: string,
  review: string,
  track: string,
  date: Date,
}

interface ReviewUpdate extends Review{
  _id: string;
}

/**
 * 
 * @param token userToken
 * @param reviewObj a review Object to be posted
 * @returns a fetch request that posts a review
 */
export const postReview = async (token: string, reviewObj: Review) => {
  return fetch('http://localhost:8080/review',{
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${encodeURI(token)}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewObj)
  });
};

/**
 * 
 * @param track trackId
 * @returns a fetch request that gets all the reviews of a track
 */
export const fetchReviewsOfTrack = async (track: string) => {
  return fetch(`http://localhost:8080/reviews/${track}`)
  .then(response => response.json());
};

/**
 * 
 * @param reviewId 
 * @returns a fetch request that gets a single review by id
 */
export const fetchReview = async (reviewId: string) => {
  return fetch(`http://localhost:8080/review/${reviewId}`)
  .then(response => response.json());
};

/**
 * 
 * @param token userToken
 * @param review a new review object to replacec the old one
 * @returns a fetch request with the updated review
 */
export const updateReview = async (token: string, review: ReviewUpdate) => {
  return fetch(`http://localhost:8080/review`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${encodeURI(token)}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  })
  .then(response => response.json());
};

/**
 * 
 * @param token userToken
 * @param reviewId 
 * @returns a fetch request that deletes a review
 */
export const deleteReview = async (token: string,reviewId: string) => {
  return fetch(`http://localhost:8080/review/${reviewId}`,{
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${encodeURI(token)}`,
    }
  });
};

/**
 * 
 * @returns a fetch request to get all the reviews
 */
export const fetchReviews = async () => {
  return fetch(`http://localhost:8080/reviews`)
  .then(response => response.json());
};

/**
 * 
 * @param user userId
 * @returns a fetch request to get all reviews made by an specific user
 */
export const fetchUserReviews = async (user: string) => {
  return fetch(`http://localhost:8080/reviews/user/${user}`)
  .then(response => response.json());
}