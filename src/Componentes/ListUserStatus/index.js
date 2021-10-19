import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'
import { TextField, MenuItem } from '@mui/material';
import { ValidationTextField } from '../FormFields';

export default class ListUserStatusControlled extends Component {
   constructor(props) {
      super(props);
      this.state = {
         statuses: []
      };
   }

   async getStatus() {
      const data = await request({
         method: 'get',
         endpoint: 'status-users/listar-todos'
      });
      this.setState({
         statuses: data.data
      });
   }

   componentDidMount() {
      this.getStatus();
   }

   onChange(event) {
      this.props.onChange(event)
   }

   render() {
      return <ValidationTextField
         id={this.props.id}
         select
         fullWidth
         name={this.props.name}
         label={this.props.label}
         value={this.props.value}
         required={this.props.required}
         onChange={this.onChange.bind(this)}
         InputLabelProps={{
            shrink: true,
            required: false
         }}
         helperText={this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}
      >
         <MenuItem value={null} />
         {this.state.statuses?.map(status => {
            return (
               <MenuItem
                  key={status.sus_cod}
                  value={status.sus_cod}
               >
                  {status.sus_name}
               </MenuItem>)
         })}
      </ValidationTextField>
   }
}
ListUserStatusControlled.propTypes =
{
   required: PropTypes.bool,
   value: PropTypes.string.isRequired,
   disabled: PropTypes.string,
   id: PropTypes.string.isRequired
}