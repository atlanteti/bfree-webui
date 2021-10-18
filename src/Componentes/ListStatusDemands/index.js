import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'
import { TextField, MenuItem } from '@mui/material';
import { ValidationTextField } from '../FormFields';

export default class ListStatusDemands extends Component {
   constructor(props) {
      super(props);
      this.state = {
         statusDemands: [],
      };
      if (this.props.getSetCallback) {
         this.props.getSetCallback(this.select.bind(this))
      }
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

   onChange(e) {
      this.props.onChange(e)
   }

   select(typeStatusCode) {
      this.setState({ selectedValue: typeStatusCode })
      this.props.onChange({
         target: {
            id: this.props.id,
            value: String(typeStatusCode),
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
         label="Status da Demanda"
         value={this.props.defaultStatusDemand}
         disabled={this.props.disabled}
         required={this.props.required}
         onChange={this.onChange.bind(this)}
         InputLabelProps={{
            shrink: true,
            required: false
         }}
         helperText={this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}
      >
         <MenuItem value={null} />
         {this.state.statusDemands?.map(statusDemand => {
            return (
               <MenuItem
                  key={statusDemand.sdm_cod}
                  value={statusDemand.sdm_cod}
               >
                  {statusDemand.sdm_name}
               </MenuItem>);
         })}
      </ValidationTextField>
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
