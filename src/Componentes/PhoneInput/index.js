import InputMask from "react-input-mask"
import { DefaultValidationTextField } from "../DefaultValidateInputs/DefaultValidationTextField"
export function PhoneInput(props) {
   return <InputMask
      mask="(xx) xxxxx-xxxx"
      value={props.defaultValue}
      formatChars={{ "x": '[0-9]' }}
      disabled={false}
      maskChar=" "
      required
      onChange={props.onChange}
   >
      {() =>
         <DefaultValidationTextField
            {...props}
            id="usr_phone"
            label="Telefone"
            type="text"
            required

         />}
   </InputMask>
}