
import { useState, React, useEffect, useContext } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom.scss'
import './styles/main.bundle.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import ContextLogin from "../src/Context/ContextLogin";

import { Navigate} from "react-router-dom"
import { Cookies } from "react-cookie"

function App() {
   const cookies = new Cookies()
   const [load, setLoad] = useState(true)
   const { getToken, auth, verifyUser, userRoles } = useContext(ContextLogin)

   useEffect(() => {
      if (auth !== null) {
         cookies.remove('auth', { path: "/" })
         cookies.remove('hasJourney', { path: "/" })
      }

      window.Eduzz.Accounts.login(process.env.REACT_APP_PARTNER_CODE,
         {
            env: process.env.REACT_APP_EDUZZ_ENV, //env: "" (Default, vale como produção)
            // redirectTo: this.options?.redirectTo || window.location.href,
            // bg: this.options?.bg,
            // logo: this.options?.logo,
            // create: this.options?.create || undefined,
            // register: this.options?.register || undefined,
            btnColor: "#0509EE",
            // dark: this.options?.dark || undefined,
            // email: this.options?.email || undefined 
         }).subscribe(token => {
            getToken(token)
            window.history.pushState(null, null, window.location.pathname)
         })
   }, [auth])

   setTimeout(() => {
      setLoad(false)
   }, 1000)
   if (verifyUser === 100) {
      if (userRoles?.includes("PRÉ-VENDA")) {
         return <Navigate to="/contato" />
      }
      else if (userRoles?.includes("CONSULTOR")) {
         return <Navigate to="/reunioes" />
      }
      else return <Navigate to="/demandas" />
   }
   else if (verifyUser === 215) {
      return <Navigate to="/termos" />
   }

   return (
      <div>
         {load && <CircularProgress />}
      </div>
   )
}

export default App
