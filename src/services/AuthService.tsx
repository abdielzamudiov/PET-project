interface User {
  _id: string;
  password: string;
}

/**
 * 
 * @param user an user object to be registered
 * @returns a fetch request to register an user
 */
export const signin = async (user: User) => {
  return fetch(`http://localhost:8080/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
};

/**
 * 
 * @param user an user object to be logged in
 * @returns a fetch request that logs in an user and returns the username and the accesToken aka JWT
 */
export const login = async (user: User) => {
  console.log("starting");
  return fetch(`http://localhost:8080/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
}