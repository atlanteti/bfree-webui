import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { RequiredField, SelectFieldStyle, SelectValidateStyle } from '../../styles/CommonStyles'
import InputMask from "react-input-mask"
import { MenuItem, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import NoDataComp from '../NoDataComp'
import { DefaultValidationTextField } from '../DefaultValidateInputs/DefaultValidationTextField'
import { DefaultValidateSelectField } from '../DefaultValidateInputs/DefaultValidateSelectField'

export const ValidationTextField = styled(TextField)({
   '& label': {
      color: '#546E7A',
      fontWeight: 600,
      fontFamily: 'Open Sans',
      style: 'normal'
   },
   '& input:invalid': {
      borderColor: 'red !important',
      borderWidth: 1,
   },
   '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: '#B0BEC5',
      },
      '&:hover fieldset': {
         borderColor: '#0203ad',
      },
   },
});

export function InputTextField(props, classes) {
   return <DefaultValidationTextField
      {...props} />
}
TextField.propTypes = {
   id: PropTypes.string.isRequired,
   label: PropTypes.string.isRequired,
   type: PropTypes.string,
   as: PropTypes.string,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
}
export function PhoneField(props) {
   return <NumberField
      pattern=".{15,}"
      as={InputMask}
      formatChars={{ "x": '[0-9]' }}
      mask="(xx) xxxxx-xxxx"
      maskChar={null}
      {...props} />
}
export function NumberField(props) {
   function preventNonNumericalInput(e) {
      e = e || window.event;
      var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
      var charStr = String.fromCharCode(charCode);

      if (!charStr.match(/^[0-9]+$/))
         e.preventDefault();
   }
   return <DefaultValidationTextField
      {...props}
      onKeyPress={(e) => preventNonNumericalInput(e)}
   />
}
NumberField.propTypes = {
   id: PropTypes.string.isRequired,
   label: PropTypes.string.isRequired,
   type: PropTypes.string,
   validated: PropTypes.bool.isRequired,
   defaultValue: PropTypes.object,
   errorMessage: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
}


export function SelectField(props) {
   return <ValidationTextField
      id={props.id}
      select
      fullWidth
      name={props.name}
      label={props.Label}
      required={props.required}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      InputLabelProps={{
         shrink: true,
         required: false
      }}
      helperText={props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}
   >
      {props.hasNull ? <MenuItem value={null}><NoDataComp /></MenuItem> : null}
      {props.dataCollection ?
         Object.keys(props.dataCollection).map(key => {
            return (<MenuItem key={key} value={key}>{props.dataCollection[key]}</MenuItem>)
         }) : null}
   </ValidationTextField>
}
SelectField.defaultProps =
{
   hasNull: true
}
SelectField.propTypes =
{
   Label: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   controlId: PropTypes.string.isRequired,
   dataCollection: PropTypes.object.isRequired,
   hasNull: PropTypes.bool.isRequired
}
export function BooleanField(props) {
   return <DefaultValidateSelectField
      {...props}
      value={props.value}
      label={props.Label}>

      <MenuItem value={"false"}>{props.onFalse}</MenuItem>
      <MenuItem value={"true"}>{props.onTrue}</MenuItem>

   </DefaultValidateSelectField>
}

BooleanField.propTypes = {
   onFalse: PropTypes.string.isRequired,
   onTrue: PropTypes.string.isRequired,
   id: PropTypes.string.isRequired,
   Label: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool
}