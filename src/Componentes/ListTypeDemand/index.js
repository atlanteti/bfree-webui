import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'
import { TextField, MenuItem } from '@mui/material';
import { ValidationTextField } from '../FormFields';
import NoDataComp from '../NoDataComp';

export default class ListTypeDemand extends Component {
   constructor(props) {
      super(props);
      this.state = {
         typeDemands: [],
      };
      if (this.props.getSetCallback) {
         this.props.getSetCallback(this.select.bind(this))
      }
   }

   async getTypeDemands() {
      const data = await request({
         method: 'get',
         endpoint: 'types-demand/listar-todos'
      });
      this.setState({
         typeDemands: data.data
      });
   }

   componentDidMount() {
      this.getTypeDemands();
   }

   onChange(e) {
      this.props.onChange(e)
   }

   select(typeDemandCode) {
      this.setState({ selectedValue: typeDemandCode })
      this.props.onChange({
         target: {
            id: this.props.id,
            value: String(typeDemandCode),
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
         label="Tipos de Demanda"
         disabled={this.props.disabled}
         value={this.props.defaultTypeDemand}
         required={this.props.required}
         onChange={this.onChange.bind(this)}
         InputLabelProps={{
            shrink: true,
            required: false
         }}
         helperText={this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}
      >
         <MenuItem value={null}><NoDataComp /></MenuItem>
         {this.state.typeDemands?.map(typeDemand => {
            return (
               <MenuItem
                  key={typeDemand.tdm_cod}
                  value={typeDemand.tdm_cod}
               >
                  {typeDemand.tdm_name}
               </MenuItem>);
         })}
      </ValidationTextField>
   }
}

ListTypeDemand.propTypes = {
   getSetCallback: PropTypes.func,
   defaultTypeDemand: PropTypes.number,
   id: PropTypes.number.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   disabled: PropTypes.bool
}
