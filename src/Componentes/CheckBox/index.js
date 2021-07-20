import { useState } from "react";
import { Form } from 'react-bootstrap';

export function CheckBox(props) {

   return (
      <Form.Check
         type="checkbox"
         className="my-1 mr-sm-2"
         name={props.name}
         id="customControlInline"
         label={props.label}
         onChange={props.onChange}
         custom
         checked={props.checked}
         defaultValue={props.defaultValue}
      />
   )
}