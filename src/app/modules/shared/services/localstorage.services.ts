import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {}

  getUserToken() {
    return this.getLocalStorageKey('user_token');
  }
  setUserToken(token) {
    this.setLocalStorageKey('user_token', token);
  }
  getUserDetails() {
    return this.getLocalStorageKey('user');
  }
  setUserDetails(value) {
    this.setLocalStorageKey('user', value);
  }
  getProvider() {
    return this.getLocalStorageKey('provider');
  }
  setProvider(value) {
    this.setLocalStorageKey('provider', value);
  }
  getUserRegisteredStatus() {
    return this.getLocalStorageKey('isRegistered');
  }
  setUserRegisteredStatus(value) {
    this.setLocalStorageKey('isRegistered', value);
  }
  getRedirectURL() {
    return this.getLocalStorageKey('url') || '/';
  }
  setRedirectURL(value) {
    this.setLocalStorageKey('url', value);
  }
  getLocalStorageKey(key) {
    return localStorage.getItem(key);
  }
  setLocalStorageKey(key, value) {
    if (
      key !== null ||
      key !== undefined ||
      key !== 'undefined' ||
      key !== NaN ||
      key !== ''
    ) {
      value = typeof value === 'object' ? JSON.stringify(value) : value;
      return localStorage.setItem(key, value);
    }
  }
  clearLocalStorage() {
    localStorage.clear();
  }
  clearLocalStorageItem(key) {
    localStorage.removeItem(key);
  }
}
