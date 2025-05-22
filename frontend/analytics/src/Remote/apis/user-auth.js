import http from '../client';
import urls from '../urls';

// auth providier: dataize
export const signUp = (formData) => http.post(`${urls['user-auth']}/signup`, formData);

export const signIn = (formData) => http.post(`${urls['user-auth']}/signin`, formData);

// auth provider: google
export const googleVerify = (token) => http.post(`${urls['user-auth']}/google-verify`, { token });

export const googleSignUp = (formData, token) =>
  http.post(`${urls['user-auth']}/google-signup`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const googleSignIn = (token) => http.post(`${urls['user-auth']}/google-signin`, { token });

export const getUserProfile = () =>
  http.get(`${urls['user-auth']}/read/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

export const updateUserProfile = (formData) =>
  http.put(`${urls['user-auth']}/update/profile`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
