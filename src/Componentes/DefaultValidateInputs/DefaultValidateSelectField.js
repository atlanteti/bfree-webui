import { React } from 'react';
import { ValidationTextField } from '../FormFields';
import { DefaultValidationTextField } from './DefaultValidationTextField';

export function DefaultValidateSelectField(props) {
   return <DefaultValidationTextField
      select

      error={(!!props.errorMessage ||
         ((props.value == "" || props.value == null)
            && props.required) && props.validated)}
      {...props}
   />;
}
