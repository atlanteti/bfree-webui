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
   controlId: PropTypes.string.isRequired,
   Label: PropTypes.string.isRequired,
   type: PropTypes.string,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
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

export function BooleanField (props)
{
   return <Form.Group controlId={props.controlId}>
      <Form.Label >{props.Label}</Form.Label>
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