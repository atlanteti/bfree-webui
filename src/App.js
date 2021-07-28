
import { useState, React, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.bundle.css'

import CircularProgress from '@material-ui/core/CircularProgress'
import ContextLogin from "../src/Context/ContextLogin";

import { Redirect } from "react-router-dom"
import { Cookies } from "react-cookie"

function App() {
   const cookies = new Cookies()
   const [load, setLoad] = useState(true)
   const [redirect, setRedirect] = useState(false);
   const { getToken, auth } = useContext(ContextLogin)

   setTimeout(() => {
      setLoad(false)
   }, 1000)


   useEffect(() => {
      if (auth !== null) {
         cookies.remove('auth', { path: "/" })
      }

      window.Eduzz.Accounts.login("a4b7ad1d-ebf7-43f8-af05-5cda0575c621", { env: "staging" }).subscribe(token => {
         getToken(token)
         setRedirect(true)
      })
      window.history.pushState(null, null, window.location.pathname)
   }, [auth])

   if (redirect) {
      return <Redirect to="/demandas" />
   }

   return (
      <div>
         {load && <CircularProgress />}
      </div>
   )
}

export default App
