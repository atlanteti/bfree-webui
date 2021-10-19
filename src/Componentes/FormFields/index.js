import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { RequiredField, SelectFieldStyle, SelectValidateStyle } from '../../styles/CommonStyles'
import InputMask from "react-input-mask"
import { MenuItem, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

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
   return <ValidationTextField
      id={props.id}
      label={props.label}
      type={props.type}
      value={props.defaultValue}
      onChange={props.onChange}
      className={classes.textField}
      fullWidth={props.fullWidth ? true : null}
      required={props.required}
      multiline={props.multiline ? true : null}
      rows={props.rows ? props.rows : null}
      InputLabelProps={{
         shrink: true,
         required: false,
      }}
      helperText={props.required ? "Campo Obrigatório" : null}
   />
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

   return <ValidationTextField
      id={props.id}
      label={props.label}
      type={props.type}
      value={props.defaultValue}
      onChange={props.onChange}
      fullWidth={props.fullWidth ? true : null}
      required={props.required}
      multiline={props.multiline ? true : null}
      rows={props.rows ? props.rows : null}
      onKeyPress={(e) => preventNonNumericalInput(e)}
      InputLabelProps={{
         shrink: true,
         required: false
      }}
      helperText={props.required ? "Campo Obrigatório" : null}
   />
}
NumberField.propTypes = {
   controlId: PropTypes.string.isRequired,
   Label: PropTypes.string.isRequired,
   type: PropTypes.string,
   as: PropTypes.string,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
}


export function SelectField(props) {
   return <Form.Group controlId={props.controlId}>
      <Form.Label style={{ color: "#B0BEC5" }}>{props.label}</Form.Label>
      <Form.Control
         as="select"
         type={props.type}
         style={SelectValidateStyle}
         defaultValue={props.defaultValue}
         required={props.required}
         onChange={props.onChange}
      >
         {props.hasNull ? <option value={null}></option> : null}
         {props.dataCollection ?
            Object.keys(props.dataCollection).map(key => {
               return (<option key={key} value={key}>{props.dataCollection[key]}</option>)
            }) : null}
      </Form.Control>
   </Form.Group>
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
   return <ValidationTextField
      id={props.id}
      select
      fullWidth
      name={props.name}
      label={props.Label}
      required={props.required}
      value={props.value}
      onChange={props.onChange}
      InputLabelProps={{
         shrink: true,
         required: false
      }}
      helperText={props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}
   >
      <MenuItem value={null}></MenuItem>
      <MenuItem value={false}>{props.onFalse}</MenuItem>
      <MenuItem value={true}>{props.onTrue}</MenuItem>
   </ValidationTextField>
}

BooleanField.propTypes = {
   onFalse: PropTypes.string.isRequired,
   onTrue: PropTypes.string.isRequired,
   id: PropTypes.string.isRequired,
   Label: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool
}