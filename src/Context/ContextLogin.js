import { createContext, useState } from "react"
import { request } from "../Services/api";
import { Cookies } from 'react-cookie';
import { useEffect } from "react";

const ContextLogin = createContext({});

export const AuthProvider = ({ children }) => {
   const cookie = new Cookies();
   const [auth, setAuth] = useState(null);
   const [admin, setAdmin] = useState(null);
   useEffect(() => {
      async function loadStoraged() {
         const storagedUser = await cookie.get("auth");
         const storedPermission = await cookie.get("hasJourney")
         if (storagedUser) {
            setAuth(storagedUser);
         }
         if (storedPermission) {
            console.log(storedPermission)
            setAdmin(storedPermission === "true")
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
            cookie.set('auth', data.data.token, { path: "/" })
            cookie.set('hasJourney', !data.meta.hasJourney, { path: "/" })
            setAuth(data.data.token)
            setAdmin(!data.meta.hasJourney)
         }
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <ContextLogin.Provider value={{ signed: Boolean(auth), getToken, admin: admin }}>
         {children}
      </ContextLogin.Provider>
   )
}

export default ContextLogin;