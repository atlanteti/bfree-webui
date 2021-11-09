import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { FormGroup, FormLabel } from './styles'
export function displayDate(date, noHour) {
   const parsedTime = moment(date).format('hh')
   var formatedHour = (parseInt(parsedTime) + 12) % 24
   if (formatedHour === 0) {
      formatedHour = "00"
   }
   var formattedDateFromAM = (moment(date).format('DD/MM/YYYY') + ' ' + formatedHour + ':' + moment(date).format('mm'))
   var formatedDate = moment(date).format('DD/MM/YYYY hh:mm')
   if (noHour) {
      formattedDateFromAM = (moment(date).format('DD/MM/YYYY'))
      formatedDate = moment(date).format('DD/MM/YYYY')
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
export function DateFieldStatus(props) {
   return <>
      <Row>
         <Col>
            <FormGroup controlId={props.controlId}>
               <FormLabel style={{ color: "#546E7A" }}>{props.Label} {displayDate(props.date, props.noHour)}</FormLabel>
            </FormGroup>
         </Col>
      </Row>
   </>
}