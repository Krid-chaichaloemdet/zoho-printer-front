import { createContext, useEffect, useState } from "react";
import { addAccessToken, getAccessToken } from "../utils/local-storage";
import axios from "../config/axios";
export const AuthContextProvider = createContext();

export default function AuthContext({ children }) {
  const [adminInfo, setAdminInfo] = useState(null);
  const [errLogin ,setErrLogin] = useState(null)
  useEffect(() => {
    if (getAccessToken()) {
      axios.get("/admin/auth").then((res) => {
        setAdminInfo(res.data.admin);
      });
    }
  }, [setAdminInfo]);

  const login = async (input) => {
    const response = await axios
      .post("/admin/loginAdmin", input)
      .then((res) => {
        setAdminInfo(res.data);
        return res.data;
      }).catch((err)=>setErrLogin(err.message))

    if (response.accessToken) {
      addAccessToken(response.accessToken);
      window.location.href = "/adminWorkPage";
    }
  };
  return (
    <AuthContextProvider.Provider value={{ login, adminInfo ,errLogin}}>
      {children}
    </AuthContextProvider.Provider>
  );
}
