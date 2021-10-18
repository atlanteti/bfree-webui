import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles';
import { TextField, MenuItem } from '@mui/material';
import { ValidationTextField } from '../FormFields';

export default class ListCompanies extends Component {
   constructor(props) {
      super(props);
      this.state = {
         companies: [],
      };
      if (this.props.getSetCallback) {
         this.props.getSetCallback(this.select.bind(this))
      }
   }

   async getCompanies() {
      const data = await request({
         method: 'get',
         endpoint: 'companies/listar-todos'
      });
      this.setState({
         companies: data.data
      });
   }

   componentDidMount() {
      this.getCompanies();
   }

   onChange(e) {
      this.props.onChange(e)
   }

   select(companyCode) {
      this.setState({ selectedValue: companyCode })
      this.props.onChange({
         target: {
            id: this.props.id,
            value: String(companyCode),
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
         label="Empresa"
         required={this.props.required}
         value={this.props.defaultCompany}
         onChange={this.onChange.bind(this)}
         InputLabelProps={{
            shrink: true,
            required: false,
         }}
         helperText={this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}
      >
         <MenuItem value={null} />
         {this.state.companies?.map(company => {
            return (
               <MenuItem
                  key={company.cpn_cod}
                  value={company.cpn_cod}
               >
                  {company.cpn_name}
               </MenuItem>);
         })}
      </ValidationTextField>

   }
}

ListCompanies.propTypes = {
   getSetCallback: PropTypes.func,
   defaultCompany: PropTypes.number,
   id: PropTypes.number.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   disabled: PropTypes.bool
}
