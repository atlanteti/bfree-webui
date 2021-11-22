import { Button } from 'react-bootstrap'
import { request } from '../../../Services/api'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   TableRow, TextCell, TextHeaderCell
} from '../../../styles/CommonStyles'
import SortColumn from '../../../Componentes/SortColumn'
import { React } from 'react'
import { TDemandSearchBar } from './TDemandSearchBar'
import { ReactComponent as EditIcon } from '../../../Assets/Icons/icon_editar.svg'
import { ReactComponent as DeleteIcon } from '../../../Assets/Icons/icon_delete.svg'
export default class ListarTipoDemanda extends ListarPagina {
   async deleteRecord(id) {
      const data = await request({
         method: 'delete',
         endpoint: 'types-demand/excluir/' + id
      })
      return data
   }

   async fetchData(page, sort, isDesc, extraParams) {
      const data = await request({
         method: 'get',
         endpoint: 'types-demand/listar',
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
      return <TDemandSearchBar
         filterData={props.filterData}
      />
   }

   PageHeaderCustom() {
      return <PageHeaderCustomComponent
         Title="Tipos de Demanda"
         href="/cadastrar/tipodemanda/inserir"
      />
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>
         <TextHeaderCell scope="col">
            <SortColumn
               label="Nome"
               attribute="tdm_name"
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

   createRecord(tDemand) {
      return <TableRow key={tDemand.tdm_cod}>
         <TextCell data-title="Nome" Elipse>{tDemand.tdm_name}</TextCell>
         <TextCell data-title="Empresa" className="text">{tDemand.company.cpn_name}</TextCell>
         <ActionCell data-title="Ações">
            <Button variant="transparent" href={`/editar/tipodemanda/${tDemand.tdm_cod}/alterar`}><EditIcon /></Button>
            <Button variant="transparent" onClick={() => {
               this.setState({
                  deletionId: tDemand.tdm_cod,
                  modalIdentifier: "o Tipo de Demanda"
               })
               this.openModal()
            }}><DeleteIcon /></Button>
         </ActionCell>
      </TableRow>
   }
};
