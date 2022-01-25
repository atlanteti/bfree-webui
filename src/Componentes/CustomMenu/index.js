/* eslint-disable react/display-name */
import { Navigation } from 'react-minimal-side-navigation'
import { useHistory, useLocation } from 'react-router-dom'
import Icon from 'awesome-react-icons'
import React, { useContext, useState } from 'react'
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css'
import './styles.css'
import { CustomMenuCol, LastItemMenu, TopBarContainerMenu } from '../../styles/CommonStyles'
import { Cookies } from "react-cookie";
import ContextLogin from '../../Context/ContextLogin'
import { IoChevronForwardOutline } from "react-icons/io5"
import { ReactComponent as EmpresaIcon } from "../../Assets/Icons/icon_empresa.svg"
import { ReactComponent as JornadaIcon } from "../../Assets/Icons/icon_jornada.svg"
import { ReactComponent as DemandasIcon } from "../../Assets/Icons/icon_demanda.svg"
import { ReactComponent as TiposDemandasIcon } from "../../Assets/Icons/icon_tipos_demandas.svg"
import { ReactComponent as BagdeIcon } from "../../Assets/Icons/icon_badge.svg"
import { ReactComponent as TimeIcon } from "../../Assets/Icons/icon_time.svg"
import { ReactComponent as UsuariosIcon } from "../../Assets/Icons/icon_usuarios.svg"
import { ReactComponent as RelatoriosIcon } from "../../Assets/Icons/icon_relatorios.svg"
import { ReactComponent as UploadsIcon } from "../../Assets/Icons/icon_uploads.svg"
import { ReactComponent as LogsIcon } from "../../Assets/Icons/icon_logs.svg"
import { ReactComponent as GerencialIcon } from "../../Assets/Icons/icon_gerencial.svg"
import { ReactComponent as CalendariolIcon } from "../../Assets/Icons/icon_calendario.svg"
import { ReactComponent as SairIcon } from "../../Assets/Icons/icon_sair.svg"


export const CustomMenu = () => {
   const cookie = new Cookies();

   const history = useHistory()
   const location = useLocation()
   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
   const { admin, userRoles } = useContext(ContextLogin)
   function generateLinks(admin) {
      const complete = [
         {
            title: <span className="title-arrow">Empresas <IoChevronForwardOutline size={17} /></span>,
            itemId: '/companhia',
            elemBefore: () => <EmpresaIcon />
         },
         {
            title: <span className="title-arrow">Jornadas <IoChevronForwardOutline size={17} /></span>,
            itemId: '/jornadas',
            elemBefore: () => <JornadaIcon />
         },
         {
            title: <span className="title-arrow">Tipos de Demanda  <IoChevronForwardOutline size={19} /></span>,
            itemId: '/tipodemanda',
            elemBefore: () => <TiposDemandasIcon />
         },
         {
            title: <span className="title-arrow">Badges <IoChevronForwardOutline size={17} /></span>,
            itemId: '/badges',
            elemBefore: () => <BagdeIcon />
         },
         {
            title: <span className="title-arrow">Times <IoChevronForwardOutline size={17} /></span>,
            itemId: '/times',
            elemBefore: () => <TimeIcon />
         },
         {
            title: <span className="title-arrow">Usuários <IoChevronForwardOutline size={17} /></span>,
            itemId: '/usuarios',
            elemBefore: () => <UsuariosIcon />
         },
         {
            title: <span className="title-arrow">Demandas <IoChevronForwardOutline size={17} /></span>,
            itemId: '/demandas',
            elemBefore: () => <DemandasIcon />
         },
         {
            title: <span className="title-arrow">Horários <IoChevronForwardOutline size={17} /></span>,
            itemId: '/horario',
            elemBefore: () => <CalendariolIcon />
         },
         {
            title: <span className="title-arrow">Relatórios <IoChevronForwardOutline size={17} /></span>,
            itemId: '/relatorios',
            elemBefore: () => <RelatoriosIcon />
         },
         {
            title: <span className="title-arrow">Gerencial <IoChevronForwardOutline size={17} /></span>,
            itemId: '/relatoriogerencial',
            elemBefore: () => <GerencialIcon />
         },
         {
            title: <span className="title-arrow">Uploads <IoChevronForwardOutline size={17} /></span>,
            itemId: '/upload',
            elemBefore: () => <UploadsIcon />
         },
         {
            title: <span className="title-arrow">Logs <IoChevronForwardOutline size={17} /></span>,
            itemId: '/log',
            elemBefore: () => <LogsIcon />
         },
      ]
      let filteredForUser = complete.filter(conditionalForPermissionAccess)
      return filteredForUser

      function conditionalForPermissionAccess(line) {
         if (userRoles == null)
            return false
         if (userRoles.length == 0)
            return line.itemId !== "/horario"
         else if (userRoles.includes("CONSULTOR"))
            return ["/demandas", "/relatorios", "/horario"].includes(line.itemId)
         else
            return ["/demandas", "/relatorios"].includes(line.itemId)
      }
   }
   return (
      <React.Fragment>
         {/* Sidebar Overlay */}
         <div
            onClick={() => setIsSidebarOpen(false)}
            className={`fixed inset-0 z-20 block transition-opacity opacity-50 lg:hidden ${isSidebarOpen ? "block" : "hidden"
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
            className={`fixed inset-y-0 border-l-0 left-0 z-30 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
               }`}
         >
            {/* https://github.com/abhijithvijayan/react-minimal-side-navigation */}
            <TopBarContainerMenu>
               <div>
                  <strong>B</strong>free
               </div>
            </TopBarContainerMenu>
            <Navigation
               activeItemId={location.pathname.replace("/cadastrar", "").replace("/inserir", "")}
               onSelect={({ itemId }) => {
                  history.push(itemId)
               }}
               items={generateLinks(admin)}
            />

            <LastItemMenu className={admin ? "absolute w-full" : "absolute bottom-0 w-full"}>
               <Navigation
                  activeItemId={location.pathname}
                  items={[
                     {
                        title: <span>Sair</span>,
                        elemBefore: () => <SairIcon />
                     }
                  ]}
                  onSelect={() => {
                     cookie.remove('auth', { path: "/" })
                     cookie.remove('hasJourney', { path: "/" })
                     window.Eduzz.Accounts.logout({ env: "staging", redirectTo: window.location.origin + process.env.PUBLIC_URL })
                  }}
               />
            </LastItemMenu>
         </CustomMenuCol>
      </React.Fragment>
   )
}

