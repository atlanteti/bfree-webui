import { MenuItem } from '@mui/material';
import { React } from 'react';
import NoDataComp from '../NoDataComp';
import { DefaultValidationTextField } from './DefaultValidationTextField';

export function DefaultValidateSelectField(props) {
   return <DefaultValidationTextField
      select

      error={(!!props.errorMessage ||
         ((props.value == "" || props.value == null)
            && props.required) && props.validated)}
      {...props}
   >
      {!props.required && <MenuItem value={""}><NoDataComp /></MenuItem>}
      {props.children}
   </DefaultValidationTextField>;
}
