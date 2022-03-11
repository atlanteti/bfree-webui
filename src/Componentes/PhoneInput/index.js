import InputMask from "react-input-mask"
import { DefaultValidationTextField } from "../DefaultValidateInputs/DefaultValidationTextField"
export function PhoneInput(props) {
   let mask = "(xx) xxxx-xxxxx"
   if (props.defaultValue != undefined) {
      const emptySpaces = props.defaultValue.match(/ /g || [])
      if (emptySpaces !== null && emptySpaces.length === 1 && props.defaultValue.length === 15) {
         mask = "(xx) xxxxx-xxxx"
      }
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

export function FormatPhone(data) {
   return data.replaceAll(/[^\d]/g, "").replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
}