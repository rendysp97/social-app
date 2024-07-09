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
      console.error("Error fetching reply:", error);
      setLoading(false);
      return { success: false, error };
    }
  };

  return (
    <ReplyContext.Provider value={{ reply, getReply, loading }}>
      {children}
    </ReplyContext.Provider>
  );
};

export default ReplyProvider;
