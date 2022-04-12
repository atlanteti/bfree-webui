import { useState, useEffect } from "react"
import { BackGroundForm, BtnBlue, Title, SubTitle, RowTopMargin, DivSpaceBtween } from "../../../styles/CommonStyles";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { Form, Col, Row, Alert, Button } from "react-bootstrap";
import { HourCalendarComponent } from "../../../Componentes/HourComponent";
import { request } from "../../../Services/api";
import { CircularProgress } from '@mui/material';
import { Helmet } from "react-helmet";
import { UtilsFunctions } from "../utils";
import { UtilsHourCalendar } from "./utils"
import CalendarPicker from '@mui/lab/CalendarPicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from "moment"
export function HorarioCalendario() {
   const {
      renderData,
      loadingData,
      returnDay,
   } = UtilsFunctions()
   const { addNewRowCalendar, removeRowCalendar, handleChange, days, setDays, refresh } = UtilsHourCalendar()
   const [message, setMessage] = useState(null)
   const [status, setStatus] = useState("warning")
   const [changeDataDay, setChangeDataDay] = useState({})
   const [showAlert, setShowAlert] = useState(false)
   const [date, setDate] = useState(new Date())
   const formatDate = moment(date).format('yyyy-MM-DD')

   function renderDataComponent(date) {
      let getData = returnDay(date)
      setChangeDataDay(getData)
   }
   async function handleSubmit(event) {
      event.preventDefault()
      var filteredDays = days.filter(function (value) {
         return moment(value.cal_date).format('yyyy-MM-DD') === formatDate;
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
      renderDataComponent(date)
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
            <Button href="horario" variant="dark">Ver por dia</Button>
         </DivSpaceBtween>
         <Form onSubmit={handleSubmit}>
            <BackGroundForm xs={1} className={'mb-2'} noGutters style={{ padding: 16, marginTop: 20 }}>
               {loadingData || refresh ?
                  <Row>
                     <Col><CircularProgress /></Col>
                  </Row> :
                  <>
                     <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Row>
                           <Col xs={12} sm={4} md={5}>
                              <CalendarPicker date={date} onChange={(newDate) => {
                                 setDate(newDate)
                                 renderDataComponent(newDate)
                              }} />
                           </Col>
                           <Col xs={12} sm={6} md={6}>
                              <HourCalendarComponent
                                 dayOfMonth={changeDataDay?.dayMonth}
                                 dayOfWeek={changeDataDay?.nameDay}
                                 indexWeek={changeDataDay?.indexDay}
                                 data={changeDataDay?.array}
                                 onChange={handleChange}
                                 onDuplicate={() => addNewRowCalendar(changeDataDay?.array, setChangeDataDay, changeDataDay)}
                                 removeDuplicate={removeRowCalendar}
                                 changeState={setChangeDataDay}
                                 date={date}
                                 object={changeDataDay}
                              />
                           </Col>
                        </Row>
                     </LocalizationProvider>
                     <Col className="mt-4 d-flex justify-content-center">
                        <BtnBlue variant="dark" type="submit" onClick={() => window.scrollTo(0, 0)}>Salvar</BtnBlue>
                     </Col>
                  </>}
            </BackGroundForm>
         </Form>
      </CustomMenu>
   )
}