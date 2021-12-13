import moment from 'moment';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
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
   TextHeaderCell
} from '../../styles/CommonStyles';
import ResultadoSearchBar from './ResultadoSearchBar';

export function Resultados() {
   const [headerData, setHeaderData] = useState([])
   const [dat, setData] = useState([])
   const [bodyData, setBodyData] = useState([])
   const [initialDate, setInitialDate] = useState(new Date(moment().subtract(3, 'month').calendar()));
   const [finalDate, setFinalDate] = useState(new Date);
   const [graph, setGraph] = useState([])

   async function fetchData() {
      let data = await request({
         method: 'get',
         endpoint: 'demands/list-graphic',
         params: {
            dataInicial: "2021-11-01",
            dataFinal: "2021-12-30"
            // dataInicial: moment(initialDate).format('yyyy-MM-DD'),
            // dataFinal: moment(finalDate).format('yyyy-MM-DD'),
         }
      }).then((data) => {
         if (data.meta.status === 100) {
            setGraph(data.data['taxaDeSucesso'])
         }
         // estrutura de codigo criada para preencher a tabela de indicadores de performance
         let init = moment(initialDate).format('MM');
         const final = moment(finalDate).format('MM');
         const populateHeader = []
         populateHeader.push("")
         for (init; init < final; init++) {
            populateHeader.push(Number(init).toString() + "/" + moment().format('YY'))
         }
         setHeaderData(populateHeader)
         // transformando os dados em um array para utilização na tabela
         const populateData = []
         const populate = Object.keys(data.data).map((response) => {
            populateData.push([response, data.data[response]])
         })
         setData(populateData)
         const populateBody = []
         populateData.map((response) => {
            if (response[1].length === 0) {
               return populateBody.push([response[0], null])
            } else {
               //percorre um array caso tenha mais de uma unidade, para nao ser repetido o nome do item na tabela de exibição
               if (response[1].length > 1) {
                  const arrayItems = [response[0]]
                  response[1].map((value) => arrayItems.push(value['quantidade']))
                  return populateBody.push(arrayItems)
               }
               return response[1].map((a) => populateBody.push([response[0], a['quantidade']]))
            }
         })
         setBodyData(populateBody)
      })
   }
   bodyData.map(item => console.log(item))
   // quando voltar segunda, tentar fazer funcionar a tabela
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
         <CustomMenuCol lg={2}><CustomMenu /></CustomMenuCol>
         <Col>
            <Col md={{ offset: 2, span: 10 }}>
               <ResultadoSearchBar
                  onChange={changeDate}
                  initialDate={initialDate}
                  finalDate={finalDate}
                  handleSubmit={handleSubmit}
               />
               <MainTable>
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
                           <TableRow>{data.map(result => {
                              return <TextCell Elipse>{result}</TextCell>
                           })}
                           </TableRow>
                        )
                     })}
                  </ReportTableData>
               </MainTable>
               <Col style={{ height: 400 }}>
                  <MyResponsiveBar data={graph} />
               </Col>
            </Col>
         </Col>
      </>
   )
}