/*
http.js

Contains wrapper functions to call the backend, through an axios singleton
*/

import axios from "axios";
var qs = require("qs");

const transport = axios.create({
  withCredentials: false,
});

// Endpoints
const BACKEND_ROOT =
  process.env.NODE_ENV === "production"
    ? "https://mezzuzotproject-backend-zdfjc.ondigitalocean.app/api/"
    : "http://localhost:8080/api/";

export function clear_cookies() {
  document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function get(path) {
  return new Promise(function (resolve, reject) {
    transport
      .get(BACKEND_ROOT + path)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Put method is unused for the backend now but may need in the future
export function put(path, body) {
  return new Promise(function (resolve, reject) {
    transport
      .put(BACKEND_ROOT + path, body)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function post(path, body, options) {
  return new Promise(function (resolve, reject) {
    if (options) {
      transport
        .post(BACKEND_ROOT + path, qs.stringify(body), options)
        .then((res) => {
          resolve(qs.parse(res));
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      transport
        .post(BACKEND_ROOT + path, qs.stringify(body))
        .then((res) => {
          resolve(qs.parse(res));
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}
