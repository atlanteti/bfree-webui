import React from 'react'
import { Button, Pagination } from 'react-bootstrap'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import { ActionCell, MainTable, PaginationHeader, PaginationRow } from '../../styles/CommonStyles'

export default function CustomPagination(props) {
   return <MainTable style={{ marginTop: 0 }} className="table-borderless">
      <PaginationRow>
         <PaginationHeader>{props.page.totalRecords} itens</PaginationHeader>
         <PaginationHeader align="right">Página {props.page.current} de {props.page.total}</PaginationHeader>
         <ActionCell style={{ backgroundColor: "white" }}>
            <Button variant="transparent"
               disabled={props.page.current === 1}
               onClick={(e) => {
                  props.fetchAndSetData({ page: props.page.current - 1 })
               }}>
               <IoChevronBackOutline />
            </Button>
            <Button variant="transparent"
               disabled={props.page.current === props.page.total}
               onClick={(e) => {
                  props.fetchAndSetData({ page: props.page.current + 1 })
               }}>
               <IoChevronForwardOutline />
            </Button>
         </ActionCell>
      </PaginationRow>
   </MainTable>
}
