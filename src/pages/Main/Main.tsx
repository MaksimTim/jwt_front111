import React from "react";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import {getProfile, logoutUser} from "../../store/auth/actionCreators";

const RenderProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useSelector(
    (state: IRootState) => state.auth.profileData.profile
  );

  const onLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div>
      <div>Вы авторизировались, {profile}</div>
      <button onClick={onLogout}>Logout</button>
      <button onClick={() => dispatch(getProfile())}>Update profile</button>
    </div>
  );
};

const Main = () => {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  return (
    <div>
      <h1>Main</h1>
      {isLoggedIn ? <RenderProfile /> : <Login />}
    </div>
  );
};

export default Main;
