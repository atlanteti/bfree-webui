import { useState, useEffect } from "react"
import { BackGroundForm, BtnBlue, RowTopMargin } from "../../styles/CommonStyles";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { Form, Col, Row, Alert } from "react-bootstrap";
import { HourComponent } from "../../Componentes/HourComponent";
import { request } from "../../Services/api";
import { CircularProgress } from '@mui/material';
import { Helmet } from "react-helmet";
import { TopTitles, UtilsFunctions } from "./utils";
import { CustomAlert } from "../../Componentes/CustomAlert"
export function Horario() {
   const {
      handleChange,
      days,
      setDays,
      addNewRow,
      removeRow,
      renderData,
      loadingData,
      seg, setSeg,
      ter, setTer,
      qua, setQua,
      qui, setQui,
      sex, setSex
   } = UtilsFunctions()
   const [responseAlertShow, setResponseAlertShow] = useState(null)
   const [responseData, setResponseData] = useState({})
   async function handleSubmit(event) {
      event.preventDefault()
      var filteredDays = days.filter(function (value) {
         return value.cal_start !== undefined;
      });
      const data = await request({
         method: "post",
         endpoint: "calendar/save-by-day-of-week",
         data: {
            availableDates: filteredDays
         },
      })
      if (data.meta.status === 100) {
         showAlert(data.meta)
      } else {
         showAlert(data.meta)
      }
   }
   async function getData() {
      await request({
         method: "get",
         endpoint: "calendar/list-by-user-and-week",
      }).then((data) => {
         setDays(data.data)
         renderData(data.data)
      })
   }
   function getAlertCallback(func) {
      setResponseAlertShow(func)
   }
   function showAlert(data) {
      responseAlertShow(data)
   }

   useEffect(() => {
      getData()
   }, [])

   return (
      <CustomMenu>
         <RowTopMargin>
            <Helmet title="Cadastro de Horário" />
         </RowTopMargin>
         {/* <CustomAlert
            data={responseData}
            showAlertCallback={getAlertCallback}
         /> */}
         <TopTitles text="Calendário" route="/horario-calendario" />
         <Form onSubmit={handleSubmit}>
            <BackGroundForm xs={1} className={'mb-2'} noGutters style={{ padding: 16, marginTop: 20 }}>
               {loadingData ?
                  <Row>
                     <Col><CircularProgress /></Col>
                  </Row> :
                  <>
                     <HourComponent
                        dayOfWeek="Segunda"
                        indexWeek={1}
                        data={seg}
                        onChange={handleChange}
                        onDuplicate={() => addNewRow(seg, setSeg)}
                        removeDuplicate={removeRow}
                        changeState={setSeg}
                     />
                     <HourComponent
                        dayOfWeek="Terça"
                        indexWeek={2}
                        data={ter}
                        onChange={handleChange}
                        onDuplicate={() => addNewRow(ter, setTer)}
                        removeDuplicate={removeRow}
                        changeState={setTer}
                        bgColor={"#F8FAFF"}
                     />
                     <HourComponent
                        dayOfWeek="Quarta"
                        data={qua}
                        indexWeek={3}
                        onChange={handleChange}
                        onDuplicate={() => addNewRow(qua, setQua)}
                        removeDuplicate={removeRow}
                        changeState={setQua}
                     />
                     <HourComponent
                        dayOfWeek="Quinta"
                        indexWeek={4}
                        data={qui}
                        onChange={handleChange}
                        onDuplicate={() => addNewRow(qui, setQui)}
                        removeDuplicate={removeRow}
                        changeState={setQui}
                        bgColor={"#F8FAFF"}
                     />
                     <HourComponent
                        dayOfWeek="Sexta"
                        indexWeek={5}
                        data={sex}
                        onChange={handleChange}
                        onDuplicate={() => addNewRow(sex, setSex)}
                        removeDuplicate={removeRow}
                        changeState={setSex}
                     />
                     <Col className="mt-4" md={{ offset: 4 }}>
                        <BtnBlue variant="dark" type="submit" onClick={() => window.scrollTo(0, 0)}>Salvar</BtnBlue>
                     </Col>
                  </>}
            </BackGroundForm>
         </Form>
      </CustomMenu>
   )
}