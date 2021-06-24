import navLogo from '../../Assets/Images/miniLogo.png'
import { AiOutlineUser } from "react-icons/ai"
import { IoBusinessOutline, IoBookmarkOutline } from "react-icons/io5"
import { RiTeamLine, RiMedalLine } from "react-icons/ri";
import { FaUserGraduate, FaTasks } from "react-icons/fa"
import { BsGraphUp } from "react-icons/bs";

import './styles.css';

function DrawerMenu() {

   return (
      <div className="borda">
         <ul className="list-unstyled borda-container">
            <li className="logo drawer-item">
               <a href="/" className="btn btn-initial drawer-link">
                  {/* <span className="">
                     <img
                        alt="Home pag"
                        src={navLogo}
                     />
                  </span>
                  <span className="drawer-text main">atlante</span> */}
               </a>
            </li>
            <span className="drawer-text drawer-title">
               Tabelas Principais
            </span>
            <li className="drawer-item">
               <a href="/companie" className="btn btn-initial drawer-link">
                  <IoBusinessOutline size={23} color="#ffb509" />
                  <span className="drawer-text">
                     Companhias
                  </span>
               </a>
            </li>
            <li className="drawer-item">
               <a href="/" className="btn btn-initial drawer-link">
                  <AiOutlineUser size={23} color="#ffb509" />
                  <span className="drawer-text">
                     Usuários
                  </span>
               </a>
            </li>
            <li className="drawer-item">
               <a href="/" className="btn btn-initial drawer-link">
                  <FaTasks size={23} color="#ffb509" />
                  <span className="drawer-text">
                     Demandas
                  </span>
               </a>
            </li>
            <li className="drawer-item">
               <a href="/" className="btn btn-initial drawer-link">
                  <BsGraphUp size={23} color="#ffb509" />
                  <span className="drawer-text">
                     Jornada do usuário
                  </span>
               </a>
            </li>
            <li className="drawer-item">
               <a href="/" className="btn btn-initial drawer-link">
                  <RiMedalLine size={23} color="#ffb509" />
                  <span className="drawer-text">
                     Badges do usuário
                  </span>
               </a>
            </li>
            <li className="drawer-item">
               <a href="/" className="btn btn-initial drawer-link">
                  <IoBookmarkOutline size={23} color="#ffb509" />
                  <span className="drawer-text">
                     Conquistas
                  </span>
               </a>
            </li>
            <li className="drawer-item">
               <a href="/" className="btn btn-initial drawer-link">
                  <FaUserGraduate size={23} color="#ffb509" />
                  <span className="drawer-text">
                     Mentores
                  </span>
               </a>
            </li>
            <li className="drawer-item">
               <a href="/" className="btn btn-initial drawer-link">
                  <RiTeamLine size={23} color="#ffb509" />
                  <span className="drawer-text">
                     Times
                  </span>
               </a>
            </li>

            <ul className="list-unstyled borda-container">
               <span className="drawer-text drawer-title">
                  Tabelas Secundárias
               </span>
               <li className="logo drawer-item">
                  <a href="#" className="btn btn-initial drawer-link">
                     <span className="drawer-text item-p">Status das Demandas</span>
                  </a>
               </li>
               <li className="logo drawer-item">
                  <a href="#" className="btn btn-initial drawer-link">
                     <p className="drawer-text item-p">Status dos Usuários</p>
                  </a>
               </li>
               <li className="logo drawer-item">
                  <a href="#" className="btn btn-initial drawer-link">
                     <p className="drawer-text item-p">Resultados das Demandas</p>
                  </a>
               </li>
               <li className="logo drawer-item">
                  <a href="#" className="btn btn-initial drawer-link">
                     <p className="drawer-text item-p">Tipo das Demandas</p>
                  </a>
               </li>
               <li className="logo drawer-item">
                  <a href="#" className="btn btn-initial drawer-link">
                     <p className="drawer-text item-p">  Tipo de Mentor</p>
                  </a>
               </li>
               <li className="logo drawer-item">
                  <a href="#" className="btn btn-initial drawer-link">
                     <p className="drawer-text item-p">Badges</p>
                  </a>
               </li>
               <li className="logo drawer-item">
                  <a href="#" className="btn btn-initial drawer-link">
                     <p className="drawer-text item-p">Jornadas</p>
                  </a>
               </li>
            </ul>

         </ul>
      </div>
   );
}

export default DrawerMenu;