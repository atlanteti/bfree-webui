import moment from 'moment';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { CustomMenu } from "../../Componentes/CustomMenu/index";
import { MyResponsiveBar } from '../../Componentes/Graph';
import { request } from '../../Services/api';
import {
   CustomMenuCol,
   MainTable,
   TableHeader,
   TableRow,
   TextHeaderCell
} from '../../styles/CommonStyles';
import ResultadoSearchBar from './ResultadoSearchBar';

export function Resultados() {
   const [headerData, setHeaderData] = useState([])
   const [dat, setData] = useState({})
   const [initialDate, setInitialDate] = useState(new Date(moment().subtract(4, 'month').calendar()));
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
            setData(data.data)
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
         const populateData = []
         const bodyData = Object.keys(data.data).map((response) => {
            populateData.push([response, data.data[response]])
         })
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
               </MainTable>
               <Col style={{ height: 400 }}>
                  <MyResponsiveBar data={graph} />
               </Col>
            </Col>
         </Col>
      </>
   )
}