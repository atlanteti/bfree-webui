import { Button } from 'react-bootstrap'
import { request } from '../../../Services/api'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell, NumberCell, NumberHeaderCell,
   TableRow, TextCell, TextHeaderCell
} from '../../../styles/CommonStyles'
import SortColumn from '../../../Componentes/SortColumn'
import React from 'react'
import { CompanySearchBar } from './CompanySearchBar'
import { ReactComponent as EditIcon } from '../../../Assets/Icons/icon_editar.svg'
import { ReactComponent as DeleteIcon } from '../../../Assets/Icons/icon_delete.svg'
import { Link } from 'react-router-dom'
export default class ListarCompanhia extends ListarPagina {
   async deleteRecord(id) {
      const data = await request({
         method: 'delete',
         endpoint: 'companies/excluir/' + id
      })
      return data
   }

   async fetchData(page, sort, isDesc, extraParams) {
      const data = await request({
         method: 'get',
         endpoint: 'companies/listar',
         params: {
            page: Number(page),
            sort: sort,
            isDesc: isDesc,
            ...extraParams
         },
      })
      return data
   }

   SearchBarCustom(props) {
      return <CompanySearchBar
         InputPlaceholder="Insira o nome da empresa"
         ButtonLabel="Cadastrar"
         filterData={props.filterData} />
   }

   PageHeaderCustom() {
      return <PageHeaderCustomComponent
         Title="Empresas"
         href="/cadastrar/companhia/inserir" />
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>
         <NumberHeaderCell scope="col">
            <SortColumn
               label="ID Eduzz"
               attribute="cpn_cli_cod"
               sortCallback={props.sortCallback}
               receiver={props.subscribe}
               wipeAll={props.wipeAll} />
         </NumberHeaderCell>
         <TextHeaderCell scope="col"><SortColumn
            label="Nome"
            attribute="cpn_name"
            sortCallback={props.sortCallback}
            receiver={props.subscribe}
            wipeAll={props.wipeAll} /></TextHeaderCell>
         <ActionHeaderCell scope="col">Ações</ActionHeaderCell>
      </TableRow>
   }

   createRecord(companhia) {
      return <TableRow key={companhia.usr_cod}>
         <NumberCell data-title="ID Eduzz">{companhia.cpn_cli_cod}</NumberCell>
         <TextCell data-title="Nome">{companhia.cpn_name}</TextCell>
         <ActionCell data-title="Ações">
            <Link to={`/editar/companhia/${companhia.cpn_cod}/alterar`}>
               <Button variant="transparent"><EditIcon />
               </Button>
            </Link>
            <Button variant="transparent" onClick={() => {
               this.setState({
                  deletionId: companhia.cpn_cod,
                  modalIdentifier: "a empresa"
               })
               this.openModal()
            }}><DeleteIcon /></Button>
         </ActionCell>
      </TableRow>
   }
};