import styled from 'styled-components'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Grid } from '@material-ui/core';

//Estilização especial para o ícone da validação dos seletores
export const SelectValidateStyle = {
   backgroundRepeat: "no-repeat",
   backgroundPosition: "right calc(.875em + .1875rem) center",
   backgroundSize: "calc(.75em + .375rem) calc(.75em + .375rem)"
}//Verificar se SASS pode fazer isso

export const IndexContainer = styled.div`
   background-color: #ECEFF1;
   min-height: 100vh;
`

export const Title = styled.h1`
   text-align: left;
   font-size: 2rem;
`

export const TitleRegister = styled.h1`
   font-size: 2rem;
   color: #3E516E;
   font-weight: 700 !important;
`

export const RequiredField = styled.text`
   color: rgba(0,0,0,0.6);
   margin-left: 0.5rem;
`

export const RightAlignText = styled.div`
   .col{
      text-align: end
   }`

export const SearchBarBorder = styled.div`
      border: 1px solid rgba(0,0,0,0.20);
      padding: 25px;
      border-radius: 5px;
      background: #fff;
      `

export const CustomMenuCol = styled(Col)`
   padding: 0;
   margin-right: 12px; //Devido à construção do menu lateral, referências relativas ao alinhamento do grid 
                       //Do bootstrap precisam ser consertados na mão.
`
export const HeaderContainer = styled(Container)`
      margin-bottom: 1.5rem;
`
export const RowTopMargin = styled(Row)`
   margin-top: 1rem;
`

export const MainRow = styled(Row)`
   margin-right: 0px;
`


export const MainContainer = styled.div`
   .container{
      display: flex;
      flex-direction: column;
      align-items: center
   }

   .page-item.active .page-link {
      color: #000;
      background-color: #ffb509;
      border-color: #ffb509;
   }

   .page-link {
      color: #000;
   }

   @media (min-width: 767px){
      .positionButtonsFixed {
         margin-top: 8px;
         justify-content: center;
         min-width: max-content;
      }
   }

   @media (max-width: 766px){
      .positionButtonsFixed{
         margin-top: 8px;
         justify-content: flex-end;
      }  
   }
`

export const BtnBlue = styled(Button)`
   width: 120px !important;
`

export const Input = styled.input`
`

export const LittleBtn = styled.button`
   background: ${props => props.yellowColor ? '#ffc107' : '#fff'};
   padding: 0.45rem 0.6rem;
   border-end-end-radius: 3px !important;
   border-start-end-radius: 3px !important;

   &:hover{
      color: #212529;
      background-color: #e0a800;
      border-color: #d39e00;
   }
`
export const BottomMargin = styled.div`
   margin-bottom: 2rem;
`

export const Table = styled.table`
   flex: 1;
   width: 100%;
   border-radius: 5px;
   margin: 2rem 0;
   
   /* colunas na tabela que sempre irão ficar nessa posição*/
   .acoes {
      text-align: center;

      @media all and (min-width: 767px) {
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }
   .text{
      text-align: left;
   }
   .icon {
       vertical-align: inherit;
    }

   /* responsividade da tabela */
   @media all and (max-width: 767px) {
      border: none;

      td {
         padding: 0.5rem
      }

      tbody tr td::before {
         content: attr(data-title);
         font-weight: bold;
         display: block;
      }

      thead {
         display: none;
      }

      tbody tr td {
         display: block;
         text-align: left !important;
      }

      tbody tr {
         margin-bottom: 10px;
         display: block;
      }
   }
`
export const MainTable = styled(Table)`
   ${(props) => props.noData && `
      margin-bottom: 0`}
`
export const TableHeader = styled.thead`
`
export const PaginationRow = styled.tr`
   td:last-child {
      width: 1%;
      white-space: nowrap;
   }
   td:first-child {
      width: 20%;
      white-space: nowrap;
   }
`
export const TableRow = styled.tr`
   &:nth-child(even) {background: #FFF}
   &:nth-child(odd) {background: #F8FAFF}
   td:last-child {
      width: 1%;
      white-space: nowrap;
   }
   td:first-child {
      color: #000;
      width: 20%;
   }
   td {
      color: #546E7A
   }
   a {
      margin-right: 0.2rem;
   }
`

export const PaginationHeader = styled.th`
   padding: 22px 0px 22px 12px;
   background: #fff;
   font-weight:normal;
   text-align: ${props => props.align};`

export const ColumnTitle = styled.th`
   padding: 22px 0px 22px 12px;
   width: ${props => props.columnWidth ? '100px' : '50px'};
   cursor: ${props => props.sort ? 'pointer' : 'default'};
   text-align: left;
   border: 1px solid #dee2e6;
   background: #fff;
   color: #546E7A;
`

export const NumberHeaderCell = styled(ColumnTitle)`
text-align: right;
`

export const TextHeaderCell = styled(ColumnTitle)`
text-align: left;
`

export const ActionHeaderCell = styled(ColumnTitle)`
text-align: center;`

export const TableData = styled.tbody``

export const ReportTableData = styled(TableData)`
   &:last-child{font-weight: bold !important;  }
`
export const TableCell = styled.td`
   text-align: ${props => props.align};
   vertical-align: baseline;
   border: 1px solid #dee2e6;

   padding: 1.1rem 0.8rem;
`
export const NumberCell = styled(TableCell)`
   text-align: left;
   font-weight: ${props => props.fontTotal ? 'bold' : '400'};
   `

export const TextCell = styled(TableCell)`
   text-align: left;
   font-weight: ${props => props.fontTotal ? 'bold' : '400'};
   `
export const ActionCell = styled(TableCell)`
   text-align: center;
   vertical-align: middle;
   `

export const SortIcon = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`

export const Icon = styled.div`
    @media (min-width: 766px) {
        display: flex;
        place-content: baseline center;
        justify-content: center;
    }

    @media (max-width: 767px) {
        display: flex;
        place-content: flex-end;
    }
`

export const BtnMenu = styled.button`
   margin-left: 0.5rem;
`
export const BackGroundForm = styled(Row)`
   background-color: #ffff;
   padding: 2rem;
   border-radius: 8px;
   box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
`

export const BtnContainer = styled.div`
   display: flex;
   justify-content: space-between;
`

export const TopBarContainer = styled(Col)`
   background: #fff;
   min-height: 6.5vh;
   box-shadow: rgba(33, 35, 38, 0.2) 0px 10px 10px -10px;
   color: #0509EE;
   display: flex;
   font-size: 1.3rem;
   align-items: center;
   
   span{
      margin-right: 2rem;
   }
   `
export const TopBarContainerMenu = styled(TopBarContainer)`
   margin-bottom: 3rem;
   `
