import { Button, Col, Container, Row } from 'react-bootstrap'
// import SearchBar from '../../../Componentes/SearchBar'
import { request } from '../../../Services/api'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   RightAlignText,
   TableRow, TextCell, TextHeaderCell, Title,
   HeaderContainer, RowTopMargin, NumberCell
} from '../../../styles/CommonStyles'
import SortColumn from '../../../Componentes/SortColumn'
import { React } from 'react'
import { UserSearchBar } from './UserSearchBar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom"


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
               label="ID Externo"
               attribute="usr_externalid"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} /></TextHeaderCell>
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
         <TextCell data-title="ID Externo" className="text">{usuario.usr_externalid ? usuario.usr_externalid : <p style={{ color: "transparent" }}>.</p>}</TextCell>
         <TextCell data-title="Nome">{usuario.usr_name}</TextCell>
         <TextCell data-title="Telefone">{usuario.usr_phone ? usuario.usr_phone : <p style={{ color: "transparent" }}>.</p>}</TextCell>
         <TextCell data-title="Status">{usuario.statusUser.sus_name ? usuario.statusUser.sus_name : <p style={{ color: "transparent" }}>.</p>}</TextCell>
         <ActionCell data-title="Ações">
            <Row noGutters className="positionButtonsFixed">
               <Button variant="warning" href={`/editar/usuarios/${usuario.usr_cod}/alterar`}>Editar</Button>
               <Button variant="dark" className="mr-1"
                  onClick={() => {
                     this.setState({
                        deletionId: usuario.usr_cod,
                        modalIdentifier: "o usuário"
                     })
                     this.openModal()
                  }}>Excluir</Button>
               <Button onClick={(event) => {
                  this.setState({
                     anchorEl: event.currentTarget,
                     idUser: usuario.usr_cod,
                     userName: usuario.usr_name
                  })
               }} variant="secondary">...</Button>
            </Row>
         </ActionCell>
      </TableRow>
   }
};
