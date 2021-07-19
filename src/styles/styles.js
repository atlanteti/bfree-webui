import styled from 'styled-components'

export const Title = styled.h1`
   font-size: 2rem;
`
export const RightAlignText = styled.div`
   .col{
      text-align: end
   }`
export const SearchBarBorder = styled.div`
      border: 1px solid rgba(0,0,0,0.20);
      padding: 15px;
      border-radius: 5px;
      `
export const MainContainer = styled.div`
   .container{
      display: flex;
      flex-direction: column;
      align-items: center
   }
   
   /* os três proximos estilos são de componentes bootstrap*/
   .row{
      justify-content: center;
      margin-top: 1rem
   }

   .page-item.active .page-link {
      color: #000;
      background-color: #ffb509;
      border-color: #ffb509;
   }

   .page-link {
      color: #000;
   }
`

export const BtnCadastrar = styled.a`
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
      border-color: #d39e00
   }
`

export const Table = styled.table`
   flex: 1;
   width: 100%;
   border: 1px solid #dee2e6;
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

   /* ajuste de responsividade para tablete e telas pequena*/
   @media(min-width: 768px) and (max-width: 800px){ 
      tbody tr td::before {
         content: attr(data-title);
         position: absolute;
         display: block;
      }

      thead {
         display: none;
      }
   }
   /* responsividade da tabela */
   @media all and (max-width: 767px) {
      margin: 0.5rem;
      border: none;

      td {
         padding: 0.5rem
      }

      tbody tr td::before {
         content: attr(data-title);
         position: absolute;
         display: block;
      }

      thead {
         display: none;
      }

      tbody tr td {
         display: block;
         text-align: right !important;
      }

      tbody tr {
         margin-bottom: 10px;
         display: block;
      }
   }
`

export const TableHeader = styled.thead`
`

export const TableRow = styled.tr`
   &:nth-child(even) {background: #FFF}
   &:nth-child(odd) {background: #EEE}

   a {
      margin-right: 0.2rem;
   }
`

export const ColumnTitle = styled.th`
   padding: 0.1rem 0.4rem;
   width: ${props => props.columnWidth ? '100px' : '50px'};
   cursor: ${props => props.sort ? 'pointer' : 'default'};
   text-align: left;
   border: 1px solid #dee2e6;
   background: #fff;
`

export const NumberHeaderCell = styled(ColumnTitle)`
text-align: right;
`

export const TextHeaderCell = styled(ColumnTitle)`
text-align: left;
`

export const ActionHeaderCell = styled(ColumnTitle)`
text-align: center`

export const TableData = styled.tbody``

export const TableCell = styled.td`
   text-align: ${props => props.align};
   vertical-align: baseline;
   border: 1px solid #dee2e6;

   padding: 0.1rem 0.8rem;
`
export const NumberCell = styled(TableCell)`
   text-align: right;
   `

export const TextCell = styled(TableCell)`
   text-align: right;
   `
export const ActionCell = styled(TableCell)`
   text-align: center;
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
