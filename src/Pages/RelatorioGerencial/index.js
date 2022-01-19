import moment from 'moment';
import { useEffect, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { CustomMenu } from "../../Componentes/CustomMenu/index";
import { MyResponsiveBar } from '../../Componentes/Graph';
import { request } from '../../Services/api';
import {
   CustomMenuCol,
   MainTable,
   ReportTableData,
   TableHeader,
   TableRow,
   TextCell,
   TextHeaderCell,
   Title,
} from '../../styles/CommonStyles';
import ResultadoSearchBar from './ResultadoSearchBar';
import { ButtonRow } from "../../Componentes/ButtonRow";

export function RelatorioGerencial() {
   const [headerData, setHeaderData] = useState([])
   const [bodyData, setBodyData] = useState([])
   const [initialDate, setInitialDate] = useState(new Date(moment().startOf('month').subtract(2, 'month').calendar()));
   const [finalDate, setFinalDate] = useState(new Date);
   const [graph, setGraph] = useState([])

   async function fetchData() {
      await request({
         method: 'get',
         endpoint: 'demands/list-graphic',
         params: {
            dataInicial: moment(initialDate).format('yyyy-MM-DD'),
            dataFinal: moment(finalDate).format('yyyy-MM-DD'),
         }
      }).then((data) => {
         if (data.meta.status === 100) {
            setGraph(data.data['taxaDeSucesso'])
         }
         // transformando os dados em um array para utilização na tabela
         const populateData = []
         Object.keys(data.data).map((response) => {
            populateData.push([response, data.data[response]])
         })
         if (populateData[0][1].length > 0) {
            const populateHeader = []
            const header = []
            header.push(populateData[0])
            populateHeader.push("")
            // preenchendo um array com as datas para serem exibidas na tabela
            header[0][1].map(result => populateHeader.push(result['mes']))
            setHeaderData(populateHeader)
            const populateBody = []
            populateData.map((response) => {
               //a taxa de sucesso é a única que tem o objeto de valor com o nome diferente, por isso o IF
               if (response[0] === "taxaDeSucesso") {
                  if (response[1].length > 1) {
                     const arrayItems = ['TAXA DE SUCESSO']
                     response[1].map((value) => arrayItems.push(value['porcentagem']))
                     return populateBody.push(arrayItems)
                  }
                  return populateBody.push(['TAXA DE SUCESSO', response[1][0]['porcentagem']])
               }
               // estrutura criada para agrupar os valores retornados do back em um unico array por indice
               const arrayItems = [response[0].toUpperCase()]
               if (arrayItems[0] === "USUARIOPREVENDA") {
                  arrayItems.shift()
                  arrayItems.push('USUÁRIO (PRÉ-VENDA)')
               }
               if (response[1].length > 1) {
                  response[1].map((value) => arrayItems.push(value['quantidade']))
                  return populateBody.push(arrayItems)
               }
               if (response[0].toUpperCase() === "USUARIOPREVENDA") {
                  return response[1].map((value) => populateBody.push(['USUÁRIO (PRÉ-VENDA)', value['quantidade']]))
               }
               return response[1].map((value) => populateBody.push([response[0].toUpperCase(), value['quantidade']]))
            })
            setBodyData(populateBody)
         } else {
            setBodyData(null);
         }
      })
   }
   function changeDate(date, id) {
      if (id === "initialDate") {
         setInitialDate(date)
      } else {
         setFinalDate(date)
      }
   }

   function handleSubmit(event) {
      event.preventDefault()
      fetchData()
   }

   useEffect(() => {
      fetchData()
   }, [])

   return (
      <>
         <Helmet title="Relatório Gerencial" />
         <CustomMenuCol lg={2}><CustomMenu /></CustomMenuCol>
         <Col style={{ paddingBottom: 30 }}>
            <Col md={{ offset: 2, span: 10 }}>
               <ButtonRow
                  cancelButton={<Button variant="light" href="/demandas"><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
                  titlePage={<Title>Relatório Gerencial</Title>}
               />
               <ResultadoSearchBar
                  onChange={changeDate}
                  initialDate={initialDate}
                  finalDate={finalDate}
                  handleSubmit={handleSubmit}
               />
               {bodyData !== null ?
                  <>
                     <MainTable className="table-borderless">
                        <TableHeader>
                           <TableRow>
                              {headerData?.map((column) => {
                                 return (
                                    <TextHeaderCell scope="col" key={column}>
                                       {column}
                                    </TextHeaderCell>
                                 )
                              })}
                           </TableRow>
                        </TableHeader>
                        <ReportTableData>
                           {bodyData?.map((data) => {
                              return (
                                 <TableRow>{data.map((result, index) => {
                                    return <TextCell data-title={headerData[index]} Elipse>{result}</TextCell>
                                 })}
                                 </TableRow>
                              )
                           })}
                        </ReportTableData>
                     </MainTable>
                     <Col style={{ height: 400, background: "#fff" }}>
                        <MyResponsiveBar data={graph} />
                     </Col>
                  </>
                  :
                  <Col style={{
                     background: "rgba(0,0,0,0.2)",
                     padding: "15px",
                     borderRadius: 2,
                  }}>
                     <h1>Nenhum registro encontrado</h1>
                  </Col>
               }
            </Col>
         </Col>
      </>
   )
}