import { Button, Col, Container, Row } from 'react-bootstrap'
// import SearchBar from '../../../Componentes/SearchBar'
import { request } from '../../../Services/api'
import ExclusionModal from '../../../Componentes/ExclusionModal'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   RightAlignText,
   TableRow, TextCell, TextHeaderCell, Title,
   HeaderContainer, RowTopMargin, NumberCell
} from '../../../styles/CommonStyles'
import SortColumn from '../../../Componentes/SortColumn'
import { React } from 'react'
// import { JourneySearchBar } from './JourneySearchBar'

export default class ListarRelatorio extends ListarPagina {
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
      this.setState({showTotal: true})
      return data
   }

   SearchBarCustom(props) {
      return ""
   }

   PageHeaderCustom() {
      return <PageHeaderCustomComponent
         Title="Relatorio"
         // href="/cadastrar/jornadas/inserir"
      />
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Operador"
               attribute="xxx"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Etapa 1"
               attribute="xxx"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} 
            />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Etapa 2"
               attribute="xxx"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} 
            />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Etapa 3"
               attribute="xxx"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} 
            />
         </TextHeaderCell>
      </TableRow>
   }

   createRecord(user) {
      return (
         <TableRow key={user}>
            <TextCell data-title="Pré-vendedor">{user.operador}</TextCell>
            <NumberCell data-title="Etapa 1">{user.etapa1}</NumberCell>
            <NumberCell data-title="Etapa 2">{user.etapa2}</NumberCell>
            <NumberCell data-title="Etapa 3">{user.etapa3}</NumberCell>
         </TableRow>
      ) 
   }

   createTotal(user){
      return(
         <TableRow>
            <TextCell fontTotal data-title="Total">TOTAL</TextCell>
            <NumberCell fontTotal data-title="Etapa 1">19</NumberCell>
            <NumberCell fontTotal data-title="Etapa 2">10</NumberCell>
            <NumberCell fontTotal data-title="Etapa 3">11</NumberCell>
         </TableRow>
      )
   }
};
