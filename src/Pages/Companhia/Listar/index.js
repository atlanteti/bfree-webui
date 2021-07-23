import { useContext } from "react";
import { Button, Col } from 'react-bootstrap'
import { request } from '../../../Services/api'
import ExclusionModal from '../../../Componentes/ExclusionModal'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell, HeaderContainer, NumberCell, NumberHeaderCell,
   RightAlignText,
   RowTopMargin,
   TableRow, TextCell, TextHeaderCell, Title
} from '../../../styles/styles'
import SortColumn from '../../../Componentes/SortColumn'
import React from 'react'
import { CompanySearchBar } from './CompanySearchBar'

export default class ListarCompanhia extends ListarPagina {
   async deleteRecord(id) {
      const data = await request({
         method: 'delete',
         endpoint: 'companies/excluir/' + id
      })
      return data
   }

   async fetchData(page, sort, isDesc, token, extraParams) {
      const data = await request({
         method: 'get',
         endpoint: 'companies/listar',
         params: {
            page: Number(page),
            sort: sort,
            isDesc: isDesc,
            ...extraParams
         },
         headers: {
            Authorization: 'Bearer ' + token
         }
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
               label="ID Externo"
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
            <Button variant="warning" href={`/editar-companhia/${companhia.cpn_cod}/alterar`}>Editar</Button>
            <Button variant="dark" onClick={() => {
               this.setState({
                  deletionId: companhia.cpn_cod,
                  modalIdentifier: "a empresa"
               })
               this.openModal()
            }}>Excluir</Button>
         </ActionCell>
      </TableRow>
   }
};
