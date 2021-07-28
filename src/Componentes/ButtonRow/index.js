import React from 'react'
import {Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
export function ButtonRow (props) {
  return <Row sm={'auto'} md={'auto'} lg={'auto'}>
      <Col xs="auto">{props.cancelButton}</Col>
      <Col>{props.confirmButton}</Col>
   </Row>
}
ButtonRow.propTypes =
{
   cancelButton: PropTypes.element,
   confirmButton: PropTypes.element
}