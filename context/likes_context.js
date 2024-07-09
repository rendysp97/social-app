import { createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const LikeContext = createContext();

export function LikesProvider({ children }) {

  

  return <LikeContext.Provider value={{}}>{children}</LikeContext.Provider>;
}
