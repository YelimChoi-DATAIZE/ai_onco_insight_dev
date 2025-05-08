import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from '@mui/material/styles';
//ag grid and chart library
import { ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import {
  SideBarModule,
  RowGroupingModule,
  PivotModule,
  ColumnsToolPanelModule,
  LicenseManager,
} from 'ag-grid-enterprise';
import 'ag-charts-enterprise';

//login session manage
// import { AuthProvider } from "./Landing/Auth/AuthContext";

//google oauth
import { GoogleOAuthProvider } from '@react-oauth/google';

LicenseManager.setLicenseKey(process.env.AG_KEY);
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <StyledEngineProvider injectFirst>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </StyledEngineProvider>
    {/* </AuthProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
