import { createContext, useState } from "react";
export const userContext = createContext();
export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
}
