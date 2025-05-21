import http from "../client";
import urls from "../urls";

const AUTH_HEADER = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const createUserLog = (logData) =>
  http.post(`${urls["user-log"]}/create`, logData, AUTH_HEADER());

export const readUserLog = () =>
  http.get(`${urls["user-log"]}/read`, AUTH_HEADER());

export const deleteUserLog = (logId) =>
  http.delete(`${urls["user-log"]}/delete/${logId}`, AUTH_HEADER());
