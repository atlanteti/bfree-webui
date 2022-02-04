import { Button, Col } from 'react-bootstrap'
import { request } from '../../../../Services/api'
import ListarPagina, { PageHeaderCustomComponent } from '../../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   HeaderContainer,
   RowTopMargin,
   SubTitle,
   TableRow, TextCell, TextHeaderCell, Title
} from '../../../../styles/CommonStyles'
import SortColumn from '../../../../Componentes/SortColumn'
import React from 'react'
import { ReuniaoSearchBar } from './ReuniaoSearchBar'
import Restricted from '../../../../Context/AccessPermission'
import { ReactComponent as EditIcon } from '../../../../Assets/Icons/icon_editar.svg'
import { ReactComponent as DeleteIcon } from '../../../../Assets/Icons/icon_delete.svg'
import { ReactComponent as GreenCheck } from "../../../../Assets/Icons/icon_check.svg"
import ExclusionModal from '../../../../Componentes/ExclusionModal'
import { Link } from 'react-router-dom'
import moment from 'moment'
import NoDataComp from '../../../../Componentes/NoDataComp'
import ContextLogin from '../../../../Context/ContextLogin'
import { Helmet } from 'react-helmet'

export default class ListarReunioes extends ListarPagina {
   async fetchData(page, sort, isDesc, extraParams) {
      const data = await request({
         method: 'get',
         endpoint: 'demands/listar',
         params: {
            page: Number(page),
            sort: sort,
            dem_con_cod: this.context.user,
            isDesc: isDesc,
            ...extraParams
         }
      })
      return data
   }

   SearchBarCustom(props) {
      return <ReuniaoSearchBar />
   }

   PageHeaderCustom() {
      return <HeaderContainer fluid>
         <RowTopMargin >
            <Col>
               <Helmet title={"Minhas Reuniões"} />
               <SubTitle>Demandas/<strong>Consultor</strong></SubTitle>
               <Title>Minhas Reuniões</Title>
            </Col>
         </RowTopMargin>
      </HeaderContainer>
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>

         <TextHeaderCell scope="col">
            <SortColumn
               label="Assunto"
               attribute="dem_title"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </TextHeaderCell>
         <TextHeaderCell>
            <SortColumn
               label="Reunião"
               attribute="dem_dtmeeting"
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
         {demanda.meeting !== null ?
            <TextCell data-title="Reunião">{moment(demanda.meeting.mee_start).format("DD/MM - HH:mm")}</TextCell>
            : <TextCell data-title="Reunião">-</TextCell>
         }
         <TextCell data-title="Usuário">{demanda.user.usr_name}</TextCell>
         <TextCell data-title="Status">{demanda.statusDemand.sdm_name}</TextCell>
         <TextCell data-title="Avaliada">{demanda.dem_meeting_has_been_confirmed ? <GreenCheck /> : <NoDataComp />}</TextCell>
         <TextCell data-title="Tipo da Demanda">{demanda.typeDemand.tdm_name}</TextCell>
         <ActionCell data-title="Ações">
            <Link to={`/editar/demandas/${demanda.dem_cod}/alterar`}>
               <Button variant="transparent"><EditIcon />
               </Button>
            </Link>
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