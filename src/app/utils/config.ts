export const API_BASE_URL =
  'http://millasays-apollo-dev.azurewebsites.net/api/v1';

export const FIREBASE_KEY = {
  apiKey: 'AIzaSyA64NgsGbHeIJ4DPxkZFFoc6HlCsntXQVw',
  authDomain: 'milla-says-dev.firebaseapp.com',
  databaseURL: 'https://milla-says-dev.firebaseio.com',
  projectId: 'milla-says-dev',
  storageBucket: 'milla-says-dev.appspot.com',
  messagingSenderId: '762480575038'
};

/*
 * Get user details api
 * GET request with authtoken
 * @type  MIllaUser
 */

export const emailRegEx =
  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:quotemark
  "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

// users apis
export const USER_DETAIL_URL = `${API_BASE_URL}/users/me`;
export const UPDATE_USER_IMAGE_URL = `${API_BASE_URL}/users/me/picture`;

// network apis
export const CREATE_NETWORK_URL = `${API_BASE_URL}/networks`;
export const GET_NETWORKS_URL = `${API_BASE_URL}/networks`;
export function ACCESS_NETWORK_WITH_PIN_URL(id) {
  return `${API_BASE_URL}/networks/${id}/auth`;
}

/* @constructor
 * @param {string} id
 * GET, PUT details of networks URL
 */
export function NETWORK_DETAILS_URL(id) {
  return `${API_BASE_URL}/networks/${id}`;
}
