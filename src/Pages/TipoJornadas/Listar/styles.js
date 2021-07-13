import styled from "styled-components";

export const Title = styled.h1`
   font-size: 2rem;
   margin-top: 1rem;
`

export const MainContainer = styled.div`
   .container{
      display: flex;
      flex-direction: column;
      align-items: center
   }

   /* os dois proximos estilos são de componentes bootstrap*/
   .page-item.active .page-link {
      color: #000;
      background-color: #ffb509;
      border-color: #ffb509;
   }

   .page-link {
      color: #000;
   }

   @media screen and (min-width: 990px){
      margin: 0 2rem 0 5rem;
   }

   @media screen and (max-width: 989px){
      margin-left: 0rem
   }
`

export const BtnCadastrar = styled.a`
`

export const Input = styled.input`
`

export const LittleBtn = styled.button`
   background: ${props => props.yellowColor ? "#ffc107" : "#fff"};
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
   width: ${props => props.columnWidth ? "120px" : "50px"};

   text-align: left;
   border: 1px solid #dee2e6;
   background: #fff;
`

export const TableData = styled.tbody`
`

export const TableCell = styled.td`
   text-align: right;
   vertical-align: baseline;
   border: 1px solid #dee2e6;

   padding: 0.1rem 0.8rem;
`

export const SortIcon = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`