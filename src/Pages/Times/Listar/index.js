import { Badge, Button, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { request } from '../../../Services/api'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   Icon,
   RightAlignText,
   TableRow, TextCell, TextHeaderCell, Title
} from '../../../styles/CommonStyles'
import SortColumn from '../../../Componentes/SortColumn'
import { React } from 'react'
import { TeamSearchBar } from "./TeamSearchBar"
import { IoPeopleOutline } from 'react-icons/io5'
import { ReactComponent as EditIcon } from '../../../Assets/Icons/icon_editar.svg'
import { ReactComponent as DeleteIcon } from '../../../Assets/Icons/icon_delete.svg'
import { ReactComponent as TeamIcon } from '../../../Assets/Icons/icon_mentores.svg'
import { ActiveStatusBadge, InactiveStatusBadge } from '../../../Componentes/StatusBadges'
import NoDataComp from '../../../Componentes/NoDataComp'
import { Link } from 'react-router-dom'
export default class ListarTime extends ListarPagina {
   async deleteRecord(id) {
      const data = await request({
         method: 'delete',
         endpoint: 'teams/excluir/' + id
      })
      return data
   }

   async fetchData(page, sort, isDesc, extraParams) {
      const data = await request({
         method: 'get',
         endpoint: 'teams/listar',
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
      return <TeamSearchBar
         filterData={props.filterData}
      />
   }

   PageHeaderCustom() {
      return <PageHeaderCustomComponent
         Title="Times"
         href="cadastrar/times/inserir" />
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Nome"
               attribute="tea_name"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll}
            />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Empresa"
               attribute="cpn_name"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll}
            />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Status"
               attribute="tea_active"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll}
            />
         </TextHeaderCell>
         <ActionHeaderCell scope="col">Ações</ActionHeaderCell>
      </TableRow>
   }

   createRecord(time) {
      return <TableRow key={time.tea_cod}>
         <TextCell data-title="Nome">{time.tea_name}</TextCell>
         <TextCell data-title="Empresa">{time.company.cpn_name ? time.company.cpn_name : <NoDataComp />}</TextCell>
         <TextCell data-title="Status">
            {time.tea_active ? <ActiveStatusBadge /> : <InactiveStatusBadge />}
         </TextCell>
         <TextCell data-title="Ações">
            <Link to={`/editar/times/${time.tea_cod}/alterar`}>
               <Button variant="transparent"><EditIcon /></Button>
            </Link>
            <Button variant="transparent" onClick={() => {
               this.setState({
                  deletionId: time.tea_cod,
                  modalIdentifier: "o time"
               })
               this.openModal()
            }}><DeleteIcon /></Button>
            {!time.qtd_team_mentors ?
               null
               :
               <Link to={`/tipo-mentores/${time.tea_cod}`}>
                  <Button disabled={!time.qtd_team_mentors} variant="transparent"><TeamIcon />
                  </Button>
               </Link>
            }
         </TextCell>
      </TableRow >
   }
};
