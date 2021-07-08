import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import moment from "moment";


<DateField />
export function DateField(props) {
   const parsedTime = moment(props.date).format("hh");
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
            {moment(props.date).format("a") === "pm" ? (
               moment(props.date).format("DD-MM-YYYY") + " " + (parseInt(parsedTime) + 12) + ":" + moment(props.date).format("mm")
            )
               : moment(props.date).format("DD-MM-YYYY hh:mm")}
         </Col>
      </Row>
   </>;
}
