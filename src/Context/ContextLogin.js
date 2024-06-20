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
   const [userRoles, setUserRoles] = useState(null);
   const [verifyUser, setVerifyUser] = useState(null);
   const [userEmail, setUserEmail] = useState(null);
   //TODO: Definir os estados que são passados pelo contexto
   //Para retornarem promessas em vez de ficarem nulos 

   useEffect(() => {
      async function loadStoraged() {
         const storedUser = await cookie.get("auth");
         const storedPermission = await cookie.get("admin")
         const storedSelect = await cookie.get("user")
         const storedRoles = await cookie.get("userType")
         const storedEmail = await cookie.get("userShow")
         if (storedUser) {
            setAuth(storedUser);
            setUser(storedSelect);
            setUserRoles(storedRoles)
            setUserEmail(atob(storedEmail))
         }
         if (storedPermission !== undefined) {
            setAdmin(storedPermission)
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
         const isTheUserAdmin = data.meta.journeys.length === 0
         if (data.meta.status === 100) {
            cookie.set('auth', data.data.token, { path: "/" })
            cookie.set('admin', isTheUserAdmin, { path: "/" })
            cookie.set('user', decodeToken(data.data.token)["ID Bfree"], { path: "/" })
            cookie.set('userType', data.meta.journeys, { path: "/" })
            cookie.set('userShow', btoa(data.data.email), { path: "/" })
            setUserRoles(data.meta.journeys)
            setVerifyUser(data.meta.status)
            setAuth(data.data.token)
            setAdmin(isTheUserAdmin)
            setUser(decodeToken(data.data.token)["ID Bfree"], { path: "/" })
            setUserEmail(data.data.email)
         } else if (data.meta.status === 215) {
            cookie.set('term', data.meta.token, { path: "/" })
            cookie.set('userType', data.meta.journeys, { path: "/" })
            setUserRoles(data.meta.journeys)
            setVerifyUser(data.meta.status)
            setUserEmail(data.data.email)
            setAdmin(isTheUserAdmin)
         }
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <ContextLogin.Provider value={{
         signed: Boolean(auth),
         getToken,
         admin: admin,
         userRoles: userRoles,
         user,
         userEmail,
         verifyUser,
         setVerifyUser,
         setUserRoles,
         setUser,
         setAuth
      }}>
         {children}
      </ContextLogin.Provider>
   )
}

export default ContextLogin;