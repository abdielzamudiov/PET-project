interface Review {
  user: string,
  review: string,
  track: string,
  date: Date,
}

export const testFetch = async () => {
  return fetch('http://localhost:8080/hello')
  .then(response => response.json());
};

export const postReview = async (reviewObj: Review) => {
  return fetch('http://localhost:8080/review',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewObj)
  });
};

export const fetchReviews = async (track: string) => {
  return fetch(`http://localhost:8080/reviews/${track}`)
  .then(response => response.json());
}

