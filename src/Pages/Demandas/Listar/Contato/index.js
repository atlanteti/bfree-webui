import { Button, Col } from 'react-bootstrap'
import { request } from '../../../../Services/api'
import ListarPagina from '../../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   TableRow, TextCell, TextHeaderCell, HeaderContainer, RowTopMargin, SubTitle, Title
} from '../../../../styles/CommonStyles'
import SortColumn from '../../../../Componentes/SortColumn'
import React from 'react'
import { DemandSearchBar } from '../DemandSearchBar'
import Restricted from '../../../../Context/AccessPermission'
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/icon_editar.svg'
import { ReactComponent as DeleteIcon } from '../../../../Assets/Icons/icon_delete.svg'
import { ReactComponent as GreenCheck } from "../../../../Assets/Icons/icon_check.svg"
import { MdUndo } from 'react-icons/md'
import IconOverlayMessage from '../../../../Componentes/IconOverlayMessage'
import ExclusionModal from '../../../../Componentes/ExclusionModal'
import { Link } from 'react-router-dom'
import moment from 'moment'
import NoDataComp from '../../../../Componentes/NoDataComp'
import { Helmet } from 'react-helmet'

export default class ListarContatos extends ListarPagina {
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
            dem_usr_cod: this.state.journeys.length === 2 ? this.state.user : null,
            ...extraParams
         }
      })
      return data
   }

   SearchBarCustom(props) {
      return <DemandSearchBar
         filterData={props.filterData}
         exportData={props.exportData}
         listSchedule={props.listSchedule}
      />
   }

   PageHeaderCustom() {
      return <HeaderContainer fluid>
         <RowTopMargin>
            <Col>
               <Helmet title={"Fazer Contato"} />
               <SubTitle>Demandas/<strong>Pré-Consultor</strong></SubTitle>
               <Title>Fazer Contato</Title>
            </Col>
         </RowTopMargin>
      </HeaderContainer>
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
         <TextHeaderCell scope="col">
            <SortColumn
               label="E-mail"
               attribute="dem_contact_email"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Status da Demanda"
               attribute="dem_sdm_name"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Mensagem"
               attribute="dem_activity"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Prioridade"
               attribute="dem_cancel_reason"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Avaliada"
               attribute="dem_meeting_has_been_confirmed"
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
   createModal() {
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
         <TextCell data-title="Título">{demanda.dem_title}</TextCell>
         <TextCell data-title="E-mail">{demanda.dem_contact_email}</TextCell>
         <TextCell data-title="Status da Demanda">{demanda.statusDemand.sdm_name}</TextCell>
         <TextCell data-title="Mensagem">{demanda.dem_activity}</TextCell>
         <TextCell data-title="Prioridade">{demanda.dem_cancel_reason !== null ? <GreenCheck /> : <NoDataComp />}</TextCell>
         <TextCell data-title="Avaliada">{demanda.dem_meeting_has_been_confirmed ? <GreenCheck /> : <NoDataComp />}</TextCell>
         <TextCell data-title="Tipo da Demanda">{demanda.typeDemand.tdm_name}</TextCell>
         <ActionCell data-title="Ações">
            <Link to={`/editar/demandas/${demanda.dem_cod}/alterar`}>
               <Button variant="transparent"><EditIcon />
               </Button>
            </Link>
         </ActionCell>
      </TableRow>
   }
};