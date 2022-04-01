import { useState, useEffect } from "react"
import { BackGroundForm, BtnBlue, Title, SubTitle, RowTopMargin, DivSpaceBtween } from "../../styles/CommonStyles";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { Form, Col, Row, Alert, Button } from "react-bootstrap";
import { HourComponent } from "../../Componentes/HourComponent";
import { request } from "../../Services/api";
import { CircularProgress } from '@mui/material';
import { Helmet } from "react-helmet";
import { UtilsFunctions } from "./utils";

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
   const [message, setMessage] = useState(null)
   const [status, setStatus] = useState("warning")
   const [showAlert, setShowAlert] = useState(false)

   async function handleSubmit(event) {
      event.preventDefault()
      var filteredDays = days.filter(function (value) {
         return value.cal_start !== undefined;
      });
      const data = await request({
         method: "post",
         endpoint: "calendar/save",
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
         endpoint: "calendar/list-by-user",
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
         <SubTitle style={{ paddingBottom: 10 }}>Demandas/<strong>Consultor</strong></SubTitle>
         <Title style={{ paddingBottom: 10 }}>Agenda</Title>
         <SubTitle>Defina os dias da semana e horários que você pode atender.</SubTitle>
         <DivSpaceBtween display justifyContent>
            <SubTitle style={{ maxWidth: "70%" }}>
               Não adicione intervalos que entrem em conflito, ex: 10:00 -- 12:00 E 09:00 -- 11:00 do mesmo dia
            </SubTitle>
            <Button href="horario-calendario" variant="dark">Ver Calendário</Button>
         </DivSpaceBtween>
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