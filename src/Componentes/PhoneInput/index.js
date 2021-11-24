import InputMask from "react-input-mask"
import { DefaultValidationTextField } from "../DefaultValidateInputs/DefaultValidationTextField"
export function PhoneInput(props) {
   let mask = "(xx) xxxx-xxxx"
   if (props.defaultValue.match(/ /g || []).length === 1) {
      mask = "(xx) xxxxx-xxxx"
   }
   return <InputMask
      mask={mask}
      value={props.defaultValue}
      formatChars={{ "x": '[0-9]' }}
      disabled={props.disabled}
      maskChar=" "
      required={props.required}
      onChange={props.onChange}
   >
      {() =>
         <DefaultValidationTextField
            {...props}
            defaultValue={props.defaultValue}
            disabled={props.disabled}
            label="Telefone"
            type="text"
            required={props.required}

         />}
   </InputMask>
}