import { useField, useFormikContext } from 'formik';
import React from 'react';
import DatePicker from "react-datepicker";
import { DefaultValidationTextField } from "./DefaultValidationTextField";
export const MeetingDatePickerField = ({ ...props }) => {
   {
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
            autoComplete='off'
            customInput={<DefaultValidationTextField
               {...props}
               selected={(val && formattedVal) || null}
               fullWidth={true}
               label={props.label} />} />
      );
   };
}
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
         autoComplete='off'
         customInput={<DefaultValidationTextField
            {...props}
            selected={(val && formattedVal) || null}
            fullWidth={true}
            label={props.label} />} />
   );
};
