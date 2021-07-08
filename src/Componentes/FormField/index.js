import React from 'react';
import { Form } from 'react-bootstrap';



export function FormField(props) {
   return <Form.Group controlId={props.controlId}>
      <Form.Label>{props.Label}</Form.Label>
      <Form.Control
         type={props.type}
         defaultValue={props.defaultValue}
         onChange={props.onChange}
         required={false} />
   </Form.Group>;
}
