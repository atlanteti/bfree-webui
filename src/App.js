
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Usuarios from './Pages/Usuarios'
import DrawerMenu from "../src/Componentes/DrawerMenu";
function App() {
   return (
      <div>
         <DrawerMenu />
         <Usuarios />
      </div>
   )
}

export default App;
