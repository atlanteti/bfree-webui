import React from 'react';
import { ValidationTextField } from '../FormFields/index';

export function DefaultValidationTextField(props) {
   return <ValidationTextField
      {...props}
      fullWidth

      InputLabelProps={{
         shrink: true,
         required: false
      }}
      inputProps={{
         maxLength: props.maxLength,
      }}
      error={(!!props.errorMessage ||
         ((props.defaultValue == "" || props.defaultValue == null)
            && props.required) && props.validated)}

      helperText={props.required ?
         (props.errorMessage ? props.errorMessage : "Campo Obrigatório")
         : props.errorMessage} />;
}
