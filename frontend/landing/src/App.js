import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// import Preparing from "./Preparing";

import Home from "./Home";
import About from "./About";
import Service from "./Service";
import UseCase from "./UseCase";
import ContactUs from "./ContactUs";
import Plan from "./Plan";
import TossPayments_KR from "./Plan/component/TossPayment_KR";

import MCODETrend from "./mCODETrend";
import MCODEExplorer from "./mCODETrend/mCODEExplorer";
import MCODESearch from "./mCODETrend/mCODEExplorer/SearchResult";
import ArticleSearch from "./mCODETrend/ArticleSearch";

import SignIn from "./Auth/SignIn";
import GoogleSignUp from "./Auth/SignUp/GoogleSignUp";
import SignUp from "./Auth/SignUp/BasicSignUp";

import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mcodetrend" element={<MCODETrend />} />
        <Route path="/mcodeexplorer" element={<MCODEExplorer />} />
        <Route path="/mcodesearch" element={<MCODESearch />} />
        <Route path="/articlesearch" element={<ArticleSearch />} />
        {/* <Route path="/ctg-list" element={<CTGList />} /> */}
        {/* <Route path="/trial/:nctId" element={<CTGDetails />} /> */}

        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/usecase" element={<UseCase />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/plan" element={<Plan />} />
        <Route
          path="/tosspayment"
          element={
            <PrivateRoute>
              <TossPayments_KR />
            </PrivateRoute>
          }
        />

        {/* Auth Page - Integrated Sign In Page */}
        <Route path="/signin" element={<SignIn />} />

        {/* Auth Page - Sign Up Page */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/google-signup" element={<GoogleSignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
