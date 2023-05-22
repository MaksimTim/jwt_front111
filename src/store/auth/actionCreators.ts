import { Dispatch } from "@reduxjs/toolkit";
import api from "../../api";
import { ILoginRequest } from "../../api/auth/types";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
} from "./authReducer";
import {store} from "../index";

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());

      const res = await api.auth.login(data);

      dispatch(loginSuccess(res.data.accessToken));
      // @ts-ignore
      dispatch(getProfile());

    } catch (e: any) {
      console.log(e);

      dispatch(loginFailure(e.message));
    }
  };

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await api.auth.logout();

      dispatch(logoutSuccess());
    } catch (e) {
      console.error(e);
    }
  };

export const getProfile =
  () =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(loadProfileStart());

      const res = await api.auth.getProfile();

      dispatch(loadProfileSuccess(res.data));
    } catch (e: any) {
      console.error(e);

      dispatch(loadProfileFailure(e.message));
    }
  };

export const getAccessToken =
    () =>
        async (dispatch: Dispatch<any>): Promise<string | null> => {
            try {
                const accessToken = store.getState().auth.authData.accessToken

                return accessToken
            } catch (e) {
                console.error(e)

                return null
            }
        }