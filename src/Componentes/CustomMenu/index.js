/* eslint-disable react/display-name */
import { Navigation } from 'react-minimal-side-navigation'
import { useHistory, useLocation } from 'react-router-dom'
import Icon from 'awesome-react-icons'
import React, { useContext, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { IoBusinessOutline, IoBookmarkOutline, IoAlbumsOutline } from 'react-icons/io5'
import { RiTeamLine, RiMedalLine } from 'react-icons/ri'
import { FaTasks, FaRegFileAlt } from 'react-icons/fa'
import { BsGraphUp } from 'react-icons/bs'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css'
import './styles.css'
import { CustomMenuCol } from '../../styles/CommonStyles'
import { Cookies } from "react-cookie";
import ContextLogin from '../../Context/ContextLogin'
import { MdAttachMoney } from 'react-icons/md'
export const CustomMenu = () => {
   const cookie = new Cookies();

   const history = useHistory()
   const location = useLocation()
   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
   const { admin } = useContext(ContextLogin)
   return (
      <React.Fragment>
         {/* Sidebar Overlay */}
         <div
            onClick={() => setIsSidebarOpen(false)}
            className={`fixed border-l-0 inset-0 z-20 block transition-opacity bg-white opacity-50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'
               }`}
         />
         <div className="btn-position">
            <button
               className="btn-menu"
               onClick={() => setIsSidebarOpen(true)}
               type="button"
            >
               <Icon name="burger" className="w-8 h-8" />
            </button>
         </div>

         {/* Sidebar */}
         <CustomMenuCol xs={6} sm={3} md={3} lg={2}
            className={`fixed inset-y-0 border-r-2 border-l-0 left-0 z-30 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'ease-out translate-x-0' : 'ease-in -translate-x-full'
               }`}
         >
            {/* https://github.com/abhijithvijayan/react-minimal-side-navigation */}
            <Navigation
               activeItemId={location.pathname.replace("/cadastrar", "").replace("/inserir/", "")}
               onSelect={({ itemId }) => {
                  history.push(itemId)
               }}
               items={newFunction(admin)}
            />

            <div className="absolute bottom-0 w-full my-8">
               <Navigation
                  activeItemId={location.pathname}
                  items={[
                     {
                        title: "Sair",
                        elemBefore: () => <Icon name="activity" />
                     }
                  ]}
                  onSelect={() => {
                     cookie.remove('auth', { path: "/" })
                     cookie.remove('hasJourney', { path: "/" })
                     window.Eduzz.Accounts.logout({ env: "staging", redirectTo: window.location.origin })
                  }}
               />
            </div>
         </CustomMenuCol>
      </React.Fragment>
   )
}
function newFunction(admin) {
   const complete = [
      {
         title: 'Empresas',
         itemId: '/companhia',
         elemBefore: () => <IoBusinessOutline size={23} color="#BFCADD" />
      },
      {
         title: 'Jornadas',
         itemId: '/jornadas',
         elemBefore: () => <BsGraphUp size={23} color="#BFCADD" />
      },
      {
         title: 'Tipos de Demanda',
         itemId: '/tipodemanda',
         elemBefore: () => <IoAlbumsOutline size={23} color="#BFCADD" />
      },
      {
         title: 'Badges',
         itemId: '/badges',
         elemBefore: () => <RiMedalLine size={23} color="#BFCADD" />
      },
      {
         title: 'Times',
         itemId: '/times',
         elemBefore: () => <RiTeamLine size={23} color="#BFCADD" />
      },
      {
         title: 'Usuários',
         itemId: '/usuarios',
         elemBefore: () => <AiOutlineUser size={23} color="#BFCADD" />
      },
      {
         title: 'Demandas',
         itemId: '/demandas',
         elemBefore: () => <FaTasks size={23} color="#BFCADD" />
      },
      {
         title: "Relatorios",
         itemId: '/relatorios',
         elemBefore: () => <MdAttachMoney size={23} color="#BFCADD" />
      },
      {
         title: 'Upload File',
         itemId: '/upload',
         elemBefore: () => <AiOutlineCloudUpload size={23} color="#BFCADD" />
      },
      {
         title: 'Logs',
         itemId: '/log',
         elemBefore: () => <FaRegFileAlt size={23} color="#BFCADD" />
      },
   ]
   let filteredForUser = complete.filter(conditionalForPermissionAccess)
   if (!admin) { return filteredForUser }
   return complete

   function conditionalForPermissionAccess(line) {
      { return line.title == "Demandas" || line.title == "Relatorios" }
   }
}

