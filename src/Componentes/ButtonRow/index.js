import React from 'react'
import { Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
export function ButtonRow(props) {
   return <Row
      style={{ marginBottom: 15, display: "flex", justifyContent: 'space-between' }}
   >
      <Col style={{ display: "flex", alignItems: 'center' }}>
         {props.cancelButton}
         {props.titlePage}
      </Col>
      <Col style={{ display: "flex", justifyContent: 'flex-end' }}>
         {props.confirmButton}
      </Col>
   </Row>
}
ButtonRow.propTypes =
{
   cancelButton: PropTypes.element,
   confirmButton: PropTypes.element
}