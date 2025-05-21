import http from "../client";
import urls from "../urls";

const AUTH_HEADER = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const createProjectMeta = (formData) =>
  http.post(`${urls["project"]}/create`, formData, AUTH_HEADER());

export const readProjectMeta = (projectId) =>
  http.get(`${urls["project"]}/read/${projectId}`, AUTH_HEADER());

export const updateProjectMeta = (projectId, formData) =>
  http.put(`${urls["project"]}/update/${projectId}`, formData, AUTH_HEADER());

export const deleteProjectMeta = (projectId) =>
  http.delete(`${urls["project"]}/delete/${projectId}`, AUTH_HEADER());

export const readProjectMetaList = () =>
  http.get(`${urls["project"]}/list/read`, AUTH_HEADER());
