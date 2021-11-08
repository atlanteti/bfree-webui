import { Button, Modal } from 'react-bootstrap'
// import SearchBar from '../../../Componentes/SearchBar'
import { request } from '../../../Services/api'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   TableRow, TextCell, TextHeaderCell
} from '../../../styles/CommonStyles'
import SortColumn from '../../../Componentes/SortColumn'
import React from 'react'
import { DemandSearchBar } from './DemandSearchBar'
import Restricted from '../../../Context/AccessPermission'
import { ReactComponent as EditIcon } from '../../../Assets/Icons/icon_editar.svg'
import { ReactComponent as DeleteIcon } from '../../../Assets/Icons/icon_delete.svg'
import { MdUndo } from 'react-icons/md'
import IconOverlayMessage from '../../../Componentes/IconOverlayMessage'
import ExclusionModal from '../../../Componentes/ExclusionModal'

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
         exportData={props.exportData}
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
   async undoStatusChange() {
      const data = await request({
         method: 'put',
         endpoint: `demands/reverter-status/${this.state.deletionId}`,
         params: {
            dateLastUpdate: this.state.modalIdentifier
         }
      })
      this.fetchAndSetData({ page: this.state.page })
      this.showAlert(data.meta)
      return data
   }
   createExclusionModal() {
      return <>
         <ExclusionModal
            reversion={this.state.reversion}
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            pageIdentifier={this.state.modalIdentifier} // Talvez isso possa ser generalizado para o contexto da página
            deletionCallback={this.state.reversion ? this.undoStatusChange.bind(this) : this.deleteRecord}
            identifierCode={this.state.deletionId}
            updateListing={this.updateListing.bind(this)}
            showAlert={this.showAlert.bind(this)} />
      </>
   }
   createRecord(demanda) {
      return <TableRow key={demanda.dem_cod}>
         <TextCell data-title="Título" className="text">{demanda.dem_title}</TextCell>
         <TextCell data-title="E-mail de Contato" classname="text">{demanda.dem_contact_email}</TextCell>
         <TextCell data-title="Usuário" className="text">{demanda.user.usr_name}</TextCell>
         <TextCell data-title="Status" className="text">{demanda.statusDemand.sdm_name}</TextCell>
         <TextCell data-title="Tipo da Demanda" className="text">{demanda.typeDemand.tdm_name}</TextCell>
         <ActionCell data-title="Ações">
            <Button variant="transparent" href={`/editar/demandas/${demanda.dem_cod}/alterar`}><EditIcon /></Button>
            <Restricted>
               {demanda.statusDemand.sdm_cod == 1 ?
                  <IconOverlayMessage
                     message={
                        "Status em Aberto não pode ser revertido"}>
                     <Button
                        variant="transparent"><MdUndo /></Button>
                  </IconOverlayMessage> :
                  (<IconOverlayMessage
                     message={
                        "Desfazer mudança de Status"}>
                     <Button
                        variant="transparent" onClick={
                           () => {
                              this.setState({
                                 reversion: true,
                                 deletionId: demanda.dem_cod,
                                 modalIdentifier: demanda.dem_dtupdate
                              })
                              this.openModal()
                           }
                        }><MdUndo /></Button>
                  </IconOverlayMessage>)
               }
            </Restricted>
            <Restricted>
               <Button variant="transparent" onClick={() => {
                  this.setState({
                     reversion: false,
                     deletionId: demanda.dem_cod,
                     modalIdentifier: "a demanda"
                  })
                  this.openModal()
               }}><DeleteIcon /></Button>
            </Restricted>
         </ActionCell>
      </TableRow>
   }
};