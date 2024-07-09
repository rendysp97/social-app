import { useState, createContext, useEffect } from "react";

import Cookies from "js-cookie";

import axios from "axios";

export const AuthContext = createContext();

const baseUrl = "https://service.pace-unv.cloud/api";

export const AuthProvider = ({ children }) => {
  const [me, setMe] = useState();


  
  const login = async ({ email, password }) => {
    try {
      await axios
        .post(
          `${baseUrl}/login`,

          JSON.stringify({
            email: email,
            password: password,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const { token } = res.data.data;

          Cookies.set("token", token);
        });



      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const register = async ({ name, email, date, phone, hobby, password }) => {
    try {
      await axios
        .post(
          `${baseUrl}/register`,
          JSON.stringify({
            email,
            password,
            name,
            dob: date,
            phone,
            hobby,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  };

  const getMe = async () => {
    try {
      const response = await axios
        .get("https://service.pace-unv.cloud/api/user/me", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setMe(res.data.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await axios
        .post("https://service.pace-unv.cloud/api/logout", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => Cookies.remove("token"));
    } catch (err) {
      console.log(err);
    }

    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ login, register, me, logout,getMe }}>
      {children}
    </AuthContext.Provider>
  );
};
