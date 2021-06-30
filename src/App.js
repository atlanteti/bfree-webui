
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/main.bundle.css";

import Usuarios from './Pages/Usuarios/Listar'
import { CustomMenu } from "../src/Componentes/CustomMenu";
function App() {
   return (
      <div>
         <CustomMenu />
         <Usuarios />
      </div>
   )
}

export default App;
