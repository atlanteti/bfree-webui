import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'
import { TextField, MenuItem } from '@mui/material';
import { ValidationTextField } from '../FormFields';

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
         <MenuItem value={null} />
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
      // return <Form.Group controlId={this.props.controlId} /*"companyId"*/>
      //    <Form.Label style={{color: "#B0BEC5"}}>Usuário: </Form.Label>
      //    <Form.Control //Form.Select não funciona por razões misteriosas
      //       style={SelectValidateStyle}
      //       disabled={this.props.disabled}
      //       as="select"
      //       required={this.props.required}
      //       onChange={this.onChange.bind(this)}
      //       value={this.props.defaultUser}>
      //       <>
      //          <option value={null} />
      //          {this.state.users?.map(user => {
      //             return (
      //                <option
      //                   key={user.usr_cod}
      //                   value={user.usr_cod}
      //                >
      //                   {user.usr_name}
      //                </option>);
      //          })}
      //       </>
      //    </Form.Control>
      //    <Form.Control.Feedback type="invalid">{this.props.errorMessage}</Form.Control.Feedback>
      //    <Form.Text className="text-muted">{this.props.Text} {this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}</Form.Text>
      // </Form.Group>;
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
