import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import moment from 'moment'
export function displayDate(date, noHour) {
   const parsedTime = moment(date).format('hh')
   var formatedHour = (parseInt(parsedTime) + 12) % 24
   if (formatedHour === 0) {
      formatedHour = "00"
   }
   const formattedDateFromAM = (moment(date).format('DD-MM-YYYY') + ' ' + formatedHour + ':' + moment(date).format('mm'))
   var formatedDate = moment(date).format('DD-MM-YYYY hh:mm')
   if (noHour) {
      formatedDate = moment(date).format('DD-MM-YYYY')
   }
   const result = moment(date).format('a') === 'pm' ? formattedDateFromAM : formatedDate

   return result
}
export function DateField(props) {
   return <>
      <Row>
         <Col>
            <Form.Group controlId={props.controlId}>
               <Form.Label style={{ color: "#546E7A" }}>{props.Label} <strong>{displayDate(props.date, props.noHour)}</strong></Form.Label>
            </Form.Group>
         </Col>
      </Row>
   </>
}
