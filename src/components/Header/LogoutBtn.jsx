import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwite/auth";
import { logout } from "../../store/authSlice";
import { NavLink } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div>
      <NavLink
        to="/"
        className={`text-white  hover:text-[#ec598f8c]`}
        onClick={logoutHandler}
      >
        <div>
          <span className="material-symbols-outlined">logout</span>
          <p className="text-sm">Logout</p>
        </div>
      </NavLink>
    </div>
  );
};

export default LogoutBtn;
