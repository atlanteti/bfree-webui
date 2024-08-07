import { useField } from 'formik';
import React from 'react';
import { Button } from 'react-bootstrap';
import InputMask from "react-input-mask";
import { ValidationTextField } from '../FormFields';


export function PhoneInput(props) {
   const [field, meta] = useField(props);
   return <>
      <InputMask
         id={field.name}
         mask={(field.value.match(/\d/g) || []).length < 11 ? "(99) 9999-99999" : "(99) 99999-9999"}
         maskChar=""
         value={field.value}
         onChange={field.onChange}
         onBlur={field.onBlur}
         disabled={props.disabled}
      >
         {() => <ValidationTextField
            data-cy="phone-input-text-field"
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
      </InputMask>
      {(field.value !== '' && field.name === "dem_contact_phone") &&
         <Button variant="light" target="blank" href={`https://wa.me/55${field.value.replaceAll(/[^\d]/g, "")}`}>
            Entrar em Contato
         </Button>
      }
   </>
}
