
import { useState, React } from 'react'
import './App.css'
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
  // useEffect(() => {
  //    window.Eduzz.Accounts.login("a4b7ad1d-ebf7-43f8-af05-5cda0575c621", { env: "staging" }).subscribe(token =>
  //    window.history.pushState(null, null, window.location.pathname);
  // }, []) //Disabled for dev
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
