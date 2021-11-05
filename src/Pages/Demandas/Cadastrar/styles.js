import styled from 'styled-components'
import { TableRow, ColumnTitle } from '../../../styles/CommonStyles'
export const TableRowStatus = styled(TableRow)`
td:last-child {
      width: auto;
      white-space: nowrap;
   }
   td:first-child {
      color: #000;
      width: auto;
   }
`
export const StatusAccordionHeader = styled.b`
   color: #546E7A
`
export const TextHeaderStatus = styled(ColumnTitle)`
   width: auto;
   padding-bottom: 12px;
   padding-top: 0px
`