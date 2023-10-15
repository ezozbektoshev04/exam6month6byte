import React from "react";
import { UseAuth } from "../../context/AuthContext";
import "./profile.scss";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = UseAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="profile">
      <h2>Welcome user {user?.username}</h2>
      <button className="btn-profile" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
