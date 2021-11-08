import {Row, Col} from "react-bootstrap";
import styled from "styled-components";

export const RowTitle = styled(Row)`
   align-items: center;
   margin: 1.5rem 0 2.5rem 0.1rem;
`

export const Title = styled.span`
   color: #0203AD;
   margin-left: 0.5rem;
   font-size: 1.3rem;
`

export const SubTitle = styled.h2`
   color: #0203AD;
   font-weight: 600;
   margin-bottom: 1rem;
`

export const Terms = styled(Col)`
   border: 2px solid #BFCADD;
   border-radius: 8px;
   padding: 2rem;
   overflow-y: scroll;
   max-height: 70vh;
   margin-right: 1rem;

   // estilos aplicado no scroll
   ::-webkit-scrollbar {
      width: 10px;
   }

   ::-webkit-scrollbar-track {
      background: #f1f1f1; 
   }
   
   ::-webkit-scrollbar-thumb {
      background: #888; 
   }

   ::-webkit-scrollbar-thumb:hover {
      background: #555; 
   }
`

export const TermItem = styled.p`
   margin-bottom: 2rem;
   color: #000;
`