
import { useState, React, useEffect, useContext } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom.scss'
import './styles/main.bundle.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import ContextLogin from "../src/Context/ContextLogin";

import { Redirect } from "react-router-dom"
import { Cookies } from "react-cookie"

function App() {
   const cookies = new Cookies()
   const [load, setLoad] = useState(true)
   const [redirect, setRedirect] = useState(false);
   const { getToken, auth, verifyUser } = useContext(ContextLogin)

   useEffect(() => {
      if (auth !== null) {
         cookies.remove('auth', { path: "/" })
         cookies.remove('hasJourney', { path: "/" })
      }

      window.Eduzz.Accounts.login("a4b7ad1d-ebf7-43f8-af05-5cda0575c621",
         {
            env: "staging", //env: "" (Default, vale como produção)
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
            setRedirect(true)
            window.history.pushState(null, null, window.location.pathname)
         })
   }, [auth])

   setTimeout(() => {
      setLoad(false)
   }, 1000)
   if(verifyUser === 100){
      return <Redirect to="/demandas" />
   } 
   if (verifyUser === 215) {
      return <Redirect to="/termos" />
   }
   // if(redirect){
   //    window.Eduzz.Accounts.logout({ env: "staging", redirectTo: window.location.origin })
   // }

   return (
      <div>
         {load && <CircularProgress />}
      </div>
   )
}

export default App
