import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import moment from 'moment'
export function displayDate (date) {
  const parsedTime = moment(date).format('hh')
  const result = moment(date).format('a') === 'pm' ? (moment(date).format('DD-MM-YYYY') + ' ' + (parseInt(parsedTime) + 12) + ':' + moment(date).format('mm')) : moment(date).format('DD-MM-YYYY hh:mm')
  return result
}
export function DateField (props) {
  return <>
      <Row>
         <Col>
            <Form.Group controlId={props.controlId}>
               <Form.Label>{props.Label}</Form.Label>
            </Form.Group>
         </Col>
      </Row>
      <Row>
         <Col style={{ marginBottom: 20 }}>
            {/* formatando data */}
            {displayDate(props.date)}
         </Col>
      </Row>
   </>
}
