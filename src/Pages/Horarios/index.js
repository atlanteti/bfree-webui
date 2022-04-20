import { useState, useEffect } from "react"
import { BackGroundForm, BtnBlue, RowTopMargin } from "../../styles/CommonStyles";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { Form, Col, Row, Alert } from "react-bootstrap";
import { HourComponent } from "../../Componentes/HourComponent";
import { request } from "../../Services/api";
import { CircularProgress } from '@mui/material';
import { Helmet } from "react-helmet";
import { TopTitles, UtilsFunctions } from "./utils";
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
   const [showAlert, setShowAlert] = useState(false)
   const [message, setMessage] = useState(null)
   const [status, setStatus] = useState("warning")

   async function handleSubmit(event) {
      event.preventDefault()
      var filteredDays = days.filter(function (value) {
         return value.cal_start !== undefined;
      });
      const data = await request({
         method: "post",
         endpoint: "calendar-for-month/save",
         data: {
            availableDates: filteredDays
         },
      })
      if (data.meta.status === 100) {
         setMessage(data.meta.message)
         setStatus('success')
      } else {
         setMessage(data.meta.message)
      }
      setShowAlert(true)
   }
   async function getData() {
      await request({
         method: "get",
         endpoint: "calendar-for-month/list-by-user",
      }).then((data) => {
         setDays(data.data)
         renderData(data.data)
      })
   }

   useEffect(() => {
      getData()
   }, [])

   return (
      <CustomMenu>
         <RowTopMargin>
            <Helmet title="Cadastro de Horário" />
         </RowTopMargin>
         {showAlert &&
            <Alert variant={status} onClose={() => setShowAlert(false)} dismissible>
               {message}
            </Alert>
         }
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