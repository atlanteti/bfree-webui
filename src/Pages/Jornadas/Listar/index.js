import { Button } from 'react-bootstrap'
import { request } from '../../../Services/api'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   TableRow, TextCell, TextHeaderCell
} from '../../../styles/CommonStyles'
import SortColumn from '../../../Componentes/SortColumn'
import { React } from 'react'
import { JourneySearchBar } from './JourneySearchBar'
import { ReactComponent as EditIcon } from '../../../Assets/Icons/icon_editar.svg'
import { ReactComponent as DeleteIcon } from '../../../Assets/Icons/icon_delete.svg'
import { Link } from 'react-router-dom'
export default class ListarJornada extends ListarPagina {
   async deleteRecord(id) {
      const data = await request({
         method: 'delete',
         endpoint: 'journeys/excluir/' + id
      })
      return data
   }

   async fetchData(page, sort, isDesc, extraParams) {
      const data = await request({
         method: 'get',
         endpoint: 'journeys/listar',
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
      return <JourneySearchBar
         filterData={props.filterData}
      />
   }

   PageHeaderCustom() {
      return <PageHeaderCustomComponent
         Title="Jornadas"
         href="/cadastrar/jornadas/inserir"
      />
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Nome"
               attribute="jny_name"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Empresa"
               attribute="cpn_name"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} /></TextHeaderCell>
         <ActionHeaderCell scope="col">Ações</ActionHeaderCell>
      </TableRow>
   }

   createRecord(jornada) {
      return <TableRow key={jornada.jny_cod}>
         <TextCell data-title="Nome">{jornada.jny_name}</TextCell>
         <TextCell data-title="Empresa">{jornada.company.cpn_name}</TextCell>
         <ActionCell data-title="Ações">
            <Link to={`/editar/jornadas/${jornada.jny_cod}/alterar`}>
               <Button variant="transparent"><EditIcon />
               </Button>
            </Link>
            <Button variant="transparent" onClick={() => {
               this.setState({
                  deletionId: jornada.jny_cod,
                  modalIdentifier: "a jornada"
               })
               this.openModal()
            }}><DeleteIcon /></Button>
         </ActionCell>
      </TableRow>
   }
};
