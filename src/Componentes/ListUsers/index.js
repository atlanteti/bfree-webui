import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'
import { TextField, MenuItem } from '@mui/material';
import { ValidationTextField } from '../FormFields';
import ContextLogin from "../../Context/ContextLogin";
import NoDataComp from '../NoDataComp';
import { DefaultValidateSelectField } from '../DefaultValidateInputs/DefaultValidateSelectField';

export default class ListUsers extends Component {
   constructor(props) {
      super(props);
      this.state = {
         users: [],
      };
   }

   async getUsers() {
      let endPoint = "listar-todos"
      if (Object.keys(this.props).includes('userJourney')) {
         endPoint = "list-has-journey"
      }
      const data = await request({
         method: 'get',
         endpoint: `usuarios/${endPoint}`
      });
      this.setState({
         users: data.data
      });
   }

   componentDidMount() {
      this.getUsers();
   }

   render() {
      return <DefaultValidateSelectField
         {...this.props}
         value={this.props.defaultUser}
         label="Usuário">
         {this.state.users?.map(user => {
            return (
               <MenuItem
                  key={user.usr_cod}
                  value={user.usr_cod}
               >
                  {user.usr_name}
               </MenuItem>);
         })}
      </DefaultValidateSelectField>
   }
}

ListUsers.propTypes = {
   defaultUser: PropTypes.number,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   disabled: PropTypes.bool
}
ListUsers.contextType = ContextLogin
