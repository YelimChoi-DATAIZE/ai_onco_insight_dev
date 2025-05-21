import http from '../client';
import urls from '../urls';

const AUTH_HEADER = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export const createMetaData = (formData) =>
  http.post(`${urls['data']}/metadata/create`, formData, AUTH_HEADER());

export const readMetaData = (assetId) =>
  http.get(`${urls['data']}/metadata/read/${assetId}`, AUTH_HEADER());

export const updateMetaData = (assetId, formData) =>
  http.put(`${urls['data']}/metadata/update/${assetId}`, formData, AUTH_HEADER());

export const deleteMetaData = (assetId) =>
  http.delete(`${urls['data']}/metadata/delete/${assetId}`, AUTH_HEADER());

export const createDataFile = (fileFormData) =>
  http.post(`${urls['data']}/dataasset/create`, fileFormData, {
    ...AUTH_HEADER(),
    headers: {
      ...AUTH_HEADER().headers,
      'Content-Type': 'multipart/form-data',
    },
  });

export const readDataFile = (assetId) =>
  http.get(`${urls['data']}/dataasset/read/${assetId}`, AUTH_HEADER());

export const readDataFileByProject = (projectId) =>
  http.get(`${urls['data']}/dataasset/read_by_project/${projectId}`, AUTH_HEADER());
