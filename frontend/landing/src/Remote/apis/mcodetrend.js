import http from "../client";
import urls from "../urls";

const AUTH_HEADER = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const readmCODEKG = () => http.get(`${urls.mcodetrend}/mcodekg/read`);

export const readPubmedArticle = (params) =>
  http.get(`${urls["mcodetrend"]}/pubmed/article/read`, { params });

export const readPubmedKeyword = (params) =>
  http.get(`${urls["mcodetrend"]}/pubmed/keyword/read`, { params });

export const createFavorite = (favoriteData) =>
  http.post(
    `${urls["mcodetrend"]}/favorite/create`,
    favoriteData,
    AUTH_HEADER(),
  );

export const vectorSearchPubmed = (query) =>
  http.get(`${urls["mcodetrend"]}/mcodetrend_pubmed_search`, {
    params: { query },
  });

export const ragSearchPubmed = (query, top_k = 5) =>
  http.post(`${urls["mcodetrend"]}/mcodetrend_pubmed_rag_search`, {
    query,
    top_k,
  });
