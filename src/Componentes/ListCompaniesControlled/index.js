import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import { SelectValidateStyle, RequiredField } from '../../styles/CommonStyles';
import { TextField, MenuItem } from '@mui/material';
import { ValidationTextField } from '../FormFields';

export default class ListCompaniesControlled extends Component {
   constructor(props) {
      super(props);
      this.state = {
         companies: []
      };
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
      this.props.onChange(e);
   }

   render() {
      return <ValidationTextField
         id={this.props.id}
         select
         fullWidth
         name={this.props.name}
         disabled={this.props.disabled}
         label="Empresa"
         value={this.props.value}
         onChange={this.onChange.bind(this)}
         InputLabelProps={{
            shrink: true,
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
