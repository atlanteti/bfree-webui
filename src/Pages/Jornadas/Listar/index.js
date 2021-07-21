import { Button, Col, Container, Row } from 'react-bootstrap'
// import SearchBar from '../../../Componentes/SearchBar'
import { request } from '../../../Services/api'
import ExclusionModal from '../../../Componentes/ExclusionModal'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
  ActionCell, ActionHeaderCell,
  RightAlignText,
  TableRow, TextCell, TextHeaderCell, Title,
  HeaderContainer, RowTopMargin
} from '../../../styles/styles'
import SortColumn from '../../../Componentes/SortColumn'
import { React } from 'react'
import { JourneySearchBar } from './JourneySearchBar'

export default class ListarJornada extends ListarPagina {
  async deleteRecord (id) {
    const data = await request({
      method: 'delete',
      endpoint: 'journeys/excluir/' + id
    })
    return data
  }

  async fetchData (page, sort, isDesc, extraParams) {
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

  async reorderData ({ sort, isDesc = false }) {
    await this.fetchAndSetData({ page: 1, sort: sort, isDesc: isDesc })
  }

  async SearchData (nome) {
    const data = await request({
      method: 'get',
      endpoint: 'journeys/listar',
      params:
         {
           nome: nome
         }
    })
    return data
  }

  SearchBarCustom (props) {
    // return <SearchBar
    //   Label="Nome:"
    //   InputPlaceHolder="Insira o nome da Jornada"
    //   filterData={props.filterData}
    //   registerEndpoint="cadastrar/jorney"
    //   />
    return <JourneySearchBar
      filterData={props.filterData}
      />
  }

  PageHeaderCustom () {
    return <PageHeaderCustomComponent
      Title="Jornadas"
      href="/cadastrar/jornadas/inserir"
      />
  }

  TableHeaderCustom (props) {
    return <TableRow {...props}>
         <TextHeaderCell scope="col">
               <SortColumn
                  label="Nome"
                  attribute="jny_name"
                  sortCallback={props.sortCallback}
                  receiver={props.subscribe}
                  wipeAll={props.wipeAll}/>
         </TextHeaderCell>
         <TextHeaderCell scope="col">
                <SortColumn
                  label="Empresa"
                  attribute="cpn_name"
                  sortCallback={props.sortCallback}
                  receiver={props.subscribe}
                  wipeAll={props.wipeAll}/></TextHeaderCell>
         <ActionHeaderCell scope="col">Ações</ActionHeaderCell>
      </TableRow>
  }

  createRecord (jornada) {
    return <TableRow key={jornada.jny_cod}>
         <TextCell data-title="Nome">{jornada.jny_name}</TextCell>
         <TextCell data-title="Empresa" className="text">{jornada.company.cpn_name}</TextCell>
         <ActionCell data-title="Ações">
               <Button variant="warning" href={`/editar-jornada/${jornada.jny_cod}/alterar`}>Editar</Button>
               <Button variant="dark" onClick={this.openModal}>Excluir</Button>
         </ActionCell>
         <ExclusionModal
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            pageIdentifier="a jornada" // Talvez isso possa ser generalizado para o contexto da página
            deletionCallback={this.deleteRecord}
            identifierCode={jornada.jny_cod}
            updateListing={this.updateListing.bind(this)}
            showAlert={this.showAlert.bind(this)} />
      </TableRow>
  }
};
