/* eslint-disable react/display-name */
import { Link } from 'react-router-dom'
import Icon from 'awesome-react-icons'
import React, { useContext, useState } from 'react'
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css'

import { TopBarContainer, ToogleContainer } from '../../styles/CommonStyles'
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
import { ReactComponent as SairIcon } from "../../Assets/Icons/icon_sair.svg"
import Drawer from '@mui/material/Drawer';
import { AppBar, Grid, List, ListItem, ListItemIcon, ListItemText, Toolbar, Button } from '@mui/material'
import { Popover, SvgIcon } from '@material-ui/core'
import { Col } from 'react-bootstrap'
import './styles.css'
export const CustomMenu = (props) => {
   const { userEmail, signed } = useContext(ContextLogin)
   const cookie = new Cookies();
   const [drawerOpen, toggleDrawer] = useState(false)
   const { admin, userRoles } = useContext(ContextLogin)
   const handleDrawerToggle = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }
      toggleDrawer(open)
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
      <ToogleContainer>
         <Button onClick={handleDrawerToggle(true)}
            style={{
               position: "absolute",
               top: 70,
            }}>
            <Icon name="burger" color="#3E516E" className="w-8 h-8" />
         </Button>
      </ToogleContainer>
      <Drawer
         variant="temporary"
         sx={{
            display: { xs: "block", md: "none" }
         }}
         open={drawerOpen}
         onClose={handleDrawerToggle(false)}
         ModalProps={{
            keepMounted: true
         }}
      >
         <Toolbar />
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
      {admin ?
         <Grid container justifyContent="flex-end" style={{ paddingTop: 70 }} columns={24}>
            <Grid item xs={24} md={17} lg={19}>
               {props.children}

            </Grid>
         </Grid>
         :
         <Grid container justifyContent="flex-end" style={{ paddingTop: 70 }} columns={48}>
            <Grid item xs={48} md={38} lg={40}>
               {props.children}
            </Grid>
         </Grid>}
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
               onClick={logout(cookie)}>
               <ListItemIcon>
                  <SvgIcon component={SairIcon} inheritViewBox />
               </ListItemIcon>
               <ListItemText primary={"Sair"} />
            </ListItem>
         </List>
      </>
   }
   const items = []
   if (userRoles.length == 2) {
      return <>
         <ListItem button
         ><ListItemIcon>
               <SvgIcon component={DemandasIcon} inheritViewBox />
            </ListItemIcon>
            <ListItemText primary={"Demandas"} />
         </ListItem>
         <PreConsultorMenu />
         <ConsultorMenu />
         <ListItem button
            onClick={logout(cookie)}>
            <ListItemIcon>
               <SvgIcon component={SairIcon} inheritViewBox />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
         </ListItem>
      </>
   }
   else if (userRoles.includes("PRÉ-VENDA")) {
      return <>
         <ListItem button
         ><ListItemIcon>
               <SvgIcon component={DemandasIcon} inheritViewBox />
            </ListItemIcon>
            <ListItemText primary={"Demandas"} />
         </ListItem>
         <PreConsultorMenu />
         <ListItem button
            onClick={logout(cookie)}>
            <ListItemIcon>
               <SvgIcon component={SairIcon} inheritViewBox />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
         </ListItem>
      </>
   }
   else {
      return <>
         <ListItem button
         ><ListItemIcon>
               <SvgIcon component={DemandasIcon} inheritViewBox />
            </ListItemIcon>
            <ListItemText primary={"Demandas"} />
         </ListItem>
         <ConsultorMenu />
         <ListItem button
            onClick={logout(cookie)}>
            <ListItemIcon>
               <SvgIcon component={SairIcon} inheritViewBox />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
         </ListItem></>
   }
}

function logout(cookie) {
   return () => {
      const cookies = cookie.getAll()
      Object.keys(cookies).forEach(
         (key) => {
            cookie.remove(key, { path: '/' })
         }
      )
      window.Eduzz.Accounts.logout({ env: process.env.REACT_APP_EDUZZ_ENV, redirectTo: window.location.origin + process.env.PUBLIC_URL })
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
