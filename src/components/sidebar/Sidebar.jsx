import React, { useContext } from "react";
import "./sidebar.scss";
import { NavLink } from "react-router-dom";
import { ProductProv } from "../../context/PtoductContext";

const Sidebar = () => {
  const prod = useContext(ProductProv);
  return (
    <div className="sidebar">
      <div className="logo-img">
        <img src="/public/image2.svg" alt="" />
      </div>

      <NavLink to="/products" className="icon">
        <img src="/public/image1.svg" alt="" />
      </NavLink>

      <NavLink to="/profile" className="icon">
        <img src="/public/image3.svg" alt="" />
      </NavLink>

      <NavLink to="/add" className="icon" onClick={prod.changePage}>
        <img src="/public/image4.svg" alt="" />
      </NavLink>
    </div>
  );
};

export default Sidebar;
