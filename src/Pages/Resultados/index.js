import moment from 'moment';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { CustomMenu } from "../../Componentes/CustomMenu/index";
import { ValidationTextField } from '../../Componentes/FormFields';
import { MyResponsiveBar } from '../../Componentes/Graph';
import { request } from '../../Services/api';
import DatePicker from "react-datepicker";
import { CustomMenuCol, SearchBarBorder, BtnBlue, DataSearchTitle } from '../../styles/CommonStyles';

export function Resultados() {
   const [headerData, setHeaderData] = useState(null);
   const [populateNumbers, setPopulateNumbers] = useState(null);
   const [initialDate, setInitialDate] = useState(new Date(moment().subtract(4, 'month').calendar()));
   const [finalDate, setFinalDate] = useState(new Date);

   const graph = []
   const populateObject = {}

   async function fetchData() {
      let data = await request({
         method: 'get',
         endpoint: 'demands/report-billing',
      }).then((data) => {
         let bodyData = data.data.splice(1)
         setHeaderData(data.data[0].splice(1))
         const numbers = bodyData.map(line => line.slice(1))
         const numbersTransposed = numbers[0].map((_, colIndex) => numbers.map(row => row[colIndex]))
         const reducedSum = numbersTransposed.map(
            line => line.reduce(
               (partial_sum, accumulator) => Number(partial_sum) + Number(accumulator), 0))
         const lastLine = ["Total"].concat(reducedSum)
         setPopulateNumbers(reducedSum)
         bodyData = bodyData.concat([lastLine])
         data.data = bodyData.map(
            line => line.map(
               (lineData, keyIndex) => { return [data.data[0][keyIndex], lineData] }))
         return data
      })
      return data
   }

   if (populateNumbers?.length) {
      populateObject['month'] = moment(new Date()).format('MM/YY')
      for (let i = 0; i < headerData?.length; i++) {
         populateObject[headerData[i]] = populateNumbers[i]
      }
      graph.push(populateObject)
   }

   useEffect(() => {
      fetchData()
   }, [])

   return (
      <>
         <CustomMenuCol lg={2}><CustomMenu /></CustomMenuCol>
         <Col>
            <Col md={{ offset: 2, span: 10 }}>
               <SearchBarBorder>
                  <Form onSubmit={() => console.log("a")}>
                     <Row>
                        <Col xs={12} md={9} sm={7}>
                           <DataSearchTitle>Pesquisar por período</DataSearchTitle>
                           <Row>
                              <Col className="mt-2">
                                 <DatePicker
                                    placeholderText="dd/mm/aaaa"
                                    dateFormat="dd/MM/yyyy"
                                    selected={initialDate}
                                    onChange={(dateSelect) => this.changeDate(dateSelect, "initialDate")}
                                    customInput={
                                       <ValidationTextField
                                          label="Data Inicial"
                                          type="text"
                                          fullWidth
                                       />
                                    }
                                 />
                              </Col>
                              <Col className="mt-2">
                                 <DatePicker
                                    placeholderText="dd/mm/aaaa"
                                    dateFormat="dd/MM/yyyy"
                                    selected={finalDate}
                                    maxDate={finalDate}
                                    onChange={(dateSelect) => this.changeDate(dateSelect, "finalDate")}
                                    customInput={
                                       <ValidationTextField
                                          label="Data Final"
                                          type="text"
                                          fullWidth
                                       />
                                    }
                                 />
                              </Col>
                           </Row>
                        </Col>
                        <Col className="mt-3" xs={12} md={2} sm={5}>
                           <p style={{ color: 'transparent' }}>.</p>
                           <Row>
                              <Col>
                                 <BtnBlue type="submit" variant="dark">Buscar</BtnBlue>
                              </Col>
                           </Row>
                        </Col>
                     </Row>
                  </Form>
               </SearchBarBorder>
               <Col style={{ height: 400 }}>
                  <MyResponsiveBar data={graph} />
               </Col>
            </Col>
         </Col>
      </>
   )
}