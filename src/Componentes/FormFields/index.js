import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { RequiredField, SelectFieldStyle, SelectValidateStyle } from '../../styles/CommonStyles'
import InputMask from "react-input-mask"
export function TextField(props) {
   return <Form.Group controlId={props.controlId}>
      <Form.Label>{props.Label} {props.required ? <RequiredField>*</RequiredField> : null}</Form.Label>
      <Form.Control
         rows={5}
         type={props.type}
         as={props.as}
         value={props.defaultValue}
         onChange={props.onChange}
         placeholder={props.placeholder}
         required={props.required}
         {...props}
      />
      <Form.Control.Feedback type="invalid">{props.errorMessage}</Form.Control.Feedback>
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
export function PhoneField(props) {
   return <NumberField
      pattern=".{15,}"
      as={InputMask}
      formatChars={{ "x": '[0-9]' }}
      mask="(xx) xxxxx-xxxx"
      maskChar={null}
      {...props} />
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
         {...props}
      />
      <Form.Control.Feedback type="invalid">{props.errorMessage}</Form.Control.Feedback>
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
         type={props.type}
         style={SelectValidateStyle}
         defaultValue={props.defaultValue}
         required={props.required}
         onChange={props.onChange}
      >
         {props.hasNull ? <option value={null}></option> : null}
         {props.dataCollection ?
            Object.keys(props.dataCollection).map(key => {
               return (<option key={key} value={key}>{props.dataCollection[key]}</option>)
            }) : null}
      </Form.Control>
   </Form.Group>
}
SelectField.defaultProps =
{
   hasNull: true
}
SelectField.propTypes =
{
   Label: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   controlId: PropTypes.string.isRequired,
   dataCollection: PropTypes.object.isRequired,
   hasNull: PropTypes.bool.isRequired
}
export function BooleanField(props) {
   return <Form.Group controlId={props.controlId}>
      <Form.Label >{props.Label} {props.required ? <RequiredField>*</RequiredField> : null}</Form.Label>
      <Form.Control
         as="select"
         style={SelectValidateStyle}
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