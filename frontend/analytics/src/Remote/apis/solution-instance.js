// src/api/solution_instance.js
import http from '../client';
import urls from '../urls';

const AUTH_HEADER = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// ======= Entity Extraction =======
export const extractEntities = (text) =>
  http.post(`${urls['solution-instance']}/entity_extract`, { text }, AUTH_HEADER());

// ======= T-Test =======
export const runTTest = (group1, group2) =>
  http.post(`${urls['solution-instance']}/ttest`, { group1, group2 }, AUTH_HEADER());

// ======= ANOVA =======
export const runAnova = (groups) =>
  http.post(`${urls['solution-instance']}/anova`, { groups }, AUTH_HEADER());

// ======= Regression =======
export const runRegression = (X, y) =>
  http.post(`${urls['solution-instance']}/regression`, { X, y }, AUTH_HEADER());

// ======= Factor Analysis =======
export const runFactorAnalysis = (data, n_factors) =>
  http.post(`${urls['solution-instance']}/factor_analysis`, { data, n_factors }, AUTH_HEADER());

// ======= Survival Analysis =======
export const runSurvivalAnalysis = (durations, events) =>
  http.post(`${urls['solution-instance']}/survival_analysis`, { durations, events }, AUTH_HEADER());
