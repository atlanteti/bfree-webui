import React from 'react'
import { Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
export function ButtonRow(props) {
   return <Row
      style={{ marginBottom: 15, display: "flex", justifyContent: 'space-between' }}
   >
      <Col xs={12} sm={8} style={{ display: "flex", alignItems: 'center' }}>
         {props.cancelButton}
         {props.titlePage}
      </Col>
      <Col xs={12} sm={2} style={{ display: "flex", justifyContent: 'flex-end' }}>
         {props.confirmButton}
      </Col>
   </Row>
}
ButtonRow.propTypes =
{
   cancelButton: PropTypes.element,
   confirmButton: PropTypes.element
}