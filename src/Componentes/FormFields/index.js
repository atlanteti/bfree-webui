import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

export function TextField (props) {

  return <Form.Group controlId={props.controlId}>
      <Form.Label>{props.Label}</Form.Label>
      <Form.Control
         type={props.type}
         defaultValue={props.defaultValue}
         onChange={props.onChange}
         placeholder={props.placeholder}
         required={false} />
   </Form.Group>
}
TextField.propTypes = {
   controlId: PropTypes.number.isRequired,
   Label: PropTypes.string.isRequired,
   type: PropTypes.string,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   placeholder: PropTypes.string.isRequired
}

export function SelectField (props) {
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
