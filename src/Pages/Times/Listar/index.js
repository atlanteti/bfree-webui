import { Button, Col, Container, Row } from 'react-bootstrap'
// import SearchBar from '../../../Componentes/SearchBar'
import { request } from '../../../Services/api'
import ExclusionModal from '../../../Componentes/ExclusionModal'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   RightAlignText,
   TableRow, TextCell, TextHeaderCell, Title
} from '../../../styles/styles'
import SortColumn from '../../../Componentes/SortColumn'
import { React } from 'react'
import { TeamSearchBar } from "./TeamSearchBar"

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
         href="cadastrar/times/inserir/"/>
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
         <TextCell data-title="Empresa" className="text">{time.company.cpn_name}</TextCell>
         <TextCell data-title="Status" className="text">
            {time.tea_active ? "ATIVO" : "INATIVO"}
         </TextCell>
         <ActionCell data-title="Ações">
            <Button variant="warning" href={`/editar-time/${time.tea_cod}/alterar`}>Editar</Button>
            <Button variant="dark" onClick={() => {
                  this.setState({deletionId: time.tea_cod,
                                 modalIdentifier: "o time"})
                  this.openModal()
                  }}>Excluir</Button>
         </ActionCell>
      </TableRow>
   }
};
