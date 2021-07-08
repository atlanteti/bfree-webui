import React from 'react';
import { Col, Row } from 'react-bootstrap';


export function ButtonRow(props) {
   return <Row sm={"auto"} md={"auto"} lg={"auto"}>
      <Col xs="auto">{props.cancelButton}</Col>
      <Col>{props.confirmButton}</Col>
   </Row>;
}
