import { createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const baseUrl = "https://service.pace-unv.cloud/api";

  const addPost = async ({ desc }) => {
    try {
      await axios.post(
        `${baseUrl}/post`,
        {
          description: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  const editPost = async ({ id, description }) => {
    try {
      await axios.patch(
        `https://service.pace-unv.cloud/api/post/update/${id}`,
        {
          description: description,
        },
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

  const deletePost = async ({ id }) => {
    try {
      await axios.delete(
        `https://service.pace-unv.cloud/api/post/delete/${id}`,
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
    <PostContext.Provider value={{ addPost, editPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}
