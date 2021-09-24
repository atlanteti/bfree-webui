import { createContext, useState } from "react"
import { request } from "../Services/api";
import { Cookies } from 'react-cookie';
import { useEffect } from "react";
import { decodeToken } from "react-jwt";

const ContextLogin = createContext({});

export const AuthProvider = ({ children }) => {
   const cookie = new Cookies();
   const [auth, setAuth] = useState(null);
   const [admin, setAdmin] = useState(null);
   const [user, setUser] = useState(null);
   useEffect(() => {
      async function loadStoraged() {
         const storagedUser = await cookie.get("auth");
         const storedPermission = await cookie.get("admin")
         const storedSelect = await cookie.get("user")
         if (storagedUser) {
            setAuth(storagedUser);
            setUser(storedSelect)
         }
         if (storedPermission !== undefined) {
            setAdmin(storedPermission === "true") // Tratamento para converter de string para booleano
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
            cookie.set('admin', !data.meta.hasJourney, { path: "/" })
            cookie.set('user', decodeToken(data.data.token)["ID Bfree"], { path: "/" })
            setAuth(data.data.token)
            setAdmin(!data.meta.hasJourney)
            setUser(decodeToken(data.data.token)["ID Bfree"], { path: "/" })
         }
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <ContextLogin.Provider value={{ signed: Boolean(auth), getToken, admin: admin, user }}>
         {children}
      </ContextLogin.Provider>
   )
}

export default ContextLogin;