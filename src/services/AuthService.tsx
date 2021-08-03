interface User {
  _id: string;
  password: string;
}

export const signin = async (user: User) => {
  return fetch(`http://localhost:8080/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
};

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