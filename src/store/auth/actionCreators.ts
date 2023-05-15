import { Dispatch } from "@reduxjs/toolkit";
import api from "../../api";
import { ILoginRequest } from "../../api/auth/types";
import { loginFailure, loginStart, loginSuccess } from "./authReducer";

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());

      const res = await api.auth.login(data);

      dispatch(loginSuccess(res.data.accessToken));
    } catch (e: any) {
      console.log(e);

      dispatch(loginFailure(e.message));
    }
  };
