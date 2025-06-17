import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../utils/Api";

export const userContext = createContext();
export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  const fetchUser = async () => {
    try {
      if (userInfo) return;
      const response = await axios.post(
        `${API}/auth/vinoth`,
        {},
        {
          withCredentials: true,
        }
      );
      const { user } = response.data;
      console.log("User data:", user);

      console.log(response.data);

      setUserInfo(user);
    } catch (err) {}
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
}
