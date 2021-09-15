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
   constructor(props) {
      super(props)
      this.state = {
         ...this.state,
         headerData: []
      }
   }

   async fetchData() {
      let data = await request({
         method: 'get',
         endpoint: 'demands/report-billing',
      }).then((data) =>{
         const bodyData = data.data.splice(1)
         this.setState({
            headerData: data.data
         })

         data.data = bodyData
         
         return data
      })

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
      </TableRow>
   }

   renderPagination() {
      return null
   }

   createRecord(user) {
      console.log(user)
      return null
   }   
};
