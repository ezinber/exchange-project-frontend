import { BASE_URL } from "../config";

const handleFirstResponse = (res) => 
  res.ok ? res.json() : Promise.reject(res.status);

export const register = (
  name,
  email,
  password,
) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
  .then((res) => handleFirstResponse(res));
};

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then((res) => handleFirstResponse(res));
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
  })
  .then((res) => handleFirstResponse(res));
};

export const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
  })
  .then((res) => handleFirstResponse(res));
}

export const updateUser = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      name,
      email,
    }),
  })
  .then((res) => handleFirstResponse(res));
}
