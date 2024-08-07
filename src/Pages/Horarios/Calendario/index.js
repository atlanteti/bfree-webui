import { useState, useEffect } from "react"
import { BackGroundForm, BtnBlue, RowTopMargin } from "../../../styles/CommonStyles";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { Form, Col, Row, Alert } from "react-bootstrap";
import { HourCalendarComponent } from "../../../Componentes/HourComponent";
import { request } from "../../../Services/api";
import { CircularProgress } from '@mui/material';
import { Helmet } from "react-helmet";
import { TopTitles, UtilsFunctions } from "../utils";
import { UtilsHourCalendar } from "./utils"
import CalendarPicker from '@mui/lab/CalendarPicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from "moment"
import { styled } from '@mui/material/styles';

const Calendar = styled(CalendarPicker)({
   maxWidth: '270px'
})
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
      let getDataHours = returnDay(date)
      setChangeDataDay(getDataHours)
   }
   function sendDays() {
      let atLeastOneHourEmpty = days.filter((value) =>
         moment(value.cal_date).format('yyyy-MM-DD') === formatDate
         && value.cal_start === undefined || value.cal_end === undefined
      )
      let noEmptyHours = days.filter((value) =>
         moment(value.cal_date).format('yyyy-MM-DD') === formatDate
         && value.cal_start !== undefined && value.cal_end !== undefined
      )
      let emptyHours = days.filter((value) =>
         moment(value.cal_date).format('yyyy-MM-DD') === formatDate
         && value.cal_start === undefined && value.cal_end === undefined
      )
      if (atLeastOneHourEmpty.length === 0) {
         return noEmptyHours
      } else if (atLeastOneHourEmpty.length !== 0 && emptyHours.length !== 0) {
         if (noEmptyHours.length !== 0) {
            return noEmptyHours
         }
         return []
      } else {
         return atLeastOneHourEmpty
      }
   }
   async function handleSubmit(event) {
      event.preventDefault()
      const data = await request({
         method: "post",
         endpoint: "calendar/save",
         data: {
            calendarDate: formatDate,
            availableDates: sendDays()
         },
      })
      if (data.meta.status === 100) {
         setMessage(data.meta.message)
         setStatus('success')
      } else {
         setMessage(data.meta.message)
         setStatus('warning')
      }
      setShowAlert(true)
   }
   async function getData() {
      await request({
         method: "get",
         endpoint: "calendar/list-by-user",
      }).then((data) => {
         setDays(data.data)
         renderData(data.data, "cal")
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
         <TopTitles text="por dia" route="/horario" />
         <Form onSubmit={handleSubmit}>
            <BackGroundForm xs={1} className={'mb-2'} noGutters style={{ padding: 16, marginTop: 20 }}>
               {loadingData || refresh ?
                  <Row>
                     <Col><CircularProgress /></Col>
                  </Row> :
                  <>
                     <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Row>
                           <Col xs={12} sm={6} md={5}>
                              <Calendar date={date} onChange={(newDate) => {
                                 setDate(newDate)
                                 renderDataComponent(newDate)
                              }} />
                           </Col>
                           <Col xs={12} sm={6} md={6}>
                              <HourCalendarComponent
                                 dayOfMonth={changeDataDay?.dayMonth}
                                 dayOfWeek={changeDataDay?.nameDay}
                                 indexWeek={changeDataDay?.indexDay}
                                 data={days}
                                 onChange={handleChange}
                                 onDuplicate={() => addNewRowCalendar(days, date)}
                                 removeDuplicate={removeRowCalendar}
                                 changeState={setChangeDataDay}
                                 date={date}
                                 object={changeDataDay}
                              />
                           </Col>
                        </Row>
                     </LocalizationProvider>
                     <Col className="mt-4 d-flex justify-content-center">
                        <BtnBlue variant="dark" data-cy="schedulecalendar-submit-button" type="submit" onClick={() => window.scrollTo(0, 0)}>Salvar</BtnBlue>
                     </Col>
                  </>}
            </BackGroundForm>
         </Form>
      </CustomMenu>
   )
}