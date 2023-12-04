import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="mt-5 ms-5">
      <div className="row">
        <h1>Bienvenido, {user?.username}</h1>
      </div>
    </div>
  );
};

export default LoggedIn;
