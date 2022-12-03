import React from "react";
import "../../../App.css";
import LoginComponent from "../../components/login/LoginComponent";

const Login = () => {
  return (
    <div className="container-fluid p-0">
      <div className="m-0 p-4 bg-dark">
        <div className="text-white align-self-bottom p-5"></div>
      </div>
      <div className="m-auto top-25 w-75 pt-5">
        <LoginComponent />
      </div>
    </div>
  );
};

export default Login;
