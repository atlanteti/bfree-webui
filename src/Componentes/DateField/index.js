import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { FormGroup, FormLabel } from './styles'
export function displayDate(date, noHour) {

   if (!noHour) {
      return moment(date).format('DD/MM/YYYY HH:mm')
   }
   else {
      return moment(date).format('DD/MM/YYYY')
   }
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