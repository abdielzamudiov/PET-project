
interface Review {
  user: string,
  review: string,
  track: string,
  date: Date,
}

interface ReviewUpdate extends Review{
  _id: string;
}

export const testFetch = async () => {
  return fetch('http://localhost:8080/hello')
  .then(response => response.json());
};

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

export const fetchReviewsOfTrack = async (track: string) => {
  return fetch(`http://localhost:8080/reviews/${track}`)
  .then(response => response.json());
};

export const fetchReview = async (reviewId: string) => {
  return fetch(`http://localhost:8080/review/${reviewId}`)
  .then(response => response.json());
};

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

export const deleteReview = async (token: string,reviewId: string) => {

  return fetch(`http://localhost:8080/review/${reviewId}`,{
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${encodeURI(token)}`,
    }
  });
};

export const fetchReviews = async () => {
  return fetch(`http://localhost:8080/reviews`)
  .then(response => response.json());
};

export const fetchUserReviews = async (user: string) => {
  return fetch(`http://localhost:8080/reviews/user/${user}`)
  .then(response => response.json());
}