import React from 'react'
import { Form } from 'react-bootstrap'

export function TextField (props) {
  return <Form.Group controlId={props.controlId}>
      <Form.Label>{props.Label}</Form.Label>
      <Form.Control
         type={props.type}
         defaultValue={props.defaultValue}
         onChange={props.onChange}
         required={false} />
   </Form.Group>
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
