import { createContext, useState } from "react"
import { request } from "../Services/api";
import { useCookies, Cookies } from 'react-cookie';
import { useEffect } from "react";

const ContextLogin = createContext({});

export const AuthProvider = ({ children }) => {
   const cookie = new Cookies();

   const [Token, setToken] = useState(null);
   const [cookies, setCookie] = useCookies(['auth']);
   const [auth, setAuth] = useState(null);

   useEffect(() => {
      async function loadStoraged() {
         const storagedUser = await cookie.get("auth");

         if (storagedUser) {
            setAuth(storagedUser);
         }
      }

      loadStoraged()
   }, [])

   async function getToken(token) {
      try {
         const data = await request({
            method: "post",
            endpoint: `auth/login?token=${token}`,
         })
         if (data.meta.status === 100) {
            setToken(data.data.token)
            setCookie('auth', data.data.token, { path: "/" })
         }
      } catch (error) {
      }
   }

   return (
      <ContextLogin.Provider value={{ signed: !!auth, Token, getToken }}>
         {children}
      </ContextLogin.Provider>
   )
}

export default ContextLogin;