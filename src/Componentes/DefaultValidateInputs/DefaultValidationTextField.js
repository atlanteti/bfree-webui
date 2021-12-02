import React, { useEffect, useState } from 'react';
import { ValidationTextField } from '../FormFields/index';
function preventLeadingWhitespace(event) {
   event = event || window.event;
   var charCode = (typeof event.which == "undefined") ? event.keyCode : event.which;
   var charStr = String.fromCharCode(charCode);

   if (charStr.match(/[\s]/) && event.target.selectionStart === 0)
      event.preventDefault();
}

export function DefaultValidationTextField(props) {
   let error = false
   let [valid, setValid] = useState()
   let [HelperMessage, setMessage] = useState()
   useEffect(() => {
      if (props.valid) {
         props.valid.then((valid) => {
            setValid(!!valid)
            setMessage("")
         }).catch((error) => {
            setValid(false)
            if (props.errorMessage) {
               setMessage(props.errorMessage)
            }
            setMessage(error.message)
         })
      }
   })
   if (props.validated && props.required) {
      if (HelperMessage !== undefined) {
         error = true
      }
      else if (props.defaultValue == "" || props.defaultValue == null) {
         error = true
      }
      if (valid !== undefined) {
         error = !valid
      }
   }
   return <ValidationTextField
      fullWidth
      onKeyPress={preventLeadingWhitespace}
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
         (HelperMessage ? HelperMessage : "Campo Obrigatório")
         : HelperMessage}
      {...props} />;


}
