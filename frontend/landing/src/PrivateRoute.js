import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const PrivateRoute = ({ children }) => {
  const [redirect, setRedirect] = useState(false);
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn && !redirect) {
    return (
      <Box sx={{ m: 5 }}>
        <Alert severity="warning">
          로그인이 필요합니다. 로그인 페이지로 이동합니다.
        </Alert>
      </Box>
    );
  }

  if (!isLoggedIn && redirect) {
    return (
      <Navigate to="/signin" replace state={{ from: location.pathname }} />
    );
  }

  return children;
};

export default PrivateRoute;
