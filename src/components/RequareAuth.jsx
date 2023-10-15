import React, { Children } from "react";
import { UseAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RequareAuth = ({ children }) => {
  const { user } = UseAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RequareAuth;
