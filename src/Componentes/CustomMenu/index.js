/* eslint-disable react/display-name */
import { Navigation } from 'react-minimal-side-navigation'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Icon from 'awesome-react-icons'
import React, { useContext, useState } from 'react'
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css'

import { CustomMenuCol, LastItemMenu, TopBarContainer, TopBarContainerMenu } from '../../styles/CommonStyles'
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
import Drawer from '@mui/material/Drawer';
import { AppBar, Box, Grid, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { IconButton, Popover, SvgIcon } from '@material-ui/core'
import { Col } from 'react-bootstrap'
import './styles.css'
export const CustomMenu2 = () => {
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
            className={`fixed styleScroll inset-y-0 border-l-0 left-0 z-30 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
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
                     cookie.remove('userType', { path: "/" })
                     window.Eduzz.Accounts.logout({ env: "staging", redirectTo: window.location.origin + process.env.PUBLIC_URL })
                  }}
               />
            </LastItemMenu>
         </CustomMenuCol>
      </React.Fragment>
   )
}
export const CustomMenu = (props) => {
   const { userEmail, signed } = useContext(ContextLogin)
   const cookie = new Cookies();
   const [drawerOpen, toggleDrawer] = useState(false)
   const { admin, userRoles } = useContext(ContextLogin)
   const handleDrawerToggle = () => {
      toggleDrawer(!drawerOpen)

   }
   return <Col>
      <AppBar style={{ background: '#ffffff' }} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
         <Toolbar>
            <TopBarContainer>
               <div>
                  <strong>B</strong>free
               </div>
               <div className="topbar-user">
                  {signed && <p>Usuário: {userEmail}</p>}
               </div>
            </TopBarContainer>
         </Toolbar>
      </AppBar>
      <Drawer
         variant="temporary"
         sx={{
            display: { xs: "block", md: "none" }
         }}
         open={drawerOpen}
         onClose={handleDrawerToggle}
         ModalProps={{
            keepMounted: true
         }}
      >

         {CreateMenuItems(cookie, admin, userRoles)}
      </Drawer>
      <Drawer
         variant="permanent"
         sx={{
            display: { xs: 'none', md: "block" }
         }}
      >
         <Toolbar />
         {CreateMenuItems(cookie, admin, userRoles)}
      </Drawer>
      <Grid container justifyContent="flex-end" columns={24}>
         <Grid item xs={24} md={17} lg={19}>
            <Toolbar />
            {props.children}

         </Grid>
      </Grid>
   </Col >
}
function CreateMenuItems(cookie, admin, userRoles) {

   if (userRoles === null) {
      return false
   }
   if (admin) {
      return <>
         <List>
            <ListItem button
               secondaryAction={<IoChevronForwardOutline size={17} />}
               component={Link} to="/companhia">
               <ListItemIcon>
                  <SvgIcon component={EmpresaIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Empresas"} />
            </ListItem>
            <ListItem button
               secondaryAction={<IoChevronForwardOutline size={17} />}
               component={Link} to="/jornadas">
               <ListItemIcon>
                  <SvgIcon component={JornadaIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Jornadas"} />
            </ListItem>
            <ListItem button secondaryAction={<IoChevronForwardOutline size={17} />}
               component={Link} to="/tipodemanda">
               <ListItemIcon>
                  <SvgIcon component={TiposDemandasIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Tipos de Demanda"} />
            </ListItem>
            <ListItem button secondaryAction={<IoChevronForwardOutline size={17} />}
               component={Link} to="/badges">
               <ListItemIcon>
                  <SvgIcon component={BagdeIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Badges"} />
            </ListItem>
            <ListItem button secondaryAction={<IoChevronForwardOutline size={17} />}
               component={Link} to="/times">
               <ListItemIcon>
                  <SvgIcon component={TimeIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Times"} />
            </ListItem>
            <ListItem button secondaryAction={<IoChevronForwardOutline size={17} />}
               component={Link} to="/usuarios">
               <ListItemIcon>
                  <SvgIcon component={UsuariosIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Usuários"} />
            </ListItem>
            <ListItem button
               secondaryAction={<IoChevronForwardOutline size={17} />}
               component={Link} to="/demandas">
               <ListItemIcon>
                  <SvgIcon component={DemandasIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Demandas"} />
            </ListItem>
            <PreConsultorMenu />
            <ConsultorMenu />
            <ListItem button secondaryAction={<IoChevronForwardOutline size={17} />}
               component={Link} to="/relatorios">
               <ListItemIcon>
                  <SvgIcon component={RelatoriosIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Relatórios"} />
            </ListItem>
            <ListItem button secondaryAction={<IoChevronForwardOutline size={17} />}
               component={Link} to="/relatoriogerencial">
               <ListItemIcon>
                  <SvgIcon component={GerencialIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Gerencial"} />
            </ListItem>
            <ListItem button
               secondaryAction={<IoChevronForwardOutline size={17} />}
               component={Link} to="/upload">
               <ListItemIcon>
                  <SvgIcon component={UploadsIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Uploads"} />
            </ListItem>
            <ListItem button secondaryAction={<IoChevronForwardOutline size={17} />}
               component={Link} to="/log">
               <ListItemIcon>
                  <SvgIcon component={LogsIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Logs"} />
            </ListItem>
            <ListItem button
               onClick={() => {
                  cookie.remove('auth', { path: "/" })
                  cookie.remove('hasJourney', { path: "/" })
                  window.Eduzz.Accounts.logout({ env: "staging", redirectTo: window.location.origin + process.env.PUBLIC_URL })
               }}>
               <ListItemIcon>
                  <SvgIcon component={SairIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Sair"} />
            </ListItem>
         </List>
      </>
   }
   const items = []
   if (userRoles == ["PRÉ-CONSULTOR", "CONSULTOR"]) {
      return <>
         <PreConsultorMenu />
         <ConsultorMenu />
         <ListItem button
            onClick={() => {
               cookie.remove('auth', { path: "/" })
               cookie.remove('hasJourney', { path: "/" })
               window.Eduzz.Accounts.logout({ env: "staging", redirectTo: window.location.origin + process.env.PUBLIC_URL })
            }}>
            <ListItemIcon>
               <SvgIcon component={SairIcon} inheritViewBox />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
         </ListItem>
      </>
   }
   else if (userRoles.includes("PRÉ-CONSULTOR")) {
      return <>
         <PreConsultorMenu />
         <ListItem button
            onClick={() => {
               cookie.remove('auth', { path: "/" })
               cookie.remove('hasJourney', { path: "/" })
               window.Eduzz.Accounts.logout({ env: "staging", redirectTo: window.location.origin + process.env.PUBLIC_URL })
            }}>
            <ListItemIcon>
               <SvgIcon component={SairIcon} inheritViewBox />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
         </ListItem>
      </>
   }
   else {
      return <><ConsultorMenu />
         <ListItem button
            onClick={() => {
               cookie.remove('auth', { path: "/" })
               cookie.remove('hasJourney', { path: "/" })
               window.Eduzz.Accounts.logout({ env: "staging", redirectTo: window.location.origin + process.env.PUBLIC_URL })
            }}>
            <ListItemIcon>
               <SvgIcon component={SairIcon} inheritViewBox />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
         </ListItem></>
   }
}

function ConsultorMenu(props) {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handlePopoverClose = () => {
      setAnchorEl(null);
   };
   return <>
      <ListItem button onClick={handlePopoverOpen}
         secondaryAction={<IoChevronForwardOutline size={17} />}>
         <ListItemIcon>

         </ListItemIcon>
         <ListItemText primary={"Consultor"} />
      </ListItem>
      <Popover
         open={Boolean(anchorEl)}
         anchorEl={anchorEl}
         onClose={handlePopoverClose}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
         }}
      >
         <List>
            <ListItem button
               component={Link} to="/horario">
               <ListItemText primary={"Agenda"} />
            </ListItem>
            <ListItem button
               component={Link} to="/reunioes">
               <ListItemText primary={"Minhas Reuniões"} />
            </ListItem>
            <ListItem button
               component={Link} to="/relatorios">
               <ListItemText primary={"Relatório"} />
            </ListItem>
         </List>
      </Popover>
   </>
}

function PreConsultorMenu(props) {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handlePopoverClose = () => {
      setAnchorEl(null);
   };
   return <>
      <ListItem button onClick={handlePopoverOpen}
         secondaryAction={<IoChevronForwardOutline size={17} />}>
         <ListItemIcon>

         </ListItemIcon>
         <ListItemText primary={"Pré-Consultor"} />
      </ListItem>
      <Popover
         open={Boolean(anchorEl)}
         anchorEl={anchorEl}
         onClose={handlePopoverClose}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
         }}
      >
         <List>
            <ListItem button
               component={Link} to="/contato">
               <ListItemText primary={"Fazer Contato"} />
            </ListItem>
         </List>
         <List>
            <ListItem button
               component={Link} to="/relatorios">
               <ListItemText primary={"Relatório"} />
            </ListItem>
         </List>
      </Popover>
   </>
}
