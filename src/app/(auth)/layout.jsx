import React from "react";
import Navbar from "../../components/shared/Navbar/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default AuthLayout;
