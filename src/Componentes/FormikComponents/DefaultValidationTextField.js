import { useField } from 'formik';
import React from 'react';
import { ValidationTextField } from '../FormFields';

function preventLeadingWhitespace(event) {
   event = event || window.event;
   var charCode = (typeof event.which == "undefined") ? event.keyCode : event.which;
   var charStr = String.fromCharCode(charCode);

   if (charStr.match(/[\s]/) && event.target.selectionStart === 0)
      event.preventDefault();
}
export function preventNonNumericalInput(e) {
   e = e || window.event;
   var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
   var charStr = String.fromCharCode(charCode);

   if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
}
export const DefaultValidationTextField = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
      <>
         <ValidationTextField
            fullWidth
            onKeyPress={preventLeadingWhitespace}
            InputLabelProps={{
               shrink: true,
               required: false
            }}
            inputProps={{
               maxLength: props.maxLength
            }}
            label={label}
            {...field}
            error={!!meta.error && meta.touched}
            helperText={meta.error ?? " "}
            {...props} />
      </>
   );
};
