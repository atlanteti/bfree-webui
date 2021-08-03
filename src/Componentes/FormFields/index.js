import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { RequiredField } from '../../styles/CommonStyles'

export function TextField(props) {

  return <Form.Group controlId={props.controlId}>
    <Form.Label>{props.Label} {props.required ? <RequiredField>*</RequiredField> : null}</Form.Label>
    <Form.Control
      type={props.type}
      as={props.as}
      value={props.defaultValue}
      onChange={props.onChange}
      placeholder={props.placeholder}
      required={props.required}
      {...props} />
  </Form.Group>
}
TextField.propTypes = {
  controlId: PropTypes.string.isRequired,
  Label: PropTypes.string.isRequired,
  type: PropTypes.string,
  as: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
}

export function NumberField(props) {
  function preventNonNumericalInput(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
  }

  return <Form.Group controlId={props.controlId}>
    <Form.Label>{props.Label} {props.required ? <RequiredField>*</RequiredField> : null}</Form.Label>
    <Form.Control
      type={props.type}
      as={props.as}
      value={props.defaultValue}
      onChange={props.onChange}
      placeholder={props.placeholder}
      required={props.required}
      onKeyPress={(e) => preventNonNumericalInput(e)}
      {...props} />
  </Form.Group>
}
NumberField.propTypes = {
  controlId: PropTypes.string.isRequired,
  Label: PropTypes.string.isRequired,
  type: PropTypes.string,
  as: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
}


export function SelectField(props) {
  return <Form.Group controlId={props.controlId}>
    <Form.Label >{props.Label}</Form.Label>
    <Form.Control
      as="select"
      defaultValue={props.defaultValue}
      required
      onChange={props.onChange}
    >
      <option value={null}></option>
      {props.dataCollection?.map(collection => {
        return (<option key={collection.cpn_cod} value={collection.cpn_cod}>{collection.cpn_name}</option>)
      })}
    </Form.Control>
  </Form.Group>
}

export function BooleanField(props) {
  return <Form.Group controlId={props.controlId}>
    <Form.Label >{props.Label} {props.required ? <RequiredField>*</RequiredField> : null}</Form.Label>
    <Form.Control
      as="select"
      required={props.required}
      onChange={props.onChange}
      value={props.value}>
      {!props.register ?
        <> <option value={null}></option>
          <option value={false}>{props.onFalse}</option>
        </>
        : <option value={false}>{props.onFalse}</option>}
      <option value={true}>{props.onTrue}</option>
    </Form.Control>
  </Form.Group>
}

BooleanField.propTypes = {
  onFalse: PropTypes.string.isRequired,
  onTrue: PropTypes.string.isRequired,
  controlId: PropTypes.string.isRequired,
  Label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool
}