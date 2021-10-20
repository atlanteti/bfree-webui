import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'
import { TextField, MenuItem } from '@mui/material';
import { ValidationTextField } from '../FormFields';
import ContextLogin from "../../Context/ContextLogin";
import NoDataComp from '../NoDataComp';
export default class ListUsers extends Component {
   constructor(props) {
      super(props);
      this.state = {
         users: [],
      };
      if (this.props.getSetCallback) {
         this.props.getSetCallback(this.select.bind(this))
      }
   }

   async getUsers() {
      const data = await request({
         method: 'get',
         endpoint: 'usuarios/listar-todos'
      });
      this.setState({
         users: data.data
      });
   }

   componentDidMount() {
      this.getUsers();
   }

   onChange(e) {
      this.props.onChange(e)
   }

   select(typeUserCode) {
      this.setState({ selectedValue: typeUserCode })
      this.props.onChange({
         target: {
            id: this.props.id,
            value: String(typeUserCode),
            selected: true
         }
      })
   }

   render() {
      return <ValidationTextField
         id={this.props.id}
         select
         fullWidth
         name={this.props.name}
         label="Usuário"
         required={this.props.required}
         value={this.props.defaultUser}
         disabled={this.props.disabled}
         onChange={this.onChange.bind(this)}
         InputLabelProps={{
            shrink: true,
            required: false
         }}
         helperText={this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}
      >
         <MenuItem value={null}><NoDataComp /></MenuItem>
         {this.state.users?.map(user => {
            return (
               <MenuItem
                  key={user.usr_cod}
                  value={user.usr_cod}
               >
                  {user.usr_name}
               </MenuItem>);
         })}
      </ValidationTextField>
   }
}

ListUsers.propTypes = {
   getSetCallback: PropTypes.func,
   defaultUser: PropTypes.number,
   id: PropTypes.number.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   disabled: PropTypes.bool
}
ListUsers.contextType = ContextLogin
