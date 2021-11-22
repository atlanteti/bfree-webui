import React from 'react';
import { ValidationTextField } from '../FormFields/index';
function preventNonNumericalInput(event) {
   event = event || window.event;
   var charCode = (typeof event.which == "undefined") ? event.keyCode : event.which;
   var charStr = String.fromCharCode(charCode);

   if (charStr.match(/[\s]/) && event.target.selectionStart === 0)
      event.preventDefault();
}
export function DefaultValidationTextField(props) {
   let error = false
   if (props.validated && props.required) {
      if (props.errorMessage !== undefined) {
         error = true
      }
      else if (props.defaultValue == "" || props.defaultValue == null) {
         error = true
      }
   }
   return <ValidationTextField
      fullWidth
      onKeyPress={preventNonNumericalInput}
      InputLabelProps={{
         shrink: true,
         required: false
      }}
      inputProps={{
         maxLength: props.maxLength,
      }}
      pattern="^[a-zA-Z1-9].*"
      error={error}

      helperText={props.required ?
         (props.errorMessage ? props.errorMessage : "Campo Obrigatório")
         : props.errorMessage}
      {...props} />;


}
