
import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/main.bundle.css";

import Usuarios from './Pages/Usuarios/Listar'
import { CustomMenu } from "../src/Componentes/CustomMenu";
function App() {
   // useEffect(() => {
   //    window.Eduzz.Accounts.login("a4b7ad1d-ebf7-43f8-af05-5cda0575c621", { env: "staging" }).subscribe(token => console.log(token))
   //    window.history.pushState(null, null, window.location.pathname);
   // }, [])
   return (
      <div>
         <CustomMenu />
         <Usuarios />
      </div>
   )
}

export default App;
