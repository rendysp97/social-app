import { createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const LikeContext = createContext();

export default function LikeProvider({ children }) {
  const likePost = async ({ id }) => {
    try {
      await axios.post(
        `https://service.pace-unv.cloud/api/likes/post/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    return { success: true };
  };

  const unLikePost = async ({ id }) => {
    try {
      await axios.post(
        `https://service.pace-unv.cloud/api/unlikes/post/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }

    return { success: true };
  };

  return (
    <LikeContext.Provider
      value={{
        likePost,
        unLikePost,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
}
