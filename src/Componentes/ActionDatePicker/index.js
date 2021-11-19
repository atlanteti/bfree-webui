import DatePicker from "react-datepicker";
import { DefaultValidationTextField } from "../DefaultValidateInputs/DefaultValidationTextField";
export default function ActionDatePicker(props) {
   return <DatePicker
      controlId="dem_dtaction"
      placeholderText="dd/mm/aaaa"
      dateFormat="dd/MM/yyyy"
      {...props}
      customInput={
         <DefaultValidationTextField
            {...props}
            fullWidth={false}
            label="Data de Ação"
         />
      }
   />
}