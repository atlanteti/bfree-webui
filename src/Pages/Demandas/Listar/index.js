import { Button, Row } from 'react-bootstrap'
// import SearchBar from '../../../Componentes/SearchBar'
import { request } from '../../../Services/api'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   TableRow, TextCell, TextHeaderCell
} from '../../../styles/CommonStyles'
import SortColumn from '../../../Componentes/SortColumn'
import { React, useContext } from 'react'
import { DemandSearchBar } from './DemandSearchBar'
import Restricted from '../../../Context/AccessPermission'
import ContextLogin from '../../../Context/ContextLogin'

export default class ListarDemandas extends ListarPagina {
   async deleteRecord(id) {
      const data = await request({
         method: 'delete',
         endpoint: 'demands/excluir/' + id
      })
      return data
   }

   async fetchData(page, sort, isDesc, extraParams) {

      const data = await request({
         method: 'get',
         endpoint: 'demands/listar',
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
      return <DemandSearchBar
         filterData={props.filterData}
      />
   }

   PageHeaderCustom() {
      return <PageHeaderCustomComponent
         Title="Demandas"
         href="/cadastrar/demandas/inserir"
      />
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>

         <TextHeaderCell scope="col">
            <SortColumn
               label="Titulo"
               attribute="dem_title"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <TextHeaderCell>
            <SortColumn
               label="E-mail de Contato"
               attribute="dem_contact_email"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Usuário"
               attribute="dem_usr_name"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Status"
               attribute="dem_sdm_name"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>

         <TextHeaderCell scope="col">
            <SortColumn
               label="Tipo da Demanda"
               attribute="dem_tdm_name"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <ActionHeaderCell scope="col">Ações</ActionHeaderCell>
      </TableRow>
   }

   createRecord(demanda) {
      return <TableRow key={demanda.dem_cod}>
         <TextCell data-title="Título" className="text">{demanda.dem_title}</TextCell>
         <TextCell data-title="E-mail de Contato" classname="text">{demanda.dem_contact_email}</TextCell>
         <TextCell data-title="Usuário" className="text">{demanda.user.usr_name}</TextCell>
         <TextCell data-title="Status" className="text">{demanda.statusDemand.sdm_name}</TextCell>
         <TextCell data-title="Tipo da Demanda" className="text">{demanda.typeDemand.tdm_name}</TextCell>
         <ActionCell data-title="Ações">
            <Row noGutters className="positionButtonsFixed">
               <Button variant="warning" href={`/editar-demanda/${demanda.dem_cod}/alterar`}>Editar</Button>
               <Restricted>
                  <Button variant="dark"
                     onClick={() => {
                        this.setState({
                           deletionId: demanda.dem_cod,
                           modalIdentifier: "a demanda"
                        })
                        this.openModal()
                     }}>Excluir</Button>
               </Restricted>
            </Row>
         </ActionCell>
      </TableRow>
   }
};
