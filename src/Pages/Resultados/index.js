import moment from 'moment';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { CustomMenu } from "../../Componentes/CustomMenu/index";
import { MyResponsiveBar } from '../../Componentes/Graph';
import { request } from '../../Services/api';
import { CustomMenuCol } from '../../styles/CommonStyles';
import ResultadoSearchBar from './ResultadoSearchBar';

export function Resultados() {
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
      })
      console.log(data.data)
      if (data.meta.status === 100) {
         setGraph(data.data['taxaDeSucesso'])
      }
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
               <Col style={{ height: 400 }}>
                  <MyResponsiveBar data={graph} />
               </Col>
            </Col>
         </Col>
      </>
   )
}