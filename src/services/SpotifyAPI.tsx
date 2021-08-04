/**
 * 
 * @returns a fetch request that returns the token to make request to the spotify api
 */
export const fetchToken = async () => {
  //APP credentials for Spotify API
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  
  console.log("token started fetching");
  return fetch('https://accounts.spotify.com/api/token',{
    method :'POST',
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + btoa(`${clientId}:${clientSecret}`)
    },
    body: 'grant_type=client_credentials'
  })
  .then(response => response.json());
};

/**
 * 
 * @param token spotify Api token
 * @param search the string to search a track
 * @returns a fetch request that returns the first 20 results of the search
 */
export const fetchTracks = async (token: string, search: string) => {
  return fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json());
}

export const fetchTrack = async (token: string, trackId: string) => {
  return fetch(`https://api.spotify.com/v1/tracks/${trackId}`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json());
}