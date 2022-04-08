import jsCookie from "js-cookie";
import { Children, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../configs/api";
import auth_types from "../../redux/types/auth";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(async () => {
    const userToken = jsCookie.get("auth_token");

    if (userToken) {
      try {
        const userResponse = await axiosInstance.get("/auth/refresh-token");

        jsCookie.set("auth_token", userResponse?.data?.result?.token || "");

        dispatch({
          type: auth_types.LOGIN_USER,
          payload: userResponse.data.result.user,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return children;
};

export default AuthProvider;
