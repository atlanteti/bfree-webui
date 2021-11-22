import { Button, Col, Container, Row } from 'react-bootstrap'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { request } from '../../../Services/api'
import ExclusionModal from '../../../Componentes/ExclusionModal'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   Icon,
   TableRow, TextCell, TextHeaderCell
} from '../../../styles/CommonStyles'
import SortColumn from '../../../Componentes/SortColumn'
import { React } from 'react'
import { BadgeSearchBar } from "./BadgeSearchBar"
import { IoCheckboxOutline } from 'react-icons/io5'
import { ReactComponent as EditIcon } from '../../../Assets/Icons/icon_editar.svg'
import { ReactComponent as DeleteIcon } from '../../../Assets/Icons/icon_delete.svg'
import { ReactComponent as GreenCheck } from "../../../Assets/Icons/icon_check.svg"
import NoDataComp from '../../../Componentes/NoDataComp'
export default class ListarBadge extends ListarPagina {
   async deleteRecord(id) {
      const data = await request({
         method: 'delete',
         endpoint: 'badges/excluir/' + id
      })
      return data
   }

   async fetchData(page, sort, isDesc, extraParams) {
      const data = await request({
         method: 'get',
         endpoint: 'badges/listar',
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
      return <BadgeSearchBar
         filterData={props.filterData}
      />
   }

   PageHeaderCustom() {
      return <PageHeaderCustomComponent
         Title="Badges"
         href="cadastrar/badges/inserir" />
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Nome"
               attribute="bdg_name"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll}
            />
         </TextHeaderCell>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Jornada"
               attribute="jny_name"
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
               label="Mentor"
               attribute="bdg_mentor"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll}
            />
         </TextHeaderCell>
         <ActionHeaderCell scope="col">Ações</ActionHeaderCell>
      </TableRow>
   }

   createRecord(badge) {
      return <TableRow key={badge.bdg_cod}>
         <TextCell data-title="Nome">{badge.bdg_name}</TextCell>
         <TextCell data-title="Jornada">{badge.journey.jny_name ? badge.journey.jny_name : <NoDataComp />}</TextCell>{/*Waiting for api fix*/}
         <TextCell data-title="Empresa">{badge.company.cpn_name ? badge.company.cpn_name : <NoDataComp />}</TextCell>
         <TextCell data-title="Mentor">
            <Icon>{badge.bdg_mentor ? <GreenCheck /> : <NoDataComp />}</Icon>
         </TextCell>
         <ActionCell data-title="Ações">
            <Button variant="transparent" href={`/editar/badges/${badge.bdg_cod}/alterar`}><EditIcon /></Button>
            <Button variant="transparent" onClick={() => {
               this.setState({
                  deletionId: badge.bdg_cod,
                  modalIdentifier: "a badge"
               })
               this.openModal()
            }}><DeleteIcon /></Button>
         </ActionCell>
      </TableRow>
   }
};
