import { Button } from 'react-bootstrap'
// import SearchBar from '../../../Componentes/SearchBar'
import { request } from '../../../Services/api'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   TableRow, TextCell, TextHeaderCell,
   NumberCell
} from '../../../styles/CommonStyles'
import SortColumn from '../../../Componentes/SortColumn'
import { React } from 'react'
import { UserSearchBar } from './UserSearchBar'
import { Menu, MenuItem } from '@mui/material';
import { Link } from "react-router-dom"
import { ReactComponent as EditIcon } from '../../../Assets/Icons/icon_editar.svg'
import { ReactComponent as DeleteIcon } from '../../../Assets/Icons/icon_delete.svg'
import { StatusBadgePropped } from '../../../Componentes/StatusBadges'
import NoDataComp from '../../../Componentes/NoDataComp'

export default class ListarUsuario extends ListarPagina {
   constructor(props) {
      super(props)
      this.state = {
         ...this.state,
         anchorEl: null,
         idUser: null,
         userName: ""
      }
   }
   async deleteRecord(id) {
      const data = await request({
         method: 'delete',
         endpoint: 'usuarios/excluir/' + id
      })
      return data
   }

   async fetchData(page, sort, isDesc, extraParams) {
      const data = await request({
         method: 'get',
         endpoint: 'usuarios/listar',
         params: {
            page: Number(page),
            sort: sort,
            isDesc: isDesc,
            ...extraParams
         }
      })
      return data
   }

   SearchBarCustom(props) {
      return <UserSearchBar
         filterData={props.filterData}
      />
   }

   PageHeaderCustom() {
      return <PageHeaderCustomComponent
         Title="Usuários"
         href="/cadastrar/usuarios/inserir"
      />
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>
         <TextHeaderCell scope="col">
            <SortColumn
               label="ID Eduzz"
               attribute="usr_cli_cod"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Nome"
               attribute="usr_name"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} /></TextHeaderCell>
         <TextHeaderCell scope="col"><SortColumn
            label="Telefone"
            attribute="usr_phone"
            sortCallback={props.sortCallback}
            receiver={props.subscribe}
            wipeAll={props.wipeAll} /></TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="E-mail"
               attribute="usr_email"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} /></TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Status"
               attribute="sus_name"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} /></TextHeaderCell>
         <ActionHeaderCell scope="col">Ações</ActionHeaderCell>
         <Menu
            id="simple-menu"
            anchorEl={props.anchorEl}
            keepMounted
            open={Boolean(props.anchorEl)}
            onClose={props.closeMenu}
         >
            <Link to={`/usuario-companhia/${props.idUser}/${props.userName}`}>
               <MenuItem>Empresas</MenuItem>
            </Link>
            <Link to={`/usuario-jornadas/${props.idUser}/${props.userName}`}>
               <MenuItem>Jornadas</MenuItem>
            </Link>
            <Link to={`/usuario-tipodemanda/${props.idUser}/${props.userName}`}>
               <MenuItem>Tipos de Demanda</MenuItem>
            </Link>
            <Link to={`/usuario-badges/${props.idUser}/${props.userName}`}>
               <MenuItem>Badges</MenuItem>
            </Link>
            <Link to={`/usuario-times/${props.idUser}/${props.userName}`}>
               <MenuItem>Times</MenuItem>
            </Link>
         </Menu>
      </TableRow>
   }

   createRecord(usuario) {
      return <TableRow key={usuario.usr_cod}>
         <NumberCell data-title="ID Eduzz">{usuario.usr_cli_cod}</NumberCell>
         <TextCell data-title="Nome">{usuario.usr_name}</TextCell>
         <TextCell data-title="Telefone">{usuario.usr_phone ?
            this.FormatPhone(usuario) :
            <NoDataComp />}
         </TextCell>
         <TextCell data-title="E-mail">{usuario.usr_email}</TextCell>
         <TextCell data-title="Status">{usuario.statusUser.sus_name ? <StatusBadgePropped active={usuario.statusUser.sus_name === "ATIVO"} /> : <NoDataComp />}</TextCell>
         <ActionCell data-title="Ações">
            <Link to={`/editar/usuarios/${usuario.usr_cod}/alterar`}>
               <Button variant="transparent"><EditIcon />
               </Button>
            </Link>
            <Button variant="transparent" onClick={() => {
               this.setState({
                  deletionId: usuario.usr_cod,
                  modalIdentifier: "o usuário"
               })
               this.openModal()
            }}><DeleteIcon />
            </Button>
            <Button onClick={(event) => {
               this.setState({
                  anchorEl: event.currentTarget,
                  idUser: usuario.usr_cod,
                  userName: usuario.usr_name
               })
            }} variant="transparent">...</Button>
         </ActionCell>
      </TableRow>
   }

   FormatPhone(usuario) {
      return usuario.usr_phone.replaceAll(/[^\d]/g, "").replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
   }
};
