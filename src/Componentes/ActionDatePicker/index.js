import DatePicker from "react-datepicker";
import { DefaultValidationTextField } from "../DefaultValidateInputs/DefaultValidationTextField";
export default function ValidatedDatePicker(props) {
   return <DatePicker
      controlId={props.controlId}
      placeholderText="dd/mm/aaaa"
      dateFormat="dd/MM/yyyy"
      {...props}
      customInput={
         <DefaultValidationTextField
            {...props}
            fullWidth={false}
            label={props.label}
         />
      }
   />
}