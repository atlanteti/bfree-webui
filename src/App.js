
import { useState, React, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.bundle.css'

import CircularProgress from '@material-ui/core/CircularProgress'
import { CustomMenu } from '../src/Componentes/CustomMenu'
import Usuarios from './Pages/Usuarios/Listar'

function App () {
  const [load, setLoad] = useState(true)
  setTimeout(() => {
    setLoad(false)
  }, 1000)
  useEffect(() => {
    window.Eduzz.Accounts.login("a4b7ad1d-ebf7-43f8-af05-5cda0575c621", { env: "staging" }).subscribe(token => console.log(token))
    window.history.pushState(null, null, window.location.pathname);
 }, [])
  return (
      <div>
         {load
           ? <CircularProgress />
           : (
            <>
               <CustomMenu />
               <Usuarios />
            </>
             )}
      </div>
  )
}

export default App
