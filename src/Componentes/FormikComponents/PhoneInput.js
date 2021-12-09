import { useField } from 'formik';
import React from 'react';
import InputMask from "react-input-mask";
import { ValidationTextField } from '../FormFields';

export function PhoneInput(props) {
   const [field, meta] = useField(props);
   let mask = "(99) 9999-99999";
   if (field.value != undefined) {
      const emptySpaces = field.value.match(/ /g || []);
      if (emptySpaces !== null && emptySpaces.length === 1 && field.value.length === 15) {
         mask = "(99) 99999-9999";
      }
   }
   return <InputMask
      id={field.name}
      mask={mask}
      maskChar=" "
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      disabled={props.disabled}
   >
      {() => <ValidationTextField
         fullWidth
         value={field.value}
         id={field.name}
         label={props.label}
         helperText={meta.error}
         error={!!meta.error && meta.touched}
         disabled={props.disabled}
         InputLabelProps={{
            shrink: true,
            required: false
         }} />}
   </InputMask>;
}
