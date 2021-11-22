import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'
import { TextField, MenuItem } from '@mui/material';
import { ValidationTextField } from '../FormFields';
import NoDataComp from '../NoDataComp';
import { DefaultValidateSelectField } from '../DefaultValidateInputs/DefaultValidateSelectField';

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
      return <DefaultValidateSelectField
         {...this.props}
         label="Status do Usuário"
      >
         {
            this.state.statuses?.map(status => {
               return (
                  <MenuItem
                     key={status.sus_cod}
                     value={status.sus_cod}
                  >
                     {status.sus_name}
                  </MenuItem>)
            })
         }
      </DefaultValidateSelectField >
   }
}
ListUserStatusControlled.propTypes =
{
   required: PropTypes.bool,
   value: PropTypes.string.isRequired,
   disabled: PropTypes.string,
   id: PropTypes.string.isRequired
}