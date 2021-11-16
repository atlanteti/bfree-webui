import { React } from 'react';
import { ValidationTextField } from '../FormFields';

export function DefaultValidateSelectField(props) {
   return <ValidationTextField
      {...props}
      fullWidth

      select
      defaultValue={props.value}

      InputLabelProps={{
         shrink: true,
         required: false,
      }}
      error={(!!props.errorMessage ||
         ((props.value == "" || props.value == null)
            && props.required) && props.validated)}

      helperText={props.required ?
         (props.errorMessage ? props.errorMessage : "Campo Obrigatório")
         : props.errorMessage} />;
}
