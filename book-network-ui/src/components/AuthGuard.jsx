import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout } from "../store/authenticationSlice";
import { useDispatch } from "react-redux";

function AuthGuard({ children, authentication = true }) {
  const navigate = useNavigate();
  const authenticationStatus = useSelector(
    (state) => state.authentication.authenticationStatus
  );
  const jwtToken = useSelector((state) => state.authentication.jwtToken);
  const dispatch = useDispatch();

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error while checking token expiration", error);
      return true;
    }
  };

  useEffect(() => {
    if (authentication === false && authenticationStatus === true) {
      navigate("/");
      return;
    } else if (authentication === true && authenticationStatus === false) {
      navigate("/authentication/login");
    } else if (authentication === true && authenticationStatus === true) {
      if (isTokenExpired(jwtToken)) {
        dispatch(logout());
        navigate("/authentication/login");
      }
    }
  }, []);

  return children;
}

export default AuthGuard;
