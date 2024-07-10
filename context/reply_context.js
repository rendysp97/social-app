import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";

export const ReplyContext = createContext();

const ReplyProvider = ({ children }) => {
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(false);

  const getReply = async ({ id }) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://service.pace-unv.cloud/api/replies/post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setReply(response.data);
      setLoading(false);

      return { success: true, data: response.data };
    } catch (error) {
      setLoading(false);
      return { success: false, error };
    }
  };

  const postReply = async ({ id, description }) => {
    try {
      await axios.post(
        `https://service.pace-unv.cloud/api/replies/post/${id}`,
        {
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setLoading(false)
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  };

  const deleteReplyPost = async ({ id }) => {
    setLoading(true)
    try {
      await axios.delete(
        `https://service.pace-unv.cloud/api/replies/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setLoading(false)
      return { success: true };
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
    return { success: false };
  };

  return (
    <ReplyContext.Provider
      value={{ reply, getReply, loading, postReply, deleteReplyPost }}
    >
      {children}
    </ReplyContext.Provider>
  );
};

export default ReplyProvider;
