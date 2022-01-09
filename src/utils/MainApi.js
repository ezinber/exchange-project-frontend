import { BASE_URL } from "../config";

const handleFirstResponse = (res) =>
  res.ok ? res.json() : Promise.reject(res.status);

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then((res) => handleFirstResponse(res));
};

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/token/`, {
    method: "POST",
    // credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => handleFirstResponse(res));
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: "include",
  }).then((res) => handleFirstResponse(res));
};
/*
export const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
  }).then((res) => handleFirstResponse(res));
};
/*
export const updateUser = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((res) => handleFirstResponse(res));
};
*/
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/user/users/me/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => handleFirstResponse(res));
};

export const getOrderBookData = (type, start, end, ticker, token) => {
  return fetch(
    `${BASE_URL}/data/${type}/?start=${start}&end=${end}&ticker=${ticker}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => handleFirstResponse(res));
};

export const getOrderBookTickers = (token) => {
  return fetch(`${BASE_URL}/data/shares/get-orderbook-tickers-list/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => handleFirstResponse(res));
};

export const getTasks = (token) => {
  return fetch(`${BASE_URL}/user-periodic-tasks/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => handleFirstResponse(res));
}

export const addTask = (
  token,
  id,
  ticker,
  user,
  exchange,
  record_period,
  status,
) => {
  return fetch(`${BASE_URL}/user-periodic-tasks/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      ticker,
      user,
      exchange,
      record_period,
      status,
    }),
  }).then((res) => handleFirstResponse(res));
}
