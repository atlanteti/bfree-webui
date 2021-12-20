import { useField, useFormikContext } from 'formik';
import React from 'react';
import DatePicker from "react-datepicker";
import { DefaultValidationTextField } from "./DefaultValidationTextField";

export const DatePickerField = ({ ...props }) => {
   const { setFieldValue } = useFormikContext();
   const [field] = useField(props);
   let val = field.value;
   let formattedVal = new Date(val);
   return (
      <DatePicker
         {...field}
         {...props}
         placeholderText="dd/mm/aaaa"
         dateFormat="dd/MM/yyyy"
         selected={(val && formattedVal) || null}
         onChange={val => {
            setFieldValue(field.name, val);
         }}
         customInput={<DefaultValidationTextField
            {...props}
            selected={(val && formattedVal) || null}
            fullWidth={false}
            id={field.name}
            label={props.label} />} />
   );
};
