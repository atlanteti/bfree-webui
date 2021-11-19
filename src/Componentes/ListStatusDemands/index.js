import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'
import { TextField, MenuItem } from '@mui/material';
import { ValidationTextField } from '../FormFields';
import NoDataComp from '../NoDataComp';
import { DefaultValidateSelectField } from '../DefaultValidateInputs/DefaultValidateSelectField';


export default class ListStatusDemands extends Component {
   constructor(props) {
      super(props);
      this.state = {
         statusDemands: [],
      };
   }

   async getStatusDemands() {
      const data = await request({
         method: 'get',
         endpoint: 'status-demands/listar-todos'
      });
      this.setState({
         statusDemands: data.data
      });
   }

   componentDidMount() {
      this.getStatusDemands();
   }

   render() {
      return <DefaultValidateSelectField
         {...this.props}
         value={this.props.defaultStatusDemand}
         label="Status da Demanda">
         {this.state.statusDemands?.map(statusDemand => {
            return (
               <MenuItem
                  key={statusDemand.sdm_cod}
                  value={statusDemand.sdm_cod}
               >
                  {statusDemand.sdm_name}
               </MenuItem>);
         })}
      </DefaultValidateSelectField>
   }
}

ListStatusDemands.propTypes = {
   getSetCallback: PropTypes.func,
   defaultStatusDemand: PropTypes.number,
   id: PropTypes.number.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   disabled: PropTypes.bool
}
